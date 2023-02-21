const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			body: ['Poppins', 'sans-serif'],
		},
		container: {
			center: true,
		},
		extend: {
			colors: {
				bg: {
					DEFAULT: '#000612',
				},
				text: {
					DEFAULT: '#b4bdd0',
					title: '#f7f7f7',
					muted: 'rgb(255, 255, 255, 0.5)',
				},
				primary: colors['blue'],
			},
		},
	},
	plugins: [],
};
