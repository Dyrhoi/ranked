<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Player } from '@prisma/client';
	import { Bolt, UserGroup } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createMutation } from '@tanstack/svelte-query';
	import { createEventDispatcher } from 'svelte';
	import { apiClient } from '../api/axios';
	import PlayerSearch from '../form/PlayerSearch.svelte';
	import ScoreInput from '../form/ScoreInput.svelte';

	import { queryPlayers } from '../queries';
	$: players = queryPlayers();

	let form: HTMLFormElement;
	const dispatch = createEventDispatcher();
	const createGame = createMutation(() => apiClient.post('games', new FormData(form)), {
		onSuccess: () => {
			dispatch('close');
			invalidateAll();
		},
		onError: (error) => {
			console.error(error);
		},
	});

	let teams = [
		[0, 0],
		[0, 0],
	];

	const addPlayer = (teamIndex: number) => {
		teams[teamIndex] = [...teams[teamIndex], 0];
	};

	const removePlayer = (teamIndex: number, playerId: number) => {
		teams[teamIndex] = teams[teamIndex].filter((_, index) => index !== playerId);
	};

	let availablePlayers: Player[] = [];
	$: availablePlayers =
		$players.data?.players.filter((player) => {
			return teams.flat().every((playerId) => playerId !== player.id);
		}) || [];
</script>

<div class="w-full">
	{#if $players.isLoading}
		<span>Loading players...</span>
	{:else if $players.isError}
		<span>An error has occurred: {$players.error.message}</span>
	{:else if $players.isSuccess}
		<form
			action="/games/create"
			method="POST"
			on:submit|preventDefault={() => $createGame.mutate()}
			bind:this={form}
			class="grid gap-12"
		>
			<div class="flex gap-12 flex-col lg:flex-row lg:gap-48">
				{#each teams as _, teamIndex}
					<div>
						<p class="font-semibold text-text-title mb-4">Team {teamIndex + 1}</p>
						<div
							class="pl-8 grid gap-6 relative before:w-0 before:border-r before:border-dashed before:border-primary-400/10 before:h-full before:left-[8px] before:absolute before:bg-white/5"
						>
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label>
								<p class="flex gap-4 items-center">
									<span
										class="-ml-9 w-6 h-6 bg-bg-modal-from rounded-full relative z-10 justify-center flex items-center"
										><Icon src={Bolt} theme="solid" size="1.2em" /></span
									> Score
								</p>
								<ScoreInput name="teams[{teamIndex}][score]" />
							</label>
							<label>
								<p class="flex gap-4 items-center">
									<span
										class="-ml-9 w-6 h-6 bg-bg-modal-from rounded-full relative z-10 justify-center flex items-center"
										><Icon src={UserGroup} theme="solid" size="1.2em" /></span
									> Players
								</p>
								<div class="grid gap-4">
									{#each teams[teamIndex] as _, playerIndex}
										<div class="flex items-center justify-between gap-4">
											<span
												class="-ml-9 w-6 h-6 bg-bg-modal-from rounded-full relative z-10 justify-center flex items-center text-xs"
												>{playerIndex + 1}</span
											>
											<div class="flex-1">
												<PlayerSearch
													name="teams[{teamIndex}][playerIds][{playerIndex}]"
													players={availablePlayers}
													on:select={(e) => {
														teams[teamIndex][playerIndex] = e.detail.id;
													}}
												/>
											</div>
										</div>
									{/each}
									<div class="flex justify-end">
										<button type="button" tabindex="-1" on:click={() => addPlayer(teamIndex)}
											>Add Player</button
										>
									</div>
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
