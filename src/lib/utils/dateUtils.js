export const makeDate = (timestamp) => {
	// timestamp is a string
	let date = new Date(timestamp);
	let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
	return date.toLocaleDateString('en-US', options);
};

export const makeTimestamp = (date, time) => {
	// date and time are strings
	let timestamp = new Date(date + 'T' + time);
	return timestamp;
};
