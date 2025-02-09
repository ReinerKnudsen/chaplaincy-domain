<script lang="ts">
	type ProfileData = {
		name: string;
		role: string;
		description: string;
		photoUrl: string;
	};

	export let imagePosition: 'left' | 'right';
	export let profile: ProfileData;
</script>

<div
	class="profile-card my-10 flex w-full {imagePosition === 'left'
		? 'flex-row'
		: 'flex-row-reverse'}  rounded-xl border border-slate-200 shadow-xl"
>
	<div class="profile-image max-w-60">
		<img src={profile.photoUrl} alt={`profile ${profile.name}`} class="rounded-xl" />
	</div>
	<div class="profile-data my-auto flex w-full flex-col px-6">
		<div class="mb-2 text-2xl font-bold">{profile.name}</div>
		<div class="mb-2 text-xl font-semibold">{profile.role}</div>
		<quote class="mb-2 text-lg font-medium">{profile.description}</quote>
	</div>
</div>
