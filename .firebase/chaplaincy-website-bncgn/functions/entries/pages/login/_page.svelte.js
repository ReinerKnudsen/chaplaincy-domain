import { c as create_ssr_component, s as subscribe, v as validate_component } from "../../../chunks/ssr.js";
import { S as Section, R as Register } from "../../../chunks/Register.js";
import { L as Label, I as Input, C as Checkbox, B as Button } from "../../../chunks/Input.js";
import "../../../chunks/firebaseConfig.js";
import { c as credentials, i as isLoggedIn } from "../../../chunks/AuthStore.js";
import "firebase/auth";
import "firebase/firestore";
import "../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $credentials, $$unsubscribe_credentials;
  let $isLoggedIn, $$unsubscribe_isLoggedIn;
  $$unsubscribe_credentials = subscribe(credentials, (value) => $credentials = value);
  $$unsubscribe_isLoggedIn = subscribe(isLoggedIn, (value) => $isLoggedIn = value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$isLoggedIn ? `<p data-svelte-h="svelte-1gu2pwo">You are already logged in</p>` : `${validate_component(Section, "Section").$$render($$result, { name: "login" }, {}, {
      default: () => {
        return `${validate_component(Register, "Register").$$render($$result, { href: "/" }, {}, {
          default: () => {
            return `<div class="space-y-4 p-6 sm:p-8 md:space-y-6"><form class="flex flex-col space-y-6" action="/"><h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-16mig0o">Login</h3> ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
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
                    value: $credentials.email
                  },
                  {
                    value: ($$value) => {
                      $credentials.email = $$value;
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
                    value: $credentials.password
                  },
                  {
                    value: ($$value) => {
                      $credentials.password = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}`;
              }
            })} <div class="flex items-start">${validate_component(Checkbox, "Checkbox").$$render($$result, {}, {}, {
              default: () => {
                return `Remember me`;
              }
            })} <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500" data-svelte-h="svelte-556mdl">Forgot password?</a></div> ${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "w-full1" }, {}, {
              default: () => {
                return `Sign in`;
              }
            })} <p class="text-sm font-light text-gray-500 dark:text-gray-400" data-svelte-h="svelte-x70fki">Don’t have an account yet? <a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a></p></form></div>`;
          }
        })}`;
      }
    })}`}`;
  } while (!$$settled);
  $$unsubscribe_credentials();
  $$unsubscribe_isLoggedIn();
  return $$rendered;
});
export {
  Page as default
};
