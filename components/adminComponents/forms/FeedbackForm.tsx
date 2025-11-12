"use client";

import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  MenuItem,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Feedback, FeedbackStatus } from "@/configs/dataTypes"; // Assumed import
import { API_BASE_URL } from "@/configs/constants";

interface CustomerOption {
  id: string;
  firebase_UID: string;
}

interface FeedbackFormProps {
  data: Feedback;
  setData: React.Dispatch<React.SetStateAction<Feedback>>;
  customerMap: Record<string, string>; // Passed from page for mapping current customer
}

export default function FeedbackForm({
  data,
  setData,
  customerMap,
}: FeedbackFormProps) {
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [loading, setLoading] = useState(false);
  const statusOptions = Object.values(FeedbackStatus);

  // Fetch all customers for Autocomplete list
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const custRes = await fetch(`${API_BASE_URL}/Customers`);
        const custJson = await custRes.json();

        const customerList = Array.isArray(custJson)
          ? custJson
          : Array.isArray(custJson.data)
          ? custJson.data
          : [];

        setCustomers(
          customerList.map((c: any) => ({
            id: c.id,
            firebase_UID: c.firebase_UID,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch customer options:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Determine the currently selected customer based on firebase_UID
  const selectedCustomer =
    customers.find((c) => c.firebase_UID === data.firebase_UID) || null;

  const handleCustomerChange = (newValue: CustomerOption | null) => {
    // We only need to store the firebase_UID (which is nullable)
    setData({ ...data, firebase_UID: newValue?.firebase_UID ?? null });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      {/* Firebase UID (Optional) - Use Autocomplete for existing users */}
      <Autocomplete
        options={customers}
        loading={loading}
        value={selectedCustomer}
        getOptionLabel={(o) => o.firebase_UID || "Anonymous"}
        onChange={(_, newValue) => handleCustomerChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Customer (Firebase UID) - Optional"
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

      {/* Subject (Optional) */}
      <TextField
        label="Subject"
        value={data.subject || ""}
        onChange={(e) => setData({ ...data, subject: e.target.value || null })}
        fullWidth
        inputProps={{ maxLength: 150 }}
      />

      {/* Message (Optional) */}
      <TextField
        label="Message"
        value={data.message || ""}
        onChange={(e) => setData({ ...data, message: e.target.value || null })}
        fullWidth
        multiline
        rows={4}
      />

      {/* Rating (Optional, 1-5) */}
      <TextField
        label="Rating (1 to 5)"
        type="number"
        value={data.rating === null ? "" : data.rating}
        onChange={(e) => {
          const value = Number(e.target.value);
          setData({
            ...data,
            rating: value >= 1 && value <= 5 ? value : null,
          });
        }}
        fullWidth
        inputProps={{ min: 1, max: 5, step: 1 }}
      />

      {/* Status */}
      <TextField
        select
        label="Feedback Status"
        value={data.status}
        onChange={(e) =>
          setData({ ...data, status: e.target.value as FeedbackStatus })
        }
        fullWidth
      >
        {statusOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {/* Submitted At (Read-only for existing feedback) */}
      {data.id && (
        <TextField
          label="Submitted At"
          value={new Date(data.submittedAt).toLocaleString()}
          fullWidth
          InputProps={{ readOnly: true }}
          InputLabelProps={{ shrink: true }}
        />
      )}
    </Box>
  );
}
