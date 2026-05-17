import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PRIVATE_ANTHROPIC_API_KEY } from '$env/static/private';
import Anthropic from '@anthropic-ai/sdk';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { imageBase64, mimeType } = await request.json();

		if (!imageBase64 || !mimeType) {
			return json({ error: true, message: 'imageBase64 and mimeType are required' }, { status: 400 });
		}

		const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
		if (!allowedTypes.includes(mimeType)) {
			return json({ error: true, message: 'Unsupported image type' }, { status: 400 });
		}

		const client = new Anthropic({ apiKey: PRIVATE_ANTHROPIC_API_KEY });

		const response = await client.messages.create({
			model: 'claude-haiku-4-5-20251001',
			max_tokens: 150,
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'image',
							source: { type: 'base64', media_type: mimeType, data: imageBase64 },
						},
						{
							type: 'text',
							text: 'Write a concise, descriptive alt text for this image in 10–15 words. Describe what is shown objectively. Do not start with "Image of" or "Picture of". Return only the alt text, nothing else.',
						},
					],
				},
			],
		});

		const altText = (response.content[0] as { type: string; text: string }).text.trim();
		return json({ success: true, altText });
	} catch (error) {
		console.error('Error generating alt text:', error);
		return json({ error: true, message: 'Failed to generate alt text.' }, { status: 500 });
	}
};
