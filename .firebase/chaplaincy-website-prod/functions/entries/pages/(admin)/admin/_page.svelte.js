import { c as create_ssr_component, s as subscribe } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import { p as pathName } from "../../../../chunks/NavigationStore.js";
import "../../../../chunks/client.js";
import { getAuth } from "firebase/auth";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $$unsubscribe_pathName;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_pathName = subscribe(pathName, (value) => value);
  getAuth();
  $$unsubscribe_page();
  $$unsubscribe_pathName();
  return `<div class="w-100 ml-3" data-svelte-h="svelte-1gnh2z6"><h1>Administration</h1> <div><p>This page provides a list of available administration tasks.</p> <p>It is only visible to users with Admin or Editor role.</p> <h2 class="mb-4 mt-6 text-xl font-bold">Event Management</h2> <div>Events list and management options go here.</div> <h2 class="mb-4 mt-6 text-xl font-bold">Article Management</h2> <div>Articles list and management options go here.</div> <h2 class="mb-4 mt-6 text-xl font-bold">User Management</h2> <div>User list and management options go here.</div></div></div>`;
});
export {
  Page as default
};
