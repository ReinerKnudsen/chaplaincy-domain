import "firebase/auth";
import { w as writable } from "./index.js";
import "./firebaseConfig.js";
const initialAuthState = {
  user: null,
  // User object (null if not authenticated)
  loading: false,
  // Loading state indicator
  error: null,
  // Error message (if any)
  isLoggedIn: false,
  role: "",
  name: ""
};
const authStore = writable(initialAuthState);
export {
  authStore as a
};
