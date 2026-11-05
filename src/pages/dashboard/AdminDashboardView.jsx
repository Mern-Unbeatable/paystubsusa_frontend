import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import DashboardLayout from '../../layout/DashboardLayout';
import AdminCustomersView from '../../Components/Dashboard/AdminCustomersView';
import AdminDocumentsView from '../../Components/Dashboard/AdminDocumentsView';
import AdminOrdersView from '../../Components/Dashboard/AdminOrdersView';
import AdminSubscriptionsView from '../../Components/Dashboard/AdminSubscriptionsView';
import AdminDocumentTemplatesView from '../../Components/Dashboard/AdminDocumentTemplatesView';
import AdminPricingPlansView from '../../Components/Dashboard/AdminPricingPlansView';
import ProfileView from '../../Components/Dashboard/ProfileView';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  Users,
  FileText,
  ShoppingBag,
  CreditCard,
  RefreshCw,
  TrendingUp,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 10500 },
  { month: 'Feb', revenue: 13800 },
  { month: 'Mar', revenue: 17200 },
  { month: 'Apr', revenue: 15900 },
  { month: 'May', revenue: 20100 },
  { month: 'Jun', revenue: 19000 },
  { month: 'Jul', revenue: 23500 },
  { month: 'Aug', revenue: 24200 },
  { month: 'Sep', revenue: 27500 },
  { month: 'Oct', revenue: 29800 },
  { month: 'Nov', revenue: 33900 },
  { month: 'Dec', revenue: 38400 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded shadow-lg">
        <p className="font-semibold">{label}</p>
        <p className="text-[#009BFB]">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const AdminDashboardView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [timeframe, setTimeframe] = useState('Last Year');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  // 6 Top KPI Metrics
  const kpiStats = [
    {
      id: 'customers',
      label: 'Total Customers',
      value: '12,842',
      icon: Users,
      color: 'text-blue-500 bg-blue-50',
    },
    {
      id: 'documents',
      label: 'Total Documents',
      value: '48,291',
      icon: FileText,
      color: 'text-blue-500 bg-blue-50',
    },
    {
      id: 'orders',
      label: 'Total Orders',
      value: '21,064',
      icon: ShoppingBag,
      color: 'text-blue-500 bg-blue-50',
    },
    {
      id: 'revenue',
      label: 'Total Revenue',
      value: '$284,920',
      icon: CreditCard,
      color: 'text-emerald-500 bg-emerald-50',
    },
    {
      id: 'subscriptions',
      label: 'Active Subscriptions',
      value: '1,284',
      icon: RefreshCw,
      color: 'text-purple-500 bg-purple-50',
    },
    {
      id: 'today',
      label: 'Generated Today',
      value: '392',
      icon: TrendingUp,
      color: 'text-orange-500 bg-orange-50',
    },
  ];

  // Documents Generated Breakdown
  const documentBreakdown = [
    { name: 'Paystubs', count: '18,420', percent: 68 },
    { name: 'W-2', count: '8,921', percent: 38 },
    { name: '1099-NEC', count: '6,842', percent: 29 },
    { name: 'Direct Deposit', count: '4,108', percent: 18 },
  ];

  // Recent Orders Data
  const recentOrders = [
    {
      id: '#PG-10482',
      customer: 'sarah.miller@example.com',
      type: '3 Paystub Package',
      date: 'May 23, 2025',
      amount: '$24.99',
      status: 'Successful',
    },
    {
      id: '#PG-10481',
      customer: 'daniel.chen@example.com',
      type: 'W-2',
      date: 'May 23, 2025',
      amount: '$14.99',
      status: 'Successful',
    },
    {
      id: '#PG-10480',
      customer: 'morgan.reed@example.com',
      type: 'Monthly Subscription',
      date: 'May 23, 2025',
      amount: '$199.00',
      status: 'Successful',
    },
    {
      id: '#PG-10479',
      customer: 'andrewkim@example.com',
      type: '1099-NEC',
      date: 'May 22, 2025',
      amount: '$14.99',
      status: 'Successful',
    },
    {
      id: '#PG-10478',
      customer: 'olivia.hayes@example.com',
      type: 'Single Paystub',
      date: 'May 22, 2025',
      amount: '$12.99',
      status: 'Successful',
    },
  ];

  // Recent Activity Data
  const recentActivities = [
    {
      id: 1,
      icon: FileText,
      title: 'New monthly subscription activated',
      subtext: 'Morgan Reed · Unlimited Access',
      time: '2 min',
    },
    {
      id: 2,
      icon: FileText,
      title: 'W-2 order completed',
      subtext: 'daniel.chen@example.com',
      time: '8 min',
    },
    {
      id: 3,
      icon: ShoppingBag,
      title: '3-paystub package purchased',
      subtext: 'sarah.miller@example.com',
      time: '15 min',
    },
    {
      id: 4,
      icon: CreditCard,
      title: 'Payment failed',
      subtext: 'olivia.hayes@example.com',
      time: '32 min',
    },
    {
      id: 5,
      icon: Users,
      title: 'New customer registered',
      subtext: 'james.wilson@example.com',
      time: '48 min',
    },
  ];

  return (
    <DashboardLayout
      role="admin"
      activeTab={activeTab}
      setActiveTab={handleTabChange}
    >
      {activeTab === 'customers' ? (
        <AdminCustomersView />
      ) : activeTab === 'documents' ? (
        <AdminDocumentsView />
      ) : activeTab === 'orders' ? (
        <AdminOrdersView />
      ) : activeTab === 'subscription' || activeTab === 'subscriptions' ? (
        <AdminSubscriptionsView />
      ) : activeTab === 'template' || activeTab === 'templates' || activeTab === 'document-template' ? (
        <AdminDocumentTemplatesView />
      ) : activeTab === 'pricing' || activeTab === 'pricing-plans' || activeTab === 'pricing-plan' ? (
        <AdminPricingPlansView />
      ) : activeTab === 'profile' ? (
        <ProfileView />
      ) : (
        <div className="space-y-6">
          {/* Page Title & Subtitle */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Monitor your platform activity, customers, documents, and revenue.
            </p>
          </div>

        {/* 6 Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {kpiStats.map((stat) => {
            const Icon = stat.icon;
            const isClickable = ['customers', 'documents', 'orders', 'subscriptions'].includes(stat.id);
            return (
              <div
                key={stat.id}
                onClick={() => {
                  if (stat.id === 'customers') handleTabChange('customers');
                  else if (stat.id === 'documents') handleTabChange('documents');
                  else if (stat.id === 'orders') handleTabChange('orders');
                  else if (stat.id === 'subscriptions') handleTabChange('subscription');
                }}
                className={`bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 flex items-center gap-3 shadow-xs hover:border-slate-300 transition ${
                  isClickable ? 'cursor-pointer hover:shadow-xs hover:border-blue-200' : ''
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${stat.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-medium text-slate-400 block truncate">
                    {stat.label}
                  </span>
                  <span className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-tight block mt-0.5">
                    {stat.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Middle Section: Revenue Analytics & Documents Generated */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Revenue Analytics (Left - 8 cols) with Recharts */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Revenue analytics
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Revenue performance over time
                  </p>
                </div>

                {/* Dropdown Timeframe */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setTimeframe((prev) =>
                        prev === 'Last Year' ? 'Last 6 Months' : 'Last Year'
                      )
                    }
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-600 text-xs font-medium hover:border-slate-300 transition cursor-pointer select-none"
                  >
                    <span>{timeframe}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Total Revenue KPI */}
              <div className="mt-1 mb-2">
                <span className="text-[11px] font-medium text-slate-400 block">
                  Total revenue
                </span>
                <span className="text-2xl font-bold text-slate-900 tracking-tight block mt-0.5">
                  $84,290
                </span>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="w-full h-52 sm:h-60 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="rechartsRevenueGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#2563EB" stopOpacity={0.24} />
                      <stop offset="60%" stopColor="#2563EB" stopOpacity={0.06} />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity={0.00} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    vertical={false}
                    stroke="#F1F5F9"
                    strokeWidth={1}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 11 }}
                    dy={6}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 11 }}
                    domain={[0, 40000]}
                    ticks={[0, 10000, 20000, 30000, 40000]}
                    tickFormatter={(val) => (val === 0 ? '$0' : `$${val / 1000}k`)}
                    dx={-4}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    fill="url(#rechartsRevenueGrad)"
                    activeDot={{
                      r: 4.5,
                      fill: '#FFFFFF',
                      stroke: '#2563EB',
                      strokeWidth: 2.5,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Documents Generated (Right - 4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="pb-4">
                <h3 className="text-sm font-bold text-slate-800">
                  Documents generated
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  By document type
                </p>
              </div>

              {/* Document Progress Bars */}
              <div className="space-y-4 pt-1">
                {documentBreakdown.map((doc, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">
                        {doc.name}
                      </span>
                      <span className="text-slate-900 font-bold">
                        {doc.count}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                      <div
                        className="bg-[#2563EB] h-full rounded-full transition-all duration-500"
                        style={{ width: `${doc.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Generated Footer */}
            <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                Total generated:
              </span>
              <span className="text-sm font-bold text-slate-900">
                38,291
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Recent Orders & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Recent Orders (Left - 8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Recent orders
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Latest purchases across the platform
                </p>
              </div>

              <Link
                to="/admin?tab=orders"
                onClick={() => setActiveTab('orders')}
                className="text-xs font-semibold text-[#009BFB] hover:underline flex items-center gap-1"
              >
                <span>View all orders</span>
                <span>→</span>
              </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left border-collapse min-w-[620px]">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 font-medium">ORDER ID</th>
                    <th className="py-2.5 font-medium">CUSTOMER</th>
                    <th className="py-2.5 font-medium">TYPE</th>
                    <th className="py-2.5 font-medium">DATE</th>
                    <th className="py-2.5 font-medium">AMOUNT</th>
                    <th className="py-2.5 font-medium">STATUS</th>
                    <th className="py-2.5 text-right font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {recentOrders.map((order, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/60 transition group"
                    >
                      <td className="py-3 font-semibold text-slate-700">
                        {order.id}
                      </td>
                      <td className="py-3 text-slate-600 font-medium">
                        {order.customer}
                      </td>
                      <td className="py-3 text-slate-600">
                        {order.type}
                      </td>
                      <td className="py-3 text-slate-400">
                        {order.date}
                      </td>
                      <td className="py-3 font-bold text-slate-900">
                        {order.amount}
                      </td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 inline-block transition" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity (Right - 4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Recent activity
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Live platform events
                  </p>
                </div>

                {/* Live Indicator */}
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50/80 border border-emerald-100/60 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live</span>
                </div>
              </div>

              {/* Activity List */}
              <div className="space-y-4 pt-1">
                {recentActivities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <div
                      key={act.id}
                      className="flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-blue-50 text-[#009BFB] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 text-[11.5px] truncate">
                            {act.title}
                          </p>
                          <p className="text-[10.5px] text-slate-400 truncate mt-0.5">
                            {act.subtext}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10.5px] text-slate-400 flex-shrink-0 font-medium whitespace-nowrap">
                        {act.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboardView;
