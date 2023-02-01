import { db } from '../lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		players: await db.player.findMany({
			include: { eloInstants: { orderBy: { createdAt: 'desc' } } },
		}),
	};
}) satisfies PageServerLoad;
