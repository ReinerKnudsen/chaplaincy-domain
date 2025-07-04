import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
    

export default defineConfig({
    plugins: [sveltekit()],
    resolve: {
        extensions: ['.ts', '.js', '.svelte']
    },
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
});
