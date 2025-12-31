"use client";

import React, { useEffect, useState } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";
import TransactionForm from "@/components/adminComponents/forms/TransactionForm";
import {
  // ✅ FIX 1: Import PaymentType instead of PaymentMode
  PaymentType,
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";

// Helper interfaces for mapping ID -> Name
interface User {
  id: string;
  firebase_UID: string;
  fullName?: string;
  firstname?: string;
  lastname?: string;
}

interface Employee extends User {
  jobTitle: string;
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

        // 2. User Map
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
          const memName = memNameMap[s.membershipID] || "Unknown Plan";
          subMap[s.id] = `${memName} (#${s.id.substring(0, 4)})`;
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
      headerName: "Date",
      flex: 0.8,
      minWidth: 160,
      // ✅ FIX 2: Explicitly cast 'value' to string
      valueFormatter: (value: any) => {
        if (!value) return "—";
        const dateStr = value as string;
        const dateString = dateStr.endsWith("Z") ? dateStr : `${dateStr}Z`;
        return new Date(dateString).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "short",
          hour12: true,
        });
      },
    },
    {
      field: "accountId",
      headerName: "User / Account",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => userMap[params.value] || params.value || "—",
    },
    {
      field: "transactionType",
      headerName: "Type",
      flex: 0.7,
      minWidth: 140,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.5,
      minWidth: 100,
      // ✅ FIX 3: Explicitly cast 'val' to number
      valueFormatter: (val: any) => {
        const num = val as number;
        return num != null ? `₹${num.toFixed(2)}` : "₹0";
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
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
      field: "subscriptionId",
      headerName: "Linked Sub.",
      flex: 0.8,
      minWidth: 150,
      renderCell: (params) =>
        params.value ? subscriptionMap[params.value] || "View Details" : "—",
    },
  ];

  const initialTransaction: Transaction = {
    id: "",
    accountId: "",
    transactionType: TransactionType.SubscriptionPayment,
    status: TransactionStatus.Pending,
    amount: 0,
    // ✅ FIX 4: Use PaymentType
    paymentType: PaymentType.Cash,
    subscriptionId: null,
    paymentReferenceId: "",
    description: "",
    transactionDate: new Date().toISOString(),
    createdOn: new Date().toISOString(),
  };

  const transformTransactionPayload = (
    data: Transaction,
    isUpdate: boolean
  ): FormData => {
    const formData = new FormData();

    formData.append("AccountId", data.accountId);
    formData.append("TransactionType", data.transactionType);
    formData.append("Amount", data.amount.toString());
    formData.append("PaymentType", data.paymentType);
    formData.append("Status", data.status);

    if (data.subscriptionId) {
      formData.append("SubscriptionId", data.subscriptionId);
    }

    if (data.paymentReferenceId) {
      formData.append("PaymentReferenceId", data.paymentReferenceId);
    }

    if (data.description) {
      formData.append("Description", data.description);
    }

    return formData;
  };

  return (
    <GenericCrudTable<Transaction>
      title="Transactions"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialTransaction}
      payloadConverter={transformTransactionPayload}
      renderForm={(data, setData, readOnly) => (
        <TransactionForm data={data} setData={setData} readOnly={readOnly} />
      )}
    />
  );
}
