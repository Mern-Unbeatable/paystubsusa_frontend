import React, { useState } from "react";
import {
  Binary,
  Braces,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Fingerprint,
  Hash,
  KeyRound,
  Link2,
  List,
  Mail,
  Network,
  Tag,
  Type,
  XCircle,
} from "lucide-react";

const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const looksLikeIsoDate = (value) =>
  typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value);

const FIELD_ICONS = {
  id: Fingerprint,
  key: KeyRound,
  email: Mail,
  toEmail: Mail,
  action: Tag,
  type: Tag,
  template: Tag,
  purpose: Tag,
  status: CircleDot,
  actorType: CircleDot,
  documentType: Tag,
  productCode: Tag,
  name: Type,
  title: Type,
  scope: Tag,
  ip: Network,
  lockedBy: Network,
  providerMessageId: Link2,
  requestHash: Hash,
  secretHash: KeyRound,
  count: Hash,
  attempts: Hash,
  maxAttempts: Hash,
  quantity: Hash,
  creditsTotal: Hash,
  creditsUsed: Hash,
  unitAmountCents: Hash,
  amountCents: Hash,
  orderId: Link2,
  productId: Link2,
  actorId: Link2,
  userId: Link2,
  targetId: Link2,
  relatedOrderId: Link2,
  targetType: Tag,
  createdAt: CalendarClock,
  updatedAt: CalendarClock,
  expiresAt: CalendarClock,
  consumedAt: CalendarClock,
  sentAt: CalendarClock,
  runAt: CalendarClock,
  lockedAt: CalendarClock,
  receivedAt: CalendarClock,
  processedAt: CalendarClock,
  windowStart: CalendarClock,
  lastError: XCircle,
  error: XCircle,
  payload: Braces,
  metadata: Braces,
  response: Braces,
};

const iconFor = (name, value) => {
  if (FIELD_ICONS[name]) return FIELD_ICONS[name];
  if (Array.isArray(value)) return List;
  if (isPlainObject(value)) return Braces;
  if (typeof value === "boolean") return Binary;
  if (typeof value === "number") return Hash;
  if (looksLikeIsoDate(value) || /At$|Date$|Start$|End$/i.test(name)) {
    return CalendarClock;
  }
  if (/email/i.test(name)) return Mail;
  if (/id$/i.test(name) || name === "id") return Fingerprint;
  if (/status|state|type|kind/i.test(name)) return CircleDot;
  if (/error|fail/i.test(name)) return XCircle;
  if (/url|href|link/i.test(name)) return Link2;
  return Type;
};

const ScalarValue = ({ value }) => {
  if (value === null) {
    return <span className="font-mono text-slate-400">null</span>;
  }
  if (value === undefined) {
    return <span className="font-mono text-slate-400">undefined</span>;
  }
  if (typeof value === "boolean") {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-amber-700">
        {value ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
        ) : (
          <XCircle className="h-3.5 w-3.5 text-slate-400" />
        )}
        {value ? "true" : "false"}
      </span>
    );
  }
  if (typeof value === "number") {
    return <span className="font-mono text-sky-700">{value}</span>;
  }
  return (
    <span className="break-all font-mono text-sm text-slate-800">
      {String(value)}
    </span>
  );
};

const PropertyIcon = ({ name, value }) => {
  const Icon = iconFor(name, value);
  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-secondary ring-1 ring-slate-100">
      <Icon className="h-4 w-4" aria-hidden="true" />
    </span>
  );
};

const PropertyNode = ({ name, value, depth = 0 }) => {
  const nested = isPlainObject(value) || Array.isArray(value);
  const [open, setOpen] = useState(depth < 1);
  const count = nested
    ? Array.isArray(value)
      ? value.length
      : Object.keys(value).length
    : 0;

  if (!nested) {
    return (
      <div
        className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5"
        style={depth ? { marginLeft: depth * 12 } : undefined}
      >
        <PropertyIcon name={name} value={value} />
        <div className="min-w-0 flex-1">
          <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
            {name}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-slate-800">
            <ScalarValue value={value} />
          </dd>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border border-slate-100 bg-slate-50/60"
      style={depth ? { marginLeft: depth * 12 } : undefined}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left cursor-pointer hover:bg-slate-100/70"
        aria-expanded={open}
      >
        <PropertyIcon name={name} value={value} />
        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
            {name}
          </span>
          <span className="ml-2 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-100">
            {Array.isArray(value) ? `array[${count}]` : `object{${count}}`}
          </span>
        </div>
        {open ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
        )}
      </button>
      {open && (
        <div className="space-y-2 border-t border-slate-100 px-3 py-3">
          {Array.isArray(value)
            ? value.map((item, index) => (
                <PropertyNode
                  key={`${name}-${index}`}
                  name={`[${index}]`}
                  value={item}
                  depth={depth + 1}
                />
              ))
            : Object.entries(value).map(([key, nestedValue]) => (
                <PropertyNode
                  key={`${name}.${key}`}
                  name={key}
                  value={nestedValue}
                  depth={depth + 1}
                />
              ))}
          {count === 0 && (
            <p className="px-1 py-2 text-xs text-slate-400">Empty</p>
          )}
        </div>
      )}
    </div>
  );
};

/** Renders every own property of a record, including nested objects and arrays. */
const SystemPropertyTree = ({ record }) => {
  if (!record || typeof record !== "object") {
    return (
      <p className="py-8 text-center text-sm text-slate-500">No record data.</p>
    );
  }

  const entries = Object.entries(record);
  if (entries.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-slate-500">No properties.</p>
    );
  }

  return (
    <dl className="space-y-2">
      {entries.map(([key, value]) => (
        <PropertyNode key={key} name={key} value={value} />
      ))}
    </dl>
  );
};

export default SystemPropertyTree;
