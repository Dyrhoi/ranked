<script lang="ts">
	export let winrate: { wins: number; loses: number; total: number };
	export let colors: { bg: string; fg: string } = { bg: 'bg-gray-900/40', fg: 'bg-gray-600' };

	const winratePercent = (winrate.wins / winrate.total) * 100;
</script>

<div class="grid gap-1 flex-1">
	<div class="flex gap-2 text-xs justify-center">
		<span>{winrate.wins}W</span> <span>{winrate.loses}L</span>
	</div>
	<div class="w-full h-1 {colors.bg} relative overflow-hidden rounded-full">
		<span class="block h-full {colors.fg}" style="width: {winratePercent}%" />
	</div>
</div>
