<script lang="ts" context="module">
	export type GameInfo = PageData['games'][number];
</script>

<script lang="ts">
	import GameRow from '$lib/web/game/display/GameRow.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container max-w-[720px]">
	<div class="grid gap-4">
		{#each data.games as game}
			<GameRow {game} />
		{/each}
	</div>
</div>
