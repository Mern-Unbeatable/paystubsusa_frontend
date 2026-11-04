import { redirect } from "react-router-dom";
import { PATHS } from "../../paths";
import { readSession } from "./session.server";

export function requireUser() {
  const user = readSession();

  if (!user) {
    throw redirect(PATHS.AUTH.login);
  }

  return user;
}
