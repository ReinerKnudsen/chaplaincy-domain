import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { S as Section, R as Register } from "../../../chunks/Register.js";
import { L as Label, I as Input, C as Checkbox, B as Button } from "../../../chunks/Input.js";
import "../../../chunks/firebaseConfig.js";
import "firebase/auth";
import "firebase/firestore";
import "../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let firstname = "";
  let lastname = "";
  let city = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Section, "Section").$$render($$result, { name: "register" }, {}, {
      default: () => {
        return `${validate_component(Register, "Register").$$render($$result, { href: "/" }, {}, {
          default: () => {
            return `<div class="space-y-4 p-6 sm:p-8 md:space-y-6"><form class="flex flex-col space-y-6"><h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-1uy0uyx">Create an new account</h3> ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
              default: () => {
                return `<span data-svelte-h="svelte-1xihizz"><strong>Your first name *</strong></span> ${validate_component(Input, "Input").$$render(
                  $$result,
                  {
                    type: "text",
                    name: "firstname",
                    id: "firstname",
                    placeholder: "your first name",
                    autocomplete: "given-name",
                    required: true,
                    value: firstname
                  },
                  {
                    value: ($$value) => {
                      firstname = $$value;
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
                    value: lastname
                  },
                  {
                    value: ($$value) => {
                      lastname = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}`;
              }
            })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
              default: () => {
                return `<span data-svelte-h="svelte-1t0bd2t">City</span> ${validate_component(Input, "Input").$$render(
                  $$result,
                  {
                    type: "text",
                    name: "city",
                    id: "city",
                    placeholder: "where do you live?",
                    autocomplete: "city",
                    value: city
                  },
                  {
                    value: ($$value) => {
                      city = $$value;
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
                    value: email
                  },
                  {
                    value: ($$value) => {
                      email = $$value;
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
                return `I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/" data-svelte-h="svelte-13kh9h1">Terms and Conditions</a>`;
              }
            })}</div> ${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "w-full1" }, {}, {
              default: () => {
                return `Create an account`;
              }
            })} <div class="text-sm font-medium text-gray-500 dark:text-gray-300" data-svelte-h="svelte-1t99f02">Already have an account? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a></div></form></div>`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
