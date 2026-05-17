export const fileToBase64 = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve((reader.result as string).split(',')[1]);
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});

export const generateAltText = async (file: File): Promise<string> => {
	const imageBase64 = await fileToBase64(file);
	const response = await fetch('/api/generate-alt-text', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ imageBase64, mimeType: file.type }),
	});
	const data = await response.json();
	if (!response.ok || data.error) throw new Error(data.message || 'Failed to generate alt text');
	return data.altText as string;
};
