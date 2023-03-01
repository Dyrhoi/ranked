const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
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
		screens: {
			...defaultTheme.screens,
			md: '720px',
			lg: '720px',
			xl: '720px',
			'2xl': '720px',
		},
		extend: {
			colors: {
				bg: {
					DEFAULT: '#000612',
					modal: {
						from: 'rgb(12 16 24)',
						to: 'rgb(9 15 28)',
					},
					input: {
						DEFAULT: '#0c111c',
						border: '#141d30',
					},
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
