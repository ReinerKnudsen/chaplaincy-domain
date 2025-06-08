import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import type { Actions, RequestEvent } from './$types';

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

		if (!email || !subject || !message) {
			return fail(400, {
				error: true,
				message: 'Please fill in all required fields',
			});
		}

		try {
			await sendEmail({
				from: 'Chaplaincy Website  <contact@comms.anglicanbonncologne.de>',
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
