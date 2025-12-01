"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import {
  Subscription,
  Status,
  Customer,
  Membership,
} from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";

interface SubscriptionFormProps {
  data: Subscription;
  setData: React.Dispatch<React.SetStateAction<Subscription>>;
}

interface CustomerOption {
  id: string;
  firebase_UID: string;
}

interface MembershipOption {
  id: string;
  name: string;
}

export default function SubscriptionForm({
  data,
  setData,
}: SubscriptionFormProps) {
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [memberships, setMemberships] = useState<MembershipOption[]>([]);
  const [loading, setLoading] = useState(false);
  const statusOptions = Object.values(Status);

  // ✅ Fetch customers and memberships
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [customerRes, membershipRes] = await Promise.all([
          fetch(`${API_BASE_URL}/Customers`),
          fetch(`${API_BASE_URL}/Memberships`),
        ]);

        const [customerJson, membershipJson] = await Promise.all([
          customerRes.json(),
          membershipRes.json(),
        ]);

        const customerList = Array.isArray(customerJson)
          ? customerJson
          : Array.isArray(customerJson.data)
          ? customerJson.data
          : [];

        const membershipList = Array.isArray(membershipJson)
          ? membershipJson
          : Array.isArray(membershipJson.data)
          ? membershipJson.data
          : [];

        setCustomers(
          customerList.map((c: Customer) => ({
            id: c.id,
            firebase_UID: c.firebase_UID,
          }))
        );

        setMemberships(
          membershipList.map((m: Membership) => ({
            id: m.id,
            name: m.name,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectedCustomer =
    customers.find((c) => c.id === data.customerId) || null;

  const selectedMembership =
    memberships.find((m) => m.id === data.membershipID) || null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      {/* Customer Selection */}
      <Autocomplete
        loading={loading}
        options={customers}
        value={selectedCustomer}
        getOptionLabel={(option) => option.firebase_UID || ""}
        onChange={(_, newValue) =>
          setData({ ...data, customerId: newValue?.id ?? "" })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Customer (Firebase UID)"
            required
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      {/* Membership Selection */}
      <Autocomplete
        loading={loading}
        options={memberships}
        value={selectedMembership}
        getOptionLabel={(option) => option.name || ""}
        onChange={(_, newValue) =>
          setData({ ...data, membershipID: newValue?.id ?? "" })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Membership"
            required
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      {/* Dates */}
      <TextField
        label="Start Date"
        type="date"
        value={data.startDate ? data.startDate.split("T")[0] : ""}
        onChange={(e) => setData({ ...data, startDate: e.target.value })}
        InputLabelProps={{ shrink: true }}
        fullWidth
        required
      />

      <TextField
        label="End Date"
        type="date"
        value={data.endDate ? data.endDate.split("T")[0] : ""}
        onChange={(e) => setData({ ...data, endDate: e.target.value })}
        InputLabelProps={{ shrink: true }}
        fullWidth
        required
      />

      {/* Status */}
      <TextField
        select
        label="Status"
        value={data.status}
        onChange={(e) => setData({ ...data, status: e.target.value as Status })}
        fullWidth
        required
      >
        {statusOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {/* Auto Renew */}
      <FormControlLabel
        control={
          <Checkbox
            checked={data.autoRenew}
            onChange={(e) => setData({ ...data, autoRenew: e.target.checked })}
          />
        }
        label="Auto Renew"
      />
    </Box>
  );
}
