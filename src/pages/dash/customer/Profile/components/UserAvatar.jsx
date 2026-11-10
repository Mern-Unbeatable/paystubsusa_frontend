import React from "react";
import { getInitials } from "../utils/profileFormat";

/** Photo when `src` is set, otherwise initials. `className` sets the size and text size. */
const UserAvatar = ({ src, name, email, className = "h-16 w-16 text-lg" }) =>
  src ? (
    <img src={src} alt="" className={`${className} flex-shrink-0 rounded-2xl object-cover ring-1 ring-slate-200`} />
  ) : (
    <span
      aria-hidden="true"
      className={`${className} flex flex-shrink-0 items-center justify-center rounded-2xl bg-secondary/10 font-bold text-secondary`}
    >
      {getInitials(name, email)}
    </span>
  );

export default UserAvatar;
