import { c as create_ssr_component } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/authService.js";
import "../../../../../chunks/client.js";
const css = {
  code: "table.svelte-sch0ln{display:grid;border-collapse:collapse;min-width:100%;grid-template-columns:minmax(150px, 1fr)\n			minmax(150px, 1fr)\n			minmax(150px, 1fr)\n			minmax(150px, 1fr)}thead.svelte-sch0ln,tbody.svelte-sch0ln,tr.svelte-sch0ln{display:contents}th.svelte-sch0ln{cursor:pointer;background-color:white;font-size:0.875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;text-align:left;padding-top:0.8rem;padding-bottom:0.8rem;padding-left:0.5rem}th.svelte-sch0ln,td.svelte-sch0ln{font-size:0.875rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;--tw-text-opacity:1;color:rgb(71 85 105 / var(--tw-text-opacity))}td.svelte-sch0ln{padding-top:1.2rem;padding-bottom:1.2rem;padding-left:0.5rem;border-bottom-width:1px;--tw-border-opacity:1;border-color:rgb(203 213 225 / var(--tw-border-opacity))}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${`<div class="text-xl font-semibold" data-svelte-h="svelte-1wl4rv">Loading user data...</div>`}`;
});
export {
  Page as default
};
