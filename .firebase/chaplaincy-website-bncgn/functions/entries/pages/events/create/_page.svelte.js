import { c as create_ssr_component, f as compute_rest_props, h as spread, i as escape_object, j as escape_attribute_value, g as getContext, v as validate_component, a as add_attribute, e as escape, d as compute_slots, s as subscribe } from "../../../../chunks/ssr.js";
import { W as Wrapper, L as Label, I as Input, C as Checkbox, B as Button } from "../../../../chunks/Input.js";
import { twMerge } from "tailwind-merge";
import { s as storageRef } from "../../../../chunks/firebaseConfig.js";
import "firebase/firestore";
import { w as writable } from "../../../../chunks/index.js";
import { ref } from "firebase/storage";
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
  if ($$props.helperClass === void 0 && $$bindings.helperClass && helperClass !== void 0)
    $$bindings.helperClass(helperClass);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
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
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.wrappedClass === void 0 && $$bindings.wrappedClass && wrappedClass !== void 0)
    $$bindings.wrappedClass(wrappedClass);
  if ($$props.unWrappedClass === void 0 && $$bindings.unWrappedClass && unWrappedClass !== void 0)
    $$bindings.unWrappedClass(unWrappedClass);
  if ($$props.innerWrappedClass === void 0 && $$bindings.innerWrappedClass && innerWrappedClass !== void 0)
    $$bindings.innerWrappedClass(innerWrappedClass);
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
const initialFormState = {
  title: "",
  subtitle: "",
  description: "",
  slug: "",
  startdate: null,
  starttime: null,
  enddate: null,
  endtime: null,
  location: "",
  condition: "",
  publishdate: null,
  publishtime: null,
  unpublishdate: null,
  unpublishtime: null,
  comments: ""
};
const FormStore = writable(initialFormState);
const UploadFile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = "" } = $$props;
  let { size = 0 } = $$props;
  if (type === "")
    ;
  else {
    ref(storageRef, "type");
  }
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(Label, "Label").$$render($$result, { for: "fileupload", class: "mb-2" }, {}, {
    default: () => {
      return `File Upload`;
    }
  })} <div class="flex h-full w-full items-center justify-center pb-16"><label for="dropzone-file" class="dark:hover:bg-bray-800 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"><div class="flex flex-col items-center justify-center pb-4 pt-4" data-svelte-h="svelte-zd9bmv"><svg class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"></path></svg> <p class="text-lg text-gray-500 dark:text-gray-400">Please upload a file to decorate your event with.</p> <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p> <p class="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 800x400px)</p></div> <input id="dropzone-file" type="file" class="hidden" accept=".png,.jpg"></label></div>`;
});
const css = {
  code: ".form.svelte-1jgoteo{margin:40px auto;padding:20px 20px;max-width:90%;border:1px solid #eaeaea;border-radius:20px}.form-container.svelte-1jgoteo{display:grid;grid-template-columns:1fr 1fr;gap:30px 20px}.explanation.svelte-1jgoteo{margin:10px 4px;font-size:0.8rem}.buttons.svelte-1jgoteo{display:grid;grid-template-columns:1fr 1fr;align-items:end;justify-content:end;gap:50px;padding:0 50px}",
  map: null
};
let description = "";
let slugtext = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $FormStore, $$unsubscribe_FormStore;
  $$unsubscribe_FormStore = subscribe(FormStore, (value) => $FormStore = value);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="form svelte-1jgoteo"><h1 data-svelte-h="svelte-1ymb9cy">Create new event</h1>  <form class="form-container svelte-1jgoteo" id="form-container" enctype="multipart/form-data"><div>${validate_component(Label, "Label").$$render($$result, { for: "title", class: "mb-2" }, {}, {
      default: () => {
        return `Event Titel *`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "title",
        placeholder: "Event Title",
        required: true,
        value: $FormStore.title
      },
      {
        value: ($$value) => {
          $FormStore.title = $$value;
          $$settled = false;
        }
      },
      {}
    )} </div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "subtitle", class: "mb-2" }, {}, {
      default: () => {
        return `Sub Title`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "subtitle",
        placeholder: "Sub Title",
        value: $FormStore.subtitle
      },
      {
        value: ($$value) => {
          $FormStore.subtitle = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "description", class: "mb-2" }, {}, {
      default: () => {
        return `Description *`;
      }
    })} ${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        id: "description",
        placeholder: "Description text",
        rows: "8",
        name: "description",
        value: $FormStore.description
      },
      {
        value: ($$value) => {
          $FormStore.description = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="explanation text-right svelte-1jgoteo"><strong>${escape(description.length)}</strong> characters.</p></div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "slug", class: "mb-2" }, {}, {
      default: () => {
        return `Short description (slug)`;
      }
    })} ${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        id: "slug",
        placeholder: slugtext,
        rows: "2",
        name: "slug",
        maxlength: "100",
        required: true,
        value: $FormStore.slug
      },
      {
        value: ($$value) => {
          $FormStore.slug = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="explanation text-right svelte-1jgoteo"><strong>${escape(slugtext.length)} of 100</strong> characters.</p></div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "startdate", class: "mb-2" }, {}, {
      default: () => {
        return `Start Date *`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "date",
        id: "startdate",
        required: true,
        value: $FormStore.startdate
      },
      {
        value: ($$value) => {
          $FormStore.startdate = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "starttime", class: "mb-2" }, {}, {
      default: () => {
        return `Start Time *`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "time",
        id: "starttime",
        required: true,
        value: $FormStore.starttime
      },
      {
        value: ($$value) => {
          $FormStore.starttime = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "enddate", class: "mb-2" }, {}, {
      default: () => {
        return `End Date`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "date",
        id: "enddate",
        value: $FormStore.enddate
      },
      {
        value: ($$value) => {
          $FormStore.enddate = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "endtime", class: "mb-2" }, {}, {
      default: () => {
        return `End Time`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "time",
        id: "endtime",
        value: $FormStore.endtime
      },
      {
        value: ($$value) => {
          $FormStore.endtime = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div class="form-area"><div>${validate_component(Label, "Label").$$render($$result, { for: "Location", class: "mb-2" }, {}, {
      default: () => {
        return `Location *`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "location",
        required: true,
        value: $FormStore.location
      },
      {
        value: ($$value) => {
          $FormStore.location = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "conditions", class: "mb-2" }, {}, {
      default: () => {
        return `Conditions`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "conditions",
        value: $FormStore.condition
      },
      {
        value: ($$value) => {
          $FormStore.condition = $$value;
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
    )}</div></div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "publishdate", class: "mb-2" }, {}, {
      default: () => {
        return `Publish Date *`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "date",
        id: "publishdate",
        required: true,
        value: $FormStore.publishdate
      },
      {
        value: ($$value) => {
          $FormStore.publishdate = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "publishtime", class: "mb-2" }, {}, {
      default: () => {
        return `Publish Time`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "time",
        id: "publishtime",
        value: $FormStore.publishtime
      },
      {
        value: ($$value) => {
          $FormStore.publishtime = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="explanation svelte-1jgoteo" data-svelte-h="svelte-uw0x9k">If you don&#39;t select a publish time, it will be set to midnight of the selected day.</p></div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "unpublishdate", class: "mb-2" }, {}, {
      default: () => {
        return `Unpublish Date`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "date",
        id: "unpublishdate",
        title: "Select a date when the event shall be unpublished (optional)",
        value: $FormStore.unpublishdate
      },
      {
        value: ($$value) => {
          $FormStore.unpublishdate = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="explanation svelte-1jgoteo" data-svelte-h="svelte-igohu6">If you don&#39;t set a date and time here the event will automatically be unpublished at the
				given start time.</p></div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "unpublishtime", class: "mb-2" }, {}, {
      default: () => {
        return `Unpublish Time`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "time",
        id: "unpublishtime",
        title: "Select a time when the event shall be unpublished. (optional) ",
        value: $FormStore.unpublishtime
      },
      {
        value: ($$value) => {
          $FormStore.unpublishtime = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "comments", class: "mb-2" }, {}, {
      default: () => {
        return `Comments`;
      }
    })} ${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        id: "comments",
        placeholder: "Comments",
        rows: "8",
        name: "comments",
        title: "If there is anything people should need to know about this event? Put it here. (Parking instructions, public transport connections...)",
        value: $FormStore.comments
      },
      {
        value: ($$value) => {
          $FormStore.comments = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div>${validate_component(UploadFile, "UploadFile").$$render($$result, { type: "events" }, {}, {})}</div>  <div class="buttons col-span-2 mx-auto mt-10 svelte-1jgoteo">${validate_component(Button, "Button").$$render($$result, { type: "reset", color: "light" }, {}, {
      default: () => {
        return `Empty form`;
      }
    })} ${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
      default: () => {
        return `Save event`;
      }
    })}</div></form></div> <div data-svelte-h="svelte-1i36499"> </div>`;
  } while (!$$settled);
  $$unsubscribe_FormStore();
  return $$rendered;
});
export {
  Page as default
};
