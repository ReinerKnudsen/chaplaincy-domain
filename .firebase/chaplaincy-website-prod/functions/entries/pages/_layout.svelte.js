import { c as create_ssr_component, a as compute_rest_props, b as spread, d as escape_object, f as escape_attribute_value, i as add_attribute, e as escape, s as subscribe, v as validate_component, q as onDestroy } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { a as authStore } from "../../chunks/AuthStore.js";
import "../../chunks/firebaseConfig.js";
import "../../chunks/client.js";
import { getAuth } from "firebase/auth";
import { twMerge } from "tailwind-merge";
import { I as Icon } from "../../chunks/Icon.js";
import "../../chunks/authService.js";
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["footerType"]);
  let { footerType = void 0 } = $$props;
  let footerClass = twMerge(footerType === "sitemap" && "bg-gray-800", footerType === "socialmedia" && "p-4 bg-white sm:p-6 dark:bg-gray-800", footerType === "logo" && "p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-800", footerType === "default" && "p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800", $$props.class);
  if ($$props.footerType === void 0 && $$bindings.footerType && footerType !== void 0) $$bindings.footerType(footerType);
  return `<footer${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(footerClass)
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</footer> `;
});
const FooterCopyright = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["spanClass", "aClass", "year", "href", "by", "target", "copyrightMessage"]);
  let { spanClass = "block text-sm text-gray-500 sm:text-center dark:text-gray-400" } = $$props;
  let { aClass = "hover:underline" } = $$props;
  let { year = (/* @__PURE__ */ new Date()).getFullYear() } = $$props;
  let { href = "" } = $$props;
  let { by = "" } = $$props;
  let { target = void 0 } = $$props;
  let { copyrightMessage = "All Rights Reserved." } = $$props;
  let spanCls = twMerge(spanClass, $$props.classSpan);
  let aCls = twMerge(aClass, $$props.classA);
  if ($$props.spanClass === void 0 && $$bindings.spanClass && spanClass !== void 0) $$bindings.spanClass(spanClass);
  if ($$props.aClass === void 0 && $$bindings.aClass && aClass !== void 0) $$bindings.aClass(aClass);
  if ($$props.year === void 0 && $$bindings.year && year !== void 0) $$bindings.year(year);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.by === void 0 && $$bindings.by && by !== void 0) $$bindings.by(by);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0) $$bindings.target(target);
  if ($$props.copyrightMessage === void 0 && $$bindings.copyrightMessage && copyrightMessage !== void 0) $$bindings.copyrightMessage(copyrightMessage);
  return `<span${add_attribute("class", spanCls, 0)}>© ${escape(year)} ${href ? `<a${spread(
    [
      escape_object($$restProps),
      { href: escape_attribute_value(href) },
      { target: escape_attribute_value(target) },
      { class: escape_attribute_value(aCls) }
    ],
    {}
  )}>${escape(by)}</a>` : `<span class="ms-1">${escape(by)}</span>`} ${escape(copyrightMessage)}</span> `;
});
const FooterIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "ariaLabel", "aClass", "target"]);
  let { href = "" } = $$props;
  let { ariaLabel = "" } = $$props;
  let { aClass = "text-gray-500 hover:text-gray-900 dark:hover:text-white" } = $$props;
  let { target = void 0 } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  if ($$props.aClass === void 0 && $$bindings.aClass && aClass !== void 0) $$bindings.aClass(aClass);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0) $$bindings.target(target);
  return `${href ? `<a${spread(
    [
      escape_object($$restProps),
      { href: escape_attribute_value(href) },
      { target: escape_attribute_value(target) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        class: escape_attribute_value(twMerge(aClass, $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a>` : `${slots.default ? slots.default({}) : ``}`} `;
});
const FooterLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["liClass", "aClass", "href", "target"]);
  let { liClass = "me-4 last:me-0 md:me-6" } = $$props;
  let { aClass = "hover:underline" } = $$props;
  let { href = "" } = $$props;
  let { target = void 0 } = $$props;
  let liCls = twMerge(liClass, $$props.classLi);
  let aCls = twMerge(aClass, $$props.classA);
  if ($$props.liClass === void 0 && $$bindings.liClass && liClass !== void 0) $$bindings.liClass(liClass);
  if ($$props.aClass === void 0 && $$bindings.aClass && aClass !== void 0) $$bindings.aClass(aClass);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0) $$bindings.target(target);
  return `<li${add_attribute("class", liCls, 0)}><a${spread(
    [
      escape_object($$restProps),
      { href: escape_attribute_value(href) },
      { class: escape_attribute_value(aCls) },
      { target: escape_attribute_value(target) }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a></li> `;
});
const FooterLinkGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { ulClass = "text-gray-600 dark:text-gray-400" } = $$props;
  if ($$props.ulClass === void 0 && $$bindings.ulClass && ulClass !== void 0) $$bindings.ulClass(ulClass);
  return `<ul${add_attribute("class", twMerge(ulClass, $$props.class), 0)}>${slots.default ? slots.default({}) : ``}</ul> `;
});
const caplogo = "/_app/immutable/assets/chaplaincy_logo.CzWtvR1f.png";
const Navigation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $authStore, $$unsubscribe_authStore;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  $page.url.pathname;
  {
    authStore.subscribe((store) => {
    });
  }
  $$unsubscribe_page();
  $$unsubscribe_authStore();
  return `<nav class="z-999 sticky top-0 flex h-full min-h-28 w-full items-center divide-gray-100 rounded-b-2xl border-b border-gray-100 bg-white-primary px-2 py-2.5 align-middle text-gray-700 shadow-xl dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 sm:px-4"><div class="container mx-auto flex flex-wrap items-center justify-between"><a href="/" class="flex items-center" data-svelte-h="svelte-r3he16"><img class="me-3 sm:h-9"${add_attribute("src", caplogo, 0)} alt="Chaplaincy Logo"></a> <button type="button" class="m-0.5 ms-3 whitespace-normal rounded-lg p-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:hover:bg-gray-600 md:hidden" aria-label="Open main menu" data-svelte-h="svelte-1gu0oiq"><span class="sr-only">Open main menu</span> <svg xmlns="http://www.w3.org/2000/svg" role="button" tabindex="0" width="24" height="24" class="h-6 w-6 shrink-0" aria-label="bars 3" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg></button> <div class="w-full cursor-pointer md:block md:w-auto" hidden="true"><ul class="mt-4 flex flex-col p-4 text-primary-100 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium"><li data-svelte-h="svelte-fxdehf"><a href="/" class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent">Home</a></li> <li data-svelte-h="svelte-xtd8mk"><a href="/news" class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent">News</a></li> <li data-svelte-h="svelte-1nbnmwg"><a href="/events" class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent">Events</a></li> <li data-svelte-h="svelte-1oe4zt0"><a href="/groups" class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent">Groups</a></li> <li data-svelte-h="svelte-ej20u8"><a href="/prayers" class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent">Pray with us</a></li> <li class="group relative"><a href="" class="text-xl" data-svelte-h="svelte-12i8rfg">About us</a> ${``}</li> ${$authStore.role === "admin" || $authStore.role === "editor" ? `<li data-svelte-h="svelte-iotlf6"><a href="/admin" class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent">Admin</a></li>` : ``} ${!$authStore.isLoggedIn ? `<li data-svelte-h="svelte-d06hs7"><a href="/login" class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent">Sign in</a></li>` : `<li><button class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent" data-svelte-h="svelte-6h27hd">Sign out</button> </li>`}</ul></div></div></nav>`;
});
const Footer_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Footer, "Footer").$$render(
    $$result,
    {
      footerType: "socialmedia",
      class: " rounded-t-2xl bg-white-primary shadow-xl "
    },
    {},
    {
      default: () => {
        return `<div class="pl-8 md:flex md:justify-between"><div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6"><div><h2 class="dark:text-white mb-6 text-sm font-semibold uppercase text-gray-900" data-svelte-h="svelte-1677x48">Resources</h2> ${validate_component(FooterLinkGroup, "FooterLinkGroup").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(FooterLink, "FooterLink").$$render($$result, { liClass: "mb-4", href: "/" }, {}, {
              default: () => {
                return `Newsletter Archive`;
              }
            })} ${validate_component(FooterLink, "FooterLink").$$render($$result, { liClass: "mb-4", href: "/" }, {}, {
              default: () => {
                return `Image Gallery`;
              }
            })}`;
          }
        })}</div> <div><h2 class="dark:text-white mb-6 text-sm font-semibold uppercase text-gray-900" data-svelte-h="svelte-1gx2h6u">Follow us</h2> ${validate_component(FooterLinkGroup, "FooterLinkGroup").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(FooterLink, "FooterLink").$$render($$result, { liClass: "mb-4", href: "/" }, {}, {
              default: () => {
                return `Twitter`;
              }
            })} ${validate_component(FooterLink, "FooterLink").$$render($$result, { liClass: "mb-4", href: "/" }, {}, {
              default: () => {
                return `Facebook`;
              }
            })} ${validate_component(FooterLink, "FooterLink").$$render($$result, { liClass: "mb-4", href: "/" }, {}, {
              default: () => {
                return `Instagram`;
              }
            })}`;
          }
        })}</div> <div><h2 class="dark:text-white mb-6 text-sm font-semibold uppercase text-gray-900" data-svelte-h="svelte-1sosdu5">Legal</h2> ${validate_component(FooterLinkGroup, "FooterLinkGroup").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(FooterLink, "FooterLink").$$render($$result, { liClass: "mb-4", href: "/" }, {}, {
              default: () => {
                return `Privacy Policy`;
              }
            })} ${validate_component(FooterLink, "FooterLink").$$render($$result, { liClass: "mb-4", href: "/" }, {}, {
              default: () => {
                return `Terms &amp; Conditions`;
              }
            })}`;
          }
        })}</div></div></div> <hr class="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8"> <div class="pl-8 pr-8 sm:flex sm:items-center sm:justify-between">${validate_component(FooterCopyright, "FooterCopyright").$$render($$result, { href: "/", by: "Sleepy Panda " }, {}, {})} <div class="mt-4 flex space-x-6 sm:mt-0 sm:justify-center rtl:space-x-reverse">${validate_component(FooterIcon, "FooterIcon").$$render(
          $$result,
          {
            href: "https://www.facebook.com/AnglicanBonnCologne/"
          },
          {},
          {
            default: () => {
              return `${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  name: "facebook",
                  class: "dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
                },
                {},
                {}
              )}`;
            }
          }
        )} ${validate_component(FooterIcon, "FooterIcon").$$render(
          $$result,
          {
            href: "https://twitter.com/Anglican_Bn_Cgn"
          },
          {},
          {
            default: () => {
              return `${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  name: "twitter",
                  class: "dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
                },
                {},
                {}
              )}`;
            }
          }
        )} ${validate_component(FooterIcon, "FooterIcon").$$render(
          $$result,
          {
            href: "https://www.achurchnearyou.com/church/8388/"
          },
          {},
          {
            default: () => {
              return `${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  name: "churchnearyou",
                  class: "dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
                },
                {},
                {}
              )}`;
            }
          }
        )} ${validate_component(FooterIcon, "FooterIcon").$$render($$result, { href: "/" }, {}, {
          default: () => {
            return `${validate_component(Icon, "Icon").$$render(
              $$result,
              {
                name: "email",
                class: "dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
              },
              {},
              {}
            )}`;
          }
        })}</div></div>`;
      }
    }
  )}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getAuth();
  onDestroy(() => {
  });
  {
    if (authStore.user) {
      console.log("User: ", authStore.user);
    }
  }
  return `${validate_component(Navigation, "Navigation").$$render($$result, {}, {}, {})} <div class="md:my-10 xl:my-10">${slots.default ? slots.default({}) : ``}</div> ${validate_component(Footer_1, "Footer").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
