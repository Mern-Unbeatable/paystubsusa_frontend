import React, { useState } from "react";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { DashboardHeader } from "../../../../components/Dashboard";

const ProfileView = () => {
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("01780053624");
  const [email, setEmail] = useState("admin@johnindustries.com");

  const [currentPassword, setCurrentPassword] = useState("password123");
  const [newPassword, setNewPassword] = useState("newpassword123");
  const [confirmPassword, setConfirmPassword] = useState("newpassword123");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    showToast("Profile updated successfully!");
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    showToast("Password changed successfully!");
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <DashboardHeader
        title="My Profile"
        description="Manage your account and store preferences."
      />

      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-8">
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            Account Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full px-4 py-3 rounded bg-[#E2E6EA] border border-transparent text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#009BFB]/30 focus:border-[#009BFB] transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full px-4 py-3 rounded bg-[#E2E6EA] border border-transparent text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#009BFB]/30 focus:border-[#009BFB] transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-4 py-3 rounded bg-[#E2E6EA] border border-transparent text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#009BFB]/30 focus:border-[#009BFB] transition"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-sm shadow-xs transition cursor-pointer active:scale-98"
            >
              Update Profile
            </button>
          </div>
        </form>

        <form onSubmit={handleChangePassword} className="space-y-4 pt-4">
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            Change Password
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  className="w-full pl-4 pr-11 py-3 rounded bg-[#E2E6EA] border border-transparent text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#009BFB]/30 focus:border-[#009BFB] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer transition"
                  aria-label={
                    showCurrentPassword ? "Hide password" : "Show password"
                  }
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4 stroke-[2]" />
                  ) : (
                    <Eye className="w-4 h-4 stroke-[2]" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="w-full pl-4 pr-11 py-3 rounded bg-[#E2E6EA] border border-transparent text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#009BFB]/30 focus:border-[#009BFB] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer transition"
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4 stroke-[2]" />
                  ) : (
                    <Eye className="w-4 h-4 stroke-[2]" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-transparent block mb-2 select-none">
                &nbsp;
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full pl-4 pr-11 py-3 rounded bg-[#E2E6EA] border border-transparent text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#009BFB]/30 focus:border-[#009BFB] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer transition"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 stroke-[2]" />
                  ) : (
                    <Eye className="w-4 h-4 stroke-[2]" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-sm shadow-xs transition cursor-pointer active:scale-98"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileView;
