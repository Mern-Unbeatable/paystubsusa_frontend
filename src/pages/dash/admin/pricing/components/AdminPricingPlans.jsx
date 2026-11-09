import React, { useState } from 'react';
import { Check, RotateCcw, Save } from 'lucide-react';
import pricingPlans from '../../data/pricing/pricingPlans.json';

const AdminPricingPlans = () => {
  const [pricingItems, setPricingItems] = useState(pricingPlans);
  const [hasChanges, setHasChanges] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handlePriceChange = (id, newValue) => {
    setPricingItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    setHasChanges(false);
    setToastMessage('Pricing matrix updated successfully!');
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleReset = () => {
    setPricingItems(pricingPlans);
    setHasChanges(false);
    setToastMessage('Pricing reset to default demo values.');
    setTimeout(() => setToastMessage(''), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Pricing &amp; Plans
        </h1>
        <p className="text-base text-slate-400 mt-1.5">
          Manage document prices, packages, and subscription pricing.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-7 shadow-xs">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Full-Service pricing matrix
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className={`px-4 py-1.5 rounded-lg font-semibold text-sm shadow-xs transition cursor-pointer flex items-center gap-1.5 active:scale-98 ${
                hasChanges
                  ? 'bg-[#009BFB] hover:bg-[#0089e0] text-white animate-pulse'
                  : 'bg-[#009BFB] hover:bg-[#0089e0] text-white'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Matrix Container */}
        <div className="border border-slate-200/80 rounded-xl overflow-hidden">
          {/* Header Row */}
          <div className="bg-slate-50/70 border-b border-slate-200/80 px-5 sm:px-6 py-3">
            <span className="text-sm font-semibold text-slate-500">
              Property type
            </span>
          </div>

          {/* Pricing Rows */}
          <div className="divide-y divide-slate-100 bg-white">
            {pricingItems.map((item) => (
              <div
                key={item.id}
                className="px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-4 hover:bg-slate-50/40 transition group"
              >
                {/* Property Label */}
                <span className="text-base font-semibold text-slate-800">
                  {item.label}
                </span>

                {/* Editable Price Input Box */}
                <div className="w-36 sm:w-44">
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handlePriceChange(item.id, e.target.value)}
                    className="w-full px-3 py-1.5 sm:py-2 text-sm sm:text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg text-right focus:outline-none focus:border-[#009BFB] focus:ring-1 focus:ring-[#009BFB] shadow-2xs transition"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPricingPlans;
