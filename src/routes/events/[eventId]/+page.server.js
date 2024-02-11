export const load = async (serverLoadEvent) => {
	const { fetch, params } = serverLoadEvent;
	const { eventId } = params;
	console.log(eventId);
	const response = await fetch(`http://localhost:4000/events?cid=${eventId}`);
	const thisEvent = await response.json();
	console.log(thisEvent);
	return { thisEvent };
};
