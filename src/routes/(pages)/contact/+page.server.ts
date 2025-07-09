import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import type { Actions, RequestEvent } from './$types';

// reCaptcha validation function
const validateRecaptcha = async (token: string): Promise<{ success: boolean; score?: number; error?: string }> => {
	const secretKey = import.meta.env.VITE_RECAPTCHA_SECRET_KEY;

	if (!secretKey) {
		console.error('VITE_RECAPTCHA_SECRET_KEY not found in environment variables');
		return { success: false, error: 'Server configuration error' };
	}

	try {
		const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				secret: secretKey,
				response: token,
			}),
		});

		const data = await response.json();

		if (!data.success) {
			console.error('reCaptcha validation failed:', data['error-codes']);
			return { success: false, error: 'reCaptcha validation failed' };
		}

		// For reCaptcha v3, check the score (0.0 to 1.0, higher is better)
		const score = data.score || 0;
		const threshold = 0.5; // Adjust this threshold as needed

		if (score < threshold) {
			console.warn(`reCaptcha score too low: ${score}`);
			return { success: false, error: 'Security check failed' };
		}

		return { success: true, score };
	} catch (error) {
		console.error('reCaptcha validation error:', error);
		return { success: false, error: 'Security validation failed' };
	}
};

const resend = new Resend('re_AJG7e4FU_LCBrEcUTstVSRZaWjfXjjTvF');

const sendEmail = async (options: {
	from: string;
	to: string;
	subject: string;
	text: string;
	html: string;
	replyTo?: string;
}) => {
	try {
		const data = await resend.emails.send({
			from: options.from,
			to: options.to,
			subject: options.subject,
			html: options.html,
			replyTo: options.replyTo,
		});

		return data;
	} catch (error) {
		console.error('Resend error:', error);
		throw error;
	}
};

export const actions = {
	default: async ({ request }: RequestEvent) => {
		const data = await request.formData();
		const name = data.get('name')?.toString() || '';
		const email = data.get('email')?.toString();
		const subject = data.get('subject')?.toString();
		const message = data.get('message')?.toString();
		const recaptchaToken = data.get('recaptcha_token')?.toString();

		if (!email || !subject || !message) {
			return fail(400, {
				error: true,
				message: 'Please fill in all required fields',
			});
		}

		// Validate reCaptcha token
		if (!recaptchaToken) {
			return fail(400, {
				error: true,
				message: 'Security validation failed. Please try again.',
			});
		}

		const recaptchaResult = await validateRecaptcha(recaptchaToken);
		if (!recaptchaResult.success) {
			return fail(400, {
				error: true,
				message: recaptchaResult.error || 'Security validation failed. Please try again.',
			});
		}

		// Log successful validation (optional)
		console.log(`reCaptcha validation successful. Score: ${recaptchaResult.score}`);

		try {
			await sendEmail({
				from: 'Anglican Chaplaincy Website<contact@anglicanbonncologne.de>',
				to: process.env.SMTP_TO || 'reinerknudsen@me.com',
				subject: `Contact Form: ${subject}`,
				text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
				html: `<h2>New Contact Form Submission</h2>
				<p><strong>Name:</strong> ${name || 'Not provided'}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Subject:</strong> ${subject}</p>
				<p><strong>Message:</strong></p>
				<p>${message.replace(/\n/g, '<br>')}</p>`,
				replyTo: email,
			});

			return {
				success: true,
				message: 'Thank you for your message. We will get back to you soon.',
			};
		} catch (error) {
			console.error('Failed to send email:', error);
			return fail(500, {
				error: true,
				message: 'Failed to send message. Please try again later.',
			});
		}
	},
} satisfies Actions;
