<script lang="ts">
	type Group = {
		name: string;
		text: string;
		extraLink?: string;
		extraLinkText?: string;
		eventsLink?: boolean;
	};

	export let group: Group;

	const { name, text, extraLink, extraLinkText, eventsLink } = group;
</script>

<div class="group border-b-2 border-slate-300">
	<div class="group-header">
		<h2 class="group-title pb-4 pt-6 text-2xl font-semibold">{name}</h2>
	</div>
	<div class="group-text flex flex-col space-y-8 pb-4">
		{@html text}

		{#if extraLink || eventsLink}
			{#if extraLink && eventsLink}
				<div class="flex flex-row justify-between gap-20 py-4">
					<p class="bg-slate-200 p-4">
						<a class="border-b-2 border-b-purple-100 pb-1" href={extraLink} target="_blank"
							>{extraLinkText}</a
						>
					</p>
					<p class="bg-slate-200 p-4">
						Please check our <a class="border-b-2 border-b-purple-100 pb-1" href="/events">Events</a
						> page for upcoming meetings.
					</p>
				</div>
			{:else if extraLink}
				<div class=" bg-slate-200 py-4 pl-4">
					<p>
						{extraLinkText}
						<a class="border-b-2 border-b-purple-100 pb-1" href={extraLink} target="_blank"
							>{extraLinkText}</a
						>.
					</p>
				</div>
			{:else if eventsLink}
				<div class=" bg-slate-200 py-4 pl-4">
					<p>
						Please check our <a class="border-b-2 border-b-purple-100 pb-1" href="/events">Events</a
						> page for upcoming meetings.
					</p>
				</div>
			{/if}
		{/if}
	</div>
	<hr />
</div>
