<script>
	import { goto } from '$app/navigation';

	import { addDoc, updateDoc } from 'firebase/firestore';

	import { Input, Label, Checkbox, Textarea, Helper, Button } from 'flowbite-svelte';

	import { newsColRef } from '$lib/firebase/firebaseConfig';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import { MAX_SLUG_TEXT } from '$lib/utils/constants';
	import { docRef, NewsStore, resetNewsStore } from '$lib/stores/FormStore';
	import { authStore } from '$lib/stores/AuthStore';

	let imageError;
	let uploadedImage;
	uploadedImage = $NewsStore.imageError;
	const author = $authStore.firstname + ' ' + $authStore.lastname;
	$NewsStore.author = author;

	const handleCreateSlug = () => {
		$NewsStore.slug = $NewsStore.text.slice(0, MAX_SLUG_TEXT);
	};

	const cleanUpForm = () => {
		resetNewsStore();
		goto('/admin/newsadmin');
	};

	const updateItem = async () => {
		try {
			await updateDoc($docRef, $NewsStore);
			console.log('Document successfully updated!');
		} catch (error) {
			console.error('Error updating document:', error);
		}
		cleanUpForm();
	};

	const saveNewItem = async () => {
		!$NewsStore.publishtime && ($NewsStore.publishtime = '09:00');
		!$NewsStore.author && ($NewsStore.author = author);
		try {
			await addDoc(newsColRef, $NewsStore);
			console.log('Document successfully created!');
		} catch (error) {
			console.error('Error writing document:', error);
		}
		cleanUpForm();
	};

	const handleSubmit = () => {
		if ($docRef) {
			updateItem();
		} else {
			saveNewItem();
		}
	};

	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const uploadImage = async (event) => {
		const file = event.target.files[0];
		if (file) {
			if (file.size > 300000) {
				imageError = 'The image is too big.';
				uploadedImage = '';
				return;
			} else {
				imageError = null;
			}
			const base64 = await convertBase64(file);
			uploadedImage = base64;
			$NewsStore.image = base64;
		}
	};
</script>

<div class="form">
	<h1>{docRef ? 'Edit news item' : 'Create news item'}</h1>

	<form
		class="form-container"
		id="form-container"
		enctype="multipart/form-data"
		on:submit={handleSubmit}
	>
		<!-- Titel -->
		<div>
			<Label for="title" class="mb-2">News Titel *</Label>
			<Input
				type="text"
				id="title"
				placeholder="News Title"
				bind:value={$NewsStore.title}
				required
			/>
		</div>

		<!-- Author -->
		<div>
			<Label for="author" class="mb-2">Author</Label>
			<Input type="text" id="author" bind:value={$NewsStore.author} disabled />
		</div>

		<!-- News text -->
		<div>
			<Label for="news-text" class="mb-2">News text *</Label>
			<Textarea
				id="news-text"
				placeholder="News text"
				rows="8"
				name="news-text"
				bind:value={$NewsStore.text}
			/>
			<p class="explanation text-right">
				<strong>{$NewsStore.text.length}</strong> characters.
			</p>
		</div>

		<!-- Slug -->
		<div>
			<Label for="slug" class="mb-2">Short text (slug)</Label>
			<Textarea
				id="slug"
				rows="3"
				name="slug"
				bind:value={$NewsStore.slug}
				maxlength="MAX_SLUG_TEXT"
				required
				on:focus={handleCreateSlug}
			/>
			<p class="explanation text-right">
				<strong>{$NewsStore.slug.length} of {MAX_SLUG_TEXT} </strong> characters.
			</p>
		</div>

		<!-- Publish date  -->
		<div>
			<Label for="publishdate" class="mb-2">Publish Date *</Label>
			<Input type="date" id="publishdate" required bind:value={$NewsStore.publishdate} />
		</div>

		<!-- Publish time  -->
		<div>
			<Label class="mb-2">Publish Time</Label>
			<Input
				type="time"
				id="publishtime"
				bind:value={$NewsStore.publishtime}
				disabled={!$NewsStore.publishdate}
			/>
			<p class="explanation">
				If you don't select a publish time, it will be set to 09:00 of the selected day.
			</p>
		</div>

		<!-- File Upload -->
		<div class="grid grid-rows-2">
			<div>
				<label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white" for="file_input"
					>Upload news image</label
				>
				<input
					class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
					aria-describedby="file_input_help"
					accept="image/png, image/jpeg, image/webp"
					id="file_input"
					type="file"
					on:change={uploadImage}
				/>
				<p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
					PNG, JPG or WEBP (max. 800x400px, max. 300kB).
				</p>
				<span hidden={!imageError} class="text-sm font-semibold text-red-600">{imageError}</span>
			</div>
			<div class="container" hidden={!uploadedImage}>
				<img src={uploadedImage} class="img h-24" id="avatar" alt="hochgeladenes bild" />
			</div>
		</div>

		<div>
			<Label class="mb-2">Alternative text</Label>
			<Input
				type="text"
				id="imagealt"
				bind:value={$NewsStore.imagealt}
				disabled={!$NewsStore.image}
			/>
			<p class="explanation">
				The alternative text helps people with screenreaders to understand the picture's content
			</p>
		</div>

		<!-- Buttons -->
		<div class="buttons col-span-2">
			<Button type="reset" color="light" on:click={() => goto('/admin/newsadmin')}>Cancel</Button>
			<Button type="reset" color="light" disabled={docRef}>Empty form</Button>
			<Button type="submit" disabled={$NewsStore.length === 0}>Save news</Button>
		</div>
	</form>
</div>

<div>&NonBreakingSpace;</div>

<style>
	.form {
		margin: 40px auto;
		padding: 20px 20px;
		max-width: 90%;
		border: 1px solid #eaeaea;
		border-radius: 20px;
	}
	.form-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30px 20px;
	}
	.explanation {
		margin: 10px 4px;
		font-size: 0.8rem;
	}
	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 50px;
		padding: 0 50px;
		justify-content: space-between;
		width: 100%;
		padding: 0 50px;
	}
</style>
