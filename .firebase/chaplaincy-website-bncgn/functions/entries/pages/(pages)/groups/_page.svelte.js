import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { P as PageHeader } from "../../../../chunks/PageHeader.js";
const css = {
  code: ".group.svelte-lr656a{margin-bottom:2.5rem\n}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const headerData = {
    title: "Groups",
    photoName: "JJ Ying",
    photoUrl: "https://unsplash.com/@jjying",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-bncgn.appspot.com/o/images%2Fstock%2Fgroups.jpg?alt=media&token=83a5659a-9299-4f6c-bc5a-2bc5608e1b73"
  };
  $$result.css.add(css);
  return `${validate_component(PageHeader, "PageHeader").$$render($$result, { headerData, textStyle: "dark" }, {}, {})} <div class="intro pb-4" data-svelte-h="svelte-1dvb775">Groups are organized by members of the congregation. They are open to everybody. Below you can
	find all information required about the groups of the church.</div> <div class="group svelte-lr656a" data-svelte-h="svelte-mgewk1"><div class="group-header"><h2 class="group-title py-2 text-2xl font-semibold">Bible Study Group</h2></div> <div class="group-text mb-5">Here goes the description of the group</div> <hr></div> <div class="group svelte-lr656a" data-svelte-h="svelte-cjbz18"><div class="group-header"><h2 class="group-title py-2 text-2xl font-semibold">Book club</h2></div> <div class="group-text mb-5">Here goes the description of the group</div> <hr></div> <div class="group svelte-lr656a" data-svelte-h="svelte-1c2fhxh"><div class="group-header"><h2 class="group-title py-2 text-2xl font-semibold">Prayer Shawl Knitting Ministry Group</h2></div> <div class="group-text mb-5">Here goes the description of the group</div> <hr></div> <div class="group svelte-lr656a" data-svelte-h="svelte-155271j"><div class="group-header"><h2 class="group-title py-2 text-2xl font-semibold">Visiting team</h2></div> <div class="group-text mb-5">Here goes the description of the group</div> <hr> </div>`;
});
export {
  Page as default
};
