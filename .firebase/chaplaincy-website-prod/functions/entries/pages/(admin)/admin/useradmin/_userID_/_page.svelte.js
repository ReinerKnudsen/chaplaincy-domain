import { c as create_ssr_component, s as subscribe, v as validate_component } from "../../../../../../chunks/ssr.js";
import { p as page } from "../../../../../../chunks/stores.js";
import "../../../../../../chunks/client.js";
import { doc } from "firebase/firestore";
import { d as database } from "../../../../../../chunks/firebaseConfig.js";
import { B as Button } from "../../../../../../chunks/Button.js";
import { L as Label, I as Input } from "../../../../../../chunks/Input.js";
import { S as Select } from "../../../../../../chunks/Select.js";
import "../../../../../../chunks/authService.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const userID = $page.params.userID;
  let { data } = $$props;
  const user = data.user;
  doc(database, "users", userID);
  const userRoles = [
    { value: "user", name: "User" },
    { value: "editor", name: "Editor" },
    { value: "admin", name: "Admin" }
  ];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<form><div class="mb-6 grid gap-6 md:grid-cols-2"><div class="mb-6">${validate_component(Label, "Label").$$render($$result, { for: "firstname", class: "mb-2 block" }, {}, {
      default: () => {
        return `First Name`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "firstname",
        size: "lg",
        placeholder: "First name",
        value: user.firstname
      },
      {
        value: ($$value) => {
          user.firstname = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { for: "lastname", class: "mb-2 block" }, {}, {
      default: () => {
        return `Last Name`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "lastname",
        size: "lg",
        placeholder: "Last name",
        value: user.lastname
      },
      {
        value: ($$value) => {
          user.lastname = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { for: "displayname", class: "mb-2 block" }, {}, {
      default: () => {
        return `Display Name *`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "displayname",
        size: "lg",
        placeholder: "Display name",
        required: true,
        value: user.displayName
      },
      {
        value: ($$value) => {
          user.displayName = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { for: "email", class: "mb-2 block" }, {}, {
      default: () => {
        return `Email`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "email",
        size: "lg",
        placeholder: "Email",
        disabled: true,
        value: user.email
      },
      {
        value: ($$value) => {
          user.email = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { for: "role", class: "mb-2 block" }, {}, {
      default: () => {
        return `User role`;
      }
    })} ${validate_component(Select, "Select").$$render(
      $$result,
      {
        class: "mt-2",
        items: userRoles,
        value: user.role
      },
      {
        value: ($$value) => {
          user.role = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="mx-[25%] mb-6 flex flex-row justify-between">${validate_component(Button, "Button").$$render(
      $$result,
      {
        type: "button",
        class: "w-40 justify-self-center bg-primary-100 align-middle text-white-primary"
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
        type: "submit",
        class: "w-40 justify-self-center bg-primary-100 align-middle text-white-primary"
      },
      {},
      {
        default: () => {
          return `Save`;
        }
      }
    )}</div> </form>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
