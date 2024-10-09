import { query, orderBy, limit, getDocs, where } from "firebase/firestore";
import { n as newsColRef, e as eventsColRef } from "../../chunks/firebaseConfig.js";
const load = async () => {
  const q = query(newsColRef, orderBy("publishdate", "desc"), limit(2));
  let snapshot = await getDocs(q);
  let news = snapshot.docs.map((item) => {
    return {
      id: item.id,
      data: item.data()
    };
  });
  const today = /* @__PURE__ */ new Date();
  const a = query(
    eventsColRef,
    where("publishDateTime", "<", today),
    where("unpublishDateTime", ">", today),
    orderBy("publishDateTime", "asc"),
    limit(2)
  );
  let snapshot2 = await getDocs(a);
  let events = snapshot2.docs.map((item) => {
    return {
      id: item.id,
      data: item.data()
    };
  });
  return { news, events };
};
export {
  load
};
