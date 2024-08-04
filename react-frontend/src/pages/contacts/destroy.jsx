import { redirect } from "react-router-dom";
import { deleteContact } from "../../mock/contacts";

export async function action({ params }) {
  console.log("in delete action ", params)
  await deleteContact(params.contactId);
  return redirect("/");
}