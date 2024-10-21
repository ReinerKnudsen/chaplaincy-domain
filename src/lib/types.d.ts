export type User = {
	firstname: string;
	lastname: string;
	displayName: string;
	role: string;
	uid: string;
	email: string;
};

export type Event = {
	author: string;
	title: string;
	subtitle: string;
	description: string;
	slug: string;
	startdate: string;
	starttime: string;
	enddate: string;
	endtime: string;
	location: string;
	condition: string;
	publishdate: string;
	publishtime: string;
	publishDateTime: string;
	unpublishdate: string;
	unpublishtime: string;
	unpublishDateTime: string;
	comments: string;
	image: string;
	imageAlt: string;
};
