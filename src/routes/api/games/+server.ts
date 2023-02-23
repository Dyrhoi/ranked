import type { RequestHandler } from './$types';
import { CreateGameSchema } from '$lib/shared/validation/zod';
import { createGame } from '$lib/server/services/game.service';
import { error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const gameParse = await CreateGameSchema.safeParseAsync(formData);
	if (gameParse.success) {
		createGame(gameParse.data);
		return new Response();
	} else {
		throw error(400, gameParse.error.message);
	}
};
