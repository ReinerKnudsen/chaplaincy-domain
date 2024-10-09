import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { P as PageHeader } from "../../../../chunks/PageHeader.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const headerData = {
    title: "Prayers",
    photoName: "Milada Vigerova",
    photoUrl: "https://unsplash.com/@milada_vigerova",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-bncgn.appspot.com/o/images%2Fstock%2Fprayer.jpg?alt=media&token=d2840015-356f-43dc-8408-19637a86e9bd"
  };
  return `${validate_component(PageHeader, "PageHeader").$$render($$result, { headerData, textStlye: "white" }, {}, {})}

This page will provide both a list of prayers for this week and a form to ask for prayers.`;
});
export {
  Page as default
};
