import type { Player } from '@prisma/client';
import { writable } from 'svelte/store';

// Create a store and update it when necessary...
export const user = writable<Player>();
