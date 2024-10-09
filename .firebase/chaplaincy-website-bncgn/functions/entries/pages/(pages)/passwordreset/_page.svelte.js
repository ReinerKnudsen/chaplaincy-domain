import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import "firebase/auth";
import "../../../../chunks/authService.js";
import "../../../../chunks/client.js";
import { B as Button } from "../../../../chunks/Button.js";
import { L as Label, I as Input } from "../../../../chunks/Input.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let newPassword = "";
  let checkPassword = "";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex flex-row justify-center"><div class="w-5/12 space-y-4 rounded-xl bg-white-primary p-6 shadow-xl sm:p-8 md:space-y-6"><form class="flex flex-col space-y-6"><h3 class="dark:text-white p-0 text-xl font-medium text-gray-900" data-svelte-h="svelte-1a0ope">Set or reset your password</h3> ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2", for: "new-password" }, {}, {
      default: () => {
        return `<span data-svelte-h="svelte-1wi22ja"><strong>Password *</strong></span> ${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "password",
            name: "new-password",
            id: "new-password",
            required: true,
            value: newPassword
          },
          {
            value: ($$value) => {
              newPassword = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })} ${validate_component(Label, "Label").$$render(
      $$result,
      {
        class: "space-y-2",
        for: "check-password"
      },
      {},
      {
        default: () => {
          return `<span data-svelte-h="svelte-9kfxzf"><strong>Repeat Password *</strong></span> ${validate_component(Input, "Input").$$render(
            $$result,
            {
              type: "password",
              name: "check-password",
              id: "check-password",
              required: true,
              value: checkPassword
            },
            {
              value: ($$value) => {
                checkPassword = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )} ${``} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        type: "submit",
        class: "w-full  bg-primary-80 text-white-primary"
      },
      {},
      {
        default: () => {
          return `Change password`;
        }
      }
    )}</form> ${validate_component(Button, "Button").$$render($$result, { type: "button" }, {}, {
      default: () => {
        return `Make admin`;
      }
    })}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
