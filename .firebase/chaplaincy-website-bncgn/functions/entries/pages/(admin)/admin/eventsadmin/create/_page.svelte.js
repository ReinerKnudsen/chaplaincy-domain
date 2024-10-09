import { c as create_ssr_component, v as validate_component } from "../../../../../../chunks/ssr.js";
import "../../../../../../chunks/client.js";
import { E as EventForm } from "../../../../../../chunks/EventForm.js";
import "firebase/firestore";
import "../../../../../../chunks/firebaseConfig.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(EventForm, "EventForm").$$render($$result, {}, {}, {})}</div> <div data-svelte-h="svelte-1i36499"> </div>`;
});
export {
  Page as default
};
