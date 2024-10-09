import { c as create_ssr_component, v as validate_component } from "../../../../../../chunks/ssr.js";
import "../../../../../../chunks/client.js";
import { B as Button } from "../../../../../../chunks/Button.js";
import { L as Label, I as Input } from "../../../../../../chunks/Input.js";
import { S as Select } from "../../../../../../chunks/Select.js";
import "../../../../../../chunks/authService.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let initUser = {
    firstname: "",
    lastname: "",
    email: "",
    displayName: "",
    uid: "",
    role: ""
  };
  const userRoles = [{ value: "editor", name: "Editor" }, { value: "admin", name: "Admin" }];
  let newUser = initUser;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex flex-row justify-center"><div class="w-5/12 space-y-4 rounded-xl bg-white-primary p-6 shadow-xl sm:p-8 md:space-y-6"><form class="flex flex-col space-y-6"><h3 class="dark:text-white p-0 text-xl font-medium text-gray-900" data-svelte-h="svelte-2yojmx">Create an new account</h3> ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
      default: () => {
        return `<span data-svelte-h="svelte-1wknvcu"><strong>First name *</strong></span> ${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "text",
            name: "firstname",
            id: "firstname",
            placeholder: "first name",
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
        return `<span data-svelte-h="svelte-d4gu7j">Last name</span> ${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "text",
            name: "lastname",
            id: "lastname",
            placeholder: "last name",
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
        return `<span data-svelte-h="svelte-1ax8fib">Display Name</span> ${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "text",
            name: "displayName",
            id: "displayname",
            placeholder: "display name",
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
        return `<span data-svelte-h="svelte-1hqczc3"><strong>Email *</strong></span> ${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "email",
            name: "email",
            id: "email",
            placeholder: "name@company.com",
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
    })} <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { for: "role", class: "mb-2 block" }, {}, {
      default: () => {
        return `User role`;
      }
    })} ${validate_component(Select, "Select").$$render(
      $$result,
      {
        class: "mt-2",
        items: userRoles,
        value: newUser.role
      },
      {
        value: ($$value) => {
          newUser.role = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> ${validate_component(Button, "Button").$$render(
      $$result,
      {
        type: "submit",
        class: "w-full  bg-primary-80 text-white-primary"
      },
      {},
      {
        default: () => {
          return `Create user`;
        }
      }
    )}</form></div> </div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
