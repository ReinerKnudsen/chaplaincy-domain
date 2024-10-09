import { c as create_ssr_component, a as compute_rest_props, b as spread, d as escape_object, f as escape_attribute_value, s as subscribe, k as createEventDispatcher, e as escape, v as validate_component } from "./ssr.js";
import "./client.js";
import "firebase/firestore";
import { a as authStore } from "./AuthStore.js";
import { B as Button } from "./Button.js";
import { C as Checkbox } from "./Checkbox.js";
import { L as Label, I as Input } from "./Input.js";
import { twMerge } from "tailwind-merge";
import { T as Textarea, M as MarkdownHelp, S as SlugText, U as UploadImage } from "./UploadImage.js";
const Helper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["helperClass", "color"]);
  let { helperClass = "text-xs font-normal text-gray-500 dark:text-gray-300" } = $$props;
  let { color = "gray" } = $$props;
  const colorClasses = {
    gray: "text-gray-900 dark:text-gray-300",
    green: "text-green-700 dark:text-green-500",
    red: "text-red-700 dark:text-red-500",
    disabled: "text-gray-400 dark:text-gray-500"
  };
  if ($$props.helperClass === void 0 && $$bindings.helperClass && helperClass !== void 0) $$bindings.helperClass(helperClass);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  return `<p${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(helperClass, colorClasses[color], $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</p> `;
});
const css = {
  code: ".form.svelte-1iqkeos{max-width:90%;border:1px solid #eaeaea;border-radius:20px}.explanation.svelte-1iqkeos{margin:10px 4px;font-size:0.8rem}.buttons.svelte-1iqkeos{display:grid;grid-template-columns:1fr 1fr 1fr;gap:80px;justify-content:space-between;width:100%;padding:0 50px}",
  map: null
};
const EventForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authStore, $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  let { thisEvent } = $$props;
  createEventDispatcher();
  let newEvent = {
    author: $authStore.name,
    title: "",
    subtitle: "",
    description: "",
    slug: "",
    startdate: "",
    starttime: "",
    enddate: "",
    endtime: "",
    location: "",
    condition: "",
    publishdate: "",
    publishtime: "",
    publishDateTime: "",
    unpublishdate: "",
    unpublishtime: "",
    unpublishDateTime: "",
    comments: "",
    image: "",
    imageAlt: ""
  };
  let state = "save";
  let hasImage = false;
  if (thisEvent) {
    newEvent = thisEvent;
    state = "update";
  }
  if ($$props.thisEvent === void 0 && $$bindings.thisEvent && thisEvent !== void 0) $$bindings.thisEvent(thisEvent);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (newEvent.image) {
        hasImage = true;
      } else {
        hasImage = false;
      }
    }
    $$rendered = `<div class="form bg-white-primary svelte-1iqkeos"><h1 class="mx-10">${escape(state === "update" ? "Edit event" : "Create new event")}</h1> <form class="mx-10" enctype="multipart/form-data"> <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "title",
        class: "mb-2 mt-8 text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `Event Titel *`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "title",
        placeholder: "Event Title",
        required: true,
        value: newEvent.title
      },
      {
        value: ($$value) => {
          newEvent.title = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "subtitle",
        class: "mb-2 mt-8 text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `Sub Title`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "subtitle",
        placeholder: "Sub Title",
        value: newEvent.subtitle
      },
      {
        value: ($$value) => {
          newEvent.subtitle = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div><div class="flex-rows flex justify-between">${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "description",
        class: "mb-2 mt-8 self-center text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `Description *`;
        }
      }
    )} <p class="self-end text-right text-base"><strong>${escape(newEvent.description.length)}</strong> characters.</p></div> ${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        id: "description",
        placeholder: "Description text",
        rows: "14",
        name: "description",
        wrap: "hard",
        value: newEvent.description
      },
      {
        value: ($$value) => {
          newEvent.description = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> ${validate_component(MarkdownHelp, "MarkdownHelp").$$render($$result, { text: newEvent.description }, {}, {})} ${validate_component(SlugText, "SlugText").$$render(
      $$result,
      {
        text: newEvent.description,
        slugText: newEvent.slug
      },
      {},
      {}
    )}  <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "startdate",
        class: "mb-2 mt-8 text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `Start Date *`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "date",
        id: "startdate",
        required: true,
        value: newEvent.startdate
      },
      {
        value: ($$value) => {
          newEvent.startdate = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <p class="explanation svelte-1iqkeos" data-svelte-h="svelte-1nyyu06">Please enter all dates as dd mm yyyy.</p>  <div>${validate_component(Label, "Label").$$render($$result, { class: "mb-2 mt-8 text-xl font-semibold" }, {}, {
      default: () => {
        return `Start Time *`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "time",
        id: "starttime",
        required: true,
        disabled: !newEvent.startdate,
        value: newEvent.starttime
      },
      {
        value: ($$value) => {
          newEvent.starttime = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "enddate",
        class: "mb-2 mt-8 text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `End Date`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "date",
        id: "enddate",
        value: newEvent.enddate
      },
      {
        value: ($$value) => {
          newEvent.enddate = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div>${validate_component(Label, "Label").$$render($$result, { class: "mb-2 mt-8 text-xl font-semibold" }, {}, {
      default: () => {
        return `End Time`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "time",
        id: "endtime",
        disabled: !newEvent.enddate,
        value: newEvent.endtime
      },
      {
        value: ($$value) => {
          newEvent.endtime = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div class="form-area"><div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "Location",
        class: "mb-2 mt-8 text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `Location *`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "location",
        required: true,
        value: newEvent.location
      },
      {
        value: ($$value) => {
          newEvent.location = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>  <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "conditions",
        class: "mb-2 mt-8 text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `Conditions`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "conditions",
        value: newEvent.condition
      },
      {
        value: ($$value) => {
          newEvent.condition = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="mt-1 p-1">${validate_component(Checkbox, "Checkbox").$$render(
      $$result,
      {
        "aria-describedby": "helper-checkbox-text",
        id: "condition"
      },
      {},
      {
        default: () => {
          return `Default`;
        }
      }
    )} ${validate_component(Helper, "Helper").$$render(
      $$result,
      {
        id: "helper-checkbox-text",
        class: "ps-6"
      },
      {},
      {
        default: () => {
          return `&quot;Entry is free, donations are welcome&quot;`;
        }
      }
    )}</div></div>  <div>${validate_component(Label, "Label").$$render(
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
        value: newEvent.publishdate
      },
      {
        value: ($$value) => {
          newEvent.publishdate = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div>${validate_component(Label, "Label").$$render($$result, { class: "mb-2 mt-8 text-xl font-semibold" }, {}, {
      default: () => {
        return `Publish Time`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "time",
        id: "publishtime",
        disabled: !newEvent.publishdate,
        value: newEvent.publishtime
      },
      {
        value: ($$value) => {
          newEvent.publishtime = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="explanation svelte-1iqkeos" data-svelte-h="svelte-115jfcx">If you don&#39;t select a publish time, it will be set to 09:00 of the selected day.</p></div>  <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "unpublishdate",
        class: "mb-2 mt-8 text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `Unpublish Date`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "date",
        id: "unpublishdate",
        title: "Select a date when the event shall be unpublished (optional)",
        value: newEvent.unpublishdate
      },
      {
        value: ($$value) => {
          newEvent.unpublishdate = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="explanation svelte-1iqkeos" data-svelte-h="svelte-igohu6">If you don&#39;t set a date and time here the event will automatically be unpublished at the
				given start time.</p></div>  <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "unpublishtime",
        class: "mb-2 mt-8 text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `Unpublish Time`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "time",
        id: "unpublishtime",
        title: "Select a time when the event shall be unpublished. (optional) ",
        disabled: !newEvent.unpublishdate,
        value: newEvent.unpublishtime
      },
      {
        value: ($$value) => {
          newEvent.unpublishtime = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div class="col-span-2">${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "comments",
        class: "mb-2 mt-8 text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `Comments`;
        }
      }
    )} ${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        id: "comments",
        placeholder: "Comments",
        rows: "10",
        name: "comments",
        title: "If there is anything people should need to know about this event? Put it here. (Parking instructions, public transport connections...)",
        value: newEvent.comments
      },
      {
        value: ($$value) => {
          newEvent.comments = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div>${validate_component(Label, "Label").$$render($$result, { class: "mb-2 mt-8 text-xl font-semibold" }, {}, {
      default: () => {
        return `Image`;
      }
    })} <div class="flex items-center justify-center">${newEvent.image ? `${validate_component(UploadImage, "UploadImage").$$render($$result, { imageUrl: newEvent.image }, {}, {})}` : `${validate_component(UploadImage, "UploadImage").$$render($$result, {}, {}, {})}`}</div></div> <div class="imageMeta" ${!hasImage ? "hidden" : ""}><div class="imageAlt"><div>${validate_component(Label, "Label").$$render($$result, { class: "mb-2 mt-8 text-xl font-semibold" }, {}, {
      default: () => {
        return `Image Alt text *`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "imageAlt",
        required: hasImage,
        value: newEvent.imageAlt
      },
      {
        value: ($$value) => {
          newEvent.imageAlt = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="explanation svelte-1iqkeos" data-svelte-h="svelte-l47qbc">This text helps interpreting the image for visually impaired users.</p></div></div> <div class="imageCaption mt-10"><div>${validate_component(Label, "Label").$$render(
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
        disabled: !newEvent.image,
        placeholder: "Image by ",
        value: newEvent.imageCaption
      },
      {
        value: ($$value) => {
          newEvent.imageCaption = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="explanation svelte-1iqkeos" data-svelte-h="svelte-b7wutc">This text will be displayed below the image.</p></div></div></div>  <div class="buttons col-span-2 mb-20 mt-10 svelte-1iqkeos">${validate_component(Button, "Button").$$render(
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
        color: "light"
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
        disabled: newEvent.length === 0
      },
      {},
      {
        default: () => {
          return `${escape(state === "update" ? "Update" : "Save")} event`;
        }
      }
    )}</div></form></div> <div data-svelte-h="svelte-1i36499"> </div>`;
  } while (!$$settled);
  $$unsubscribe_authStore();
  return $$rendered;
});
export {
  EventForm as E
};
