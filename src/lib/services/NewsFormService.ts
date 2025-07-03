import { type News } from '$lib/stores/ObjectStore';
import { uploadImage, type ReturnType } from '$lib/services/fileService';

export const newsFormService = async (newNews: News) => {
	if (!newNews.publishdate) {
		/* create current date as ISO strings */
		const now = new Date();
		const dateStr = now.toISOString().split('T')[0];
		const timeStr = now.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});
		/* set publish date and time */
		newNews.publishdate = dateStr;
		newNews.publishtime = timeStr;
	}

	if (!newNews.publishtime) newNews.publishtime = '09:00';
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
