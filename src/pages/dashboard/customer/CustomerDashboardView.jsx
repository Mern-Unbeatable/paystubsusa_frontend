import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import DashboardLayout from '../../../layout/DashboardLayout';
import CustomerOverview from './CustomerOverview';
import MyDocumentsView from './MyDocumentsView';
import PaymentHistoryView from './PaymentHistoryView';
import SubscriptionView from './SubscriptionView';
import HelpCenterView from './HelpCenterView';
import ProfileView from './ProfileView';

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
      {/* 1. Overview Tab */}
      {activeTab === 'overview' && (
        <CustomerOverview setActiveTab={setActiveTab} />
      )}

      {/* 2. My Documents Tab */}
      {activeTab === 'documents' && (
        <MyDocumentsView />
      )}

      {/* 3. Payment History Tab */}
      {activeTab === 'payments' && (
        <PaymentHistoryView />
      )}

      {/* 4. Subscription Tab */}
      {activeTab === 'subscription' && (
        <SubscriptionView />
      )}

      {/* 5. Help Center Tab */}
      {activeTab === 'help' && (
        <HelpCenterView />
      )}

      {/* 6. Profile Tab */}
      {activeTab === 'profile' && (
        <ProfileView />
      )}
    </DashboardLayout>
  );
};

export default CustomerDashboardView;
