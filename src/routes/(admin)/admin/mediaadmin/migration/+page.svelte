<script lang="ts">
	import { onMount } from 'svelte';
	import { type StorageReference, getMetadata, getDownloadURL, ref } from 'firebase/storage';
	import { setDoc, doc, getDocs, updateDoc, Timestamp, addDoc, type CollectionReference } from 'firebase/firestore';
	import {
		database,
		imageColRef,
		eventsColRef,
		newsColRef,
		storage,
		imageUsageColRef,
	} from '$lib/firebase/firebaseConfig';
	import { listAllImages, type ImageUsage } from '$lib/services/fileService';

	import Button from '$lib/components/ui/button/button.svelte';

	interface DataCollection {
		name: string;
		ref: CollectionReference;
		type: 'news' | 'events';
	}

	let migrationStatus = $state('idle'); // 'idle' | 'running' | 'completed'
	let collections: DataCollection[] = [];
	let progress = $state(0);
	let totalImages = $state(0);
	let results = $state<{ success: number; failed: number; errors: string[] }>({
		success: 0,
		failed: 0,
		errors: [],
	});

	onMount(() => {
		collections = [
			{ name: 'events', ref: eventsColRef, type: 'events' },
			{ name: 'news', ref: newsColRef, type: 'news' },
		];
	});

	const handleMigration = async () => {
		migrationStatus = 'running';

		// Get all images
		const allImages = await listAllImages();
		totalImages = allImages.length;

		// Reset results
		results = { success: 0, failed: 0, errors: [] };

		// Process each image
		for (let i = 0; i < allImages.length; i++) {
			const result = await migrateImageMetadata(allImages[i]);

			if (result.success) {
				results.success++;
			} else {
				results.failed++;
				results.errors.push(`${result.filename}: ${result.error}`);
			}

			progress = i + 1;
		}

		migrationStatus = 'completed';
	};

	export const migrateImageMetadata = async (imageRef: StorageReference) => {
		try {
			// Get Storage metadata
			const metadata = await getMetadata(imageRef);
			const altText = metadata.customMetadata?.imageAlt || '';
			const caption = metadata.customMetadata?.imageCaption || '';

			// Get download URL
			const url = await getDownloadURL(imageRef);

			// Create Firestore document
			const imageDoc = {
				filename: imageRef.name,
				path: imageRef.fullPath,
				url: url,
				altText: altText,
				caption: caption,
				createdAt: new Date(),
			};

			// Save to Firestore (using filename as document ID)
			await setDoc(doc(database, 'images', imageRef.name), imageDoc);

			return { success: true, filename: imageRef.name };
		} catch (error) {
			return { success: false, filename: imageRef.name, error };
		}
	};

	/* Database Migration */
	const migrateImageReferences = async () => {
		try {
			// Get all documents that might have image URLs

			let totalUpdated = 0;
			let totalChecked = 0;

			console.log('🚀 Starting image reference migration...');

			for (const collection of collections) {
				const snapshot = await getDocs(collection.ref);
				console.log(`   Found ${snapshot.docs.length} documents in ${collection.name}`);

				for (const docSnap of snapshot.docs) {
					const data = docSnap.data();
					let needsUpdate = false;
					const updates: any = {};
					console.log(`   Checking document ${totalChecked}: ${docSnap.id}`);

					// Check if image field contains full URL
					if (data.image && data.image.includes('firebasestorage.googleapis.com')) {
						const filename = extractFilenameFromUrl(data.image);
						if (filename) {
							updates.imageRef = filename; // Store just the filename
							needsUpdate = true;
							console.log(`     ✅ Will update image: ${filename}`);
						}
					}

					// Check other image fields if they exist
					if (data.headerImage && data.headerImage.includes('firebasestorage.googleapis.com')) {
						const filename = extractFilenameFromUrl(data.headerImage);
						if (filename) {
							updates.headerImage = filename;
							needsUpdate = true;
							console.log(`     ✅ Will update headerImage: ${filename}`);
						}
					}

					if (needsUpdate) {
						await updateDoc(doc(collection.ref, docSnap.id), updates);
						totalUpdated++;
						console.log(`     💾 Updated document ${docSnap.id} (${totalUpdated} total updated)`);
					} else {
						console.log(`     ⏭️  No updates needed for ${docSnap.id}`);
					}
				}
			}
			console.log(`🎉 Migration complete! Checked ${totalChecked} documents, updated ${totalUpdated}`);
			return { success: true, totalUpdated };
		} catch (error) {
			return { success: false, error };
		}
	};

	const extractFilenameFromUrl = (url: string): string => {
		try {
			const match = url.match(/images%2F([^?]+)/);
			if (match) {
				return decodeURIComponent(match[1]);
			}
			return '';
		} catch (error) {
			console.error('Error extracting filename:', error);
			return '';
		}
	};

	const fixImageReferences = async () => {
		try {
			console.log('🔧 Starting image reference fix...');

			let totalFixed = 0;

			for (const collection of collections) {
				console.log(`📂 Fixing ${collection.name} collection...`);
				const snapshot = await getDocs(collection.ref);

				for (const docSnap of snapshot.docs) {
					const data = docSnap.data();
					if (data.image && !data.image.includes('http')) {
						console.log(`   🔧 Fixing ${docSnap.id}: ${data.image}`);

						const imageRef = ref(storage, `images/${data.image}`);
						const fullUrl = await getDownloadURL(imageRef);

						await updateDoc(doc(collection.ref, docSnap.id), {
							image: fullUrl,
							imageRef: data.image,
						});

						totalFixed++;
						console.log(`     ✅ Fixed! Now has URL and imageRef`);
					}
				}
			}

			console.log(`🎉 Fix complete! ${totalFixed} documents restored`);
		} catch (error) {
			console.error('❌ Fix failed:', error);
		}
	};

	// Image usage migration
	const captureCurrentImageUsage = async () => {
		let totalUsageRecords = 0;

		for (const collection of collections) {
			const snapshot = await getDocs(collection.ref);

			for (const docSnap of snapshot.docs) {
				const data = docSnap.data();

				// Check if document has imageRef (filename)
				if (data.imageRef) {
					// Create usage record
					await addDoc(imageUsageColRef, {
						imageId: data.imageRef,
						documentType: collection.type,
						documentId: docSnap.id,
						createdAt: new Date(),
					});
					console.log(`Added ${data.imageRef} to the database (${totalUsageRecords})`);
					totalUsageRecords++;
				}
			}
		}

		return { success: true, totalUsageRecords };
	};
</script>

<div>
	<h1>Image Migration</h1>

	<!-- Migration Status Section -->
	<div class="mb-6 rounded-xl bg-slate-100 p-4">
		{#if migrationStatus === 'idle'}
			<p>Ready to migrate {totalImages || '...'} images from Storage metadata to Firestore.</p>
		{:else if migrationStatus === 'running'}
			<p class="font-semibold text-blue-600">
				Migrating... {progress} of {totalImages} images processed
			</p>
			<!-- Progress Bar -->
			<div class="mt-2 h-2 w-full rounded-full bg-gray-200">
				<div
					class="h-2 rounded-full bg-blue-600 transition-all duration-300"
					style="width: {totalImages > 0 ? (progress / totalImages) * 100 : 0}%"
				></div>
			</div>
		{:else if migrationStatus === 'completed'}
			<p class="font-semibold text-green-600">Migration completed!</p>
		{/if}
	</div>

	<div class="flex w-[20%] flex-col gap-10">
		<Button variant="primary" onclick={handleMigration} disabled={migrationStatus === 'running'}>
			{migrationStatus === 'running' ? 'Migrating...' : 'Migrate Images'}
		</Button>

		<Button variant="primary" onclick={migrateImageReferences} disabled={migrationStatus === 'running'}>
			{migrationStatus === 'running' ? 'Migrating...' : 'Migrate References'}
		</Button>

		<Button variant="primary" onclick={fixImageReferences} disabled>
			{migrationStatus === 'running' ? 'Migrating...' : 'Fix References'}
		</Button>

		<Button variant="primary" onclick={captureCurrentImageUsage}>
			{migrationStatus === 'running' ? 'Migrating...' : 'Generate Image Usage'}
		</Button>
	</div>

	{#if migrationStatus === 'completed'}
		<div class="mt-6 rounded-xl border p-4">
			<h2 class="mb-4 text-lg font-semibold">Migration Results</h2>

			<div class="mb-4 grid grid-cols-2 gap-4">
				<div class="rounded-lg bg-green-50 p-3">
					<p class="font-semibold text-green-800">✅ Successful</p>
					<p class="text-2xl font-bold text-green-600">{results.success}</p>
				</div>
				<div class="rounded-lg bg-red-50 p-3">
					<p class="font-semibold text-red-800">❌ Failed</p>
					<p class="text-2xl font-bold text-red-600">{results.failed}</p>
				</div>
			</div>

			{#if results.errors.length > 0}
				<div class="rounded-lg bg-red-50 p-3">
					<h3 class="mb-2 font-semibold text-red-800">Errors:</h3>
					<ul class="text-sm text-red-700">
						{#each results.errors as error}
							<li class="mb-1">• {error}</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	{/if}
</div>
