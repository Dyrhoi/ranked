<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Leaderboard</h1>
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Elo</th>
		</tr>
	</thead>
	<tbody>
		{#each data.players as player}
			<tr>
				<td>{player.name}</td>
				<td>{player.eloInstants[0].elo}</td>
			</tr>
		{/each}
	</tbody>
</table>
