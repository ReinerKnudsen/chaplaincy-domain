import { c as create_ssr_component, s as subscribe, k as createEventDispatcher, e as escape, v as validate_component } from "./ssr.js";
import "./client.js";
import { B as Button } from "./Button.js";
import { L as Label, I as Input } from "./Input.js";
import { T as Textarea, M as MarkdownHelp, S as SlugText, U as UploadImage } from "./UploadImage.js";
import { a as authStore } from "./AuthStore.js";
const css = {
  code: ".form.svelte-1l6h2z6{margin:40px auto;padding:20px 20px;max-width:90%;border:1px solid #eaeaea;border-radius:20px}.explanation.svelte-1l6h2z6{margin:10px 4px;font-size:0.8rem}.buttons.svelte-1l6h2z6{display:grid;grid-template-columns:1fr 1fr 1fr;gap:50px;justify-content:space-between;width:100%;padding:0 50px}",
  map: null
};
const NewsForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authStore, $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  let { thisItem } = $$props;
  createEventDispatcher();
  const author = $authStore.name;
  let newItem = {
    title: "",
    author,
    text: "",
    slug: "",
    publishdate: "",
    publishtime: "",
    image: "",
    imageAlt: "",
    imageCaption: "",
    tags: ""
  };
  let docRef;
  let state = "save";
  if (thisItem) {
    newItem = thisItem;
    state = "update";
  }
  if ($$props.thisItem === void 0 && $$bindings.thisItem && thisItem !== void 0) $$bindings.thisItem(thisItem);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="form bg-white-primary svelte-1l6h2z6"><h1 class="">${escape(thisItem ? "Edit news item" : "Create news item")}</h1> <form id="form-container" enctype="multipart/form-data"> <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "title",
        class: "mb-2 mt-8 text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `News Headline *`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "title",
        placeholder: "News Title",
        required: true,
        value: newItem.title
      },
      {
        value: ($$value) => {
          newItem.title = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "author",
        class: "mb-2 mt-8 text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `Author`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "author",
        disabled: true,
        value: newItem.author
      },
      {
        value: ($$value) => {
          newItem.author = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div><div class="flex flex-row justify-between">${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "news-text",
        class: "mb-2 mt-8 self-center text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `News text *`;
        }
      }
    )} <p class="explanation self-end text-right svelte-1l6h2z6"><strong>${escape(newItem.text.length)}</strong> characters.</p></div> ${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        id: "news-text",
        placeholder: "News text",
        rows: "8",
        name: "news-text",
        wrap: "hard",
        value: newItem.text
      },
      {
        value: ($$value) => {
          newItem.text = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> ${validate_component(MarkdownHelp, "MarkdownHelp").$$render($$result, { text: newItem.text }, {}, {})} ${validate_component(SlugText, "SlugText").$$render(
      $$result,
      {
        text: newItem.text,
        slugText: newItem.slug
      },
      {},
      {}
    )}  <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "publishdate",
        class: "mb-2 mt-8 text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `Publish Date *`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "date",
        id: "publishdate",
        required: true,
        value: newItem.publishdate
      },
      {
        value: ($$value) => {
          newItem.publishdate = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="explanation svelte-1l6h2z6" data-svelte-h="svelte-1wixzxg">If you don&#39;t select a publish date, it will be set to today.</p></div>  <div>${validate_component(Label, "Label").$$render($$result, { class: "mb-2 mt-8 text-xl font-semibold" }, {}, {
      default: () => {
        return `Publish Time`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "time",
        id: "publishtime",
        disabled: !newItem.publishdate,
        value: newItem.publishtime
      },
      {
        value: ($$value) => {
          newItem.publishtime = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="explanation svelte-1l6h2z6" data-svelte-h="svelte-115jfcx">If you don&#39;t select a publish time, it will be set to 09:00 of the selected day.</p></div>  <div>${newItem.image ? `${validate_component(Label, "Label").$$render($$result, { class: "mb-2 mt-8 text-xl font-semibold" }, {}, {
      default: () => {
        return `Uploaded image`;
      }
    })} ${validate_component(UploadImage, "UploadImage").$$render($$result, { imageUrl: newItem.image }, {}, {})}` : `${validate_component(Label, "Label").$$render($$result, { class: "mb-2 mt-8 text-xl font-semibold" }, {}, {
      default: () => {
        return `Upload image`;
      }
    })} ${validate_component(UploadImage, "UploadImage").$$render($$result, {}, {}, {})}`}</div> <div class="imageMeta"><div class="imageAlt"><div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "imageAlt",
        class: "mb-2 mt-8 text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `Image Alt text *`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "imageAlt",
        disabled: !newItem.image,
        required: true,
        value: newItem.imageAlt
      },
      {
        value: ($$value) => {
          newItem.imageAlt = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="explanation svelte-1l6h2z6" data-svelte-h="svelte-l47qbc">This text helps interpreting the image for visually impaired users.</p></div></div> <div class="imageCaption mt-10"><div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "imageCaption",
        class: "mb-2 mt-8 text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `Image caption`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "imageCaption",
        disabled: !newItem.image,
        placeholder: "Image by ",
        value: newItem.imageCaption
      },
      {
        value: ($$value) => {
          newItem.imageCaption = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="explanation svelte-1l6h2z6" data-svelte-h="svelte-b7wutc">This text will be displayed below the image.</p></div></div></div>  <div class="buttons col-span-2 mb-20 mt-10 svelte-1l6h2z6">${validate_component(Button, "Button").$$render(
      $$result,
      {
        class: "font-semibold",
        type: "reset",
        color: "light"
      },
      {},
      {
        default: () => {
          return `Cancel`;
        }
      }
    )} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        class: "bg-black-40 text-white-primary",
        type: "reset",
        color: "light",
        disabled: docRef
      },
      {},
      {
        default: () => {
          return `Empty form`;
        }
      }
    )} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        class: "bg-primary-100  font-semibold text-white-primary",
        type: "submit",
        disabled: newItem.length === 0
      },
      {},
      {
        default: () => {
          return `${escape(state === "update" ? "Update" : "Save")} news`;
        }
      }
    )}</div></form></div> <div data-svelte-h="svelte-1i36499"> </div>`;
  } while (!$$settled);
  $$unsubscribe_authStore();
  return $$rendered;
});
export {
  NewsForm as N
};
