<script lang="ts">
	import classnames from 'classnames';
	import Card from './card/Card.svelte';

	let clazz: string = '';
	export { clazz as class };
</script>

<Card
	class={classnames(
		'py-[0.2em] px-[0.6em] rounded flex gap-[0.5em] items-center transition-colors bg-gradient-to-t from-white/20 to-white/0 hover:from-white/30',
		clazz
	)}
>
	<slot />
</Card>
