import { db } from '$lib/server/database';
import { getEloDifferenceFromGame } from '$lib/server/services/elo.service';
import { getGames } from '$lib/server/services/game.service';
import type { PageServerLoad } from './$types';

/**
 * Return the games with their respective teams and players.
 * The players are enriched with their elo difference from the game.
 *  */
export const load = (async () => {
	const gamesToFetch = await getGames();

	const games = await Promise.all(
		(
			await db.game.findMany({
				include: {
					teams: { include: { team: { include: { players: true } } } },
					eloInstants: true,
				},
				where: { id: { in: gamesToFetch.map((game) => game.id) } },
				orderBy: { createdAt: 'desc' },
			})
		)
			.map((game) => ({
				id: game.id,
				teams: game.teams.map((teamGame) => ({
					id: teamGame.team.id,
					players: teamGame.team.players,
					score: teamGame.score,
				})),
				createdAt: game.createdAt,
			}))
			.map(async (game) => ({
				...game,
				teams: await Promise.all(
					game.teams.map(async (team) => ({
						...team,
						players: await Promise.all(
							team.players.map(async (player) => ({
								...player,
								eloDifference: await getEloDifferenceFromGame(game.id, player.id),
							}))
						),
						winner: team.score >= Math.max(...game.teams.map((t) => t.score)),
					}))
				),
			}))
	);
	return { games };
}) satisfies PageServerLoad;
