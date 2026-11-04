import { redirect } from "react-router-dom";
import { PATHS } from "../../paths";
import { readSession } from "./session.server";

export function requirePermission(permission) {
  const user = readSession();

  if (!user) {
    throw redirect(PATHS.AUTH.login);
  }

  if (!user.permissions?.includes(permission)) {
    throw new Response("Forbidden", { status: 403 });
  }

  return user;
}
