<script>
	import EventCard from '$lib/event/Eventcard.svelte';
	//import { CAP_LOGO } from '$lib/constants.js';
	export let data;

	const events = data.events;
</script>

<div>
	<h3 class="text-lg">This is the homepage which is emtpy for now.</h3>
</div>
<div class="grid grid-cols-2 gap-5">
	<div class="border border-slate-500 p-4">
		<h4 class="mb-4 text-lg font-semibold">What's working?</h4>
		<ul>
			<li><a href="register">Register users (via Firebase)</a></li>
			<li><a href="login">Sign in registered user</a></li>
			<li>Sign out a signed-in user</li>
			<li><a href="/events/create">Create a new event </a></li>
		</ul>
	</div>
	<div class="border border-slate-500 p-4">
		<h4 class="mb-4 text-lg font-semibold">What's still to come?</h4>
		<div class="explanation my-4 text-sm">
			<span>The order of the elements does reflect a basic timeline. </span>
		</div>
		<h5 class="mb-4 mt-5 text-base font-semibold">User management</h5>
		<ul class="pl-3">
			<li>Edit user properties (self-service)</li>
			<li>Add welcome page/modal for users after registration</li>
			<li>Assign user roles / role-based access rules</li>
		</ul>
		<h5 class="mb-4 mt-5 text-base font-semibold">Event management</h5>
		<ul class="pl-3">
			<li>Display <a href="/events">events</a></li>
			<li>Set publish date to today (optionally by default?)</li>
			<li>Set publish end date to end of event (by default)</li>
			<li>Provide list of "known" locations (fix -> dynamic)</li>
			<li>Edit new location</li>
			<li>Provide dropdown for locations</li>
			<li>Allow for repeating events</li>
		</ul>
		<h5 class="mb-4 mt-5 text-base font-semibold">Article management ("blog")</h5>
		<ul class="pl-3">
			<li>Create news</li>
			<li>Display <a href="/news">news</a></li>
		</ul>
		<h5 class="mb-4 mt-5 text-base font-semibold">Administration</h5>
		<ul class="pl-3">
			<li><a href="/admin">Admin screen with task areas</a></li>
			<li>Only accessible to users with Admin or Editor role</li>
			<li class="mb-2 font-semibold">Administration of events</li>
			<li>List all events</li>
			<li>Sort and filter list?</li>
			<li>Edit event</li>
			<li>Copy/duplicate existing event</li>
			<li>Delete event</li>
			<li class="mb-2 font-semibold">Administration of news</li>
			<li>List all news</li>
			<li>Sort and filter list?</li>
			<li>Edit news</li>
			<li>Copy/duplicate existing news</li>
			<li>Delete news</li>
			<li class="mb-2 font-semibold">Administration of users</li>
			<li>List all users</li>
			<li>Sort and filter list?</li>
			<li>Assign user role</li>
			<li>Push password reset</li>
			<li>Delete user</li>
			<li class="mb-2 font-semibold">General admin</li>
			<li>CRUD locations</li>
		</ul>
	</div>
</div>
<div class="mb-20">
	<h3 class="text-lg">Can't you do this with a standard existing tool?</h3>
	<span>Probably. But it is less fun :)</span>
</div>

<style>
	li {
		margin-bottom: 0.5rem;
	}
	a {
		color: #3b82f6;
	}
</style>
