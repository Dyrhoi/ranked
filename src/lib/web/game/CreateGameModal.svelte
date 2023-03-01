<script lang="ts">
	import { PlusCircle, RectangleGroup } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CreateGameForm } from '.';
	import { Modal } from '../modal';

	export let isOpen = false;
</script>

<Modal open={isOpen} on:close={() => (isOpen = false)}>
	<p slot="title">Add game</p>
	<p slot="description">Who won?</p>

	<CreateGameForm on:close={() => (isOpen = false)}>
		<div class="seperator" />
		<div class="flex justify-end gap-8">
			<button type="button" class="btn btn-alt" on:click={() => (isOpen = false)}>Cancel</button>
			<button type="submit" class="btn btn-primary">Add Game</button>
		</div>
	</CreateGameForm>
</Modal>

<button class="btn" on:click={() => (isOpen = true)}>
	<Icon src={PlusCircle} size="1.2em" theme="solid" />Add Game
</button>
