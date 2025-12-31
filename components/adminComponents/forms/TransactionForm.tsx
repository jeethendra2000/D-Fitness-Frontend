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
  PaymentType,
  Transaction,
} from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";

// --- Types for Dropdowns ---
interface UserOption {
  id: string;
  type: "Customer" | "Employee";
  name: string;
  description: string;
}

interface SubscriptionOption {
  id: string;
  customerId: string;
  membershipName: string;
  status: string;
}

interface TransactionFormProps {
  data: Transaction;
  setData: React.Dispatch<React.SetStateAction<Transaction>>;
  readOnly?: boolean;
}

export default function TransactionForm({
  data,
  setData,
  readOnly,
}: TransactionFormProps) {
  const [customers, setCustomers] = useState<UserOption[]>([]);
  const [employees, setEmployees] = useState<UserOption[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionOption[]>([]);
  const [loading, setLoading] = useState(false);

  // --- Fetch Data ---
  useEffect(() => {
    const fetchDependencies = async () => {
      setLoading(true);
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

        const cList = Array.isArray(custJson) ? custJson : custJson.data || [];
        const eList = Array.isArray(empJson) ? empJson : empJson.data || [];
        const sList = Array.isArray(subJson) ? subJson : subJson.data || [];
        const mList = Array.isArray(memJson) ? memJson : memJson.data || [];

        // 1. Process Customers
        const custOptions: UserOption[] = cList.map((c: any) => ({
          id: c.id,
          type: "Customer",
          name: c.fullName || `${c.firstname} ${c.lastname}`,
          description: `Customer - ${c.phoneNumber}`,
        }));

        // 2. Process Employees
        const empOptions: UserOption[] = eList.map((e: any) => ({
          id: e.id,
          type: "Employee",
          name: e.fullName || `${e.firstname} ${e.lastname}`,
          description: `${e.jobTitle} - ${e.phoneNumber}`,
        }));

        setCustomers(custOptions);
        setEmployees(empOptions);

        // 3. Process Subscriptions (Map Membership ID -> Name)
        const memMap: Record<string, string> = {};
        mList.forEach((m: any) => (memMap[m.id] = m.name));

        const subOptions: SubscriptionOption[] = sList.map((s: any) => ({
          id: s.id,
          customerId: s.customerId,
          membershipName: memMap[s.membershipID] || "Unknown Plan",
          status: s.status,
        }));
        setSubscriptions(subOptions);
      } catch (err) {
        console.error("Error fetching dependencies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDependencies();
  }, []);

  // --- Derived State ---

  // 1. Filter Account Options based on Transaction Type
  const accountOptions =
    data.transactionType === TransactionType.Salary ? employees : customers;

  // 2. Filter Subscriptions based on selected Account (only if it's a Customer)
  const filteredSubscriptions = subscriptions.filter(
    (s) => s.customerId === data.accountId
  );

  const selectedAccount =
    accountOptions.find((u) => u.id === data.accountId) || null;

  const selectedSubscription =
    filteredSubscriptions.find((s) => s.id === data.subscriptionId) || null;

  // --- Handlers ---

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newType = e.target.value as TransactionType;
    setData((prev) => ({
      ...prev,
      transactionType: newType,
      accountId: "", // Reset account on type change
      subscriptionId: null, // Reset sub on type change
    }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      {/* 1. Transaction Type */}
      <TextField
        select
        label="Transaction Type"
        value={data.transactionType}
        onChange={handleTypeChange}
        fullWidth
        required
        disabled={readOnly}
      >
        {Object.values(TransactionType).map((t) => (
          <MenuItem key={t} value={t}>
            {t}
          </MenuItem>
        ))}
      </TextField>

      {/* 2. Account Selection (Dynamic based on Type) */}
      <Autocomplete
        options={accountOptions}
        loading={loading}
        value={selectedAccount}
        disabled={readOnly}
        getOptionLabel={(option) => `${option.name} (${option.description})`}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_, newValue) => {
          setData((prev) => ({
            ...prev,
            accountId: newValue?.id || "",
            subscriptionId: null, // Reset subscription when user changes
          }));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              data.transactionType === TransactionType.Salary
                ? "Select Employee (Receiver)"
                : "Select Customer (Payer)"
            }
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

      {/* 3. Subscription Selection (Only if Subscription Payment) */}
      {data.transactionType === TransactionType.SubscriptionPayment && (
        <Autocomplete
          options={filteredSubscriptions}
          loading={loading}
          value={selectedSubscription}
          disabled={readOnly || !data.accountId}
          getOptionLabel={(option) =>
            `${option.membershipName} (${option.status})`
          }
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, newValue) => {
            setData((prev) => ({
              ...prev,
              subscriptionId: newValue?.id || null,
            }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Link Subscription"
              helperText={
                !data.accountId
                  ? "Select a customer first"
                  : filteredSubscriptions.length === 0
                  ? "No subscriptions found for this customer"
                  : ""
              }
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

      {/* 4. Amount & Status */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Amount (₹)"
          type="number"
          value={data.amount}
          onChange={(e) =>
            setData({ ...data, amount: parseFloat(e.target.value) || 0 })
          }
          fullWidth
          required
          disabled={readOnly}
        />
        <TextField
          select
          label="Status"
          value={data.status}
          onChange={(e) =>
            setData({
              ...data,
              status: e.target.value as TransactionStatus,
            })
          }
          fullWidth
          required
          disabled={readOnly}
        >
          {Object.values(TransactionStatus).map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* 5. Payment Details */}
      <TextField
        select
        label="Payment Mode"
        value={data.paymentType}
        onChange={(e) =>
          setData({ ...data, paymentType: e.target.value as PaymentType })
        }
        fullWidth
        required
        disabled={readOnly}
      >
        {/* ✅ FIX 2: Use PaymentType for iteration */}
        {Object.values(PaymentType).map((m) => (
          <MenuItem key={m} value={m}>
            {m}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Payment Reference ID (Optional)"
        value={data.paymentReferenceId || ""}
        onChange={(e) =>
          setData({ ...data, paymentReferenceId: e.target.value })
        }
        fullWidth
        disabled={readOnly}
      />

      <TextField
        label="Description / Notes"
        value={data.description || ""}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        multiline
        rows={3}
        fullWidth
        disabled={readOnly}
      />
    </Box>
  );
}
