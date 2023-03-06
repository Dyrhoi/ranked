<script lang="ts">
	import { browser } from '$app/environment';
	import Bootstrap from '$lib/web/Bootstrap.svelte';
	import { user } from '$lib/web/user/user.store';
	import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
	import { setContext } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: user.set(data.user);
	setContext('user', user);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	});
</script>

<QueryClientProvider client={queryClient}>
	<Bootstrap><slot /></Bootstrap>
</QueryClientProvider>
