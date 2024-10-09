import { c as create_ssr_component, s as subscribe, v as validate_component, e as escape } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/Button.js";
import { L as Label, I as Input } from "../../../../chunks/Input.js";
import "../../../../chunks/authService.js";
import { a as authStore } from "../../../../chunks/AuthStore.js";
import "../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => value);
  let thisPassword = "";
  let thisEmail = "";
  let error = "";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    error = authStore.error;
    $$rendered = `<div class="flex flex-row justify-center"><div class="w-5/12 space-y-4 rounded-xl bg-white-primary p-6 shadow-xl sm:p-8 md:space-y-6"><form class="flex flex-col space-y-6" action="/"><h3 class="dark:text-white p-0 text-xl font-medium text-gray-900" data-svelte-h="svelte-t61lhk">Login</h3> ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
      default: () => {
        return `<span data-svelte-h="svelte-17zhp19">Your email</span> ${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "email",
            name: "email",
            id: "email",
            placeholder: "name@company.com",
            autocomplete: "username",
            required: true,
            value: thisEmail
          },
          {
            value: ($$value) => {
              thisEmail = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
      default: () => {
        return `<span data-svelte-h="svelte-1nyqqaq">Your password</span> ${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "password",
            name: "password",
            placeholder: "•••••",
            autocomplete: "current-password",
            required: true,
            value: thisPassword
          },
          {
            value: ($$value) => {
              thisPassword = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })} <div class="error text-base font-semibold text-red-700" ${!error ? "hidden" : ""}>${escape(error)}</div> <div class="flex items-start" data-svelte-h="svelte-1i4zerc"><a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a></div> ${validate_component(Button, "Button").$$render(
      $$result,
      {
        type: "submit",
        class: "w-full bg-primary-80 text-white-primary"
      },
      {},
      {
        default: () => {
          return `Sign in`;
        }
      }
    )} </form></div></div>`;
  } while (!$$settled);
  $$unsubscribe_authStore();
  return $$rendered;
});
export {
  Page as default
};
