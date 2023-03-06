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
	import Fuse from 'fuse.js';
	const dispatch = createEventDispatcher();

	interface $$Props extends ComboboxProps<SupportedAs> {
		name: string;
		players: Player[];
	}
	export let name: string = '';
	let myValue: Partial<Player>;
	export let players: Player[] = [];

	const fuse = new Fuse(players, {
		keys: ['name'],
		threshold: 0.3,
	});

	let query = '';
	$: filteredPlayers = [
		...fuse.search(query).map((result) => result.item),
		// Do not remove actively selected player from list
		// myValue ? { ...myValue } : null,
	];
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
			placeholder="Search for a player..."
		/>
		<Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
			<ComboboxOptions
				class={classNames(
					'from-bg-modal-from/95 to-bg-modal-to/95 max-h-36 overflow-y-scroll backdrop-blur-sm bg-gradient-to-b rounded absolute overflow-hidden z-10 w-[110%] ml-[-5%] top-[130%] border-white/5',
					{ border: filteredPlayers.length },
					'scrollbar-thumb-gray-600 scrollbar-track-gray-900 scrollbar-thin'
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
