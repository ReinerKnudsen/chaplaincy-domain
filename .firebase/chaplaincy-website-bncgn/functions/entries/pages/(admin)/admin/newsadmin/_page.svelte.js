import { c as create_ssr_component, s as subscribe, v as validate_component, h as each, e as escape } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import { w as writable } from "../../../../../chunks/index.js";
import { p as pathName } from "../../../../../chunks/NavigationStore.js";
import "../../../../../chunks/client.js";
import "firebase/firestore";
import "../../../../../chunks/firebaseConfig.js";
import { B as Button } from "../../../../../chunks/Button.js";
import { M as Modal } from "../../../../../chunks/Modal.js";
const css = {
  code: "table.svelte-2ligjc{display:grid;border-collapse:collapse;min-width:100%;grid-template-columns:minmax(150px, 3fr)\n			minmax(150px, 4fr)\n			minmax(130px, 1fr)\n			minmax(150px, 1fr)\n			minmax(100px, 1fr)}thead.svelte-2ligjc,tbody.svelte-2ligjc,tr.svelte-2ligjc{display:contents}th.svelte-2ligjc{cursor:pointer;background-color:white;font-size:0.875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;text-align:left;padding-top:0.8rem;padding-bottom:0.8rem;padding-left:0.5rem}th.svelte-2ligjc,td.svelte-2ligjc{font-size:0.875rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;--tw-text-opacity:1;color:rgb(71 85 105 / var(--tw-text-opacity))}td.svelte-2ligjc{padding-top:1.2rem;padding-bottom:1.2rem;padding-left:0.5rem;border-bottom-width:1px;--tw-border-opacity:1;border-color:rgb(203 213 225 / var(--tw-border-opacity))}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sortItems, $$unsubscribe_sortItems;
  let $sortDirection, $$unsubscribe_sortDirection;
  let $sortKey, $$unsubscribe_sortKey;
  let $$unsubscribe_page;
  let $$unsubscribe_pathName;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_pathName = subscribe(pathName, (value) => value);
  let { data } = $$props;
  let news = data.news;
  let showModal = false;
  const sortKey = writable("title");
  $$unsubscribe_sortKey = subscribe(sortKey, (value) => $sortKey = value);
  const sortDirection = writable(1);
  $$unsubscribe_sortDirection = subscribe(sortDirection, (value) => $sortDirection = value);
  const sortItems = writable(news.slice());
  $$unsubscribe_sortItems = subscribe(sortItems, (value) => $sortItems = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
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
      }
    }
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "md",
        autoclose: true,
        open: showModal
      },
      {
        open: ($$value) => {
          showModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="rounded-xl bg-white-primary p-10 text-center"><h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400" data-svelte-h="svelte-m0rtnj">Deleting an item can not be undone.
			<p><strong>Do you really want to delete this item?</strong></p></h3> <div class="flex justify-between px-36">${validate_component(Button, "Button").$$render($$result, { color: "alternative" }, {}, {
            default: () => {
              return `Cancel`;
            }
          })} ${validate_component(Button, "Button").$$render(
            $$result,
            {
              color: "red",
              class: " me-2 text-white-primary"
            },
            {},
            {
              default: () => {
                return `Delete`;
              }
            }
          )}</div></div>`;
        }
      }
    )} <div><h1 data-svelte-h="svelte-1hqhc9z">News</h1> <div class="mb-6 grid grid-cols-12 items-center gap-2 lg:gap-20"><div class="col-span-9"><input class="w-full rounded-lg" placeholder="Search (not yet active)" type="text"></div> <div class="col-span-3 justify-self-end">${validate_component(Button, "Button").$$render(
      $$result,
      {
        class: "bg-primary-100 text-lg font-semibold text-white-primary"
      },
      {},
      {
        default: () => {
          return `Create News`;
        }
      }
    )}</div></div> <div class="w-full overflow-scroll"><table class="svelte-2ligjc"><thead class="svelte-2ligjc"><tr class="svelte-2ligjc"><th class="svelte-2ligjc" data-svelte-h="svelte-z4t3xd">Title</th> <th class="svelte-2ligjc" data-svelte-h="svelte-e3n0s4">News Text</th> <th class="svelte-2ligjc" data-svelte-h="svelte-c02ptb">Publish date</th> <th class="svelte-2ligjc" data-svelte-h="svelte-oqri5j">Author</th> <th class="svelte-2ligjc" data-svelte-h="svelte-1efcpv6">Edit</th></tr></thead> <tbody class="svelte-2ligjc">${each($sortItems, (item) => {
      return `<tr class="svelte-2ligjc"><td class="svelte-2ligjc">${escape(item.data.title)}</td> <td class="svelte-2ligjc">${escape(item.data.text)}</td> <td class="svelte-2ligjc">${escape(item.data.publishdate)}</td> <td class="svelte-2ligjc">${escape(item.data.author)}</td> <td class="svelte-2ligjc"><div class="flex justify-between"><button class="text-primary-600 dark:text-primary-500 font-medium hover:underline" data-svelte-h="svelte-cyr39g">Edit</button>
								|
								<button class="text-primary-600 dark:text-primary-500 font-medium hover:underline" data-svelte-h="svelte-1rsd7s0">Delete</button> </div></td> </tr>`;
    })}</tbody></table></div> </div>`;
  } while (!$$settled);
  $$unsubscribe_sortItems();
  $$unsubscribe_sortDirection();
  $$unsubscribe_sortKey();
  $$unsubscribe_page();
  $$unsubscribe_pathName();
  return $$rendered;
});
export {
  Page as default
};
