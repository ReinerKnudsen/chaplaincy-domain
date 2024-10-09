import { c as create_ssr_component, e as escape, v as validate_component } from "../../../../../chunks/ssr.js";
import { a as authStore } from "../../../../../chunks/AuthStore.js";
import "../../../../../chunks/authService.js";
import { B as Button } from "../../../../../chunks/Button.js";
import { g as goto } from "../../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const isEnabled = false;
  console.log("isEnabled", isEnabled);
  {
    goto();
  }
  let auth;
  {
    authStore.subscribe((store) => {
      auth = store;
    });
  }
  return `<div class=""><h1 data-svelte-h="svelte-1phkmph">Make admin</h1> ${auth?.user?.email ? `<div>${escape(`Hier kannst Du den User ${auth.user.email} (${auth.user.role}) zum Admin machen :) `)}</div> <form>${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
    default: () => {
      return `Make admin`;
    }
  })}</form>` : `<div data-svelte-h="svelte-xsr15j">Es ist kein Benutzer eingeloggt</div>`}</div>`;
});
export {
  Page as default
};
