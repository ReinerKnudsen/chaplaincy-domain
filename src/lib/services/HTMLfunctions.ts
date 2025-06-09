// export function decodeHtml(html: string) {
// 	const txt = document.createElement('textarea');
// 	txt.innerHTML = html;
// 	return txt.value;
// }

export function decodeHtml(html: string) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	return doc.body.textContent || '';
}
