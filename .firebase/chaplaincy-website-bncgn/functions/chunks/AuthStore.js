import { w as writable } from "./index.js";
const credentials = writable({
  email: null,
  password: null
});
const isLoggedIn = writable(false);
export {
  credentials as c,
  isLoggedIn as i
};
