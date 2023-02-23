<script lang="ts">
	import { CreateGameForm } from '.';
	import { Modal } from '../modal';

	export let isOpen = true;
</script>

<Modal open={isOpen} on:close={() => (isOpen = false)}>
	<p slot="title">Create game</p>
	<p slot="description">Who won?</p>

	<CreateGameForm on:close={() => (isOpen = false)}>
		<div class="seperator" />
		<div class="flex justify-end gap-8">
			<button type="button" class="btn btn-alt" on:click={() => (isOpen = false)}>Cancel</button>
			<button type="submit" class="btn btn-primary">Create Game</button>
		</div>
	</CreateGameForm>
</Modal>

<button on:click={() => (isOpen = true)}>Create Game</button>
