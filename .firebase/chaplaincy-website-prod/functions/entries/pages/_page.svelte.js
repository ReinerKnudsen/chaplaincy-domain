import { c as create_ssr_component, i as add_attribute, v as validate_component, e as escape, h as each, o as null_to_empty } from "../../chunks/ssr.js";
import { I as Icon } from "../../chunks/Icon.js";
import { I as ItemCard } from "../../chunks/ItemCard.js";
import { a as authStore } from "../../chunks/AuthStore.js";
const container$1 = "rounded-2xl border border-slate-200 py-5 px-3 shadow-xl";
const content = "flex flex-col items-center justify-start";
const cardIcon = "flex min-h-[80px] items-center justify-center";
const h3 = "mb-0 mt-1";
const p = "my-0";
const ServiceCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { service } = $$props;
  if ($$props.service === void 0 && $$bindings.service && service !== void 0) $$bindings.service(service);
  return `<div${add_attribute("class", container$1, 0)}><div${add_attribute("class", `icon ${cardIcon}`, 0)}>${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      name: service.icon === "people" ? "onsite" : "users_online",
      width: "3rem",
      height: "3rem"
    },
    {},
    {}
  )}</div> <div${add_attribute("class", content, 0)}><h3${add_attribute("class", h3, 0)}>${escape(service.name)}</h3> <p${add_attribute("class", p, 0)}>${escape(service.time)}</p> <h3${add_attribute("class", h3, 0)}>${escape(service.kind)}</h3> <p${add_attribute("class", p, 0)}>${escape(service.subtitle ? service.subtitle : "")}</p></div> <div class="location text-center"><h4 class="mt-2">${escape(service.place_church)}</h4> <a class="font-semibold text-link-primary"${add_attribute("href", service.url, 0)}><!-- HTML_TAG_START -->${service.place_address}<!-- HTML_TAG_END --></a></div> </div>`;
});
const mainhero = "/_app/immutable/assets/mainhero.BcHbuLBA.webp";
const services$1 = [
  {
    id: "1",
    icon: "people",
    name: "St. Boniface, Bonn",
    time: "Sundays, 09:30 am",
    kind: "Eucharist",
    subtitle: "Holy Communion",
    place_church: "St. Paulus Church",
    place_address: "Siegburger Str. 75, \nBonn-Beuel",
    url: "https://www.openstreetmap.org/?mlat=50.74153&mlon=7.13235#map=19/50.74153/7.13235"
  },
  {
    id: "2",
    icon: "people",
    name: "All Saints, Cologne",
    time: "Sundays, 11:45 am",
    kind: "Eucharist",
    subtitle: "Holy Communion",
    place_church: "All Saints Church",
    place_address: "Bonner Str./Lindenallee, \nCologne",
    url: "https://www.openstreetmap.org/?mlat=50.89432&mlon=6.96776#map=19/50.89432/6.96776"
  },
  {
    id: "3",
    icon: "online",
    name: "Online Service",
    time: "Tuesdays, 07:30 pm",
    kind: "Evening Prayer",
    subtitle: "",
    place_church: "Zoom",
    place_address: "Meeting Id: 542 044 8085",
    url: "https://us02web.zoom.us/j/5420448085?pwd=MFVnM1QzTzRsODZEaHVEUU9qZHpVdz09"
  },
  {
    id: "4",
    icon: "people",
    name: "All Saints, Cologne",
    time: "Fridays, 06:00 pm",
    kind: "Evening Prayer",
    subtitle: "Bible Study",
    place_church: "All Saints Church",
    place_address: "Bonner Str./Lindenallee, \nCologne",
    url: "https://www.openstreetmap.org/?mlat=50.89432&mlon=6.96776#map=19/50.89432/6.96776"
  }
];
const servicesData = {
  services: services$1
};
const css = {
  code: ".more-link.svelte-1st84c2{text-align:center;margin:20px}.cool-link.svelte-1st84c2{border-bottom:solid 2px #a07b9f;padding-bottom:3px}.download-item.svelte-1st84c2{display:flex;align-items:center;justify-content:center;width:200px;height:100px;background-color:#a07b9f;color:white;text-align:center;position:relative;cursor:pointer;border-radius:5px;font-weight:600}.circle.svelte-1st84c2{width:60px;height:60px;background-color:whitesmoke;border-radius:50%;display:flex;align-items:center;justify-content:center;position:absolute;top:-30px}.image-container.svelte-1st84c2{max-height:400px;background-size:cover;background-position:center;color:white;text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center;margin:0px;width:100%;pointer-events:none;overflow:scroll}",
  map: null
};
const header = "text-2xl text-justify w-full px-5 font-semibold";
const headerLg = "lg:text-4xl lg:px-10 lg:py-4";
const headerXl = "xl:text-6xl xl:px-10 xl:py-6";
const subTitle = "text-lg text-justify w-full px-5 py-3 ";
const subTitleLg = "lg:text-2xl lg:px-10 lg:py-2";
const subTitleXl = "xl:text-4xl xl:px-10 xl:py-5";
const sectionHeader = "text-xl text-justify w-full px-5 pt-4 font-semibold";
const sectionHeaderMd = "md:text-3xl md:px-10 md:pt-10 md:py-3";
const sectionHeaderXl = "xl:text-4xl xl:px-10 xl:pt-14 xl:py-5 ";
const container = "mb-5";
const containerLg = "lg:mb-10";
const services = "px-5 py-5 grid grid-cols-1 gap-5";
const servicesMd = "md:grid-cols-2 md:gap-8 md:px-10 ";
const servicesXL = "xl:grid xl:grid-cols-4 xl:gap-8 xl:px-5 ";
const itemContainer = "px-5 grid grid-cols-1";
const itemContainerLg = "lg:px-10 lg:grid lg:grid-cols-2 lg:gap-5";
const itemContainerXL = "xl:px-10 xl:grid xl:grid-cols-2 xl:gap-5";
const downloadContainer = "grid grid-cols-2 justify-items-center px-5";
const downloadContainerLg = "lg:grid lg:grid-cols-4 lg:justify-items-center lg:px-5";
const downloadContainerXL = "xl:grid xl:grid-cols-4 xl:justify-items-center xl:px-5";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const servicesArray = servicesData.services.map((service) => {
    if (service.place_address) {
      service.place_address = service.place_address.replace(/\n/g, "<br>");
    }
    return service;
  });
  let user;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  {
    authStore.subscribe((store) => {
      user = store.user;
      console.log(user);
    });
  }
  return `<div class="${escape(null_to_empty(`page-title ${header} ${headerLg} ${headerXl}`), true) + " svelte-1st84c2"}">Anglican Chaplaincy of Bonn and Cologne</div> <div class="${escape(null_to_empty(`sub-title ${subTitle} ${subTitleLg} ${subTitleXl} `), true) + " svelte-1st84c2"}">St. Boniface, Bonn and All Saints, Cologne</div> <div class="image-container svelte-1st84c2" data-svelte-h="svelte-bu64fs"><img${add_attribute("src", mainhero, 0)} alt="main hero"></div>  <div class="${escape(null_to_empty(`sectionHeader ${sectionHeader} ${sectionHeaderMd} ${sectionHeaderXl}`), true) + " svelte-1st84c2"}">Our regular worship services</div> <div class="${escape(null_to_empty(`container ${container} ${containerLg}`), true) + " svelte-1st84c2"}"><div class="${escape(null_to_empty(`services ${services} ${servicesMd} ${servicesXL}`), true) + " svelte-1st84c2"}">${each(servicesArray, (service) => {
    return `${validate_component(ServiceCard, "ServiceCard").$$render($$result, { service }, {}, {})}`;
  })}</div></div> <hr class="mx-auto w-[80%]">  <div class="${escape(null_to_empty(`sectionHeader ${sectionHeader} ${sectionHeaderMd} ${sectionHeaderXl}`), true) + " svelte-1st84c2"}">News and Notices</div> <div class="${escape(null_to_empty(`container ${container} ${containerLg}`), true) + " svelte-1st84c2"}"><div class="${escape(null_to_empty(`item-container ${itemContainer} ${itemContainerLg} ${itemContainerXL}`), true) + " svelte-1st84c2"}">${each(data.news, (item) => {
    return `${validate_component(ItemCard, "ItemCard").$$render($$result, { item, kind: "news" }, {}, {})}`;
  })}</div> <div class="more-link mb-8 svelte-1st84c2" data-svelte-h="svelte-1nwgd6"><a class="cool-link svelte-1st84c2" href="/news">See all news articles</a></div></div> <hr class="mx-auto w-[80%]">  <div class="${escape(null_to_empty(`sectionHeader ${sectionHeader} ${sectionHeaderMd} ${sectionHeaderXl}`), true) + " svelte-1st84c2"}">Upcoming Events</div> <div class="${escape(null_to_empty(`container ${container} ${containerLg}`), true) + " svelte-1st84c2"}"><div class="${escape(null_to_empty(`item-container ${itemContainer} ${itemContainerLg} ${itemContainerXL}`), true) + " svelte-1st84c2"}">${data.events.length > 0 ? `${each(data.events, (event) => {
    return `${validate_component(ItemCard, "ItemCard").$$render($$result, { item: event, kind: "events" }, {}, {})}`;
  })}` : `<p data-svelte-h="svelte-1va327t">Currently there are no events scheduled</p>`}</div> ${data.events.length > 1 ? `<div class="more-link mb-8 svelte-1st84c2" data-svelte-h="svelte-me08z5"><a class="cool-link svelte-1st84c2" href="/news">See all events</a></div>` : ``}</div> <hr class="mx-auto w-[80%]">  <div class="${escape(null_to_empty(`sectionHeader ${sectionHeader} ${sectionHeaderMd} ${sectionHeaderXl}`), true) + " svelte-1st84c2"}">Who we are</div> <div class="single-post" data-svelte-h="svelte-1yq8qkn"><div class="more-link svelte-1st84c2"><a class="cool-link svelte-1st84c2" href="/about">Learn more</a></div></div>  <div class="${escape(null_to_empty(`sectionHeader ${sectionHeader} ${sectionHeaderMd} ${sectionHeaderXl}`), true) + " svelte-1st84c2"}">Safeguarding</div> <div class="single-post" data-svelte-h="svelte-1yq8qkn"><div class="more-link svelte-1st84c2"><a class="cool-link svelte-1st84c2" href="/about">Learn more</a></div></div> <div class="downloads"><h2 class="${escape(null_to_empty(`sectionHeader ${sectionHeader} ${sectionHeaderMd} ${sectionHeaderXl}`), true) + " svelte-1st84c2"}">Downloads</h2></div> <div class="${escape(null_to_empty(`container ${container} ${containerLg}`), true) + " svelte-1st84c2"}"> <div class="${escape(null_to_empty(`download-container ${downloadContainer} ${downloadContainerLg} ${downloadContainerXL}`), true) + " svelte-1st84c2"}"><div class="download-item mt-10 svelte-1st84c2">Weekly Sheet
			<div class="circle svelte-1st84c2"><span class="icon">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      name: "sheet",
      width: "24px",
      height: "24px"
    },
    {},
    {}
  )}</span></div></div> <div class="download-item mt-10 svelte-1st84c2">Newsletter
			<div class="circle svelte-1st84c2"><span class="icon">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      name: "sheet",
      width: "24px",
      height: "24px"
    },
    {},
    {}
  )}</span></div></div></div> </div>`;
});
export {
  Page as default
};
