import { doc, getDoc } from "firebase/firestore";
import { d as database } from "../../../../../../chunks/firebaseConfig.js";
async function load({ params }) {
  const newsId = params.newsId;
  const docRef = doc(database, "news", newsId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const newsItem = docSnapshot.data();
    return { newsItem, docRef };
  } else {
    console.log("No such document!");
  }
}
export {
  load
};
