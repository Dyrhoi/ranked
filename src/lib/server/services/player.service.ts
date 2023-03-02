import type { Player } from '@prisma/client';
import { db } from '../database';
import { concludeWinner } from './game.service';

export const getWinrate = async (player: Player) => {
	// 🤷 Eh...
	const games = await db.game.findMany({
		include: {
			teams: {
				include: {
					team: {
						include: {
							players: true,
						},
					},
				},
			},
		},
		where: {
			teams: {
				some: {
					team: {
						players: {
							some: {
								id: player.id,
							},
						},
					},
				},
			},
		},
	});

	const winningTeamsOfGames = games.map(concludeWinner);

	const total = games.length;
	const wins = winningTeamsOfGames.filter((team) =>
		team.team.players.some((p) => p.id === player.id)
	).length;
	const loses = total - wins;

	return {
		total,
		wins,
		loses,
	};
};
