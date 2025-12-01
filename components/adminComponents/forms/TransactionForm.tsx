"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import {
  TransactionType,
  TransactionStatus,
  PaymentMode,
  Transaction,
  Subscription, 
} from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";

interface CustomerData {
  id: string;
  firebase_UID: string;
}

interface EmployeeData {
  id: string;
  firebase_UID: string;
  jobTitle: string;
}

interface TransactionFormProps {
  data: Transaction;
  setData: React.Dispatch<React.SetStateAction<Transaction>>;
}

// Unified interface for Payer/Payee selection
interface UserOption {
  id: string;
  firebase_UID: string;
  type: "Customer" | "Employee";
  description: string; // e.g., "Customer (FB_UID_...)" or "Employee (Trainer)"
}

interface SubscriptionOption {
  id: string;
  membershipID: string;
  membershipName: string;
}

interface Membership {
  id: string;
  name: string;
}

export default function TransactionForm({
  data,
  setData,
}: TransactionFormProps) {
  // Use 'users' state for the combined list of customers and employees
  const [users, setUsers] = useState<UserOption[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionOption[]>([]);
  const [loading, setLoading] = useState(false);

  const typeOptions = Object.values(TransactionType);
  const statusOptions = Object.values(TransactionStatus);
  const paymentModeOptions = Object.values(PaymentMode); // Options for new field

  // ✅ Fetch all data: Customers, Employees, Subscriptions, Memberships
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [custRes, empRes, subRes, memRes] = await Promise.all([
          fetch(`${API_BASE_URL}/Customers`),
          fetch(`${API_BASE_URL}/Employees`),
          fetch(`${API_BASE_URL}/Subscriptions`),
          fetch(`${API_BASE_URL}/Memberships`),
        ]);

        // --- Process JSON Responses ---
        const [custJson, empJson, subJson, memJson] = await Promise.all([
          custRes.json(),
          empRes.json(),
          subRes.json(),
          memRes.json(),
        ]);

        const customers: CustomerData[] = Array.isArray(custJson)
          ? custJson
          : custJson.data || [];
        const employees: EmployeeData[] = Array.isArray(empJson)
          ? empJson
          : empJson.data || [];
        const subscriptionList = Array.isArray(subJson)
          ? subJson
          : subJson.data || [];
        const membershipList: Membership[] = Array.isArray(memJson)
          ? memJson
          : memJson.data || [];

        // --- 1. Combine Users (Customers + Employees) ---
        const combinedUsers: UserOption[] = [];

        // Add Customers
        customers.forEach((c) => {
          combinedUsers.push({
            id: c.id,
            firebase_UID: c.firebase_UID,
            type: "Customer",
            description: `Customer (${c.firebase_UID})`,
          });
        });

        // Add Employees
        employees.forEach((e) => {
          combinedUsers.push({
            id: e.id,
            firebase_UID: e.firebase_UID,
            type: "Employee",
            // FIX: Ensure description is unique by adding the ID suffix
            description: `Employee (${
              e.jobTitle || "Staff"
            }) [ID:${e.id.substring(0, 4)}...]`,
          });
        });

        setUsers(combinedUsers);

        // --- 2. Process Subscriptions ---
        const memNameMap = membershipList.reduce((acc, m) => {
          acc[m.id] = m.name;
          return acc;
        }, {} as Record<string, string>);

        setSubscriptions(
          subscriptionList.map((s: Subscription) => ({
            // <-- FIX: Changed any to Subscription
            id: s.id,
            membershipID: s.membershipID,
            membershipName: memNameMap[s.membershipID] || "Unknown",
          }))
        );
      } catch (error) {
        console.error("Failed to fetch transaction dependencies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectedPayer = users.find((u) => u.id === data.payerId) || null;
  const selectedPayee = users.find((u) => u.id === data.payeeId) || null;
  const selectedSubscription =
    subscriptions.find((s) => s.id === data.subscriptionId) || null;

  const getUserLabel = (option: UserOption) => option.description;

  const getSubscriptionLabel = (option: SubscriptionOption) => {
    return `${option.membershipName} (${option.id.substring(0, 8)}...)`;
  };

  // Conditional check for subscription field visibility
  const showSubscriptionField =
    data.type === TransactionType.SubscriptionPayment;

  useEffect(() => {
    if (!showSubscriptionField && data.subscriptionId !== null) {
      setData((prev: Transaction) => ({ ...prev, subscriptionId: null }));
    }
  }, [showSubscriptionField, data.subscriptionId, setData]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      {/* Payer (Combined Customer/Employee) */}
      <Autocomplete
        options={users}
        loading={loading}
        value={selectedPayer}
        getOptionLabel={getUserLabel}
        // FIX: Add getOptionKey for uniqueness insurance
        getOptionKey={(option) => option.id}
        onChange={(_, newValue) =>
          setData({ ...data, payerId: newValue?.id ?? "" })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Payer (Customer/Employee)"
            required
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      {/* Payee (Combined Customer/Employee) */}
      <Autocomplete
        options={users}
        loading={loading}
        value={selectedPayee}
        getOptionLabel={getUserLabel}
        // FIX: Add getOptionKey for uniqueness insurance
        getOptionKey={(option) => option.id}
        onChange={(_, newValue) =>
          setData({ ...data, payeeId: newValue?.id ?? "" })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Payee (Customer/Employee)"
            required
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      {/* Amount */}
      <TextField
        label="Amount (₹)"
        type="number"
        inputProps={{ min: 1, max: 1000000 }}
        value={data.amount}
        onChange={(e) =>
          setData({ ...data, amount: parseFloat(e.target.value) })
        }
        required
      />

      {/* Type */}
      <TextField
        select
        label="Transaction Type"
        value={data.type}
        onChange={(e) =>
          setData({ ...data, type: e.target.value as TransactionType })
        }
        required
      >
        {typeOptions.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </TextField>

      {/* Status */}
      <TextField
        select
        label="Status"
        value={data.status}
        onChange={(e) =>
          setData({ ...data, status: e.target.value as TransactionStatus })
        }
        required
      >
        {statusOptions.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </TextField>

      {/* Mode of Payment (New Field) */}
      <TextField
        select
        label="Mode of Payment"
        // Assuming 'modeOfPayment' field exists on data object
        value={data.modeOfPayment || PaymentMode.Card}
        onChange={(e) =>
          setData({ ...data, modeOfPayment: e.target.value as PaymentMode })
        }
        required
      >
        {paymentModeOptions.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </TextField>

      {/* Subscription (optional) - CONDITIONAL RENDERING */}
      {showSubscriptionField && (
        <Autocomplete
          options={subscriptions}
          loading={loading}
          value={selectedSubscription}
          getOptionLabel={getSubscriptionLabel}
          onChange={(_, newValue) =>
            setData({ ...data, subscriptionId: newValue?.id ?? null })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Linked Subscription (Membership Name & ID)"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}

      {/* Description */}
      <TextField
        label="Description"
        value={data.description || ""}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        multiline
        rows={2}
      />

      {/* Payment Gateway ID */}
      <TextField
        label="Payment Gateway ID"
        value={data.paymentGatewayId || ""}
        onChange={(e) => setData({ ...data, paymentGatewayId: e.target.value })}
      />
    </Box>
  );
}
