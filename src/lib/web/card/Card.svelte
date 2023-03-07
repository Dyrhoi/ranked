<script lang="ts">
	import classnames from 'classnames';
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	let clazz: string = '';
	export { clazz as class };

	export let border: 'inline' | 'external' = 'external';

	export let clickAble = false;

	let card: HTMLElement;
	onMount(() => {
		card.onmousemove = (e) => {
			const { left, top, width, height } = card.getBoundingClientRect();
			const x = e.clientX - left;
			const y = e.clientY - top;

			card.style.setProperty('--x', `${x}px`);
			card.style.setProperty('--y', `${y}px`);
		};

		return () => {
			card.onmousemove = null;
		};
	});
</script>

<div
	bind:this={card}
	class={classnames(
		twMerge(
			'bg-gradient-to-t from-white/5 to-white/0 card p-24 rounded-xl relative overflow-hidden',
			clazz
		),
		{ 'cursor-pointer clickable': clickAble },
		{ external: border === 'external' }
	)}
>
	<slot />
</div>

<style lang="scss">
	/* Linear Stroke */
	.card.external {
		&::after,
		&::before {
			content: '';
			pointer-events: none;
			user-select: none;
			position: absolute;
			inset: 0px;
			border-radius: inherit;
		}

		&::before {
			padding: 1px;
			background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.07));
			-webkit-mask: linear-gradient(black, black) content-box content-box,
				linear-gradient(black, black);
			mask-image: linear-gradient(black, black), linear-gradient(black, black);
			-webkit-mask-composite: xor;
			mask-composite: exclude;
		}

		&.clickable {
			&::after {
				transition: all 0.2s;
				background-position: left;
				background: radial-gradient(
					400px circle at var(--x) var(--y),
					rgba(255, 255, 255, 0.3),
					transparent
				);
				opacity: 0;
				mix-blend-mode: soft-light;
				will-change: background, opacity;
			}

			&:hover {
				&::after {
					opacity: 1;
				}
			}
		}
	}
</style>
