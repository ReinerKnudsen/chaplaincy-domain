/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte-blocks/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}',
	],

	plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				primary: {
					100: 'rgba(16, 11, 116, 1)',
					80: 'rgba(16, 11, 116, 0.8)',
					60: 'rgba(16, 11, 116, 0.6)',
					40: 'rgba(16, 11, 116, 0.4)',
					20: 'rgba(16, 11, 116, 0.2)',
					text: 'rgba(0,0,0,1)',
				},
				secondary: {
					100: 'rgba(204,204,204,1)',
					80: 'rgba(204,204,204,0.8)',
					60: 'rgba(204,204,204,0.6)',
					40: 'rgba(204,204,204,0.4)',
					20: 'rgba(204,204,204,0.2)',
					text: 'rgba(255,255,255,1)',
				},
				seablue: {
					100: 'rgba(41, 182, 204,1)',
					80: 'rgba(41, 182, 204,0.8)',
					60: 'rgba(41, 182, 204,0.6)',
					40: 'rgba(41, 182, 204,0.4)',
					20: 'rgba(41, 182, 204,0.2)',
				},
				purple: {
					100: 'rgba(100, 18, 129, 1)',
					80: 'rgba(100, 18, 129, 0.8)',
					60: 'rgba(100, 18, 129, 0.6)',
					40: 'rgba(100, 18, 129, 0.4)',
					20: 'rgba(100, 18, 129, 0.2)',
				},
				rose: {
					100: 'rgba(173, 52, 149,1)',
					80: 'rgba(173, 52, 149,0.8)',
					60: 'rgba(173, 52, 149,0.6)',
					40: 'rgba(173, 52, 149,0.4)',
					20: 'rgba(173, 52, 149,0.2)',
				},
				accent: {
					red: 'rgba(208, 63, 48, 1)',
					gold: 'rgba(245, 179, 31,1)',
				},
				white: {
					primary: 'rgba(255,255,255,1)',
				},
				link: {
					primary: 'rgba(100, 18, 129, 1)',
				},
				green: {
					100: 'rgba(7, 153, 158,1)',
					80: 'rgba(7, 153, 158,0.8)',
					60: 'rgba(7, 153, 158,0.6)',
					40: 'rgba(7, 153, 158,0.4)',
					20: 'rgba(7, 153, 158,0.2)',
				},
				black: {
					100: 'rgba(0,0,0,1)',
					80: 'rgba(0,0,0,0.8)',
					60: 'rgba(0,0,0,0.6)',
					40: 'rgba(0,0,0,0.4)',
					20: 'rgba(0,0,0,0.2)',
				},
			},
		},
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1280px',
		},
		fontFamily: {
			body: [
				'Inter',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'system-ui',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji',
			],
			sans: [
				'Inter',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'system-ui',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji',
			],
			mono: [
				'ui-monospace',
				'SFMono-Regular',
				'Menlo',
				'Monaco',
				'Consolas',
				'Liberation Mono',
				'Courier New',
				'monospace',
			],
		},
	},
};

module.exports = config;
