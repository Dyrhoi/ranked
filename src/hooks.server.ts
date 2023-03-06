import { AUTHENTICATION_TOKEN_COOKIE } from '$lib/server/auth/auth';
import { db } from '$lib/server/database';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const localUserId = event.cookies.get(AUTHENTICATION_TOKEN_COOKIE);
	if (!localUserId) return await resolve(event);

	const user = await db.player.findUnique({ where: { id: parseInt(localUserId) } });
	if (!user) return await resolve(event);

	event.locals.user = user;
	return await resolve(event);
}) satisfies Handle;
