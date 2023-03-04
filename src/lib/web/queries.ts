import type { Player } from '@prisma/client';
import { createQuery } from '@tanstack/svelte-query';
import { apiClient } from './api/axios';

export const queryPlayers = () =>
	createQuery<{ players: Player[] }, Error>({
		queryKey: ['players'],
		queryFn: async () => (await apiClient.get('/players')).data,
	});
