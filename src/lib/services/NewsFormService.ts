import { type News } from '$lib/stores/ObjectStore';
import { uploadImage } from './fileService';

export const newsFormService = async (
	newNews: News,
	selectedImage: File | null,
	imageExists: boolean,
	existingImageUrl: string | null
) => {
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

	if (selectedImage && !imageExists) {
		newNews.image = await uploadImage(selectedImage, newNews.imageAlt || '', newNews.imageCaption || '');
	} else {
		newNews.image = existingImageUrl;
	}
	return newNews;
};
