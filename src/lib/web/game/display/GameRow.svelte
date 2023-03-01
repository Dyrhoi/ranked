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
	import { Calendar, ChevronRight, Swatch } from '@steeze-ui/heroicons';

	export let game: GameInfo;
</script>

<div>
	<Card
		class={classnames('p-10 grid gap-3 from-primary-400/5', {
			'bg-gradient-to-r': game.teams[0].winner,
			'bg-gradient-to-l': game.teams[1].winner,
		})}
		clickAble={true}
	>
		<div class="flex flex-col sm:flex-row justify-between items-center gap-8">
			{#each game.teams as team, i}
				<div
					class="sm:last-of-type:text-right sm:last-of-type:justify-end group sm:w-1/2 flex sm:flex-row flex-col gap-8 sm:gap-2 justify-between items-center"
				>
					<div class="flex gap-8 flex-wrap justify-center sm:flex-nowrap sm:flex-col sm:gap-2">
						{#each team.players as player}
							<!-- Player listening -->
							<div
								class={classnames('flex sm:group-last-of-type:justify-end gap-2', {
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
				</div>
				<!-- Team scores -->
				<!-- Kinda messy but we need it for proper layout -->
				<!-- We are basically showing [VS + TEAM] if there is one more team in the loop. -->
				{#if game.teams.length > i + 1}
					{@const opponent = game.teams[i + 1]}
					<div class="flex gap-4">
						<!-- Team X Score -->
						<div
							class={classnames(
								'text-sm w-8 h-8 rounded items-center flex justify-center font-bold',
								{ 'text-primary-400 bg-primary-400/10': team.winner },
								{ 'text-text-tile bg-white/5': !team.winner }
							)}
						>
							{team.score}
						</div>
						<!-- VS Indicator -->
						<div class="text-xl text-text-title font-bold">VS</div>
						<!-- Team Opponent Score -->
						<div
							class={classnames(
								'text-sm w-8 h-8 rounded items-center flex justify-center font-bold',
								{ 'text-primary-400 bg-primary-400/10': opponent.winner },
								{ 'text-text-tile bg-white/5': !opponent.winner }
							)}
						>
							{opponent.score}
						</div>
					</div>
				{/if}
			{/each}
		</div>
		<div class="seperator" />
		<div class="flex justify-center sm:justify-between text-sm items-center">
			<div class="flex gap-4">
				<Label>
					<Icon size="1.2em" theme="solid" src={Calendar} />
					{recentTime(game.createdAt)}
				</Label>
				{#if game.seasons.length > 0}
					<Label>
						<Icon size="1.2em" theme="solid" src={Swatch} />
						{game.seasons[0].name}
					</Label>
				{/if}
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
