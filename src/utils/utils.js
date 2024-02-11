export function formatDate(date) {
	let thisDate = new Date(date);
	return thisDate.toLocaleString('de', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	});
}
