<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';

	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import Spinner from '$lib/components/Spinner.svelte';

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();
	let isLoading = $state(false);
	let SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

	const loadRecaptcha = () => {
		if (typeof window !== 'undefined' && !window['grecaptcha']) {
			const script = document.createElement('script');
			script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
			document.head.appendChild(script);
		}
	};

	onMount(() => {
		loadRecaptcha();
	});
</script>

<div class="mx-auto mt-10 w-full lg:max-w-[80%] lg:px-10">
	<h3>We would like to hear from you!</h3>
	<p>Please leave us a message. We will reply to you as soon as possible.</p>
</div>

<div class="mx-auto mb-20 rounded-xl lg:max-w-[80%] lg:p-10">
	<div class="pb-10">All fields marked with * are required.</div>
	<form
		method="POST"
		class="flex flex-col space-y-6"
		use:enhance={async ({ formData, cancel }) => {
			isLoading = true;
			// Get reCaptcha token before submitting
			try {
				const token = await window['grecaptcha'].execute(SITE_KEY, {
					action: 'contact_form',
				});
				// Add token to form data
				formData.append('recaptcha_token', token);
				// Let form submit normally
				isLoading = false;
				return;
			} catch (error) {
				console.error('reCaptcha failed:', error);
				isLoading = false;
				cancel(); // Stop form submission
				return;
			}
		}}
	>
		<!-- Name -->
		<fieldset>
			<Label for="name">Name</Label>
			<Input type="text" id="name" name="name" />
		</fieldset>

		<!-- Email -->
		<fieldset>
			<Label for="email">Email *</Label>
			<Input type="email" id="email" name="email" required />
		</fieldset>

		<!-- Subject -->
		<fieldset>
			<Label for="subject">Subject *</Label>
			<Input type="text" id="subject" name="subject" required />
		</fieldset>

		<!-- Message -->
		<fieldset>
			<Label for="message">Message *</Label>
			<textarea
				id="message"
				name="message"
				rows="6"
				required
				class=" bg-white-primary w-full rounded-lg border p-2 px-4"
			></textarea>
		</fieldset>

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
			<Button variant="primary" type="submit" disabled={isLoading}>
				{#if isLoading}
					<Spinner size="w-4 h-4" color="text-secondary-text" />
					<span class="ml-2">Sending...</span>
				{:else}
					Send Message
				{/if}
			</Button>
		</div>
	</form>
</div>
