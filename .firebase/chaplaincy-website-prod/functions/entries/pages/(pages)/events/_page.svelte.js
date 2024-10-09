import { c as create_ssr_component, v as validate_component, h as each } from "../../../../chunks/ssr.js";
import { I as ItemCard } from "../../../../chunks/ItemCard.js";
import { P as PageHeader } from "../../../../chunks/PageHeader.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let events = data.events;
  const sortedEvents = events.sort((a, b) => {
    return new Date(a.data.startdate) - new Date(b.data.startdate);
  });
  const headerData = {
    title: "Events",
    photoName: "Gaurav Kumar",
    photoUrl: "https://unsplash.com/@gkumar2175",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-bncgn.appspot.com/o/images%2Fstock%2Fevents.jpeg?alt=media&token=7b530e23-9825-477f-9fef-587beee93406"
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${validate_component(PageHeader, "PageHeader").$$render($$result, { headerData, textStyle: "white" }, {}, {})} <p data-svelte-h="svelte-z9c9j6">Please find our upcoming events.</p> <p data-svelte-h="svelte-5j4081">Make sure to join our mailing list if you want to be receive reminders and more details in your
	inbox.</p> ${events.length > 0 ? `<div class="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-2">${each(sortedEvents, (event) => {
    return `${validate_component(ItemCard, "ItemCard").$$render($$result, { item: event, kind: "events" }, {}, {})}`;
  })}</div>` : `<div class="mt-10 font-semibold italic" data-svelte-h="svelte-1b32kaf">Currently there are no events upcoming.</div>`}`;
});
export {
  Page as default
};
