"use client";

import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";
import TransactionForm from "@/components/adminComponents/forms/TransactionForm";
import {
  PaymentType,
  Transaction,
  TransactionStatus,
  TransactionType,
  Account,
  Employee,
  Subscription,
  Membership,
} from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";

export default function TransactionsPage() {
  const apiUrl = `${API_BASE_URL}/Transactions`;

  const [AccountMap, setAccountMap] = useState<Record<string, string>>({});
  const [subscriptionMap, setSubscriptionMap] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, empRes, subRes, memRes] = await Promise.all([
          fetch(`${API_BASE_URL}/Customers`),
          fetch(`${API_BASE_URL}/Employees`),
          fetch(`${API_BASE_URL}/Subscriptions`),
          fetch(`${API_BASE_URL}/Memberships`),
        ]);

        const [custJson, empJson, subJson, memJson] = await Promise.all([
          custRes.json(),
          empRes.json(),
          subRes.json(),
          memRes.json(),
        ]);

        const customers: Account[] = Array.isArray(custJson)
          ? custJson
          : custJson.data || [];
        const employees: Employee[] = Array.isArray(empJson)
          ? empJson
          : empJson.data || [];
        const subscriptions: Subscription[] = Array.isArray(subJson)
          ? subJson
          : subJson.data || [];
        const memberships: Membership[] = Array.isArray(memJson)
          ? memJson
          : memJson.data || [];

        // 1. Membership Map
        const memNameMap: Record<string, string> = {};
        memberships.forEach((m) => {
          if (m.id) memNameMap[m.id] = m.name;
        });

        // 2. Account Map
        const uMap: Record<string, string> = {};
        customers.forEach((u) => {
          const name = u.fullName || `${u.firstname} ${u.lastname}`;
          uMap[u.id] = `${name} (Customer)`;
        });
        employees.forEach((e) => {
          const name = e.fullName || `${e.firstname} ${e.lastname}`;
          uMap[e.id] = `${name} (${e.jobTitle})`;
        });

        // 3. Subscription Map
        const subMap: Record<string, string> = {};
        subscriptions.forEach((s) => {
          const memName = memNameMap[s.membershipId] || "Unknown Plan";
          subMap[s.id] = `${memName}`;
        });

        setAccountMap(uMap);
        setSubscriptionMap(subMap);
      } catch (err) {
        console.error("Failed to fetch mappings", err);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef<Transaction>[] = [
    {
      field: "accountId",
      headerName: "Account",
      flex: 0.7,
      minWidth: 150,
      renderCell: (params) => AccountMap[params.value] || params.value || "—",
    },
    {
      field: "transactionType",
      headerName: "Type",
      flex: 0.5,
      minWidth: 120,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.3,
      minWidth: 100,
      valueFormatter: (val: any) => {
        const num = val as number;
        return num != null ? `₹${num.toFixed(2)}` : "₹0";
      },
    },
    {
      field: "subscriptionId",
      headerName: "Subscription",
      flex: 0.5,
      minWidth: 120,
      renderCell: (params) =>
        params.value ? subscriptionMap[params.value] || "Subscription" : "—",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.3,
      minWidth: 100,
      renderCell: (params) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            params.value === "Completed"
              ? "bg-green-100 text-green-800"
              : params.value === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "createdOn",
      headerName: "Created On",
      flex: 0.4,
      minWidth: 180,
      valueFormatter: (value: any) => {
        if (!value) return "—";
        const dateStr = value as string;
        const utcString = dateStr.endsWith("Z") ? dateStr : `${dateStr}Z`;
        return new Date(utcString)
          .toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .toUpperCase();
      },
    },
  ];

  const initialTransaction: Transaction = {
    id: "",
    accountId: "",
    transactionType: TransactionType.SubscriptionPayment,
    status: TransactionStatus.Pending,
    amount: 0,
    paymentType: PaymentType.Cash,
    subscriptionId: null,
    paymentReferenceId: "",
    description: "",
    transactionDate: new Date().toISOString(),
    createdOn: new Date().toISOString(),
  };

  return (
    <GenericCrudTable<Transaction>
      title="Transactions"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialTransaction}
      renderForm={(data, setData, readOnly) => (
        <TransactionForm data={data} setData={setData} readOnly={readOnly} />
      )}
    />
  );
}
