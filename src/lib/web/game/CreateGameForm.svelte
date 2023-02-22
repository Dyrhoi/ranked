<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { createQuery, createMutation } from '@tanstack/svelte-query';
	import { apiClient } from '../api/axios';
	import type { Player } from '@prisma/client';
	import { invalidateAll } from '$app/navigation';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Bolt, UserGroup } from '@steeze-ui/heroicons';

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

	let teams = [
		[0, 0],
		[0, 0],
	];

	const addPlayer = (teamIndex: number) => {
		teams[teamIndex] = [...teams[teamIndex], 0];
	};

	const removePlayer = (teamIndex: number, playerIndex: number) => {
		teams[teamIndex] = teams[teamIndex].filter((_, index) => index !== playerIndex);
	};
</script>

<div class="container w-full">
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
			<div class="grid gap-12">
				{#each teams as _, teamIndex}
					<div>
						<p class="font-semibold text-text-title mb-4">Team {teamIndex + 1}</p>
						<div
							class="pl-8 grid gap-4 relative before:w-0 before:border-r before:border-dashed before:border-primary-400/10 before:h-full before:left-[8px] before:absolute before:bg-white/5"
						>
							<label>
								<p class="flex gap-4">
									<span class="-ml-8"><Icon src={Bolt} theme="solid" size="1.2em" /></span> Score
								</p>
								<input name="teams[{teamIndex}][score]" type="number" value="0" />
							</label>
							<label>
								<p class="flex gap-4">
									<span class="-ml-8"><Icon src={UserGroup} theme="solid" size="1.2em" /></span> Players
								</p>
								<div>
									{#each teams[teamIndex] as _, playerIndex}
										<select name="teams[{teamIndex}][playerIds][{playerIndex}]">
											{#each $queryPlayers.data.players as player}
												<option value={player.id}>{player.name}</option>
											{/each}
										</select>
									{/each}
									<button type="button" on:click={() => addPlayer(teamIndex)}>Add Player</button>
								</div>
							</label>
						</div>
					</div>
				{/each}
			</div>
			<slot />
		</form>
	{/if}
</div>
