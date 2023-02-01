import type { RequestHandler } from './$types';
import qs from 'qs';
import { db } from '$lib/server/database';

interface CreateGame {
	team: Array<{
		playerId: Array<string>;
		score: string;
	}>;
}

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();

	//@ts-expect-error https://github.com/microsoft/TypeScript/issues/30584
	const game: CreateGame = qs.parse(new URLSearchParams(data).toString());

	await db.game.create({
		data: {
			teams: {
				create: game.team.map((team) => ({
					team: {
						create: {
							players: {
								connect: team.playerId.map((id) => ({ id: Number(id) })),
							},
						},
					},
					score: Number(team.score),
				})),
			},
			eloInstants: {
				create: game.team.flatMap((t) =>
					t.playerId.map((id) => ({
						player: { connect: { id: Number(id) } },
						elo: 1300,
					}))
				),
			},
		},
	});
	return new Response();
};
