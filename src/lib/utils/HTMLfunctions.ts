// export function decodeHtml(html: string) {
// 	const txt = document.createElement('textarea');
// 	txt.innerHTML = html;
// 	return txt.value;
// }

export function decodeHtml(html: string) {
	// Simple replacement of common HTML entities
	return html
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, "'")
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, '&')
		.replace(/<br>/g, '\n');
}

export function cleanText(text: string) {
	return text
		.replace(/<[^>]*>/g, '') // Remove HTML tags
		.replace(/&amp;/g, '&') // Decode HTML entities
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/\s+/g, ' ') // Normalize whitespace
		.trim();
}
