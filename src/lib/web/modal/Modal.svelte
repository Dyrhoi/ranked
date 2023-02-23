<script lang="ts">
	import {
		Dialog,
		DialogDescription,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild,
	} from 'svelte-headlessui-combobox-temporary';
	import type { DialogProps } from 'svelte-headlessui-combobox-temporary/components/dialog/Dialog.svelte';
	import type { SupportedAs } from 'svelte-headlessui-combobox-temporary/internal/elements';
	import { createMutation } from '@tanstack/svelte-query';
	import classNames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	interface $$Props extends DialogProps<SupportedAs> {}

	export let open = false;
	export let clazz = '';

	export { clazz as class };

	const dispatch = createEventDispatcher();
</script>

<Transition show={open}>
	<Dialog as="div" {...$$restProps} {open} class={classNames(clazz, 'relative z-[55]')} static>
		<div class="fixed inset-0 overflow-y-auto z-10">
			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<DialogOverlay
					class="fixed inset-0 bg-bg bg-opacity-25"
					on:click={() => dispatch('close')}
				/>
			</TransitionChild>

			<div class="grid place-items-center inset-0 overflow-y-auto py-[4%]">
				<TransitionChild
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<div
						class="from-bg-modal-from/95 to-bg-modal-to/95 bg-gradient-to-b border backdrop-blur-sm border-white/10 rounded-xl shadow-xl shadow-bg-bg p-12 grid gap-8 max-w-4xl"
					>
						<div>
							<DialogTitle class="text-xl text-text-title"><slot name="title" /></DialogTitle>
							<DialogDescription><slot name="description" /></DialogDescription>
						</div>
						<slot />
					</div>
				</TransitionChild>
			</div>
		</div>
	</Dialog>
</Transition>
