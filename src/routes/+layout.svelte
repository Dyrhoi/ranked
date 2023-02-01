<script lang="ts">
	import { browser } from '$app/environment';
	import Bootstrap from '$lib/web/Bootstrap.svelte';
	import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
	import '../app.css';

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
