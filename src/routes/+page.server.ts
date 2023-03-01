import { db } from '../lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		players: (
			await db.player.findMany({
				include: {
					eloInstants: { orderBy: { createdAt: 'desc' } },
					_count: { select: { teams: true } },
				},
			})
		)
			.sort((a, b) => b.eloInstants[0].elo - a.eloInstants[0].elo)
			.map((player) => ({
				...player,
				gamesPlayed: player._count.teams,
			})),
	};
}) satisfies PageServerLoad;
