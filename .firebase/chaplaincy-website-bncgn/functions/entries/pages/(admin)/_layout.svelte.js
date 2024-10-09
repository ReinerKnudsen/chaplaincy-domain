import { c as create_ssr_component, s as subscribe } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import { p as pathName } from "../../../chunks/NavigationStore.js";
import "../../../chunks/client.js";
import { getAuth } from "firebase/auth";
const css = {
  code: ".page-container.svelte-w3gmmh{display:grid;grid-template-columns:repeat(12, 1fr)}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $$unsubscribe_pathName;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_pathName = subscribe(pathName, (value) => value);
  getAuth();
  $$result.css.add(css);
  $$unsubscribe_page();
  $$unsubscribe_pathName();
  return `${`<div class="w-100 ml-3" data-svelte-h="svelte-bxvu3l"><h1>Loading...</h1></div>`}`;
});
export {
  Layout as default
};
