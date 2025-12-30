"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Autocomplete,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  TransactionType,
  TransactionStatus,
  PaymentMode,
  Transaction,
  Subscription,
  Offer,
} from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";

interface CustomerData {
  id: string;
  firebase_UID: string;
  fullName?: string;
}

interface EmployeeData {
  id: string;
  firebase_UID: string;
  jobTitle: string;
  fullName?: string;
}

interface TransactionFormProps {
  data: Transaction;
  setData: React.Dispatch<React.SetStateAction<Transaction>>;
  readOnly?: boolean; // ✅ Added readOnly prop
}

// Unified interface for Payer/Payee selection
interface UserOption {
  id: string;
  type: "Customer" | "Employee";
  description: string;
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
  readOnly,
}: TransactionFormProps) {
  const [users, setUsers] = useState<UserOption[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionOption[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);

  const typeOptions = Object.values(TransactionType);
  const statusOptions = Object.values(TransactionStatus);
  const paymentModeOptions = Object.values(PaymentMode);

  // ✅ Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [custRes, empRes, subRes, memRes, offerRes] = await Promise.all([
          fetch(`${API_BASE_URL}/Customers`),
          fetch(`${API_BASE_URL}/Employees`),
          fetch(`${API_BASE_URL}/Subscriptions`),
          fetch(`${API_BASE_URL}/Memberships`),
          fetch(`${API_BASE_URL}/Offers`),
        ]);

        const [custJson, empJson, subJson, memJson, offerJson] =
          await Promise.all([
            custRes.json(),
            empRes.json(),
            subRes.json(),
            memRes.json(),
            offerRes.json(),
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
        const offerList: Offer[] = Array.isArray(offerJson)
          ? offerJson
          : offerJson.data || [];

        // --- 1. Combine Users ---
        const combinedUsers: UserOption[] = [];

        customers.forEach((c) => {
          combinedUsers.push({
            id: c.id,
            type: "Customer",
            description: c.fullName
              ? `${c.fullName} (Customer)`
              : `Customer (${c.firebase_UID})`,
          });
        });

        employees.forEach((e) => {
          combinedUsers.push({
            id: e.id,
            type: "Employee",
            description: e.fullName
              ? `${e.fullName} (${e.jobTitle})`
              : `Employee (${e.jobTitle})`,
          });
        });

        setUsers(combinedUsers);
        setOffers(offerList);

        // --- 2. Process Subscriptions ---
        const memNameMap = membershipList.reduce((acc, m) => {
          acc[m.id] = m.name;
          return acc;
        }, {} as Record<string, string>);

        setSubscriptions(
          subscriptionList.map((s: Subscription) => ({
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
  const selectedOffer = offers.find((o) => o.id === data.offerId) || null;

  const showSubscriptionField =
    data.type === TransactionType.SubscriptionPayment;

  // Clear subscription if type changes to something else
  useEffect(() => {
    if (!readOnly && !showSubscriptionField && data.subscriptionId !== null) {
      setData((prev) => ({ ...prev, subscriptionId: null }));
    }
  }, [showSubscriptionField, data.subscriptionId, setData, readOnly]);

  if (!data) return <Box>Loading...</Box>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      {/* Created On (View Only) */}
      {readOnly && (
        <TextField
          label="Transaction Date"
          value={new Date(data.createdOn).toLocaleString()}
          disabled
          fullWidth
        />
      )}

      {/* Payer */}
      <Autocomplete
        options={users}
        loading={loading}
        value={selectedPayer}
        disabled={readOnly}
        getOptionLabel={(option) => option.description}
        getOptionKey={(option) => option.id}
        onChange={(_, newValue) =>
          setData({ ...data, payerId: newValue?.id ?? "" })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Payer (From)"
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

      {/* Payee */}
      <Autocomplete
        options={users}
        loading={loading}
        value={selectedPayee}
        disabled={readOnly}
        getOptionLabel={(option) => option.description}
        getOptionKey={(option) => option.id}
        onChange={(_, newValue) =>
          setData({ ...data, payeeId: newValue?.id ?? "" })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Payee (To)"
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
        inputProps={{ min: 1 }}
        value={data.amount}
        onChange={(e) =>
          setData({ ...data, amount: parseFloat(e.target.value) })
        }
        required
        disabled={readOnly}
        fullWidth
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Type */}
        <TextField
          select
          label="Transaction Type"
          value={data.type}
          onChange={(e) =>
            setData({ ...data, type: e.target.value as TransactionType })
          }
          required
          disabled={readOnly}
          fullWidth
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
          disabled={readOnly}
          fullWidth
        >
          {statusOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Mode of Payment */}
      <TextField
        select
        label="Mode of Payment"
        value={data.modeOfPayment || PaymentMode.Cash}
        onChange={(e) =>
          setData({ ...data, modeOfPayment: e.target.value as PaymentMode })
        }
        required
        disabled={readOnly}
        fullWidth
      >
        {paymentModeOptions.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </TextField>

      {/* Subscription (Conditional) */}
      {(showSubscriptionField || readOnly) && (
        <Autocomplete
          options={subscriptions}
          loading={loading}
          value={selectedSubscription}
          disabled={readOnly}
          getOptionLabel={(option) =>
            `${option.membershipName} (${option.id.substring(0, 8)}...)`
          }
          onChange={(_, newValue) =>
            setData({ ...data, subscriptionId: newValue?.id ?? null })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Linked Subscription"
              helperText={
                !showSubscriptionField ? "Visible because View Mode" : ""
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

      {/* Offer (Optional) */}
      <Autocomplete
        options={offers}
        loading={loading}
        value={selectedOffer}
        disabled={readOnly}
        getOptionLabel={(option) => `${option.code} (${option.description})`}
        onChange={(_, newValue) =>
          setData({ ...data, offerId: newValue?.id ?? null })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Applied Offer / Discount"
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

      {/* Description */}
      <TextField
        label="Description"
        value={data.description || ""}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        multiline
        rows={2}
        disabled={readOnly}
        fullWidth
      />

      {/* Payment Gateway ID */}
      <TextField
        label="Payment Gateway ID"
        value={data.paymentGatewayId || ""}
        onChange={(e) => setData({ ...data, paymentGatewayId: e.target.value })}
        disabled={readOnly}
        fullWidth
      />
    </Box>
  );
}
