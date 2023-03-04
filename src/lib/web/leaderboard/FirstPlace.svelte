<script lang="ts">
	import { generateAvatar } from '$lib/shared/utils/avatar.util';
	import { Winrate } from '.';
	import type { PlayerInfo } from '../../../routes/+page.svelte';
	import Label from '../Label.svelte';
	export let firstPlace: PlayerInfo;
</script>

<div class="flex gap-4 items-center text-orange-300">
	<div class="rounded p-1 bg-orange-400/5 object-contain h-16 w-16">
		<img src="/assets/images/leaderboard/t1.gif" alt="1" />
	</div>
	<div class="object-contain overflow-hidden rounded-full border-8 border-orange-400/5 h-24 w-24">
		<img src={generateAvatar(firstPlace)} alt="" />
	</div>
	<div class="grid gap-2">
		<div>
			<div class="text-2xl font-bold">{firstPlace.name}</div>
		</div>
		<div>
			<Label class="bg-orange-300/5 flex gap-8 py-2">
				<div class="text-sm ">{firstPlace.eloInstants[0].elo}</div>
				<div class="flex-1">
					<Winrate
						winrate={firstPlace.winrate}
						colors={{ bg: 'bg-orange-400/10', fg: 'bg-orange-400' }}
					/>
				</div>
			</Label>
		</div>
	</div>
</div>
