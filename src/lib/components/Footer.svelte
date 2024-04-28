<script>
	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink,
		FooterBrand,
		FooterIcon
	} from 'flowbite-svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<Footer footerType="socialmedia" class="bg-slate-100 ">
	<div class="pl-8 md:flex md:justify-between">
		<div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
					Resources
				</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" href="/">Flowbite</FooterLink>
					<FooterLink liClass="mb-4" href="/">Tailwind CSS</FooterLink>
				</FooterLinkGroup>
			</div>
			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
					Follow us
				</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" href="/">GitHub</FooterLink>
					<FooterLink liClass="mb-4" href="/">Discord</FooterLink>
				</FooterLinkGroup>
			</div>
			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Legal</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" href="/">Privacy Policy</FooterLink>
					<FooterLink liClass="mb-4" href="/">Terms & Conditions</FooterLink>
				</FooterLinkGroup>
			</div>
		</div>
	</div>
	<hr class="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
	<div class=" pl-8 pr-8 sm:flex sm:items-center sm:justify-between">
		<FooterCopyright href="/" by="Flowbite™" />
		<div class="mt-4 flex space-x-6 sm:mt-0 sm:justify-center rtl:space-x-reverse">
			<FooterIcon href="https://www.facebook.com/AnglicanBonnCologne/">
				<Icon
					name="facebook"
					class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
				/>
			</FooterIcon>
			<FooterIcon href="https://twitter.com/Anglican_Bn_Cgn">
				<Icon
					name="twitter"
					class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
				/>
			</FooterIcon>
			<FooterIcon href="https://www.achurchnearyou.com/church/8388/">
				<Icon
					name="churchnearyou"
					class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
				/>
			</FooterIcon>
			<FooterIcon href="/">
				<Icon
					name="email"
					class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
				/>
			</FooterIcon>
		</div>
	</div>
</Footer>
