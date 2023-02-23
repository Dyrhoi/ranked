<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		Combobox,
		ComboboxInput,
		ComboboxOption,
		ComboboxOptions,
		Transition,
	} from 'svelte-headlessui-combobox-temporary';
	import type { Player } from '@prisma/client';
	import type { SupportedAs } from 'svelte-headlessui-combobox-temporary/internal/elements';
	import type { ComboboxProps } from 'svelte-headlessui-combobox-temporary/components/combobox/Combobox.svelte';
	import classNames from 'classnames';
	const dispatch = createEventDispatcher();

	interface $$Props extends ComboboxProps<SupportedAs> {
		name: string;
		players: Player[];
	}
	export let name: string = '';

	let query = '';
	$: filteredPlayers = [
		...players.filter((player) => player.name.toLowerCase().includes(query.toLowerCase())),
		// Do not remove actively selected player from list
		myValue ? { ...myValue } : null,
	];

	let myValue: Partial<Player>;
	export let players: Player[] = [];
</script>

<div>
	<input hidden {name} value={myValue?.id || ''} />
	<Combobox
		value={myValue}
		on:change={(e) => {
			myValue = e.detail;
			dispatch('select', e.detail);
		}}
		class="relative"
	>
		<ComboboxInput
			on:change={(e) => {
				query = e.detail;
			}}
			displayValue={(player) => player?.name}
		/>
		<Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
			<ComboboxOptions
				class={classNames(
					'from-bg-modal-from/95 to-bg-modal-to/95 backdrop-blur-sm bg-gradient-to-b rounded absolute overflow-hidden z-10 w-[110%] ml-[-5%] top-[130%] border-white/5',
					{ border: filteredPlayers.length }
				)}
			>
				{#each filteredPlayers as player}
					{#if player}
						<ComboboxOption
							let:active
							value={player}
							class={({ active }) =>
								classNames(
									{ ' text-text': !active },
									{ 'bg-white/5 text-text-title': active },
									'px-4 py-2'
								)}
						>
							{player?.name}
						</ComboboxOption>
					{/if}
				{/each}
			</ComboboxOptions>
		</Transition>
	</Combobox>
</div>
