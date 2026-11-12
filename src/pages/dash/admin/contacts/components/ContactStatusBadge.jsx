import React from "react";
import { CONTACT_STATUS } from "../utils/contactFormat";

const ContactStatusBadge = ({ status }) => {
  const config = CONTACT_STATUS[status];
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${
        config?.className ?? "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      {config?.label ?? status}
    </span>
  );
};

export default ContactStatusBadge;
