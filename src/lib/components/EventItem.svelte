<script lang="ts">
	import type { DomainEvent } from '$lib/stores/ObjectStore';

	interface Props {
		thisEvent: DomainEvent;
	}

	const { thisEvent } = $props();
</script>

<div id="article-container" class="mx-auto w-[80%] pt-30">
	<div id="article-content">
		<div id="article-title" class="article-title">
			{thisEvent.title}
		</div>
		{#if thisEvent.subtitle}
			<div id="article-subtitle" class="article-subtitle">
				{thisEvent.subtitle}
			</div>
		{/if}
		<div id="event-data" class="article-metadata">
			<div id="article-date" class="article-metadata-item">
				<Icon icon="fa6-regular:calendar" class="h-4 w-4" />
				{thisEvent.startdate}
			</div>
			<div id="article-time" class="article-metadata-item">
				<Icon icon="fa6-regular:clock" class="h-4 w-4" />
				{thisEvent.starttime}
			</div>
			{#if thisEvent.location}
				<div id="article-location" class="article-metadata-item">
					<Icon icon="gis:location-poi" class="h-4 w-4" />
					{#if location?.online}
						<span>{location?.name}</span>
					{:else}
						<a class="link" target="_blank" href={location?.locationUrl}
							>{[location?.name, location?.city].filter(Boolean).join(', ')}</a
						>
					{/if}
				</div>
			{/if}
			{#if thisEvent.imageCaption}
				<div class="article-metadata-item">
					<Icon icon="fa-solid:camera-retro" />
					{thisEvent.imageCaption}
				</div>
			{/if}
			{#if thisEvent.joinOnline && onlineReady}
				<div id="article-joinonline" class="article-metadata-item">
					<Icon icon="fluent:video-person-32-regular" class="h-4 w-4" />
					<a class="link" href={location?.locationUrl}>Join online now</a>
				</div>
			{:else if thisEvent.joinOnline}
				<div id="article-joinonline" class="article-metadata-item">
					<Icon icon="fa6-regular:clock" class="h-4 w-4" />
					<div>A link to join will be here 20 minutes before the event starts</div>
				</div>
			{/if}
		</div>
		{#if thisEvent.image}
			<div id="article-image" class="article-image-container">
				<img class="article-image" src={thisEvent.image} alt={thisEvent.imageAlt} />
			</div>
		{/if}
		{#if descriptionText && typeof descriptionText === 'string'}
			<div class="my-8">
				<SimpleMarkdownViewer content={descriptionText} />
			</div>
		{/if}
	</div>
	<div id="pdfFile">
		{#if thisEvent.pdfFile}
			<div id="pdf-download" class="bg-white-smoke flex flex-row justify-start gap-4 p-6">
				<Icon icon="fa6-regular:file-pdf" class="h-6 w-6" />
				<a class="link flex flex-row gap-4 text-lg font-semibold" href={thisEvent.pdfFile} target="_blank">
					<div>Download {thisEvent.pdfText ? thisEvent.pdfText : 'PDF'}</div>
					<Icon icon="famicons:open-outline" class="h-6 w-6" />
				</a>
			</div>
		{/if}
	</div>
	<div id="calendar-button" class="flex flex-col items-center justify-end gap-4 py-8 md:flex-row">
		Add to calendar ->
		<add-to-calendar-button
			styleLight="--date-btn-cal-background: rgba(16, 11, 116, 1)"
			name={thisEvent?.title}
			startDate={thisEvent?.startdate}
			startTime={thisEvent?.starttime}
			endDate={thisEvent?.enddate}
			endTime={thisEvent?.endtime}
			timeZone="Europe/Berlin"
			location={location?.name}
			options="'Apple','Google','iCal','Microsoft365','Outlook.com'"
			buttonStyle="date"
			inline
			label="Add to my calendar"
		></add-to-calendar-button>
	</div>
</div>
