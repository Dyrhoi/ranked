<!--
    This game row expects only 2 teams.
    Component might come off as a little confusing, but that's is because
    we're dealing with any amount of teams.
    Also we're trying to make it look nice :)
-->
<script lang="ts">
	import Card from '$lib/web/card/Card.svelte';
	import classnames from 'classnames';
	import type { GameInfo } from '../../../../routes/games/+page.svelte';
	import { recentTime } from '$lib/shared/utils/date.util';
	import Label from '$lib/web/Label.svelte';

	import { Icon } from '@steeze-ui/svelte-icon';
	import { Calendar, ChevronRight } from '@steeze-ui/heroicons';

	export let game: GameInfo;
</script>

<div>
	<Card
		class={classnames('p-6 grid gap-3 from-primary-400/5', {
			'bg-gradient-to-r': game.teams[0].winner,
			'bg-gradient-to-l': game.teams[1].winner,
		})}
		clickAble={true}
	>
		<div class="flex justify-between items-center gap-8">
			{#each game.teams as team, i}
				<div class="last-of-type:text-right group w-1/2 flex justify-between items-center">
					<div class="grid gap-2">
						{#each team.players as player}
							<!-- Player listening -->
							<div
								class={classnames('flex group-last-of-type:justify-end gap-2', {
									'text-primary-400 font-semibold': team.winner,
								})}
							>
								<div>{player.name}</div>
								<div
									class={classnames(
										'group-first-of-type:order-first w-10 bg-white/10 justify-center flex rounded text-sm items-center',
										{
											'text-red-400 bg-red-400/10': player.eloDifference.difference < 0,
											'text-primary-400 bg-primary-400/10': player.eloDifference.difference > 0,
										}
									)}
								>
									{player.eloDifference.difference}
								</div>
							</div>
						{/each}
					</div>
					<!-- Team Score -->
					<div
						class={classnames(
							'text-sm w-8 h-8 rounded items-center flex justify-center font-bold',
							{
								'order-first': team === game.teams[1],
							},
							{ 'text-primary-400 bg-primary-400/10': team.winner },
							{ 'text-text-tile bg-white/5': !team.winner }
						)}
					>
						{team.score}
					</div>
				</div>
				<!-- VS Indicator -->
				{#if i + 1 < game.teams.length}
					<div class="text-xl group-last-of-type:hidden text-text-title font-bold">VS</div>
				{/if}
			{/each}
		</div>
		<div class="seperator" />
		<div class="flex justify-between text-sm items-center">
			<div class="flex">
				<Label>
					<Icon size="1.2em" theme="solid" src={Calendar} />
					{recentTime(game.createdAt)}
				</Label>
			</div>
			<!-- TODO: No more data to show right now. -->
			<div class="hidden">
				<div class="flex items-center">
					<p>Expand</p>
					<Icon size="1.2em" src={ChevronRight} />
				</div>
			</div>
		</div>
	</Card>
</div>
