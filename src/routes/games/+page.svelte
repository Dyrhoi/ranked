<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<table>
	<tbody>
		{#each data.games as game}
			<tr>
				<td>{game.id}</td>
				<td>
					<div class="flex gap-4">
						{#each game.teams as team}
							<div>
								{#each team.players as player}
									<div class="bg-gray-300">
										{player.name}
										{player.eloDifference}
									</div>
								{/each}
							</div>
						{/each}
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
