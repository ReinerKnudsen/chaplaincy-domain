/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					50: '#FFF5F2',
					100: '#9bb7ff',
					200: '#9bb7ff',
					300: '#82a4ff',
					400: '#82a4ff',
					500: '#6892ff',
					600: '#6892ff',
					700: '#356dff',
					800: '#356dff',
					900: '#0248ff'
				}
			}
		}
	}
};

module.exports = config;
