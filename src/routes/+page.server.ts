import { db } from '../lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		players: (
			await db.player.findMany({
				include: { eloInstants: { orderBy: { createdAt: 'desc' } } },
			})
		).sort((a, b) => b.eloInstants[0].elo - a.eloInstants[0].elo),
	};
}) satisfies PageServerLoad;
