<script lang="ts">
	import Badge from '../Badge.svelte';

	interface $$Props extends Partial<HTMLInputElement> {}

	export let value: string = '0';
	export let name: string = '';

	const increment = () => {
		value = String(Number(value) + 1);
	};

	const decrement = () => {
		value = String(Math.max(0, Number(value) - 1));
	};
</script>

<div class="flex justify-between gap-8 items-center">
	<div>
		<button type="button" tabindex="-1" on:click={decrement}
			><Badge class="rounded-full">-</Badge></button
		>
	</div>
	<input {value} {name} type="number" min="0" class="appearance-none text-center" />
	<div>
		<button type="button" tabindex="-1" on:click={increment}
			><Badge class="rounded-full">+</Badge></button
		>
	</div>
</div>

<style lang="scss">
	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button,
	input[type='number'] {
		-webkit-appearance: none;
		margin: 0;
		-moz-appearance: textfield !important;
	}
</style>
