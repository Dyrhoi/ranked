import { getWinrate } from '$lib/server/services/player.service';
import { db } from '../lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const players = await Promise.all(
		(
			await db.player.findMany({
				include: {
					eloInstants: { include: { game: true }, orderBy: { createdAt: 'desc' } },
					_count: { select: { teams: true } },
				},
			})
		)
			.sort((a, b) => b.eloInstants[0].elo - a.eloInstants[0].elo)
			.map(async (player) => ({
				...player,
				gamesPlayed: player._count.teams,
				winrate: await getWinrate(player),
			}))
	);

	return {
		players,
	};
}) satisfies PageServerLoad;
