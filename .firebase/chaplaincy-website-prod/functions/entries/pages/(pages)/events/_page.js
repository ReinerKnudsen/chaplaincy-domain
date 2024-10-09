import { query, where, Timestamp, orderBy, getDocs } from "firebase/firestore";
import { e as eventsColRef } from "../../../../chunks/firebaseConfig.js";
const load = async () => {
  const dateNow = /* @__PURE__ */ new Date();
  const q = query(
    eventsColRef,
    where("publishDateTime", "<", Timestamp.fromDate(dateNow)),
    where("unpublishDateTime", ">", Timestamp.fromDate(dateNow)),
    orderBy("startdate", "asc")
  );
  let snapshot = await getDocs(q);
  let events = snapshot.docs.map((item) => {
    return {
      id: item.id,
      data: item.data()
    };
  });
  return { events };
};
export {
  load
};
