import { query, orderBy, getDocs } from "firebase/firestore";
import { n as newsColRef } from "../../../../chunks/firebaseConfig.js";
const load = async () => {
  const q = query(newsColRef, orderBy("publishdate", "desc"));
  let snapshot = await getDocs(q);
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
