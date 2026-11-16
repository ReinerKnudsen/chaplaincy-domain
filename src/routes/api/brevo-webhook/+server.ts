import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import type { RequestHandler } from './$types';
import {
	PRIVATE_BREVO_WEBHOOK_SECRET,
	PRIVATE_RESEND_API_KEY,
	PRIVATE_WEBHOOK_NOTIFY_TO,
	PRIVATE_WEBHOOK_NOTIFY_FROM,
} from '$env/static/private';

/**
 * Receives Brevo transactional webhook events and emails a notification.
 *
 * Brevo retries on a non-2xx response, so this endpoint answers 200 for every
 * event it accepts — including ones it ignores. Only a failed auth check is
 * rejected, which Brevo should not be sending in the first place.
 */

// Events worth waking someone up for. Brevo can be configured to send more;
// anything not listed here is acknowledged and dropped.
const NOTIFY_EVENTS = ['spam', 'hardBounce', 'blocked', 'invalid'] as const;
type NotifyEvent = (typeof NOTIFY_EVENTS)[number];

const EVENT_LABELS: Record<NotifyEvent, string> = {
	spam: 'Marked as spam',
	hardBounce: 'Hard bounce',
	blocked: 'Blocked by provider',
	invalid: 'Invalid address',
};

interface BrevoEvent {
	event?: string;
	email?: string;
	date?: string;
	'message-id'?: string;
	tags?: string[];
	subject?: string;
	reason?: string;
}

const DEFAULT_FROM = 'Chaplaincy Website <news@anglicanbonncologne.de>';

const isNotifyEvent = (event: string | undefined): event is NotifyEvent =>
	!!event && (NOTIFY_EVENTS as readonly string[]).includes(event);

const escapeHtml = (value: string): string =>
	value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const describe = (e: BrevoEvent): string => {
	const label = EVENT_LABELS[e.event as NotifyEvent] ?? e.event ?? 'unknown';
	const parts = [
		`Event: ${label}`,
		`Address: ${e.email ?? 'unknown'}`,
		`Date: ${e.date ?? 'unknown'}`,
		`Subject: ${e.subject ?? '—'}`,
		`Tags: ${e.tags?.length ? e.tags.join(', ') : '—'}`,
		`Message ID: ${e['message-id'] ?? '—'}`,
	];
	if (e.reason) parts.push(`Reason: ${e.reason}`);
	return parts.join('\n');
};

const buildEmail = (events: BrevoEvent[]) => {
	const subject =
		events.length === 1
			? `Brevo: ${EVENT_LABELS[events[0].event as NotifyEvent] ?? events[0].event} — ${events[0].email ?? 'unknown'}`
			: `Brevo: ${events.length} delivery events need attention`;

	const text = events.map(describe).join('\n\n---\n\n');
	const html = `<h2>Brevo delivery events</h2>${events
		.map((e) => `<pre style="font-family:monospace">${escapeHtml(describe(e))}</pre>`)
		.join('<hr>')}`;

	return { subject, text, html };
};

export const POST: RequestHandler = async ({ request }) => {
	// Brevo sends the configured bearer token with every call. Without a secret
	// configured the endpoint stays closed rather than silently unauthenticated.
	if (!PRIVATE_BREVO_WEBHOOK_SECRET) {
		console.error('Brevo webhook: PRIVATE_BREVO_WEBHOOK_SECRET is not set — rejecting request');
		return json({ error: true, message: 'Not configured' }, { status: 503 });
	}

	const authHeader = request.headers.get('authorization') ?? '';
	const token = authHeader.replace(/^Bearer\s+/i, '');
	if (token !== PRIVATE_BREVO_WEBHOOK_SECRET) {
		console.warn('Brevo webhook: rejected request with invalid token');
		return json({ error: true, message: 'Unauthorized' }, { status: 401 });
	}

	let payload: unknown;
	try {
		payload = await request.json();
	} catch {
		console.warn('Brevo webhook: body was not valid JSON');
		return json({ received: true });
	}

	// A batched webhook delivers an array; a single one delivers an object.
	const events: BrevoEvent[] = Array.isArray(payload) ? payload : [payload as BrevoEvent];
	const relevant = events.filter((e) => isNotifyEvent(e?.event));

	// Log every event, so the Netlify function log stays a complete record even
	// when the notification mail fails or the event is not one we notify on.
	events.forEach((e) => {
		console.warn(`Brevo webhook: ${e?.event ?? 'unknown'} for ${e?.email ?? 'unknown'}`);
	});

	if (relevant.length === 0) {
		return json({ received: true, notified: false });
	}

	if (!PRIVATE_RESEND_API_KEY || !PRIVATE_WEBHOOK_NOTIFY_TO) {
		// The event is already in the log above, so this is not fatal.
		console.error('Brevo webhook: cannot send notification — Resend key or recipient missing');
		return json({ received: true, notified: false });
	}

	try {
		const { subject, text, html } = buildEmail(relevant);
		const resend = new Resend(PRIVATE_RESEND_API_KEY);

		await resend.emails.send({
			from: PRIVATE_WEBHOOK_NOTIFY_FROM || DEFAULT_FROM,
			to: PRIVATE_WEBHOOK_NOTIFY_TO,
			subject,
			text,
			html,
		});
	} catch (error) {
		// Never fail the request over this: Brevo would retry and we would send
		// the same notification again. The event is in the log either way.
		console.error('Brevo webhook: failed to send notification', error);
		return json({ received: true, notified: false });
	}

	return json({ received: true, notified: true });
};
