<script lang="ts">
	import classnames from 'classnames';

	let clazz: string = '';
	export { clazz as class };
</script>

<div
	class={classnames(
		'bg-gradient-to-t from-white/5 to-white/0 card p-24 rounded-xl relative overflow-hidden',
		clazz,
		'after:'
	)}
>
	<slot />
</div>

<style lang="scss">
	/* Linear Stroke */
	.card {
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
			-webkit-mask-composite: xor;
		}

		&::after {
			transition: all 0.2s;
			background-position: left;
			background: linear-gradient(
				to bottom right,
				rgba(255, 255, 255, 0) 30%,
				rgba(255, 255, 255, 0.02),
				rgba(255, 255, 255, 0) 70%
			);
			background-size: 100% 200%;
			opacity: 0;
		}

		&:hover {
			&::after {
				background-position: right;
				opacity: 1;
			}
		}
	}
</style>
