<script lang="ts">
	import { generateAvatar } from '$lib/shared/utils/avatar.util';
	import { PlayerRow, Position, Winrate } from '.';
	import type { PlayerInfo } from '../../../routes/+page.svelte';
	import Card from '../card/Card.svelte';
	import Label from '../Label.svelte';
	export let player: PlayerInfo;
	export let position: number;

	let windowWidth: number;
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if windowWidth < 640}
	<Card class="p-2 px-6">
		<PlayerRow {player} {position} />
	</Card>
{:else}
	<Card
		class="p-4 flex-1 from-slate-700/10 to-slate-700/5 border-orange-100/10 border"
		border={'inline'}
	>
		<div class="grid gap-2 items-center">
			<div class="flex items-center gap-2">
				<Position {position} />
				<div
					class="object-contain overflow-hidden rounded-full border-4 border-gray-400/5 h-12 w-12"
				>
					<img src={generateAvatar(player)} alt="" />
				</div>
				<div>
					<div class="text-text-title">{player.name}</div>
				</div>
			</div>
			<div class="grid gap-2">
				<div>
					<Label>
						<div class="text-sm mx-auto">{player.eloInstants[0].elo}</div>
					</Label>
				</div>
				<div>
					<Label class="py-2 px-10">
						<Winrate
							winrate={player.winrate}
							colors={{ bg: 'bg-white/5', fg: 'bg-slate-300/30' }}
						/>
					</Label>
				</div>
			</div>
		</div>
	</Card>
{/if}
