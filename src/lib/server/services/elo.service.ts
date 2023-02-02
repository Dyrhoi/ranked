import { START_ELO } from '$lib/shared/constants';
import type { Elo } from '@prisma/client';
import { db } from '../database';

export const getCurrentEloFromPlayerId = async (playerId: number) => {
	const elo = await db.elo.findFirst({
		where: {
			playerId: playerId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	if (!elo) return START_ELO;

	return elo.elo;
};

export const getCurrentEloFromInstants = (eloInstants: Elo[]) => {
	return (
		eloInstants.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0].elo || START_ELO
	);
};
