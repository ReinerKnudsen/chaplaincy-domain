import { c as create_ssr_component, i as add_attribute, e as escape, v as validate_component } from "../../../../../chunks/ssr.js";
import { marked } from "marked";
import { I as Icon } from "../../../../../chunks/Icon.js";
import { h as headline, i as itemMetaData, a as itemMetaDataEntry, b as itemImageContainer, c as itemImage, d as itemDescription, e as backLink, f as aLink } from "../../../../../chunks/formats.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const thisItem = data.thisItem;
  thisItem.text = marked.parse(thisItem.text);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div${add_attribute("class", `container ${void 0}`, 0)}><div${add_attribute("class", `headline ${headline}`, 0)}>${escape(thisItem.title)}</div> <div${add_attribute("class", `news-data ${itemMetaData}`, 0)}><div${add_attribute("class", `entry ${itemMetaDataEntry}`, 0)}>${validate_component(Icon, "Icon").$$render($$result, { name: "calendar" }, {}, {})} ${escape(thisItem.publishdate)}</div> <div${add_attribute("class", `entry ${itemMetaDataEntry}`, 0)}>${validate_component(Icon, "Icon").$$render($$result, { name: "author" }, {}, {})} ${escape(thisItem.author)}</div> ${thisItem.tags ? `<div${add_attribute("class", `entry ${itemMetaDataEntry}`, 0)}>${validate_component(Icon, "Icon").$$render($$result, { name: "tags" }, {}, {})} ${escape(thisItem.tags)}</div>` : ``} ${thisItem.imageCaption ? `<div${add_attribute("class", `entry ${itemMetaDataEntry}`, 0)}>${validate_component(Icon, "Icon").$$render($$result, { name: "camera" }, {}, {})} ${escape(thisItem.imageCaption)}</div>` : ``}</div> <div${add_attribute("class", `news-image ${itemImageContainer}`, 0)}><img${add_attribute("class", itemImage, 0)}${add_attribute("src", thisItem.image, 0)}${add_attribute("alt", thisItem.title, 0)}></div> <div${add_attribute("class", `news-description ${itemDescription}`, 0)}><!-- HTML_TAG_START -->${thisItem.text}<!-- HTML_TAG_END --></div></div> <div${add_attribute("class", `back-link ${backLink}`, 0)}>${validate_component(Icon, "Icon").$$render($$result, { name: "left" }, {}, {})} <a${add_attribute("class", aLink, 0)} href="/news" data-svelte-h="svelte-1v9gwoe">Take me back to overview</a> </div>`;
});
export {
  Page as default
};
