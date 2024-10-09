import { c as create_ssr_component, i as add_attribute, e as escape, s as subscribe, v as validate_component, h as each } from "../../../../chunks/ssr.js";
import { w as writable } from "../../../../chunks/index.js";
import { I as ItemCard } from "../../../../chunks/ItemCard.js";
import { P as PageHeader } from "../../../../chunks/PageHeader.js";
const container = "mb-10 grid grid-flow-row gap-5 rounded-2xl border border-slate-200 bg-slate-100 p-4 shadow-xl";
const containerMd = "md:mx-auto md:grid-cols-2 ";
const containerXl = " ";
const image = "rounded-xl max-h-[p-200px]";
const imageLg = "lg:max-h-[400px]";
const imageXl = "xl:max-h-[400px]";
const ItemCardFav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { item } = $$props;
  let { kind } = $$props;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0) $$bindings.item(item);
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0) $$bindings.kind(kind);
  return `<div${add_attribute("class", `container ${container} ${containerMd} ${containerXl}`, 0)}><div class="image-container"><img${add_attribute("class", `image ${image} ${imageLg} ${imageXl}`, 0)}${add_attribute("src", item.data.image, 0)}${add_attribute("alt", item.data.imageAlt, 0)}></div> <div class="text-area bg-white mr-auto flex flex-col justify-between gap-2 p-2"><div class="headline text-left text-lg font-semibold"><a href="${"/" + escape(kind, true) + "/" + escape(item.id, true)}">${escape(item.data.title)}</a></div> <div class="metadata text-right text-lg text-slate-400"><span>${escape(item.data.author)}, ${escape(item.data.publishdate)}</span></div> <div class="news-text min-h-[50%] text-left text-base">${escape(item.data.slug)}</div> <div class="read-more mb-10 text-right font-medium text-link-primary xl:mb-0"><a href="${"/news/" + escape(item.id, true)}">Read more...</a></div></div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sortItems, $$unsubscribe_sortItems;
  let $sortDirection, $$unsubscribe_sortDirection;
  let $sortKey, $$unsubscribe_sortKey;
  let { data } = $$props;
  let news = data.news;
  let favNews = news[0];
  let newsItems = news.slice(1);
  const sortKey = writable("publishdate");
  $$unsubscribe_sortKey = subscribe(sortKey, (value) => $sortKey = value);
  const sortDirection = writable(-1);
  $$unsubscribe_sortDirection = subscribe(sortDirection, (value) => $sortDirection = value);
  const sortItems = writable(news.slice());
  $$unsubscribe_sortItems = subscribe(sortItems, (value) => $sortItems = value);
  const headerData = {
    photoName: "Reiner Knudsen",
    photoUrl: "https://unsplash.com/@reinerknudsen",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-bncgn.appspot.com/o/images%2Fstock%2Fnews.jpg?alt=media&token=c783cad1-946a-4a47-9917-56c24bb74872",
    title: "News and Notices"
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  {
    {
      const key = $sortKey;
      const direction = $sortDirection;
      const sorted = [...$sortItems].sort((a, b) => {
        const aVal = a.data[key];
        const bVal = b.data[key];
        if (aVal < bVal) {
          return -direction;
        } else if (aVal > bVal) {
          return direction;
        }
        return 0;
      });
      sortItems.set(sorted);
      sorted[0];
    }
  }
  $$unsubscribe_sortItems();
  $$unsubscribe_sortDirection();
  $$unsubscribe_sortKey();
  return `${validate_component(PageHeader, "PageHeader").$$render($$result, { headerData, textStyle: "white" }, {}, {})} <div class="flex flex-col">${validate_component(ItemCardFav, "ItemCardFav").$$render($$result, { item: favNews, kind: "news" }, {}, {})} <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">${each(newsItems, (newsItem) => {
    return `${validate_component(ItemCard, "ItemCard").$$render($$result, { item: newsItem, kind: "news" }, {}, {})}`;
  })}</div> </div>`;
});
export {
  Page as default
};
