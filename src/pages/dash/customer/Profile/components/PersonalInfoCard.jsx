import React, { useState } from "react";
import { Pencil, UserRound } from "lucide-react";
import SectionCard from "./SectionCard";
import UserAvatar from "./UserAvatar";
import EditProfileModal from "./EditProfileModal";
import { avatarSrc } from "../utils/profileFormat";

const ReadOnlyField = ({ label, value, placeholder }) => (
  <div>
    <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
    <dd className={`mt-1 text-sm font-medium ${value ? "text-slate-800" : "text-slate-400"}`}>
      {value || placeholder}
    </dd>
  </div>
);

const PersonalInfoCard = ({ user }) => {
  const [editing, setEditing] = useState(false);

  return (
    <SectionCard
      icon={UserRound}
      title="Personal Information"
      description="Your photo, name and contact number."
      action={
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-[13px] font-semibold text-slate-700 transition hover:border-secondary/40 hover:text-secondary cursor-pointer"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          Edit Profile
        </button>
      }
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <UserAvatar src={avatarSrc(user)} name={user.name} email={user.email} className="h-16 w-16 text-lg" />
        <dl className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
          <ReadOnlyField label="Full name" value={user.name} placeholder="Not set" />
          <ReadOnlyField label="Phone number" value={user.phone} placeholder="Not added" />
        </dl>
      </div>
      <EditProfileModal open={editing} onClose={() => setEditing(false)} user={user} />
    </SectionCard>
  );
};

export default PersonalInfoCard;
