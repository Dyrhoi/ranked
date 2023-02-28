/**
 * Extending the default behavior of prisma CRUD
 *
 */

import { getNewRating } from '$lib/shared/utils/elo.utils';
import type { CreateGameSchema } from '$lib/shared/validation/zod';
import dayjs from 'dayjs';
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

export const createGame = async ({ teams }: CreateGameSchema) => {
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

	const updatedElo = simulateMatches(teamsSimplified);

	const game = await db.game.create({
		data: {
			teams: {
				create: updatedElo.map((team) => ({
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
				create: updatedElo.flatMap((team) =>
					team.players.map((player) => ({
						player: { connect: { id: player.id } },
						elo: player.elo,
					}))
				),
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
	const season = (
		await db.season.findMany({
			where: { id: opt.seasonId },
		})
	)[0] || { startDate: null, endDate: null };

	const { startDate, endDate } = season;

	let games: unknown = [];

	if (startDate && endDate) {
		games = db.$queryRaw<{ id: number }[]>`
		SELECT "Game".id FROM "Game" 
		JOIN "TeamOnGame" ON "Game".id = "TeamOnGame".game_id 
		WHERE "Game".created_at BETWEEN ${startDate} AND ${endDate}
		GROUP BY "Game".id HAVING COUNT("TeamOnGame".id) = ${opt.maxTeams}
		LIMIT ${opt.limit} OFFSET ${opt.limit * (opt.page - 1)}
		`;
	} else {
		games = db.$queryRaw<{ id: number }[]>`
		SELECT "Game".id FROM "Game" 
		JOIN "TeamOnGame" ON "Game".id = "TeamOnGame".game_id 
		GROUP BY "Game".id HAVING COUNT("TeamOnGame".id) = ${opt.maxTeams}
		LIMIT ${opt.limit} OFFSET ${opt.limit * (opt.page - 1)}
		`;
	}

	return (await games) as { id: number }[];
};
