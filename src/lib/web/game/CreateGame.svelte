<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { createQuery, createMutation } from '@tanstack/svelte-query';
	import { apiClient } from '../api/axios';
	import type { Player } from '@prisma/client';
	import { invalidateAll } from '$app/navigation';

	const queryPlayers = createQuery<{ players: Player[] }, Error>({
		queryKey: ['players'],
		queryFn: async () => (await apiClient.get('/players')).data,
	});

	let form: HTMLFormElement;
	const dispatch = createEventDispatcher();
	const createGame = createMutation(() => apiClient.post('games', new FormData(form)), {
		onSuccess: () => {
			dispatch('modal:close');
			invalidateAll();
		},
	});
</script>

{#if $queryPlayers.isLoading}
	<span>Loading players...</span>
{:else if $queryPlayers.isError}
	<span>An error has occurred: {$queryPlayers.error.message}</span>
{:else if $queryPlayers.isSuccess}
	<form
		action="/games/create"
		method="POST"
		on:submit|preventDefault={() => $createGame.mutate()}
		bind:this={form}
	>
		<div>
			<label>Team 1</label>
			<select name="team[0][playerId][]">
				{#each $queryPlayers.data.players as player}
					<option value={player.id}>{player.name}</option>
				{/each}
			</select>
			<select name="team[0][playerId][]">
				{#each $queryPlayers.data.players as player}
					<option value={player.id}>{player.name}</option>
				{/each}
			</select>
			<input name="team[0][score]" type="number" />
		</div>

		<div>
			<label>Team 2</label>
			<select name="team[1][playerId][]">
				{#each $queryPlayers.data.players as player}
					<option value={player.id}>{player.name}</option>
				{/each}
			</select>
			<select name="team[1][playerId][]">
				{#each $queryPlayers.data.players as player}
					<option value={player.id}>{player.name}</option>
				{/each}
			</select>
			<input name="team[1][score]" type="number" />
		</div>
		<slot />
	</form>
{/if}
