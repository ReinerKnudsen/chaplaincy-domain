import { getDocs } from "firebase/firestore";
import { n as newsColRef } from "../../../../../chunks/firebaseConfig.js";
const load = async () => {
  let snapshot = await getDocs(newsColRef);
  let news = snapshot.docs.map((item) => {
    return {
      id: item.id,
      data: item.data()
    };
  });
  return { news };
};
export {
  load
};
