import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { createGame } from '../src/lib/server/services/game.service';
const prisma = new PrismaClient();

async function main() {
	const createPlayers = Array.from({ length: 15 }).map(() => {
		return prisma.player.create({
			data: {
				name: faker.internet.userName(),
				eloInstants: {
					create: {
						elo: 1200,
					},
				},
			},
		});
	});

	const season = await prisma.season.create({
		data: {
			name: 'Seed Season',
		},
	});

	const players = await Promise.all(createPlayers);
	const createGames = Array.from({ length: 30 }).map(async () => {
		const _tempPlayers = [...players];
		const teams = Array.from({ length: 2 }).map(() => {
			const playerIds = Array.from({ length: 2 }).map(() => {
				const playerId = faker.helpers.arrayElement(_tempPlayers).id;
				_tempPlayers.splice(
					_tempPlayers.findIndex((p) => p.id === playerId),
					1
				);
				return playerId;
			});

			return {
				score: faker.datatype.number({ min: 0, max: 10 }),
				playerIds,
			};
		});

		return await createGame({ teams, seasonId: season.id });
	});
	const games = await Promise.all(createGames);

	console.log(`Seeded databse with ${players.length} players and ${games.length} games.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
