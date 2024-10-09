import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/Button.js";
import { C as Checkbox } from "../../../../chunks/Checkbox.js";
import { L as Label, I as Input } from "../../../../chunks/Input.js";
import "../../../../chunks/authService.js";
import "../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let password = "";
  let confirmPassword = "";
  let newUser = {
    firstname: "",
    lastname: "",
    email: "",
    displayName: "",
    uid: "",
    role: ""
  };
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex flex-row justify-center"><div class="w-5/12 space-y-4 rounded-xl bg-white-primary p-6 shadow-xl sm:p-8 md:space-y-6"><form class="flex flex-col space-y-6"><h3 class="dark:text-white p-0 text-xl font-medium text-gray-900" data-svelte-h="svelte-2yojmx">Create an new account</h3> ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
      default: () => {
        return `<span data-svelte-h="svelte-uvi6zl"><strong>Your firstname *</strong></span> ${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "text",
            name: "firstname",
            id: "firstname",
            placeholder: "your first name",
            autocomplete: "current-name",
            required: true,
            value: newUser.firstname
          },
          {
            value: ($$value) => {
              newUser.firstname = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
      default: () => {
        return `<span data-svelte-h="svelte-16cqgd2">Your last name</span> ${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "text",
            name: "lastname",
            id: "lastname",
            placeholder: "your last name",
            autocomplete: "family-name",
            value: newUser.lastname
          },
          {
            value: ($$value) => {
              newUser.lastname = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
      default: () => {
        return `<span data-svelte-h="svelte-2fm1vp">How would you like your name to be displayed?</span> ${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "text",
            name: "displayName",
            id: "displayname",
            placeholder: "your display name",
            value: newUser.displayName
          },
          {
            value: ($$value) => {
              newUser.displayName = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
      default: () => {
        return `<span data-svelte-h="svelte-1x5lnkk"><strong>Your email *</strong></span> ${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "email",
            name: "email",
            id: "email",
            placeholder: "name@company.com",
            autocomplete: "email",
            required: true,
            value: newUser.email
          },
          {
            value: ($$value) => {
              newUser.email = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
      default: () => {
        return `<span data-svelte-h="svelte-1gogxfr"><strong>Your password *</strong></span> ${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "password",
            name: "password",
            id: "password",
            placeholder: "•••••",
            autocomplete: "new-password",
            required: true,
            value: password
          },
          {
            value: ($$value) => {
              password = $$value;
              $$settled = false;
            }
          },
          {}
        )} ${``}`;
      }
    })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
      default: () => {
        return `<span data-svelte-h="svelte-1wcuuzq"><strong>Confirm password *</strong></span> ${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "password",
            name: "confirm-password",
            id: "confirm-password",
            placeholder: "•••••",
            required: true,
            autocomplete: "new-password",
            value: confirmPassword
          },
          {
            value: ($$value) => {
              confirmPassword = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })} <div class="flex items-start">${validate_component(Checkbox, "Checkbox").$$render($$result, { required: true }, {}, {
      default: () => {
        return `I accept the <a class="text-primary-600 dark:text-primary-500 font-medium hover:underline" href="/" data-svelte-h="svelte-o16e9i">Terms and Conditions</a>`;
      }
    })}</div> ${validate_component(Button, "Button").$$render(
      $$result,
      {
        type: "submit",
        class: "w-full  bg-primary-80 text-white-primary"
      },
      {},
      {
        default: () => {
          return `Create an account`;
        }
      }
    )} <div class="text-sm font-medium text-gray-500 dark:text-gray-300" data-svelte-h="svelte-wb6scj">Already have an account? <a href="/login" class="text-primary-600 dark:text-primary-500 font-medium hover:underline">Login here</a></div></form></div> </div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
