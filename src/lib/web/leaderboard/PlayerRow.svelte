<script lang="ts">
	import { generateAvatar } from '$lib/shared/utils/avatar.util';
	import type { Player } from '@prisma/client';
	import classNames from 'classnames';
	import { getContext } from 'svelte';
	import { Position, Winrate } from '.';
	import type { PlayerInfo } from '../../../routes/+page.svelte';

	export let player: PlayerInfo;
	export let position: number;

	const user = getContext<SvelteStore<Player>>('user');
</script>

<div
	class={classNames('text-center flex items-center px-3 py-2 rounded-full odd:bg-gray-900/20', {
		'!bg-emerald-600/30 text-emerald-200 border border-emerald-400': $user?.id === player.id,
	})}
>
	<div class="flex items-center w-2/3">
		<div class="w-14">
			<Position {position} />
		</div>
		<div class="text-left">
			<div class="flex items-center gap-3">
				<div class="object-cover h-8 w-8 overflow-hidden rounded-full border-bg border-4">
					<img src={generateAvatar(player)} alt="" />
				</div>
				{player.name}
			</div>
		</div>
	</div>
	<div class="w-1/3">
		<div class={classNames('flex gap-2 items-center justify-center tabular-nums')}>
			{player.eloInstants[0].elo}
		</div>
	</div>
	<div class="w-1/3 tabular-nums hidden sm:flex flex-col gap-1">
		{#if $user?.id === player.id}
			<Winrate winrate={player.winrate} colors={{ bg: 'bg-emerald-700', fg: 'bg-emerald-300' }} />
		{:else}
			<Winrate winrate={player.winrate} />
		{/if}
	</div>
</div>
