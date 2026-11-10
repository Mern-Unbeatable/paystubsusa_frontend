import React from "react";
import { DashboardHeader } from "../../../../Components/Dashboard";
import { useAuth } from "../../../../hooks/useAuth";
import ProfileOverviewCard from "./components/ProfileOverviewCard";
import EmailVerificationCard from "./components/EmailVerificationCard";
import PersonalInfoCard from "./components/PersonalInfoCard";
import AccountInfoCard from "./components/AccountInfoCard";
import SecurityCard from "./components/SecurityCard";

const ProfileView = () => {
  const { user } = useAuth();

  // RequireAuth renders this page only with a signed-in user; guard anyway during logout.
  if (!user) return null;

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="My Profile"
        description="Manage your personal information and account settings."
      />

      {/* <ProfileOverviewCard user={user} /> */}
      <EmailVerificationCard user={user} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <PersonalInfoCard user={user} />
          <SecurityCard />
        </div>
        <div className="xl:col-span-1">
          <AccountInfoCard user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
