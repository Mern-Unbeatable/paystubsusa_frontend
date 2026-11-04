import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import DashboardLayout from '../../../layout/DashboardLayout';
import CustomerOverview from './components/tabs/CustomerOverview';

const MyDocumentsView = lazy(() => import('./components/tabs/MyDocumentsView'));
const PaymentHistoryView = lazy(() => import('./components/tabs/PaymentHistoryView'));
const SubscriptionView = lazy(() => import('./components/tabs/SubscriptionView'));
const HelpCenterView = lazy(() => import('./components/tabs/HelpCenterView'));
const ProfileView = lazy(() => import('./components/tabs/ProfileView'));

const CustomerDashboardView = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  return (
    <DashboardLayout
      role="customer"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {/* 1. Overview Tab (The exact Figma layout) */}
      {activeTab === 'overview' && (
        <CustomerOverview setActiveTab={setActiveTab} />
      )}

      {/* 2. My Documents Tab (Matching Figma Exactly) */}
      {activeTab === 'documents' && (
        <Suspense fallback={<div className="py-12 text-sm text-slate-500 text-center">Loading documents…</div>}>
          <MyDocumentsView />
        </Suspense>
      )}

      {/* 3. Payment History Tab (Matching Figma Exactly) */}
      {activeTab === 'payments' && (
        <Suspense fallback={<div className="py-12 text-sm text-slate-500 text-center">Loading payment history…</div>}>
          <PaymentHistoryView />
        </Suspense>
      )}

      {/* 4. Subscription Tab (Matching Figma Exactly) */}
      {activeTab === 'subscription' && (
        <Suspense fallback={<div className="py-12 text-sm text-slate-500 text-center">Loading subscription details…</div>}>
          <SubscriptionView />
        </Suspense>
      )}

      {/* 5. Help Center Tab (Matching Figma Exactly) */}
      {activeTab === 'help' && (
        <Suspense fallback={<div className="py-12 text-sm text-slate-500 text-center">Loading help center…</div>}>
          <HelpCenterView />
        </Suspense>
      )}

      {/* 6. Profile Tab (Matching Figma Exactly) */}
      {activeTab === 'profile' && (
        <Suspense fallback={<div className="py-12 text-sm text-slate-500 text-center">Loading profile…</div>}>
          <ProfileView />
        </Suspense>
      )}
    </DashboardLayout>
  );
};

export default CustomerDashboardView;
