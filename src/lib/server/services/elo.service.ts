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

export const getEloDifferenceFromGame = async (gameId: number, playerId: number) => {
	const eloIAfterGame = await db.elo.findFirst({
		where: { gameId: gameId, playerId: playerId },
	});

	if (!eloIAfterGame) return { difference: 0, before: 0, after: 0 };

	const eloIBeforeGame = await db.elo.findFirst({
		where: { playerId: playerId, createdAt: { lt: eloIAfterGame.createdAt } },
		orderBy: { createdAt: 'desc' },
	});

	const eloAfterGame = eloIAfterGame.elo;
	const eloBeforeGame = eloIBeforeGame ? eloIBeforeGame.elo : START_ELO;

	return {
		difference: eloAfterGame - eloBeforeGame,
		before: eloBeforeGame,
		after: eloAfterGame,
	};
};
