import { defineEnvVars } from '@sveltejs/kit/env';

/**
 * Server-side environment variables.
 *
 * SvelteKit 3 requires each variable to be declared here before it can be
 * imported. `static: true` keeps the SvelteKit 2 behaviour of inlining the
 * value at build time, so a missing variable fails the build rather than
 * surfacing as undefined at runtime.
 *
 * `PRIVATE_*` marks actual secrets, which are also flagged as secrets in the
 * Netlify UI. The others are server-side but not secret — see CLAUDE.md.
 */
export const variables = defineEnvVars({
	// Secrets
	PRIVATE_ANTHROPIC_API_KEY: { static: true },
	PRIVATE_BREVO_API_KEY: { static: true },
	PRIVATE_BREVO_WEBHOOK_SECRET: { static: true },
	PRIVATE_RECAPTCHA_SECRET_KEY: { static: true },
	PRIVATE_RESEND_API_KEY: { static: true },

	// Server-side, not secret
	BREVO_LIST: { static: true },
	BREVO_REDIRECTION_URL: { static: true },
	NOTIFICATION_TO: { static: true },
	NOTIFICATION_FROM: { static: true },
});
