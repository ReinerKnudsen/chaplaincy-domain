<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="my-3 w-full">
	<h1>Contact us</h1>
	<h3>We would like to hear from you!</h3>
	<p>Please leave us a message. We will reply to you as soon as possible.</p>
</div>

<div class="mx-auto mb-20 mt-10 max-w-2xl">
	<form method="POST" class="flex flex-col space-y-6" use:enhance>
		<!-- Name -->
		<div class="flex flex-col space-y-2">
			<label for="name">Name</label>
			<input type="text" id="name" name="name" class="rounded-lg border p-2" />
		</div>

		<!-- Email -->
		<div class="flex flex-col space-y-2">
			<label for="email">Email *</label>
			<input type="email" id="email" name="email" required class="rounded-lg border p-2" />
		</div>

		<!-- Subject -->
		<div class="flex flex-col space-y-2">
			<label for="subject">Subject *</label>
			<input type="text" id="subject" name="subject" required class="rounded-lg border p-2" />
		</div>

		<!-- Message -->
		<div class="flex flex-col space-y-2">
			<label for="message">Message *</label>
			<textarea id="message" name="message" rows="6" required class="rounded-lg border p-2" />
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

		<button type="submit" class="calltoaction self-start">Send Message</button>
	</form>
</div>
