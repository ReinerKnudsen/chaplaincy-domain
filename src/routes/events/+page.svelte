<script>
	// import { onMount } from 'svelte';
	// import { getDocs, collection } from 'firebase/firestore';
	// import { eventsColRef } from '$lib/firebase.js';

	import UploadImage from '$lib/components/UploadImage.svelte';

	// onMount(async () => {
	// 	const snapshot = await getDocs(eventsColRef);
	// 	events = snapshot.docs.map((doc) => doc.data());
	// 	console.log(events);
	// });
</script>

<div class="my-3 w-full px-20">
	<h1>Events</h1>
	<UploadImage />
</div>
