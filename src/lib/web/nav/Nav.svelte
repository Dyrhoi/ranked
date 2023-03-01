<script lang="ts">
	import { RectangleStack, Trophy, User } from '@steeze-ui/heroicons';
	import { CreateGameModal } from '../game';
	import NavItem from './NavItem.svelte';

	export let spacer = true;
</script>

<nav class="relative z-50">
	<div class="h-16 fixed w-full text-text-title">
		<div
			class="max-w-[1200px] mx-auto flex items-center h-full backdrop-blur-sm filter bg-bg/30 justify-between"
		>
			<div class="flex gap-4 items-center">
				<a href="/"><span class="text-lg font-bold">Ranked</span></a>
				<span class="select-none">|</span>
				<ul class="flex items-center gap-6">
					<li>
						<NavItem href="/" iconSource={Trophy}>Leaderboard</NavItem>
					</li>
					<li>
						<NavItem href="/games" iconSource={RectangleStack}>Games</NavItem>
					</li>
				</ul>
			</div>
			<div class="flex gap-4 items-center">
				<CreateGameModal />
				<span class="select-none">|</span>
				<ul>
					<li>
						<NavItem iconSource={User}>Me</NavItem>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<!-- Spacer -->
	{#if spacer}
		<div class="h-24" />
	{/if}
</nav>
