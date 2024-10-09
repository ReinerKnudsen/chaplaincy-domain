import { c as create_ssr_component, a as compute_rest_props, g as getContext, v as validate_component, i as add_attribute, b as spread, d as escape_object, f as escape_attribute_value, e as escape, l as compute_slots, k as createEventDispatcher, o as null_to_empty } from "./ssr.js";
import { B as Button } from "./Button.js";
import { W as Wrapper, L as Label } from "./Input.js";
import { twMerge } from "tailwind-merge";
import "marked";
import { I as Icon } from "./Icon.js";
import "firebase/storage";
import "./firebaseConfig.js";
const Textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value", "wrappedClass", "unWrappedClass", "innerWrappedClass"]);
  let $$slots = compute_slots(slots);
  const background = getContext("background");
  let { value = void 0 } = $$props;
  let { wrappedClass = "block w-full text-sm border-0 px-0 bg-inherit dark:bg-inherit focus:outline-none focus:ring-0" } = $$props;
  let { unWrappedClass = "p-2.5 text-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500" } = $$props;
  let { innerWrappedClass = "py-2 px-4 bg-white dark:bg-gray-800" } = $$props;
  let wrapped;
  let wrapperClass;
  let textareaClass;
  const headerClass = (header) => twMerge(header ? "border-b" : "border-t", "py-2 px-3 border-gray-200 dark:border-gray-600");
  let innerWrapperClass;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.wrappedClass === void 0 && $$bindings.wrappedClass && wrappedClass !== void 0) $$bindings.wrappedClass(wrappedClass);
  if ($$props.unWrappedClass === void 0 && $$bindings.unWrappedClass && unWrappedClass !== void 0) $$bindings.unWrappedClass(unWrappedClass);
  if ($$props.innerWrappedClass === void 0 && $$bindings.innerWrappedClass && innerWrappedClass !== void 0) $$bindings.innerWrappedClass(innerWrappedClass);
  wrapped = $$slots.header || $$slots.footer;
  wrapperClass = twMerge(
    "w-full rounded-lg",
    background ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700",
    "text-gray-900 dark:placeholder-gray-400 dark:text-white ",
    "border border-gray-200 dark:border-gray-600",
    $$props.class
  );
  textareaClass = wrapped ? wrappedClass : twMerge(wrapperClass, unWrappedClass);
  innerWrapperClass = twMerge(innerWrappedClass, $$slots.footer ? "" : "rounded-b-lg", $$slots.header ? "" : "rounded-t-lg");
  return `${validate_component(Wrapper, "Wrapper").$$render($$result, { show: wrapped, class: wrapperClass }, {}, {
    default: () => {
      return `${$$slots.header ? `<div${add_attribute("class", headerClass(true), 0)}>${slots.header ? slots.header({}) : ``}</div>` : ``} ${validate_component(Wrapper, "Wrapper").$$render($$result, { show: wrapped, class: innerWrapperClass }, {}, {
        default: () => {
          return `<textarea${spread(
            [
              escape_object($$restProps),
              {
                class: escape_attribute_value(textareaClass)
              }
            ],
            {}
          )}>${escape(value || "")}</textarea>`;
        }
      })} ${$$slots.footer ? `<div${add_attribute("class", headerClass(false), 0)}>${slots.footer ? slots.footer({}) : ``}</div>` : ``}`;
    }
  })} `;
});
const MAX_SLUG_TEXT = 250;
const MAX_IMAGE_SIZE = 6e4;
const SlugText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text = "" } = $$props;
  let { slugText = "" } = $$props;
  let editSlug = false;
  const dispatch = createEventDispatcher();
  if ($$props.text === void 0 && $$bindings.text && text !== void 0) $$bindings.text(text);
  if ($$props.slugText === void 0 && $$bindings.slugText && slugText !== void 0) $$bindings.slugText(slugText);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (slugText) {
        dispatch("slugChange", slugText);
      }
    }
    $$rendered = `<div><div class="flex flex-row justify-between">${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "slug",
        class: "mb-2 mt-8 self-center text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `Short text (slug)`;
        }
      }
    )} <p class="explanation self-end text-right"><strong>${escape(slugText.length)} of ${escape(MAX_SLUG_TEXT)}</strong> characters.</p></div> ${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        class: "disabled:border-0 disabled:bg-white-primary disabled:text-slate-400",
        id: "slug",
        rows: "3",
        name: "slug",
        maxlength: "MAX_SLUG_TEXT",
        required: true,
        disabled: !editSlug,
        value: slugText
      },
      {
        value: ($$value) => {
          slugText = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="mt-2 flex justify-between"><div class="mx-1 my-2 text-sm" data-svelte-h="svelte-1hwp6ye">The slug text is a short version of your text to be shown in cards view. <br>The system will
			suggest a slug text for you which you can change.</div> ${validate_component(Button, "Button").$$render(
      $$result,
      {
        class: "bg-primary-100 text-white-primary disabled:bg-primary-40 disabled:text-slate-600",
        disabled: editSlug
      },
      {},
      {
        default: () => {
          return `${escape(slugText.length === 0 ? "Create" : "Change")} slug text`;
        }
      }
    )}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
const MarkdownHelp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text = "" } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0) $$bindings.text(text);
  return ` <div class="mt-2 border border-green-40"><div class="flex w-full flex-row flex-nowrap items-center justify-between bg-green-50">${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "h-8 w-full text-lg font-semibold"
    },
    {},
    {
      default: () => {
        return `Formatting help`;
      }
    }
  )} ${validate_component(Button, "Button").$$render($$result, { class: "text-lg font-semibold" }, {}, {
    default: () => {
      return `${`${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          name: "chevronDown",
          width: "18px",
          height: "18px"
        },
        {},
        {}
      )}`}`;
    }
  })}</div> ${``}</div>  <div class="mt-2 border border-green-40"><div class="flex w-full flex-row flex-nowrap items-center justify-between bg-green-50">${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "h-8 w-full text-lg font-semibold"
    },
    {},
    {
      default: () => {
        return `Preview`;
      }
    }
  )} ${validate_component(Button, "Button").$$render($$result, { class: "text-lg font-semibold" }, {}, {
    default: () => {
      return `${`${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          name: "chevronDown",
          width: "18px",
          height: "18px"
        },
        {},
        {}
      )}`}`;
    }
  })}</div> ${``}</div>`;
});
const css = {
  code: ".image-container.svelte-1mvyypx{width:400px}",
  map: null
};
let moduleWidth = "w-[400px]";
const UploadImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { imageUrl } = $$props;
  createEventDispatcher();
  const authorizedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  if ($$props.imageUrl === void 0 && $$bindings.imageUrl && imageUrl !== void 0) $$bindings.imageUrl(imageUrl);
  $$result.css.add(css);
  return `${!imageUrl ? `<form class="${escape(null_to_empty(moduleWidth), true) + " svelte-1mvyypx"}"><label class="${escape(null_to_empty(moduleWidth + "border-1 group flex h-[300px] flex-col rounded-lg bg-slate-100 p-10 text-center "), true) + " svelte-1mvyypx"}"><div class="flex h-full w-full flex-col items-center justify-center text-center" data-svelte-h="svelte-1bj008i"><p class="pointer-none font-semibold text-gray-600"><span class="text-sm">Click here to select an image</span></p></div> <input type="file" id="uploadFile"${add_attribute("accept", authorizedExtensions, 0)} class="hidden"></label> <div class="mt-3 text-center text-sm">(jpeg, jpg, png, webp, max ${escape(MAX_IMAGE_SIZE / 1e3)}KB)</div> ${``}</form>` : `<div class="image-container svelte-1mvyypx"><img class="w-full"${add_attribute("src", imageUrl, 0)} alt="selectedFile"> <div class="col-span-2 text-center">${validate_component(Button, "Button").$$render($$result, { class: "mt-5 w-6/12" }, {}, {
    default: () => {
      return `Change`;
    }
  })}</div></div>`}`;
});
export {
  MarkdownHelp as M,
  SlugText as S,
  Textarea as T,
  UploadImage as U
};
