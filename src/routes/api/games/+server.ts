import type { RequestHandler } from './$types';
import { CreateGameSchema } from '$lib/shared/validation/zod';
import { createGame } from '$lib/server/services/game.service';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const gameParse = await CreateGameSchema.safeParseAsync(formData);
	if (gameParse.success) {
		createGame(gameParse.data);
	} else {
		console.log(gameParse.error.errors);
	}

	return new Response();
};
