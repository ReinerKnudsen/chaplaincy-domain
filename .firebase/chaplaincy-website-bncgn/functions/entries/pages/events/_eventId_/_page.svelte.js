import { c as create_ssr_component, a as add_attribute, e as escape } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const thisEvent = data.thisEvent[0];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return ` <div class="mx-20 my-10 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"><div class="relative overflow-hidden bg-cover bg-no-repeat"><img class="rounded-t-lg"${add_attribute("src", thisEvent.image, 0)} alt="Konzert"></div> <div class="p-6"><h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">${escape(thisEvent.title)}</h5> <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">${escape(thisEvent.description)}</p> <p class="text-base text-neutral-600 dark:text-neutral-200" data-svelte-h="svelte-w2vt38"><small class="text-neutral-500 dark:text-neutral-400">Last updated 3 mins ago</small></p></div></div>`;
});
export {
  Page as default
};
