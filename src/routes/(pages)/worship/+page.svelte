<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';

	const headerData = {
		title: 'Worship',
		photoName: 'Milada Vigerova',
		photoUrl: 'https://unsplash.com/@milada_vigerova',
		imageUrl:
			'https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-prod.appspot.com/o/images%2Fheaders%2Fprayer.jpg?alt=media&token=3f242a9a-0ade-40d7-952b-a514eb2ccb14',
	};
</script>

<PageHeader {headerData} textStyle="white" />

<div class="mx-auto w-[80%] text-lg">
	<h2 class="my-4 text-2xl font-semibold">Sunday Eucharist</h2>
	<div class="flex flex-col space-y-8">
		<p>
			Worshipping God together is at the heart of the chaplaincy’s life. We celebrate the Eucharist (also called Holy
			Communion) every Sunday.
		</p>
		<p>
			At this service, we attend to God’s words in Scripture. We offer prayers for our own needs and the needs of the
			world. And we gather around the table of the Lord in the Holy Communion. Before bringing our gifts to the table,
			we offer one another a sign of peace (demonstrated through the shaking of hands) in response to the words of
			Jesus:
		</p>
		<blockquote class="my-4 border-l-4 border-gray-300 bg-gray-50 p-4">
			<p class="text-xl leading-relaxed font-medium text-gray-900 italic">
				When you are offering your gift at the altar, first be reconciled to your brother and sister, and then come to
				offer your gift.
			</p>
			<p class="mt-1 text-right text-sm">(Matthew 5:23-24)</p>
		</blockquote>
		<p>
			We invite all believing Christians to receive Holy Communion. If you do not wish to do so, you are invited to come
			forward with everyone else to receive a blessing in the name of Jesus.
		</p>
		<p>
			<strong>The St. Boniface Sunday School</strong> meets once a month during the 9.30am service in Bonn. All children
			up to the age of around 14 are warmly invited to attend. Each 30-minute session includes a prayer, a Bible story
			and a craft activity. You can contact the
			<a href="mailto:bonnsundayschool@anglicanbonncologne.de">Sunday School team here.</a>
		</p>
	</div>
	<h2 class="my-8 text-2xl font-semibold">Morning Prayer</h2>
	<div class="flex flex-col space-y-8">
		<p>
			The daily office of Morning Prayer is rooted in the ancient monastic traditions of daily prayer. It combines
			psalms, scripture readings, prayers, and sometimes hymns. Morning Prayer is a time to dedicate ourselves to God at
			the start of the new day.
		</p>
		<p>
			On the (very rare) Sundays when we don’t have a Eucharist service at church, Morning Prayer is offered. Some
			people also say Morning Prayer as part of their regular personal devotions. The short service has the same basic
			structure every day, but the readings, psalms and prayers vary. You can find the order of service for any day <a
				href="https://www.churchofengland.org/prayer-and-worship/join-us-service-daily-prayer"
				target="_blank">on the Church of England website</a
			>.
		</p>
	</div>
	<h2 class="my-8 text-2xl font-semibold">Evening Prayer</h2>
	<div class="flex flex-col space-y-8">
		<p>
			The daily office of Evening Prayer is a quiet and reflective service designed to bring the day to a close in
			worship, gratitude and reflection. Like Morning Prayer, it includes a structured sequence of psalms, scripture
			readings, canticles, and prayers for the needs of the community and the world.
		</p>
		<p>
			We offer Evening Prayer every Tuesday at 7.30pm (on Zoom) and every Friday at 6pm (at All Saints, Cologne). The
			service lasts about 20 minutes. All are welcome.
		</p>
		<p>
			You can find the order of service for any day <a
				href="https://www.churchofengland.org/prayer-and-worship/join-us-service-daily-prayer"
				target="_blank">on the Church of England website</a
			>.
		</p>
	</div>
	<div class="flex flex-col space-y-8">
		<h2 class="my-8 text-2xl font-semibold">Seasonal services</h2>
		<p>
			During <strong>Holy Week</strong> we commemorate the passion, death and resurrection of Jesus by observing the
			three-part liturgy of the Triduum. On <strong>Maundy Thursday</strong> we remember the Last Supper which Jesus
			shared with his disciples, and we keep watch and pray in a vigil. On <strong>Good Friday</strong> we remember the
			crucifixion and death of Jesus, and we thank him for the unconditional forgiveness of humanity declared on the
			cross. On <strong>Holy Saturday</strong> we experience the joy of Christ’s resurrection from the dead, celebrate his
			victory and remember that we are one with him by renewing the vows of our baptism.
		</p>
		<p>
			During <strong>Advent</strong>, we welcome our friends
			<a href="https://bonnenglishsingers.de/" target="_blank">The Bonn English Singers</a> to lead the singing at our
			highly popular services of <strong>Nine Lessons and Carols</strong>.
		</p>
		<p>
			Other special services throughout the year include <strong>Ash Wednesday</strong> at the start of Lent,
			<strong>Harvest Festival</strong>
			in October, a <strong>Requiem Mass</strong> on 1 November, <strong>Safeguarding Sunday</strong> in mid-November,
			and
			<strong>Midnight Mass</strong> on Christmas Eve.
		</p>
	</div>

	<h2 class="my-8 text-2xl font-semibold">Songs of Praise</h2>

	<div class="flex flex-col space-y-8">
		<p>
			Our annual Songs of Praise service in Bonn features a selection of hymns and readings around a particular theme.
			It’s a great opportunity to raise our voices to God together. Many of the hymns are well-known, but you might also
			find a surprise or two!
		</p>
	</div>
	<h2 class="my-8 text-2xl font-semibold">Pilgrimage</h2>
	<div class="flex flex-col space-y-8">
		<p>
			Each year, we offer a one-day pilgrimage to Echternach in Luxembourg (with our Old Catholic sister congregation
			from <a
				class="link"
				href="https://www.alt-katholisch.de/unsere-gemeinden/gemeinde-bonn-startseite/"
				target="_blank">St. Cyprian’s church</a
			> in Bonn), and a weekend pilgrimage within Germany. Previous destinations have included Fulda, Kevelaer and Rüdesheim.
			We walk, pray, eat and worship together, sharing the journey and growing in faith as we travel.
		</p>
	</div>
</div>

<style>
</style>
