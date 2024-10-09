import { f as functions } from "./firebaseConfig.js";
import "firebase/auth";
import "firebase/firestore";
import { httpsCallable } from "firebase/functions";
httpsCallable(functions, "listUsers");
async function getUserByID(uid) {
  try {
    let getUserProfile = httpsCallable(functions, "getUserProfile");
    return await getUserProfile({ uid }).then((result) => {
      return result.data.user;
    }).catch((err) => {
      console.log(err.message);
      throw err;
    });
  } catch (error) {
    console.log("Error: ", error.message);
    throw error;
  }
}
export {
  getUserByID as g
};
