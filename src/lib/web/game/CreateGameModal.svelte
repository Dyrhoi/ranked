<script lang="ts">
	import { CreateGameForm } from '.';
	import { Modal } from '../modal';

	export let isOpen = true;
</script>

<Modal open={isOpen} on:close={() => (isOpen = false)}>
	<p slot="title">Create game</p>
	<p slot="description">Who won?</p>

	<CreateGameForm on:modal:close={() => (isOpen = false)}>
		<button on:click={() => (isOpen = false)}>Cancel</button>
		<button type="submit">Create</button>
	</CreateGameForm>
</Modal>

<button on:click={() => (isOpen = true)}>Create Game</button>
