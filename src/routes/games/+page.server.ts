import { db } from '$lib/server/database';
import { getEloDifferenceFromGame } from '$lib/server/services/elo.service';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const games = await Promise.all(
		(
			await db.game.findMany({
				include: {
					teams: { include: { team: { include: { players: true } } } },
					eloInstants: true,
				},
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
					}))
				),
			}))
	);

	return { games };
}) satisfies PageServerLoad;
