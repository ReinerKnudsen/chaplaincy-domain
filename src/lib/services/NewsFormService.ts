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

/**
 * Uploads a new image for a news item and updates the news object with the resulting URL.
 *
 * If no new image is provided, the news object is returned unchanged.
 * Errors from the upload (Firebase failures, missing alt text, etc.) propagate
 * to the caller — they are not caught here.
 *
 * @param news - The news item to attach the image to
 * @param newImage - The new image file to upload, or null if no image was selected
 * @returns The news object, updated with the new image URL if an image was uploaded
 * @throws Error if alt text is missing when an image is provided
 * @throws Any Firebase error that occurs during the upload
 */
export const uploadNewsImage = async (news: News, newImage: File | null): Promise<News> => {
	if (!newImage) {
		return news;
	}

	if (!news.imageAlt || news.imageAlt.trim() === '') {
		throw new Error('Image alt text is required');
	}

	const result: ReturnType = await uploadImage(newImage, news.imageAlt, news.imageCaption || '');
	news.image = result.url;

	return news;
};
