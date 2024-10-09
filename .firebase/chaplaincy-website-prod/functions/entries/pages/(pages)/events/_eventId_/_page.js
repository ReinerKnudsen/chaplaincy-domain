import { doc, getDoc } from "firebase/firestore";
import { d as database } from "../../../../../chunks/firebaseConfig.js";
async function load({ params }) {
  const eventId = params.eventId;
  const docRef = doc(database, "events", eventId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const thisEvent = docSnapshot.data();
    return { thisEvent, docRef };
  } else {
    console.log("No such document!");
  }
}
export {
  load
};
