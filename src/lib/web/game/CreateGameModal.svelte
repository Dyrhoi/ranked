<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription,
	} from '@rgossiaux/svelte-headlessui';
	import { CreateGame } from '.';

	export let isOpen = false;
</script>

<Dialog open={isOpen} on:close={() => (isOpen = false)}>
	<DialogOverlay />

	<DialogTitle>Create game</DialogTitle>
	<DialogDescription>How'd it go?</DialogDescription>

	<CreateGame on:modal:close={() => (isOpen = false)}>
		<button type="submit">Create</button>
		<button on:click={() => (isOpen = false)}>Cancel</button>
	</CreateGame>
</Dialog>

<button on:click={() => (isOpen = true)}>Create Game</button>
