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

<Footer footerType="socialmedia" class=" rounded-t-2xl bg-white-primary shadow-xl ">
	<div class="pl-8 md:flex md:justify-between">
		<div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
			<div>
				<h2 class="dark:text-white mb-6 text-sm font-semibold uppercase text-gray-900">
					Resources
				</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" href="/">Newsletter Archive</FooterLink>
					<FooterLink liClass="mb-4" href="/">Image Gallery</FooterLink>
				</FooterLinkGroup>
			</div>
			<div>
				<h2 class="dark:text-white mb-6 text-sm font-semibold uppercase text-gray-900">
					Follow us
				</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" href="/">Twitter</FooterLink>
					<FooterLink liClass="mb-4" href="/">Facebook</FooterLink>
					<FooterLink liClass="mb-4" href="/">Instagram</FooterLink>
				</FooterLinkGroup>
			</div>
			<div>
				<h2 class="dark:text-white mb-6 text-sm font-semibold uppercase text-gray-900">Legal</h2>
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
					class="dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
				/>
			</FooterIcon>
			<FooterIcon href="https://twitter.com/Anglican_Bn_Cgn">
				<Icon
					name="twitter"
					class="dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
				/>
			</FooterIcon>
			<FooterIcon href="https://www.achurchnearyou.com/church/8388/">
				<Icon
					name="churchnearyou"
					class="dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
				/>
			</FooterIcon>
			<FooterIcon href="/">
				<Icon
					name="email"
					class="dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
				/>
			</FooterIcon>
		</div>
	</div>
</Footer>
