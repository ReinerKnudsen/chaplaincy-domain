import { c as create_ssr_component, i as add_attribute, e as escape, v as validate_component } from "../../../../../chunks/ssr.js";
import { marked } from "marked";
import { I as Icon } from "../../../../../chunks/Icon.js";
import { h as headline, i as itemMetaData, a as itemMetaDataEntry, b as itemImageContainer, c as itemImage, d as itemDescription, e as backLink, f as aLink } from "../../../../../chunks/formats.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const thisEvent = data.thisEvent;
  thisEvent.description = marked.parse(thisEvent.description);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div${add_attribute("class", `container ${void 0}`, 0)}><div${add_attribute("class", `headline ${headline}`, 0)}>${escape(thisEvent.title)}</div> <div${add_attribute("class", `event-data ${itemMetaData}`, 0)}><div${add_attribute("class", `entry ${itemMetaDataEntry}`, 0)}>${validate_component(Icon, "Icon").$$render($$result, { name: "calendar" }, {}, {})} ${escape(thisEvent.startdate)}</div> <div${add_attribute("class", `entry ${itemMetaDataEntry}`, 0)}>${validate_component(Icon, "Icon").$$render($$result, { name: "clock" }, {}, {})} ${escape(thisEvent.starttime)}</div> <div${add_attribute("class", `entry ${itemMetaDataEntry}`, 0)}> ${validate_component(Icon, "Icon").$$render($$result, { name: "location" }, {}, {})} ${escape(thisEvent.location)}</div></div> <div${add_attribute("class", `event-image ${itemImageContainer}`, 0)}><img${add_attribute("class", itemImage, 0)}${add_attribute("src", thisEvent.image, 0)}${add_attribute("alt", thisEvent.title, 0)}></div> <div${add_attribute("class", `event-description ${itemDescription}`, 0)}><!-- HTML_TAG_START -->${thisEvent.description}<!-- HTML_TAG_END --></div></div> <div${add_attribute("class", `back-link ${backLink}`, 0)}>${validate_component(Icon, "Icon").$$render($$result, { name: "left" }, {}, {})} <a${add_attribute("class", aLink, 0)} href="/news" data-svelte-h="svelte-1v9gwoe">Take me back to overview</a> </div>`;
});
export {
  Page as default
};
