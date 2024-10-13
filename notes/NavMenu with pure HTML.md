## Replace current menu with HTML navigation
```js
<script>
  // your script here
</script>

<nav class="z-50 sticky top-0 flex items-center h-16 bg-white shadow-md px-4">
  <a href="/" class="mr-4">
    <img src={caplogo} alt="Chaplaincy Logo" class="h-8" />
  </a>
  <ul class="flex space-x-4">
    <li><a href="/" class="text-xl">Home</a></li>
    <li><a href="/news" class="text-xl">News</a></li>
    <li><a href="/events" class="text-xl">Events</a></li>
    <li><a href="/groups" class="text-xl">Groups</a></li>
    <li><a href="/prayers" class="text-xl">Pray with us</a></li>
    <li><a href="/about" class="text-xl">About us</a></li>
    <!-- Add more links as needed -->
  </ul>
</nav>
```

## Add a dropdown menu
```JS
<script>
  let showDropdown = false;
  const toggleDropdown = () => {
    showDropdown = !showDropdown;
  };
</script>

<nav class="z-50 sticky top-0 flex items-center h-16 bg-white shadow-md px-4">
  <a href="/" class="mr-4">
    <img src={caplogo} alt="Chaplaincy Logo" class="h-8" />
  </a>
  <ul class="flex space-x-4">
    <li><a href="/" class="text-xl">Home</a></li>
    <li><a href="/news" class="text-xl">News</a></li>
    <li><a href="/events" class="text-xl">Events</a></li>
    <li><a href="/groups" class="text-xl">Groups</a></li>
    <li><a href="/prayers" class="text-xl">Pray with us</a></li>
    <li class="relative group">
      <a href="#" class="text-xl" on:click|preventDefault={toggleDropdown}>About us</a>
      {#if showDropdown}
        <div class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="/about" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Who we are</a>
            <a href="/about/responsibilities" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Responsibilities</a>
            <a href="/about/safeguarding" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Safeguarding</a>
            <a href="/about/contact" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Get in touch</a>
          </div>
        </div>
      {/if}
    </li>
    <!-- Add more links as needed -->
  </ul>
</nav>
```

## FlowBites Nav formatting


