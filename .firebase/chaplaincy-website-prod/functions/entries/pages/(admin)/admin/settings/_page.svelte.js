import { c as create_ssr_component, s as subscribe } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import { p as pathName } from "../../../../../chunks/NavigationStore.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $$unsubscribe_pathName;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_pathName = subscribe(pathName, (value) => value);
  $$unsubscribe_page();
  $$unsubscribe_pathName();
  return `<div></div>`;
});
export {
  Page as default
};
