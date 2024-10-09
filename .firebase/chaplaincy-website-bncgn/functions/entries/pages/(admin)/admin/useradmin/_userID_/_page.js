import { g as getUserByID } from "../../../../../../chunks/authService.js";
async function load({ params }) {
  const user = await getUserByID(params.userID);
  return { user };
}
export {
  load
};
