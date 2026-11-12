import React from "react";
import { CheckCircle2, Eye, Pencil, RotateCcw, Trash2 } from "lucide-react";

const actionButton =
  "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer";
const neutral =
  "text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-secondary";

const ContactRowActions = ({
  message,
  busy,
  onView,
  onEdit,
  onToggle,
  onDelete,
}) => {
  const isNew = message.status === "new";
  const ToggleIcon = isNew ? CheckCircle2 : RotateCcw;
  const toggleLabel = isNew ? "Mark as handled" : "Mark as new";

  return (
    <div className="inline-flex items-center gap-1">
      <button
        type="button"
        onClick={() => onView(message)}
        title="View message"
        aria-label={`View message from ${message.name}`}
        className={`${actionButton} ${neutral}`}
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onEdit(message)}
        title="Edit message"
        aria-label={`Edit message from ${message.name}`}
        className={`${actionButton} ${neutral}`}
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onToggle(message)}
        disabled={busy}
        title={toggleLabel}
        aria-label={`${toggleLabel}: message from ${message.name}`}
        className={`${actionButton} ${
          isNew
            ? "text-emerald-600 hover:border-emerald-100 hover:bg-emerald-50"
            : "text-sky-600 hover:border-sky-100 hover:bg-sky-50"
        }`}
      >
        <ToggleIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onDelete(message)}
        title="Delete message"
        aria-label={`Delete message from ${message.name}`}
        className={`${actionButton} text-rose-500 hover:border-rose-100 hover:bg-rose-50`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ContactRowActions;
