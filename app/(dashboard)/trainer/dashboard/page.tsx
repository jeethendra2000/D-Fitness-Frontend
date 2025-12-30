"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  CreditCard,
  MessageSquare,
  Dumbbell,
  LucideProps,
  Tag,
  User as UserIcon, // Renamed to avoid collision with interface below
  Star,
  List,
  BarChart3,
} from "lucide-react";
import { API_BASE_URL } from "@/configs/constants";

// --- Recharts Imports (assuming installed) ---
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

interface Transaction {
  status: string;
  amount: number;
  createdOn: string;
}

interface Subscription {
  status: string;
}

interface Enquiry {
  status: string;
}

interface DashboardData {
  // Core Metrics
  totalCustomers: number;
  totalEmployees: number;
  totalTrainers: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  pendingEnquiries: number;
  // Infrastructure/Other Counts
  totalFeedbacks: number;
  totalMemberships: number;
  totalOffers: number;
  totalTransactions: number;

  isLoading: boolean;
}

// --- Interface Definitions ---
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactElement<LucideProps>;
  color: string;
}

interface MonthlyRevenueDataPoint {
  name: string; // e.g., "Nov 2025"
  revenue: number;
}

// --- Reusable Stat Card Component ---
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

// --- Utility Function for JSON Fetching (Safety) ---
const fetchJson = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Failed to fetch ${url}. Status: ${response.status}`);
    return []; // Return empty array on failure to prevent crash
  }
  const json = await response.json();
  // Assuming API structure might return data directly or within a 'data' property
  return Array.isArray(json) ? json : json.data || [];
};

// Helper to format currency (used for Revenue)
const formatCurrency = (amount: number) => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
};

// --- Core Aggregation Logic ---
// FIX 1: transactions array is now correctly typed
const calculateRevenueByMonth = (
  transactions: Transaction[]
): MonthlyRevenueDataPoint[] => {
  const revenueMap: Record<string, number> = {}; // Key: YYYY-MM

  transactions.forEach((tx) => {
    // tx is now implicitly Transaction
    // Only aggregate completed transactions with an amount and valid date
    if (tx.status === "Completed" && tx.amount > 0 && tx.createdOn) {
      const date = new Date(tx.createdOn);
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

  // Displaying the last 6 months provides a useful trend view
  return chartData.slice(-6);
};

// --- Main Dashboard Component ---
export default function AdminDashboardPage() {
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

  // New state for chart data
  const [monthlyRevenueChartData, setMonthlyRevenueChartData] = useState<
    MonthlyRevenueDataPoint[]
  >([]);

  useEffect(() => {
    const loadStats = async () => {
      setDashboardStats((prev) => ({ ...prev, isLoading: true }));

      try {
        // Fetch all necessary data concurrently
        const [
          customerData,
          employeeData,
          trainerData,
          feedbackData,
          membershipData,
          offerData,
          subscriptionData,
          transactionData,
          enquiryData,
        ] = await Promise.all([
          fetchJson(`${API_BASE_URL}/Customers`),
          fetchJson(`${API_BASE_URL}/Employees`),
          fetchJson(`${API_BASE_URL}/Trainers`),
          fetchJson(`${API_BASE_URL}/Feedbacks`),
          fetchJson(`${API_BASE_URL}/Memberships`),
          fetchJson(`${API_BASE_URL}/Offers`),
          fetchJson(`${API_BASE_URL}/Subscriptions`),
          fetchJson(`${API_BASE_URL}/Transactions`),
          fetchJson(`${API_BASE_URL}/Enquiries`),
        ]);

        // --- 1. Calculate Metrics ---

        const totalCustomers = customerData.length;
        const totalEmployees = employeeData.length;
        const totalTrainers = trainerData.length;
        const totalMemberships = membershipData.length;
        const totalOffers = offerData.length;
        const totalTransactions = transactionData.length;

        const activeSubscriptions = subscriptionData.filter(
          (sub: Subscription) => sub.status === "Active"
        ).length;

        const totalFeedbacks = feedbackData.length;

        const pendingEnquiries = enquiryData.filter(
          (enq: Enquiry) => enq.status === "New"
        ).length;

        const monthlyRevenue = (transactionData as Transaction[]).reduce(
          (sum: number, tx: Transaction) => sum + (tx.amount || 0),
          0
        );

        // --- 2. Calculate Chart Data ---
        const chartData = calculateRevenueByMonth(
          transactionData as Transaction[]
        );
        setMonthlyRevenueChartData(chartData);

        setDashboardStats({
          totalCustomers,
          totalEmployees,
          totalTrainers,
          totalFeedbacks,
          totalMemberships,
          totalOffers,
          totalTransactions,
          activeSubscriptions,
          pendingEnquiries,
          monthlyRevenue,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setDashboardStats((prev) => ({ ...prev, isLoading: false }));
      }
    };

    loadStats();
  }, []);

  // --- Chart Data Preparation ---
  const chartColors = [
    "#4f46e5",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#7c3aed",
    "#db2777",
    "#0891b2",
    "#f97316",
    "#14b8a6",
    "#f472b6",
  ];

  const totalUsers = dashboardStats.totalCustomers;
  const activeSubs = dashboardStats.activeSubscriptions;
  const inactiveSubs = totalUsers > activeSubs ? totalUsers - activeSubs : 0;

  const pieData = [
    { name: "Active Subscriptions", value: activeSubs },
    { name: "Inactive Users", value: inactiveSubs },
  ];

  // --- 1. Core Financial/User Stats (First Row) ---
  const coreStats = [
    {
      title: "Total Customers",
      value: dashboardStats.isLoading
        ? "..."
        : String(dashboardStats.totalCustomers),
      icon: <Users />,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Active Subscriptions",
      value: dashboardStats.isLoading
        ? "..."
        : String(dashboardStats.activeSubscriptions),
      icon: <CreditCard />,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Revenue (Total)",
      value: dashboardStats.isLoading
        ? "..."
        : formatCurrency(dashboardStats.monthlyRevenue),
      icon: <Dumbbell />,
      color: "text-indigo-600 bg-indigo-100",
    },
    {
      title: "Pending Enquiries",
      value: dashboardStats.isLoading
        ? "..."
        : String(dashboardStats.pendingEnquiries),
      icon: <MessageSquare />,
      color: "text-yellow-600 bg-yellow-100",
    },
  ];

  // --- 2. Operational/Infrastructure Stats (Second Row) ---
  const operationalStats = [
    {
      title: "Total Employees",
      value: dashboardStats.isLoading
        ? "..."
        : String(dashboardStats.totalEmployees),
      icon: <UserIcon />, // Used UserIcon instead of Lucide's User to avoid collision with potential User interface
      color: "text-red-600 bg-red-100",
    },
    {
      title: "Total Trainers",
      value: dashboardStats.isLoading
        ? "..."
        : String(dashboardStats.totalTrainers),
      icon: <BarChart3 />,
      color: "text-orange-600 bg-orange-100",
    },
    {
      title: "Total Memberships",
      value: dashboardStats.isLoading
        ? "..."
        : String(dashboardStats.totalMemberships),
      icon: <List />,
      color: "text-purple-600 bg-purple-100",
    },
    {
      title: "Total Offers",
      value: dashboardStats.isLoading
        ? "..."
        : String(dashboardStats.totalOffers),
      icon: <Tag />,
      color: "text-pink-600 bg-pink-100",
    },
    {
      title: "Total Feedback",
      value: dashboardStats.isLoading
        ? "..."
        : String(dashboardStats.totalFeedbacks),
      icon: <Star />,
      color: "text-lime-600 bg-lime-100",
    },
    // Removed Gym Locations stat card
  ];

  const recentActivities = [
    {
      type: "New Enquiry",
      detail: "Ravi Kumar asked about the yearly plan.",
      time: "5 min ago",
      color: "text-yellow-600",
    },
    {
      type: "Salary Paid",
      detail: "Transaction #888... for Trainer salary.",
      time: "1 hour ago",
      color: "text-red-600",
    },
    {
      type: "New Subscription",
      detail: "Priya Singh started a Monthly plan.",
      time: "3 hours ago",
      color: "text-green-600",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <br />
      {/* 1. Core Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 mb-8">
        {coreStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {/* Bar Chart: Monthly Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-96">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Last 6 Months Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={monthlyRevenueChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis
                stroke="#6b7280"
                // Format to thousands for cleaner axis display
                tickFormatter={(value: number) => `₹${value / 1000}k`}
              />
              <Tooltip
                // Format currency for the tooltip popup
                formatter={(value: number) => [
                  formatCurrency(value),
                  "Revenue",
                ]}
              />
              <Legend />
              <Bar
                dataKey="revenue"
                fill={chartColors[0]}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Subscription Status Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-96">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Subscription Status Breakdown
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                labelLine={false}
                label={({
                  name,
                  percent,
                }: {
                  name?: string;
                  percent?: number;
                }) => {
                  const labelName = name ?? "N/A";
                  const labelPercent = percent ?? 0;
                  return `${labelName}: ${(labelPercent * 100).toFixed(0)}%`;
                }}
              >
                <Cell key={`cell-0`} fill={chartColors[1]} />{" "}
                {/* Active: Green */}
                <Cell key={`cell-1`} fill={chartColors[3]} />{" "}
                {/* Inactive: Red */}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value} users`,
                  name,
                ]}
              />
              <Legend
                align="center"
                verticalAlign="bottom"
                layout="horizontal"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Operational Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
        {operationalStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* 4. Quick Activity & Reports Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <ul className="space-y-4">
            {recentActivities.map((activity, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${activity.color.replace(
                      "text-",
                      "bg-"
                    )}`}
                  />
                  <div>
                    <p className={`font-semibold ${activity.color}`}>
                      {activity.type}
                    </p>
                    <p className="text-sm text-gray-600">{activity.detail}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </li>
            ))}
            <li className="text-center pt-2">
              <a
                href="/admin/transactions"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View All Transactions &rarr;
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links / Important Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <a
              href="/admin/enquiries"
              className="block p-3 bg-indigo-50 rounded-lg text-indigo-700 font-medium hover:bg-indigo-100 transition duration-150"
            >
              Manage Enquiries (
              {dashboardStats.isLoading
                ? "..."
                : dashboardStats.pendingEnquiries}{" "}
              New)
            </a>
            <a
              href="/admin/offers"
              className="block p-3 bg-green-50 rounded-lg text-green-700 font-medium hover:bg-green-100 transition duration-150"
            >
              Total Employees (
              {dashboardStats.isLoading ? "..." : dashboardStats.totalEmployees}
              )
            </a>
            <a
              href="/admin/employees"
              className="block p-3 bg-red-50 rounded-lg text-red-700 font-medium hover:bg-red-100 transition duration-150"
            >
              Total Feedbacks (
              {dashboardStats.isLoading ? "..." : dashboardStats.totalFeedbacks}
              )
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
