const autoprefixer = require('autoprefixer');

// Tailwind runs as a Vite plugin (see vite.config.ts), not through PostCSS.
const config = {
	plugins: [autoprefixer],
};

module.exports = config;
