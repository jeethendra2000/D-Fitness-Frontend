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
  readOnly?: boolean;
}

export default function SubscriptionForm({
  data,
  setData,
  readOnly,
}: SubscriptionFormProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(false);
  const statusOptions = Object.values(Status);

  // 1. Fetch Options
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

        setCustomers(customerList);
        setMemberships(membershipList);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. ✅ Auto-Calculate End Date logic
  useEffect(() => {
    if (readOnly || !data.startDate || !data.membershipID) return;

    const selectedMem = memberships.find((m) => m.id === data.membershipID);

    if (selectedMem && selectedMem.duration) {
      const start = new Date(data.startDate);

      // Add duration (days) to start date
      const end = new Date(start);
      end.setDate(start.getDate() + selectedMem.duration);

      const endDateString = end.toISOString().split("T")[0];

      if (data.endDate !== endDateString) {
        setData((prev) => ({ ...prev, endDate: endDateString }));
      }
    }
  }, [
    data.startDate,
    data.membershipID,
    memberships,
    readOnly,
    setData,
    data.endDate,
  ]);

  // 3. ✅ Auto-Update Status based on Date Range
  useEffect(() => {
    // Skip if readOnly or dates are missing
    if (readOnly || !data.startDate || !data.endDate) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to midnight

    const start = new Date(data.startDate);
    start.setHours(0, 0, 0, 0); // Normalize start date

    const end = new Date(data.endDate);
    end.setHours(0, 0, 0, 0); // Normalize end date

    let newStatus = Status.Inactive;

    // Logic: If today is within the range [Start, End], status is Active
    if (today >= start && today <= end) {
      newStatus = Status.Active;
    }

    // Only update state if the status is different (prevents infinite loops)
    if (data.status !== newStatus) {
      setData((prev) => ({ ...prev, status: newStatus }));
    }
  }, [data.startDate, data.endDate, readOnly, setData, data.status]);

  // Safe finds for Autocomplete
  const selectedCustomer =
    customers.find((c) => c.id === data.customerId) || null;

  const selectedMembership =
    memberships.find((m) => m.id === data.membershipID) || null;

  if (!data) return <Box>Loading...</Box>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      {/* Customer Selection */}
      <Autocomplete
        loading={loading}
        options={customers}
        value={selectedCustomer}
        disabled={readOnly}
        getOptionLabel={(option) =>
          option.fullName
            ? `${option.fullName} (${option.email || "No UID"})`
            : option.email || option.id
        }
        onChange={(_, newValue) =>
          setData({ ...data, customerId: newValue?.id ?? "" })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Customer"
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
        disabled={readOnly}
        getOptionLabel={(option) =>
          option.name ? `${option.name} (${option.duration} Days)` : ""
        }
        onChange={(_, newValue) =>
          setData({ ...data, membershipID: newValue?.id ?? "" })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Membership"
            required
            fullWidth
            helperText="End date will be auto-calculated based on plan duration"
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

      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Start Date */}
        <TextField
          label="Start Date"
          type="date"
          value={data.startDate ? data.startDate.split("T")[0] : ""}
          onChange={(e) => setData({ ...data, startDate: e.target.value })}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          disabled={readOnly}
        />

        {/* End Date */}
        <TextField
          label="End Date"
          type="date"
          value={data.endDate ? data.endDate.split("T")[0] : ""}
          onChange={(e) => setData({ ...data, endDate: e.target.value })}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          disabled={readOnly}
        />
      </Box>

      {/* Status - Note: This field is now auto-calculated but still manually overridable if needed */}
      <TextField
        select
        label="Status (Auto-calculated)"
        value={data.status || Status.Inactive}
        onChange={(e) => setData({ ...data, status: e.target.value as Status })}
        fullWidth
        required
        disabled={readOnly}
        helperText="Status updates automatically based on date range, but you can override it."
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
            disabled={readOnly}
          />
        }
        label="Auto Renew"
      />
    </Box>
  );
}
