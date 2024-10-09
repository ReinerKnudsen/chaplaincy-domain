import { c as create_ssr_component, v as validate_component } from "../../../../../../chunks/ssr.js";
import { N as NewsForm } from "../../../../../../chunks/NewsForm.js";
import "firebase/firestore";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div>${validate_component(NewsForm, "NewsForm").$$render($$result, { thisItem: data.newsItem }, {}, {})}</div>`;
});
export {
  Page as default
};
