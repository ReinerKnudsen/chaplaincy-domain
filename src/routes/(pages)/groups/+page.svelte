<script lang="ts">
	import GroupCard from '$lib/components/GroupCard.svelte';

	const groups = [
		{
			name: 'Bible study group in Bonn',
			text: '<p>The bible study group in Bonn has a very long tradition and currently takes place on a Monday once a month in Bonn Bad Godesberg. During Lent the group meets once a week and at other times of year once a month. There is an opportunity for a chat over tea, coffee and biscuits before we settle down to the serious business!</p>',
			eventsLink: false,
		},
		{
			name: 'Bible study group in Cologne',
			text: '<p>The Friday evening group in Cologne meets in All Saints on Fridays at 6.:30 pm, after Evening Prayer.</p><p>Having grown from a tiny group of just two or three, we now number up to 12 people. Some come just for Evening Prayer in the first half hour, others for the hour of readings and discussion of the upcoming Sunday Gospel that follows. People are welcome at either but most people stay for both.</p><p>Led by Fr. Richard (or on occasions when he has to be away, by one of the group), we say the familiar prayers, alternate in reading aloud the verses of the Psalm for the day and listen to the readings from the Old and the New Testament, usually read by members of the group. At the end of the half-hour Evening Prayer we have – hopefully – wound down from a hectic week and adjourn to the comfortable seating at the back of the church to consider the Sunday Gospel with often lively discussions on what it means for us in our day-to-day lives.</p>',
			eventsLink: false,
		},
		{
			name: 'Book club',
			text: '<p>If you enjoy reading, our lively Book Club is for you. We meet on Zoom every six weeks or so, usually on a Wednesday or Thursday evening, to share our thoughts on a particular book.</p><p>From classic and contemporary fiction to biographies,  autobiographies, travel writing and murder mysteries, there’s something for everyone. No  matter how much or little of the chosen book you have read (or audiobook you have listened to, or film you have watched), you are welcome to come along and join in the discussion.</p>',
			eventsLink: true,
		},
		{
			name: 'Prayer Shawl knitting group',
			text: '<p>Our Prayer Shawl Ministry group meets several times a year (on Saturdays) in Hürtgenwald.</p><p>This powerful ecumenical ministry and spiritual practice reaches out to those in need of comfort and solace, as well as in celebration and joy. Prayer shawl ministry groups can be found all over the world. They knit or crochet shawls and blankets to console those who are grieving, comfort those who are ill, and bring hope to those in despair. Shawls may also be made to celebrate life and its milestones.</p><p> Many blessings are prayed into every stitch. Please pray for our knitters and their work, and the people who will receive the gifts of this ministry of compassion. If you know someone who would be comforted by receiving a shawl or lap blanket, <a class="border-b-2 border-b-purple-100 pb-1" href="mailto:knitting-group@anglicanbonncologne.de">please contact us.</p>',
			extraLink: 'https://www.shawlministry.com',
			extraLinkText: 'Learn more about prayer shawl ministry.',
			eventsLink: true,
		},
		{
			name: 'Lent prayer group',
			text: '<p>Lent is a time of personal reflection and committing ourselves to deepening our relationship with God. Throughout the season of Lent, we offer weekly prayer time on Tuesday evenings, when we meet on Zoom to pray together for the needs of the world, our communities, our loved ones and ourselves. </p><p>Lasting about 20-30 minutes, our prayer time can also include spiritual practices such as Lectio Divina and Ignatian prayer. Everyone is welcome.</p>',
			eventsLink: true,
		},
	];
</script>

<div class="text-lg">
	<div class="intro pb-4">
		Groups are organized by members of the congregation. They are open to everybody. Below you can find all information
		required about the groups of the church.
	</div>
	<div class="border-b-2 pb-4">
		If you want to find out more or would like to join one of the groups, please <a
			class="link"
			href="/contact?page=groups"
			target="_blank">get in touch</a
		> with us.
	</div>

	{#each groups as group}
		<GroupCard {group} />
	{/each}
</div>

<style>
</style>
