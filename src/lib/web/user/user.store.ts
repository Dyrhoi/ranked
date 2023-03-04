import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = '';
const initialValue = browser ? window.localStorage.getItem('user') ?? defaultValue : defaultValue;

const user = writable<string>(initialValue);

user.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('user', value);
	}
});

export default user;
