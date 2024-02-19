import { c as create_ssr_component } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  data.events;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="my-3 w-full px-20" data-svelte-h="svelte-18d8qcu">HOMEPAGE!</div> <img src="gs://chaplaincy-website-bncgn.appspot.com/diocese_in_europe_new.png" alt="Diocese in Europe" class="mx-auto">`;
});
export {
  Page as default
};
