<script lang="ts">
	type Group = {
		name: string;
		text: string;
		extraLink?: string;
		extraLinkText?: string;
		activitiesLink?: boolean;
	};

	export let group: Group;

	const { name, text, extraLink, extraLinkText, activitiesLink } = group;
</script>

<div class="group">
	<div class="group-header">
		<h2 class="group-title pb-4 pt-6 text-2xl font-semibold">{name}</h2>
	</div>
	<div class="group-text flex flex-col space-y-8 pb-4">
		{@html text}

		{#if extraLink || activitiesLink}
			{#if extraLink && activitiesLink}
				<div class="flex flex-col gap-2 border-t-2 py-4 pl-10">
					<p>
						<a class="border-b-2 border-b-purple-100 pb-1" href={extraLink} target="_blank"
							>{extraLinkText}</a
						>
					</p>
					<p>
						Please check our <a class="border-b-2 border-b-purple-100 pb-1" href="/activities"
							>Activities</a
						> page for upcoming meetings.
					</p>
				</div>
			{:else if extraLink}
				<div class=" border-t-2 py-4 pl-10">
					<p>
						{extraLinkText}
						<a class="border-b-2 border-b-purple-100 pb-1" href={extraLink} target="_blank"
							>{extraLinkText}</a
						>.
					</p>
				</div>
			{:else if activitiesLink}
				<div class="border-t-2 py-4 pl-10">
					<p>
						Please check our <a class="border-b-2 border-b-purple-100 pb-1" href="/activities"
							>Activities</a
						> page for upcoming meetings.
					</p>
				</div>
			{/if}
		{/if}
	</div>
	<hr />
</div>
