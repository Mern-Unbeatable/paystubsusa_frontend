import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { DashboardHeader } from '../../../../components/Dashboard';

const FormField = ({ label, type = 'text', value, onChange, placeholder, isLabelHidden = false }) => (
  <div>
    <label
      className={`text-xs font-medium text-slate-700 block mb-2 ${
        isLabelHidden ? 'text-transparent select-none' : ''
      }`}
    >
      {isLabelHidden ? '\u00A0' : label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded bg-[#E2E6EA] border border-transparent text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#009BFB]/30 focus:border-[#009BFB] transition"
    />
  </div>
);

const ProfileView = () => {
  const [name, setName] = useState('John Doe');
  const [phone, setPhone] = useState('01780053624');
  const [email, setEmail] = useState('admin@johnindustries.com');

  const [currentPassword, setCurrentPassword] = useState('password123');
  const [newPassword, setNewPassword] = useState('newpassword123');
  const [confirmPassword, setConfirmPassword] = useState('newpassword123');

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    showToast('Profile updated successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    showToast('Password changed successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <DashboardHeader
        title="My Profile"
        description="Manage your account and store preferences."
      />

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 sm:p-8 space-y-8">
        {/* Section 1: Account Information */}
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            Account Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <FormField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <FormField label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <FormField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-xs shadow-xs transition cursor-pointer active:scale-98"
            >
              Update Profile
            </button>
          </div>
        </form>

        {/* Section 2: Change Password */}
        <form onSubmit={handleChangePassword} className="space-y-4 pt-4">
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            Change Password
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <FormField
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <FormField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <FormField
              isLabelHidden
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-xs shadow-xs transition cursor-pointer active:scale-98"
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
