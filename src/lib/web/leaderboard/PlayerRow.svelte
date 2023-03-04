<script lang="ts">
	import { generateAvatar } from '$lib/shared/utils/avatar.util';
	import classNames from 'classnames';
	import { Position, Winrate } from '.';
	import type { PlayerInfo } from '../../../routes/+page.svelte';

	export let player: PlayerInfo;
	export let position: number;
</script>

<div class={classNames('text-center flex items-center px-3 py-2  rounded-full odd:bg-gray-900/20')}>
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
		<Winrate winrate={player.winrate} />
	</div>
</div>
