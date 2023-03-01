<script lang="ts">
	import { generateAvatar } from '$lib/shared/utils/avatar.util';
	import Card from '$lib/web/card/Card.svelte';
	import Position from '$lib/web/leaderboard/Position.svelte';
	import classNames from 'classnames';
	import type { PageData } from './$types';

	export let data: PageData;
	const { players } = data;

	const acknowledgedPositions: Record<number, { bg: string; border?: string }> = {
		1: { bg: 'bg-yellow-700/20', border: 'border-yellow-700 border' },
		2: { bg: 'bg-yellow-600/10', border: 'border-yellow-700/30 border' },
		3: { bg: 'bg-yellow-600/5', border: 'border-yellow-700/20 border' },
	};
</script>

<div class="container min-w-[525px]">
	<Card class="p-8">
		<div class="grid gap-4">
			<div class="flex items-center text-center uppercase text-xs font-bold">
				<div class="text-left w-2/3">Player</div>
				<div class="w-1/3">Elo</div>
				<div class="w-1/3 hidden sm:block">Games</div>
			</div>
			<div class="grid gap-4">
				{#each players as player, i}
					{@const position = i + 1}
					<div
						class={classNames(
							'text-center flex items-center px-3 py-2  rounded-full',
							{
								'text-yellow-400 font-bold': position >= 1 && position <= 3,
							},
							{
								'odd:bg-gray-900/10': position > 3,
							},
							acknowledgedPositions[position]?.bg,
							acknowledgedPositions[position]?.border
						)}
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
							<div
								class={classNames('flex gap-2 items-center justify-center tabular-nums', {
									'text-text-title': position > 3,
								})}
							>
								{player.eloInstants[0].elo}
							</div>
						</div>
						<div class="w-1/3 tabular-nums hidden sm:block">{player.gamesPlayed}</div>
					</div>
				{/each}
			</div>
		</div>
	</Card>
</div>
