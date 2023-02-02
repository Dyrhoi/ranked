/**
 * Extending the default behavior of prisma CRUD
 *
 */

import { getNewRating } from '$lib/shared/utils/elo.utils';
import type { CreateGameSchema } from '$lib/shared/validation/zod';
import { db } from '../database';
import { getCurrentEloFromInstants } from './elo.service';

export const enum Outcome {
	WIN = 1,
	LOSS = 0,
	DRAW = 0.5,
}

export const createGame = async ({ teams }: CreateGameSchema) => {
	const players = await db.player.findMany({
		where: {
			id: {
				in: teams.flatMap((t) => t.playerIds),
			},
		},
		include: { eloInstants: true },
	});

	// This gets a little messy...
	const teamsWithPlayers = teams.map((team) => ({
		...team,
		players: players.filter((p) => team.playerIds.includes(p.id)),
	}));

	const teamOutcomes = teamsWithPlayers.map((team) => {
		const maxScore = Math.max(...teams.filter((t) => t !== team).map((t) => t.score));
		return {
			...team,
			outcome:
				team.score > maxScore ? Outcome.WIN : team.score < maxScore ? Outcome.LOSS : Outcome.DRAW,
		};
	});

	const teamWithPlayerNewElos = teamOutcomes.map((team) => ({
		...team,
		players: team.players.map((player) => {
			const currentElo = getCurrentEloFromInstants(player.eloInstants);
			const oppositionElos = teamOutcomes
				.filter((oppTeam) => oppTeam !== team)
				.flatMap((oppTeam) =>
					oppTeam.players.map((oppPlayer) => getCurrentEloFromInstants(oppPlayer.eloInstants))
				);
			const newElo = getNewRating(currentElo, oppositionElos, team.outcome);
			return {
				...player,
				currentElo,
				newElo,
			};
		}),
	}));

	const game = await db.game.create({
		data: {
			teams: {
				create: teamWithPlayerNewElos.map((team) => ({
					team: {
						create: {
							players: { connect: team.players.map((p) => ({ id: p.id })) },
						},
					},
					score: team.score,
				})),
			},
			// Lose type safety from flatMap... it is what it is.
			eloInstants: {
				create: teamWithPlayerNewElos.flatMap((team) =>
					team.players.map((player) => ({
						player: { connect: { id: player.id } },
						elo: player.newElo,
					}))
				),
			},
		},
	});

	return {};
};
