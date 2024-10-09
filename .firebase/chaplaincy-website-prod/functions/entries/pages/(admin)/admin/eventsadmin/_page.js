import { getDocs } from "firebase/firestore";
import { e as eventsColRef } from "../../../../../chunks/firebaseConfig.js";
const load = async () => {
  let snapshot = await getDocs(eventsColRef);
  let events = snapshot.docs.map((event) => {
    return {
      id: event.id,
      data: event.data()
    };
  });
  return { events };
};
export {
  load
};
