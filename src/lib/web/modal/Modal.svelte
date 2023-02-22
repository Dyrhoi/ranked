<script lang="ts">
	import {
		Dialog,
		DialogDescription,
		DialogOverlay,
		DialogTitle,
	} from '@rgossiaux/svelte-headlessui';
	import type { DialogProps } from '@rgossiaux/svelte-headlessui/components/dialog/Dialog.svelte';
	import type { SupportedAs } from '@rgossiaux/svelte-headlessui/internal/elements';
	import classNames from 'classnames';
	import Card from '../card/Card.svelte';

	interface $$Props extends DialogProps<SupportedAs> {}

	export let open = false;
	export let clazz = '';

	export { clazz as class };
</script>

<Dialog as="div" {...$$restProps} {open} class={classNames(clazz, 'relative z-[55]')}>
	<div class="fixed inset-0 overflow-y-auto z-10">
		<DialogOverlay class="fixed inset-0 bg-bg bg-opacity-25 backdrop-blur-sm" />

		<div class="z-10 fixed grid place-items-center inset-0">
			<div
				class="from-bg-off/95 to-bg-off/95 bg-gradient-to-b border border-white/10 rounded shadow-xl shadow-bg-bg p-12 grid gap-8 max-h-[80%] max-w-4xl w-full"
			>
				<div>
					<DialogTitle class="text-xl text-text-title"><slot name="title" /></DialogTitle>
					<DialogDescription><slot name="description" /></DialogDescription>
				</div>
				<slot />
			</div>
		</div>
	</div>
</Dialog>
