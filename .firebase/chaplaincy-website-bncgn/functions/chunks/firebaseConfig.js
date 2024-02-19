import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDzGsaVy4PHDvHQhNQj5fmcAaGm64bf_kY",
  authDomain: "chaplaincy-website-bncgn.firebaseapp.com",
  projectId: "chaplaincy-website-bncgn",
  storageBucket: "chaplaincy-website-bncgn.appspot.com",
  messagingSenderId: "342698394076",
  appId: "1:342698394076:web:21790dc7aa59f599a58f19"
};
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
getAuth();
const database = getFirestore();
const storage = getStorage();
const storageRef = ref(storage);
collection(database, "users");
collection(database, "events");
collection(database, "articles");
ref(storage, "users");
ref(storage, "events");
ref(storage, "articles");
ref(storage, "documents");
ref(storage, "images");
export {
  storageRef as s
};
