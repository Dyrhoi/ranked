<script lang="ts">
	import { User } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import PlayerSearch from '../form/PlayerSearch.svelte';
	import { Modal } from '../modal';
	import user from './user.store';

	export let isOpen = false;
	$: isSignedIn = !!$user;

	import { queryPlayers } from '../queries';

	$: players = queryPlayers();

	let userPicked: number | undefined;

	const onSignup = () => {
		user.set('' + userPicked);
	};
</script>

<Modal open={isOpen} on:close={() => (isOpen = false)}>
	<p slot="title">Setup user</p>
	<p slot="description">Personalize your experience by defining who you are.</p>
	<form class="grid gap-8" on:submit|preventDefault={onSignup}>
		<PlayerSearch
			players={$players.data?.players || []}
			name="user"
			on:select={(e) => (userPicked = e.detail.id)}
		/>
		<div class="seperator" />
		<div class="flex justify-end gap-8">
			<button type="button" class="btn btn-alt" on:click={() => (isOpen = false)}>Cancel</button>
			<button type="submit" class="btn btn-primary">Save</button>
		</div>
	</form>
</Modal>

{#if isSignedIn}
	<button class="btn btn-alt" on:click={() => (isOpen = true)}>
		<Icon src={User} size="1.2em" theme="solid" />Signed in
	</button>
{:else}
	<button class="btn btn-alt" on:click={() => (isOpen = true)}>
		<Icon src={User} size="1.2em" theme="solid" />Me
	</button>
{/if}
