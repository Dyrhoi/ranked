<script lang="ts" context="module">
	export type PlayerInfo = PageData['players'][number];
</script>

<script lang="ts">
	import Card from '$lib/web/card/Card.svelte';
	import FirstPlace from '$lib/web/leaderboard/FirstPlace.svelte';
	import PlayerRow from '$lib/web/leaderboard/PlayerRow.svelte';
	import TopFive from '$lib/web/leaderboard/Top.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { players } = data;

	const topAmount = 3;
	const firstPlace = players[0];
	const top = players.slice(1, topAmount);
	const rest = players.slice(topAmount);
</script>

<div class="container min-w-[525px]">
	<div class="grid gap-4">
		<Card
			class="from-orange-700/10 to-orange-700/5 border-orange-400/30 border p-8"
			border={'inline'}
		>
			<FirstPlace {firstPlace} />
		</Card>
		<div class="flex gap-4 justify-between">
			{#each top as player, i}
				{@const position = i + topAmount - 1}
				<Card
					class="p-4 flex-1 from-slate-700/10 to-slate-700/5 border-orange-100/10 border"
					border={'inline'}
				>
					<TopFive {player} {position} />
				</Card>
			{/each}
		</div>
		<Card class="p-8">
			<div class="grid gap-4">
				<div class="flex items-center text-center uppercase text-xs font-bold">
					<div class="text-left w-2/3">Player</div>
					<div class="w-1/3">Elo</div>
					<div class="w-1/3 hidden sm:block">Games</div>
				</div>
				<div class="grid gap-4">
					{#each rest as player, i}
						{@const position = i + topAmount + 1}
						<PlayerRow {position} {player} />
					{/each}
				</div>
			</div>
		</Card>
	</div>
</div>
