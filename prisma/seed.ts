import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
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

	const players = await Promise.all(createPlayers);
	const createGames = Array.from({ length: 30 }).map(() => {
		return prisma.game.create({
			data: {
				teams: {
					create: [
						{
							score: faker.datatype.number(2),
							team: {
								create: {
									players: {
										connect: [
											{
												id: players[Math.floor(Math.random()) * players.length].id,
											},
											{
												id: players[Math.floor(Math.random()) * players.length].id,
											},
										],
									},
								},
							},
						},
						{
							score: faker.datatype.number(2),
							team: {
								create: {
									players: {
										connect: [
											{
												id: players[Math.floor(Math.random()) * players.length].id,
											},
											{
												id: players[Math.floor(Math.random()) * players.length].id,
											},
										],
									},
								},
							},
						},
					],
				},
			},
		});
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
