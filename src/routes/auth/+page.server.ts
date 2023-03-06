import { AUTHENTICATION_TOKEN_COOKIE } from '$lib/server/auth/auth';
import { db } from '$lib/server/database';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	login: async (event) => {
		const { request, cookies } = event;
		const data = await request.formData();
		const _userId = data.get('user_id')?.toString();
		if (!_userId) return fail(400, { _userId, missing: true });

		const userId = parseInt(_userId);
		const user = await db.player.findUnique({ where: { id: userId } });

		if (!user) return fail(400, { _userId, unknown: true });

		cookies.set(AUTHENTICATION_TOKEN_COOKIE, userId.toString(), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 31, // 31 days
		});

		return { update: true, success: true };
	},
	reset: async (event) => {
		const { cookies } = event;
		cookies.set(AUTHENTICATION_TOKEN_COOKIE, '-1', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 1,
		});

		return { reset: true, success: true };
	},
};
