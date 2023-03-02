/**
 * Extending the default behavior of prisma CRUD
 *
 */

import { getNewRating } from '$lib/shared/utils/elo.utils';
import type { CreateGameSchema } from '$lib/shared/validation/zod';
import { Prisma } from '@prisma/client';
import { db } from '../database';
import { getCurrentEloFromInstants } from './elo.service';

export const enum Outcome {
	WIN = 1,
	LOSS = 0,
	DRAW = 0.5,
}

interface SimplifiedTeam {
	score: number;
	players: { id: number; elo: number }[];
}
const simulateMatches = (teams: Array<SimplifiedTeam>) => {
	const matchesSimulated = new Set<[SimplifiedTeam, SimplifiedTeam]>();
	for (const [i, team] of teams.entries()) {
		teams
			.filter((t) => t !== team)
			.forEach((opponent) => {
				if (!matchesSimulated.has([team, opponent]) && !matchesSimulated.has([opponent, team])) {
					teams[i].players = simulateMatch(team, opponent);
					matchesSimulated.add([team, opponent]);
				}
			});
	}
	return teams;
};

const simulateMatch = (team: SimplifiedTeam, opponent: SimplifiedTeam) => {
	const outcome =
		team.score > opponent.score
			? Outcome.WIN
			: team.score < opponent.score
			? Outcome.LOSS
			: Outcome.DRAW;
	return team.players.map((player) => ({
		...player,
		elo: getNewRating(
			player.elo,
			opponent.players.map((p) => p.elo),
			outcome
		),
	}));
};

export const createGame = async ({ teams, seasonId }: CreateGameSchema) => {
	const players = await db.player.findMany({
		where: {
			id: {
				in: teams.flatMap((t) => t.playerIds),
			},
		},
		include: { eloInstants: true },
	});

	const teamsSimplified = teams.map((team) => ({
		score: team.score,
		players: players
			.filter((p) => team.playerIds.includes(p.id))
			.map((p) => ({
				id: p.id,
				elo: getCurrentEloFromInstants(p.eloInstants),
			})),
	}));

	const teamWithUpdatedElo = simulateMatches(teamsSimplified);

	const game = await db.game.create({
		data: {
			teams: {
				create: teamWithUpdatedElo.map((team) => ({
					team: {
						create: {
							players: { connect: team.players.map((p) => ({ id: p.id })) },
							countPlayers: team.players.length,
						},
					},
					score: team.score,
				})),
			},
			countTeams: teamWithUpdatedElo.length,
			// Lose type safety from flatMap... it is what it is.
			eloInstants: {
				create: teamWithUpdatedElo.flatMap((team) =>
					team.players.map((player) => ({
						player: { connect: { id: player.id } },
						elo: player.elo,
					}))
				),
			},

			seasons: {
				connect: seasonId ? { id: seasonId } : undefined,
			},
		},
		include: {
			teams: true,
			eloInstants: true,
		},
	});

	return game;
};

interface Options {
	maxTeams: number;
	limit: number;
	page: number;
	seasonId: number;
}
export const getGames = async (
	opt: Options = { maxTeams: 2, limit: 30, page: 1, seasonId: -1 }
) => {
	const games = db.game.findMany({
		include: {
			teams: { include: { team: { include: { players: true } } } },
			seasons: { orderBy: { createdAt: 'desc' } },
		},
		where: {
			countTeams: opt.maxTeams,
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: opt.limit,
		skip: opt.limit * (opt.page - 1),
	});

	return games;
};

const gameWithTeamsSchema = Prisma.validator<Prisma.GameArgs>()({
	include: { teams: { include: { team: { include: { players: true } } } } },
});

type GameWithTeams = Prisma.GameGetPayload<typeof gameWithTeamsSchema>;

export const concludeWinner = (game: GameWithTeams) => {
	return game.teams.reduce((acc, curr) => (curr.score > acc.score ? curr : acc), game.teams[0]);
};
