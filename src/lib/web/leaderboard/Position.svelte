<script lang="ts">
	const acknowledgedPositions = [1, 2, 3];
	export let position: number;
</script>

{#if acknowledgedPositions.includes(position)}
	<div class="">
		<div class="w-8 h-8 rounded-full flex items-center justify-center text-white">
			<img src="/assets/images/leaderboard/t{position}.gif" alt="{position} " />
		</div>
	</div>
{:else}
	<div class="">
		<div class="w-8 h-8 rounded-full text-sm bg-gray-900/20 flex items-center justify-center ">
			{position}
		</div>
	</div>
{/if}
