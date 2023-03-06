import { setContext } from 'svelte';
import { writable } from 'svelte/store';

import type { LayoutData } from './$types';

export let data: LayoutData;
// Create a store and update it when necessary...
export const user = writable();
