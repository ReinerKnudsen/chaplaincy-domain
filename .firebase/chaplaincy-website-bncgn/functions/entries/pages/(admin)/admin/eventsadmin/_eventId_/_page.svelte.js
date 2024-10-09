import { c as create_ssr_component, v as validate_component } from "../../../../../../chunks/ssr.js";
import { E as EventForm } from "../../../../../../chunks/EventForm.js";
import "firebase/firestore";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div>${validate_component(EventForm, "EventForm").$$render($$result, { thisEvent: data.newEvent }, {}, {})}</div>`;
});
export {
  Page as default
};
