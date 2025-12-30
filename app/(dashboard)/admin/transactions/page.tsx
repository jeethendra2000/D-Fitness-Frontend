"use client";
import React, { useEffect, useState } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";
import TransactionForm from "@/components/adminComponents/forms/TransactionForm";
import {
  PaymentMode,
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";

interface User {
  id: string;
  firebase_UID: string;
  fullName?: string;
}

interface Employee {
  id: string;
  firebase_UID: string;
  jobTitle: string;
  fullName?: string;
}

interface Subscription {
  id: string;
  membershipID: string;
}

interface Membership {
  id: string;
  name: string;
}

export default function TransactionsPage() {
  const apiUrl = `${API_BASE_URL}/Transactions`;

  const [userMap, setUserMap] = useState<Record<string, string>>({});
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

        const customers: User[] = Array.isArray(custJson)
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

        // 2. User Map (Combined)
        const uMap: Record<string, string> = {};
        customers.forEach((u) => {
          if (u.id)
            uMap[u.id] = u.fullName
              ? `${u.fullName} (Customer)`
              : `Customer (${u.firebase_UID})`;
        });
        employees.forEach((e) => {
          if (e.id)
            uMap[e.id] = e.fullName
              ? `${e.fullName} (Staff)`
              : `Employee (${e.jobTitle})`;
        });

        // 3. Subscription Map
        const subMap: Record<string, string> = {};
        subscriptions.forEach((s) => {
          if (s.id) {
            const membershipName =
              memNameMap[s.membershipID] || "Unknown Membership";
            subMap[s.id] = `${membershipName} (${s.id.substring(0, 8)}...)`;
          }
        });

        setUserMap(uMap);
        setSubscriptionMap(subMap);
      } catch (err) {
        console.error("Failed to fetch mappings", err);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef<Transaction>[] = [
    {
      field: "createdOn",
      headerName: "Date & Time",
      flex: 1.2,
      minWidth: 180,
      renderCell: (params: GridRenderCellParams<Transaction, string>) => {
        if (!params.value) return "";
        return new Date(params.value).toLocaleString();
      },
    },
    {
      field: "payerId",
      headerName: "Payer",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => userMap[params.value ?? ""] || "—",
    },
    {
      field: "payeeId",
      headerName: "Payee",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => userMap[params.value ?? ""] || "—",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.6,
      minWidth: 100,
      renderCell: (params) =>
        params.value != null ? `₹${params.value.toFixed(2)}` : "₹0.00",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: "subscriptionId",
      headerName: "Subscription",
      flex: 1.2,
      minWidth: 200,
      renderCell: (params) =>
        params.value ? subscriptionMap[params.value] || params.value : "—",
    },
  ];

  const initialTransaction: Transaction = {
    id: "",
    createdOn: new Date().toISOString(),
    payerId: "",
    payeeId: "",
    amount: 0,
    type: TransactionType.SubscriptionPayment,
    status: TransactionStatus.Pending,
    modeOfPayment: PaymentMode.Cash,
    subscriptionId: null,
    offerId: null,
    description: "",
    paymentGatewayId: "",
  };

  return (
    <GenericCrudTable<Transaction>
      title="Transactions"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialTransaction}
      // ✅ Pass readOnly to the form
      renderForm={(data, setData, readOnly) => (
        <TransactionForm data={data} setData={setData} readOnly={readOnly} />
      )}
    />
  );
}
