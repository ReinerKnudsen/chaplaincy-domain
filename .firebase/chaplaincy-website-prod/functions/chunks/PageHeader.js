import { c as create_ssr_component, e as escape, i as add_attribute } from "./ssr.js";
const PageHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { headerData } = $$props;
  let { textStyle = "white" } = $$props;
  if ($$props.headerData === void 0 && $$bindings.headerData && headerData !== void 0) $$bindings.headerData(headerData);
  if ($$props.textStyle === void 0 && $$bindings.textStyle && textStyle !== void 0) $$bindings.textStyle(textStyle);
  return `<div class="page-header mb-10"><div class="page-header-image grid h-[100px] grid-cols-1 items-center bg-cover bg-center md:h-[150px]" style="${"background-image: url(" + escape(headerData.imageUrl, true) + ")"}"><div class="${"page-title " + escape(
    textStyle === "dark" ? "text-primary-80" : "text-white-primary",
    true
  ) + " pl-10 text-3xl font-semibold md:text-5xl"}">${escape(headerData.title)}</div></div> <div class="pt-2 text-right text-sm">Image by: <a class="font-semibold text-blue-400"${add_attribute("href", headerData.photoUrl, 0)} target="_blank">${escape(headerData.photoName)}</a></div> </div>`;
});
export {
  PageHeader as P
};
