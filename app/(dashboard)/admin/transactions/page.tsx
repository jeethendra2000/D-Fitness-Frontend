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
}

// Interface for Employee data required for mapping
interface Employee {
  id: string;
  firebase_UID: string;
  jobTitle: string; // Used for better display identification
}

interface Subscription {
  id: string;
  membershipID: string; // Needed to look up the membership name
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
          fetch(`${API_BASE_URL}/Employees`), // Fetch Employees
          fetch(`${API_BASE_URL}/Subscriptions`),
          fetch(`${API_BASE_URL}/Memberships`),
        ]);

        const [custJson, empJson, subJson, memJson] = await Promise.all([
          custRes.json(),
          empRes.json(), // Process Employee JSON
          subRes.json(),
          memRes.json(),
        ]);

        const customers: User[] = Array.isArray(custJson)
          ? custJson
          : custJson.data || [];
        const employees: Employee[] = Array.isArray(empJson) // Define Employee type
          ? empJson
          : empJson.data || [];
        const subscriptions: Subscription[] = Array.isArray(subJson)
          ? subJson
          : subJson.data || [];
        const memberships: Membership[] = Array.isArray(memJson)
          ? memJson
          : memJson.data || [];

        // 1. Create Membership Map (ID -> Name)
        const memNameMap: Record<string, string> = {};
        memberships.forEach((m) => {
          if (m.id) memNameMap[m.id] = m.name;
        });

        // 2. Create Unified User Map (ID -> Descriptive String)
        const uMap: Record<string, string> = {};

        // Add Customers
        customers.forEach((u) => {
          if (u.id) uMap[u.id] = `Customer (${u.firebase_UID || "Unknown"})`;
        });

        // Add Employees (Prioritize Employees if IDs overlap, which shouldn't happen)
        employees.forEach((e) => {
          if (e.id) uMap[e.id] = `Employee (${e.jobTitle || "Staff"})`;
        });

        // 3. Create Subscription Display Map
        const subMap: Record<string, string> = {};
        subscriptions.forEach((s) => {
          if (s.id) {
            const membershipName =
              memNameMap[s.membershipID] || "Unknown Membership";
            // FIX: DO NOT TRUNCATE ID for full visibility
            subMap[s.id] = `${membershipName} (${s.id})`;
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
      headerName: "Transaction Time", // Updated header
      flex: 1, // Increased flex
      minWidth: 180, // Increased minWidth
      renderCell: (params: GridRenderCellParams<Transaction, string>) => {
        if (!params.value) return "";
        const d = new Date(params.value);

        // Date part: DD-MM-YYYY
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        const datePart = `${day}-${month}-${year}`;

        // Time part: HH:MM AM/PM (12-hour format)
        let hours = d.getHours();
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const hour12 = String(hours).padStart(2, "0");
        const timePart = `${hour12}:${minutes} ${ampm}`;

        return `${datePart} ${timePart}`;
      },
    },
    {
      field: "payerId",
      headerName: "Payer",
      flex: 1,
      minWidth: 150,
      // The map now contains descriptive strings like "Customer (...)" or "Employee (...)"
      renderCell: (params: GridRenderCellParams<Transaction, string>) =>
        userMap[params.value ?? ""] || "—",
    },
    {
      field: "payeeId",
      headerName: "Payee",
      flex: 1,
      minWidth: 150,
      // The map now contains descriptive strings like "Customer (...)" or "Employee (...)"
      renderCell: (params: GridRenderCellParams<Transaction, string>) =>
        userMap[params.value ?? ""] || "—",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.5,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams<Transaction, number>) =>
        params.value != null ? `₹${params.value.toFixed(2)}` : "₹0.00",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.6,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.6,
      minWidth: 120,
    },
    {
      field: "subscriptionId",
      headerName: "Subscription Details (ID)", // Updated header
      flex: 2.2, // Increased flex significantly
      minWidth: 350, // Increased width for the full UUID
      renderCell: (params: GridRenderCellParams<Transaction, string | null>) =>
        params.value ? subscriptionMap[params.value] || "N/A" : "N/A",
    },
  ];

  const initialTransaction: Transaction = {
    id: "", // Generated by backend
    createdOn: new Date().toISOString(),
    payerId: "",
    payeeId: "",
    amount: 1.0,
    type: TransactionType.SubscriptionPayment,
    status: TransactionStatus.Pending,
    modeOfPayment: PaymentMode.Cash,
    subscriptionId: null,
    description: null,
    paymentGatewayId: null,
  };

  return (
    <GenericCrudTable<Transaction>
      title="Transactions"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialTransaction}
      renderForm={(data, setData) => (
        <TransactionForm data={data} setData={setData} />
      )}
    />
  );
}
