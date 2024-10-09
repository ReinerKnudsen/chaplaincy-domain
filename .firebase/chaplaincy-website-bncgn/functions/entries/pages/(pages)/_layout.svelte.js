import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="mx-5 mb-10 mt-10 md:mx-10 lg:mx-20">${slots.default ? slots.default({}) : ``} </div>`;
});
export {
  Layout as default
};
