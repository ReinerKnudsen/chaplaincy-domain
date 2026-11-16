import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-netlify';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig({
	plugins: [
		tailwindcss(),
		// SvelteKit 3 takes its configuration here; svelte.config.js is no longer read.
		sveltekit({
			adapter: adapter(),
			preprocess: [vitePreprocess()],
			// Kit 3 renamed $lib to #lib. Keeping the alias avoids rewriting 306
			// imports across 95 files as part of the framework upgrade.
			alias: { $lib: 'src/lib' },
		}),
	],
	define: {
		__APP_VERSION__: JSON.stringify(pkg.version),
	},
	resolve: {
		extensions: ['.ts', '.js', '.svelte'],
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});
