import { c as create_ssr_component, i as add_attribute, e as escape } from "./ssr.js";
const containerSM = "sm:grid-col-1 my-5 grid rounded-2xl border border-slate-200 px-4 py-8 shadow-xl";
const containerLG = "lg:grid-col-3";
const containerXL = "xl:bg-white";
const mainContent = "justify-between";
const mainContentMd = "md:flex md:flex-row md:gap-5";
const ItemCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { item } = $$props;
  let { kind } = $$props;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0) $$bindings.item(item);
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0) $$bindings.kind(kind);
  return `<div${add_attribute("class", `container ${containerSM} ${containerLG} ${containerXL}`, 0)}><div class="head-line mb-4 py-2 text-xl font-semibold"><a href="${"/" + escape(kind, true) + "/" + escape(item.id, true)}">${escape(item.data.title)}</a></div> <div${add_attribute("class", `main-content ${mainContent} ${mainContentMd}`, 0)}><div class="image mb-5 min-w-[40%]"><img class="image rounded-2xl"${add_attribute("src", item.data.image, 0)}${add_attribute("alt", item.data.imageAlt, 0)}></div> <div class="article"><div class="mb-4">${escape(item.data.slug)}</div></div></div> <div class="read-more no-wrap grid grid-flow-row gap-4 md:grid-flow-col"><div class="justify-self-start text-slate-400">${escape(item.data.author)}</div> <div class="justify-self-start text-slate-400 md:justify-self-center">${escape(kind === "news" ? item.data.publishdate : item.data.startdate)}</div> <div class="justify-self-end font-medium text-link-primary"><a href="${"/" + escape(kind, true) + "/" + escape(item.id, true)}">Read more...</a></div></div> </div>`;
});
export {
  ItemCard as I
};
