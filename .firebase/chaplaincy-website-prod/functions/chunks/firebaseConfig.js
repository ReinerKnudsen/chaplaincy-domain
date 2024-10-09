import { getApps, initializeApp, getApp, deleteApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getFunctions } from "firebase/functions";
const firebaseConfig = {
  apiKey: "AIzaSyBPyiNUV4W47CjTZsT3gWiQbXOWyRYE6Qo",
  authDomain: void 0,
  projectId: "chaplaincy-website-prod",
  storageBucket: "chaplaincy-website-prod.appspot.com",
  messagingSenderId: "673700200219",
  appId: "1:673700200219:web:8704711e5d7569dfdb9dbe"
};
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
  deleteApp(firebaseApp);
  firebaseApp = initializeApp(firebaseConfig);
}
getAuth(firebaseApp);
const database = getFirestore();
const functions = getFunctions();
const storage = getStorage();
ref(storage);
const eventsColRef = collection(database, "events");
const newsColRef = collection(database, "news");
collection(database, "users");
ref(storage, "events");
ref(storage, "articles");
ref(storage, "documents");
ref(storage, "images");
export {
  database as d,
  eventsColRef as e,
  functions as f,
  newsColRef as n
};
