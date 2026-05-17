import { type News } from '$lib/stores/ObjectStore';
import { uploadImage, type ReturnType } from '$lib/services/fileService';
import { buildTimeStamp } from '$lib/services/validateForm';
import { Timestamp } from 'firebase/firestore';

export const newsFormService = async (newNews: News) => {
	if (!newNews.publishdate) {
		/* create current date as local time strings */
		const now = new Date();
		const pad = (n: number) => String(n).padStart(2, '0');
		const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
		const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
		/* set publish date and time */
		newNews.publishdate = dateStr;
		newNews.publishtime = timeStr;
	}

	if (!newNews.publishtime) newNews.publishtime = '09:00';

	if (newNews.publishdate && newNews.publishtime) {
		const publishDateTime = buildTimeStamp(newNews.publishdate, newNews.publishtime);
		newNews.publishDateTime = Timestamp.fromDate(publishDateTime);
	}
	return newNews;
};

export const uploadNewsImage = async (news: News, newImage: File | null): Promise<News> => {
	if (!newImage) {
		return news;
	}
	if (newImage) {
		if (!news.imageAlt || news.imageAlt.trim() === '') {
			throw new Error('Image alt text is required');
		}
		const result: ReturnType = await uploadImage(newImage, news.imageAlt, news.imageCaption || '');
		news.image = result.url;
	}
	return news;
};
