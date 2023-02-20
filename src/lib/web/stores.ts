import { writable } from 'svelte/store';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';

export const util = writable<{ colors: Partial<DefaultColors> }>({ colors: {} });
