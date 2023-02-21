<script lang="ts">
	import type { IconSource } from '@steeze-ui/heroicons/types';
	import { Icon } from '@steeze-ui/svelte-icon';
	export let iconSource: IconSource | null = null;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
	{...$$restProps}
	class="flex items-center cursor-pointer gap-2 hover:text-text-title/70 transition-colors"
>
	{#if iconSource}<Icon src={iconSource} size="1.2em" theme="solid" />{/if}
	<slot />
</a>
