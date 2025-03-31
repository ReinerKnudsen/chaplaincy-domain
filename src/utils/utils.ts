export function formatDate(date: string | number | Date): string {
	const thisDate = new Date(date);
	return thisDate.toLocaleString('de', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	});
}
