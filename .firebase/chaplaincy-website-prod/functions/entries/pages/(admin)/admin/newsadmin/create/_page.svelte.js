import { c as create_ssr_component, v as validate_component } from "../../../../../../chunks/ssr.js";
import "../../../../../../chunks/client.js";
import "firebase/firestore";
import "../../../../../../chunks/firebaseConfig.js";
import { N as NewsForm } from "../../../../../../chunks/NewsForm.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(NewsForm, "NewsForm").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
