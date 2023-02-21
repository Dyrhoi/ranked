<script lang="ts">
	import classnames from 'classnames';

	let clazz: string = '';
	export { clazz as class };
</script>

<div
	class={classnames(
		'bg-gradient-to-t from-white/5 to-white/0 card p-24 rounded-xl relative overflow-hidden',
		clazz
	)}
>
	<slot />
</div>

<style>
	/* Linear Stroke */
	.card::before {
		content: '';
		pointer-events: none;
		user-select: none;
		position: absolute;
		inset: 0px;
		border-radius: inherit;
		padding: 1px;
		background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.07));
		-webkit-mask: linear-gradient(black, black) content-box content-box,
			linear-gradient(black, black);
		-webkit-mask-composite: xor;
	}
</style>
