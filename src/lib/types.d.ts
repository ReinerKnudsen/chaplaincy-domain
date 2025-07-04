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

export type HeaderData = {
	photoName: string /** Name of photographer */;
	photoUrl: string /** Url of photographer */;
	imageUrl: string /** Url of image */;
	title: string /** Title of page */;
};

export type MenuItem = {
	title: string;
	url: string;
};

export type Service = {
	id: string;
	icon: string;
	name: string;
	time: string;
	kind: string;
	subtitle: string;
	place_church: string;
	place_address: string;
	url: string;
	mode: 'onsite' | 'online';
};