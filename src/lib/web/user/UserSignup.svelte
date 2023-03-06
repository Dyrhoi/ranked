<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { generateAvatar } from '$lib/shared/utils/avatar.util';
	import type { Player } from '@prisma/client';
	import { User } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getContext } from 'svelte';
	import type { ActionData } from '../../../routes/$types';
	import PlayerSearch from '../form/PlayerSearch.svelte';
	import { Modal } from '../modal';
	import { queryPlayers } from '../queries';

	export let isOpen = false;

	const user = getContext<SvelteStore<Player>>('user');
	$: signedIn = !!user;
	$: players = queryPlayers();

	const updateUser = () => {
		invalidateAll();
		isOpen = false;
	};
	$: $page.form?.success && updateUser();
</script>

<Modal open={isOpen} on:close={() => (isOpen = false)}>
	<p slot="title">Setup user</p>
	<p slot="description">Personalize your experience by defining who you are.</p>
	<div class="grid gap-4">
		{#if signedIn}
			<p class="text-text-title">Seems like you're already setup.</p>
			<div class="flex gap-4 items-center">
				<img src={generateAvatar($user)} class="h-8 w-8 rounded-full" alt="Avatar" />
				{$user.name}
			</div>
			<p>Change your user by selecting a different one.</p>
			<div class="seperator" />
		{/if}
		<form
			class="grid gap-8"
			action="/auth?/login"
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') {
						await applyAction(result);
					}
				};
			}}
		>
			<PlayerSearch players={$players.data?.players || []} name="user_id" />
			<div class="seperator" />
			<div class="flex justify-end gap-8">
				<button type="button" class="btn btn-alt" on:click={() => (isOpen = false)}>Cancel</button>
				<button type="submit" class="btn btn-primary">Save</button>
			</div>
		</form>
	</div>
</Modal>

{#if signedIn}
	<button class="btn btn-alt" on:click={() => (isOpen = true)}>
		<img src={generateAvatar($user)} class="h-8 w-8 rounded-full" alt="Avatar" />
		{$user.name}
	</button>
{:else}
	<button class="btn btn-alt" on:click={() => (isOpen = true)}>
		<Icon src={User} size="1.2em" theme="solid" />Me
	</button>
{/if}
