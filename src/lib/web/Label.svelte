<script lang="ts">
	import classnames from 'classnames';
	import { twMerge } from 'tailwind-merge';

	let clazz: string = '';
	export { clazz as class };
</script>

<div
	class={classnames(
		twMerge('py-[0.2em] px-[0.6em] rounded flex gap-[0.5em] items-center bg-white/5', clazz)
	)}
>
	<slot />
</div>
