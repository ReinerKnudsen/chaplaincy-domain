<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	import Icon from '@iconify/svelte';

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();
</script>

<div class="my-3 w-full">
	<h1>Contact us</h1>
	<h3>We would like to hear from you!</h3>
	<p>Please leave us a message. We will reply to you as soon as possible.</p>
</div>

<div class="bg-white-smoke mx-auto mt-10 mb-20 max-w-[60%] rounded-xl p-10">
	<div class="pb-10">All fields marked with * are required.</div>
	<form method="POST" class="flex flex-col space-y-6" use:enhance>
		<!-- Name -->
		<div class="flex flex-col space-y-2">
			<label for="name">Name</label>
			<input
				type="text"
				id="name"
				name="name"
				class=" bg-white-primary rounded-lg border p-2 px-4"
			/>
		</div>

		<!-- Email -->
		<div class="flex flex-col space-y-2">
			<label for="email">Email *</label>
			<input
				type="email"
				id="email"
				name="email"
				required
				class=" bg-white-primary rounded-lg border p-2 px-4"
			/>
		</div>

		<!-- Subject -->
		<div class="flex flex-col space-y-2">
			<label for="subject">Subject *</label>
			<input
				type="text"
				id="subject"
				name="subject"
				required
				class=" bg-white-primary rounded-lg border p-2 px-4"
			/>
		</div>

		<!-- Message -->
		<div class="flex flex-col space-y-2">
			<label for="message">Message *</label>
			<textarea
				id="message"
				name="message"
				rows="6"
				required
				class=" bg-white-primary rounded-lg border p-2 px-4"
			></textarea>
		</div>

		<!-- Disclaimer -->
		<div class="flex flex-row items-center gap-4">
			<Icon icon="heroicons-outline:information-circle" class="h-10 w-10" />
			<div>
				Your data is safe with us. We will not share your information.<br />
				Your message will be delivered by email and deleted after processing.
			</div>
		</div>

		{#if form?.success}
			<div class="rounded-lg border-2 border-green-500 p-4 text-green-500">
				{form.message}
			</div>
		{/if}
		{#if form?.error}
			<div class="rounded-lg border-2 border-red-700 p-4 text-red-800">
				{form.message}
			</div>
		{/if}
		<div class="flex justify-center pt-10">
			<button type="submit" class="calltoaction self-start">Send Message</button>
		</div>
	</form>
</div>
