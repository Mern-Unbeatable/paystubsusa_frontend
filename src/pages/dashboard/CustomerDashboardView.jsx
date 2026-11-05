import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import DashboardLayout from '../../layout/DashboardLayout';
import CustomerOverview from '../../Components/Dashboard/CustomerOverview';
import MyDocumentsView from '../../Components/Dashboard/MyDocumentsView';
import PaymentHistoryView from '../../Components/Dashboard/PaymentHistoryView';
import SubscriptionView from '../../Components/Dashboard/SubscriptionView';
import HelpCenterView from '../../Components/Dashboard/HelpCenterView';
import ProfileView from '../../Components/Dashboard/ProfileView';
import {
  FileText,
  CreditCard,
  Star,
  HelpCircle,
  User,
  Search,
  Download,
  Eye,
  CheckCircle2,
  FilePlus,
  Mail,
  Shield,
  Phone
} from 'lucide-react';

const CustomerDashboardView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const allDocuments = [
    { id: 'PS-2025-0841', name: 'Paystub - May 2025', type: 'Paystub', date: 'May 28, 2025', status: 'Completed', amount: '$14.99' },
    { id: 'W2-2025-1120', name: 'W-2 Form - 2024', type: 'W-2', date: 'May 22, 2025', status: 'Completed', amount: '$19.99' },
    { id: 'PS-2025-0723', name: 'Paystub - April 2025', type: 'Paystub', date: 'May 03, 2025', status: 'Completed', amount: '$14.99' },
    { id: 'PS-2025-0612', name: 'Paystub - March 2025', type: 'Paystub', date: 'Apr 02, 2025', status: 'Completed', amount: '$14.99' },
    { id: 'NEC-2024-0045', name: '1099-NEC Form 2024', type: '1099-NEC', date: 'Mar 15, 2025', status: 'Completed', amount: '$16.99' },
    { id: 'PS-2025-0501', name: 'Paystub - February 2025', type: 'Paystub', date: 'Feb 28, 2025', status: 'Completed', amount: '$14.99' },
  ];

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
        <MyDocumentsView />
      )}

      {/* 3. Payment History Tab (Matching Figma Exactly) */}
      {activeTab === 'payments' && (
        <PaymentHistoryView />
      )}

      {/* 4. Subscription Tab (Matching Figma Exactly) */}
      {activeTab === 'subscription' && (
        <SubscriptionView />
      )}

      {/* 5. Help Center Tab (Matching Figma Exactly) */}
      {activeTab === 'help' && (
        <HelpCenterView />
      )}

      {/* 6. Profile Tab (Matching Figma Exactly) */}
      {activeTab === 'profile' && (
        <ProfileView />
      )}
    </DashboardLayout>
  );
};

export default CustomerDashboardView;
