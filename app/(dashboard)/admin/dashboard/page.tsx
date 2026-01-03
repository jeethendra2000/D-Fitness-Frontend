"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  CreditCard,
  MessageSquare,
  Dumbbell,
  LucideProps,
  Tag,
  User as UserIcon,
  List,
  BarChart3,
} from "lucide-react";
import { API_BASE_URL } from "@/configs/constants";
import {
  Subscription,
  Transaction,
  Enquiry,
  Customer,
  Employee,
  Trainer,
  Membership,
  Offer,
  SubscriptionStatus,
  TransactionStatus,
  EnquiryStatus,
  TransactionType,
} from "@/configs/dataTypes";

// --- Recharts Imports ---
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// --- Dashboard State Interface ---
interface DashboardData {
  totalCustomers: number;
  totalEmployees: number;
  totalTrainers: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  pendingEnquiries: number;
  totalFeedbacks: number;
  totalMemberships: number;
  totalOffers: number;
  totalTransactions: number;
  isLoading: boolean;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactElement<LucideProps>;
  color: string;
}

interface MonthlyRevenueDataPoint {
  name: string;
  revenue: number;
}

// --- Reusable Stat Card ---
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between transition duration-300 hover:shadow-xl">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold text-gray-900 mt-1">{value}</h2>
    </div>
    <div className={`p-3 rounded-full bg-opacity-10 ${color}`}>
      {React.cloneElement(icon, { className: "w-6 h-6" })}
    </div>
  </div>
);

// --- Fetch Helper with Generics ---
const fetchJson = async <T,>(url: string): Promise<T[]> => {
  try {
    const response = await fetch(url);

    if (response.status === 204) return [];

    if (!response.ok) {
      console.warn(`Failed to fetch ${url}. Status: ${response.status}`);
      return [];
    }

    const text = await response.text();
    if (!text) return [];

    const json = JSON.parse(text);
    return Array.isArray(json) ? json : json.data || [];
  } catch (err) {
    console.error(`Error fetching ${url}:`, err);
    return [];
  }
};

const formatCurrency = (amount: number) => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
};

// --- Revenue Calculation Logic ---
const calculateRevenueByMonth = (
  transactions: Transaction[]
): MonthlyRevenueDataPoint[] => {
  const revenueMap: Record<string, number> = {};

  transactions.forEach((tx) => {
    const isIncome =
      tx.status === TransactionStatus.Completed &&
      (tx.transactionType === TransactionType.SubscriptionPayment ||
        tx.transactionType === TransactionType.Other);

    if (isIncome && tx.amount > 0 && tx.transactionDate) {
      const date = new Date(tx.transactionDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      const key = `${year}-${String(month + 1).padStart(2, "0")}`;

      revenueMap[key] = (revenueMap[key] || 0) + tx.amount;
    }
  });

  const chartData = Object.keys(revenueMap)
    .sort()
    .map((key) => {
      const [year, month] = key.split("-");
      const date = new Date(Number(year), Number(month) - 1);
      const monthName = date.toLocaleString("en-US", { month: "short" });

      return {
        name: `${monthName} ${year}`,
        revenue: revenueMap[key],
      };
    });

  return chartData.slice(-6);
};

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<DashboardData>({
    totalCustomers: 0,
    totalEmployees: 0,
    totalTrainers: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    pendingEnquiries: 0,
    totalFeedbacks: 0,
    totalMemberships: 0,
    totalOffers: 0,
    totalTransactions: 0,
    isLoading: true,
  });

  const [monthlyRevenueChartData, setMonthlyRevenueChartData] = useState<
    MonthlyRevenueDataPoint[]
  >([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      setDashboardStats((prev) => ({ ...prev, isLoading: true }));

      try {
        const [
          customerData,
          employeeData,
          trainerData,
          // Removed feedbackData to fix tuple alignment
          membershipData,
          offerData,
          subscriptionData,
          transactionData,
          enquiryData,
        ] = await Promise.all([
          fetchJson<Customer>(`${API_BASE_URL}/Customers`),
          fetchJson<Employee>(`${API_BASE_URL}/Employees`),
          fetchJson<Trainer>(`${API_BASE_URL}/Trainers`),
          // Removed fetch for Feedbacks
          fetchJson<Membership>(`${API_BASE_URL}/Memberships`),
          fetchJson<Offer>(`${API_BASE_URL}/Offers`),
          fetchJson<Subscription>(`${API_BASE_URL}/Subscriptions`),
          fetchJson<Transaction>(`${API_BASE_URL}/Transactions`),
          fetchJson<Enquiry>(`${API_BASE_URL}/Enquiries`),
        ]);

        const activeSubscriptions = subscriptionData.filter(
          (sub) => sub.status === SubscriptionStatus.Active
        ).length;

        const pendingEnquiries = enquiryData.filter(
          (enq) => enq.status === EnquiryStatus.New
        ).length;

        const totalRevenue = transactionData.reduce((sum, tx) => {
          if (
            tx.status === TransactionStatus.Completed &&
            (tx.transactionType === TransactionType.SubscriptionPayment ||
              tx.transactionType === TransactionType.Other)
          ) {
            return sum + (tx.amount || 0);
          }
          return sum;
        }, 0);

        setMonthlyRevenueChartData(calculateRevenueByMonth(transactionData));

        setDashboardStats({
          totalCustomers: customerData.length,
          totalEmployees: employeeData.length,
          totalTrainers: trainerData.length,
          totalFeedbacks: 0, // Placeholder as we removed the fetch
          totalMemberships: membershipData.length,
          totalOffers: offerData.length,
          totalTransactions: transactionData.length,
          activeSubscriptions,
          pendingEnquiries,
          monthlyRevenue: totalRevenue,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setDashboardStats((prev) => ({ ...prev, isLoading: false }));
      }
    };

    loadStats();
  }, []);

  const chartColors = ["#4f46e5", "#10b981", "#ef4444", "#f59e0b"];
  const totalCustomers = dashboardStats.totalCustomers;
  const activeSubs = dashboardStats.activeSubscriptions;
  const inactiveCustomers =
    totalCustomers > activeSubs ? totalCustomers - activeSubs : 0;

  const pieData = [
    { name: "Active Subscribers", value: activeSubs },
    { name: "Inactive / No Plan", value: inactiveCustomers },
  ];

  const coreStats = [
    {
      title: "Total Customers",
      value: String(dashboardStats.totalCustomers),
      icon: <Users />,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Active Subscriptions",
      value: String(dashboardStats.activeSubscriptions),
      icon: <CreditCard />,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(dashboardStats.monthlyRevenue),
      icon: <Dumbbell />,
      color: "text-indigo-600 bg-indigo-100",
    },
    {
      title: "New Enquiries",
      value: String(dashboardStats.pendingEnquiries),
      icon: <MessageSquare />,
      color: "text-yellow-600 bg-yellow-100",
    },
  ];

  const operationalStats = [
    {
      title: "Total Employees",
      value: String(dashboardStats.totalEmployees),
      icon: <UserIcon />,
      color: "text-red-600 bg-red-100",
    },
    {
      title: "Total Trainers",
      value: String(dashboardStats.totalTrainers),
      icon: <BarChart3 />,
      color: "text-orange-600 bg-orange-100",
    },
    {
      title: "Active Memberships",
      value: String(dashboardStats.totalMemberships),
      icon: <List />,
      color: "text-purple-600 bg-purple-100",
    },
    {
      title: "Active Offers",
      value: String(dashboardStats.totalOffers),
      icon: <Tag />,
      color: "text-pink-600 bg-pink-100",
    },
  ];

  if (dashboardStats.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold text-gray-500">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 pb-3">
        Admin Dashboard
      </h1>

      {/* 1. Core Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {coreStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* 2. Charts Section */}
      {mounted && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-[400px] flex flex-col min-w-0">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Revenue Trend (Income Only)
            </h3>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis
                    stroke="#6b7280"
                    tickFormatter={(val) => `₹${val / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value: any) => [
                      formatCurrency(Number(value) || 0),
                      "Revenue",
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    fill={chartColors[0]}
                    radius={[4, 4, 0, 0]}
                    name="Monthly Income"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Status Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-[400px] flex flex-col min-w-0">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Customer Subscription Status
            </h3>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                  >
                    <Cell fill={chartColors[1]} />
                    <Cell fill={chartColors[2]} />
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 3. Operational Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {operationalStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* 4. Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between border-b pb-2">
              <span className="text-green-600 font-medium">
                System Initialized
              </span>
              <span className="text-sm text-gray-500">Just now</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span className="text-blue-600 font-medium">
                Dashboard Loaded
              </span>
              <span className="text-sm text-gray-500">Just now</span>
            </li>
            <li className="text-center pt-2">
              <Link
                href="/admin/transactions"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View All Transactions &rarr;
              </Link>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link
              href="/admin/enquiries"
              className="block p-3 bg-indigo-50 rounded-lg text-indigo-700 font-medium hover:bg-indigo-200 hover:!text-indigo-950 transition-colors"
            >
              Manage Enquiries
            </Link>
            <Link
              href="/admin/employees"
              className="block p-3 bg-green-50 rounded-lg text-green-700 font-medium hover:bg-green-200 hover:!text-green-950 transition-colors"
            >
              Manage Employees
            </Link>
            <Link
              href="/admin/subscriptions"
              className="block p-3 bg-red-50 rounded-lg text-red-700 font-medium hover:bg-red-200 hover:!text-red-950 transition-colors"
            >
              Manage Subscriptions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
