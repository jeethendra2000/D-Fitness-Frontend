"use client";

import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Offer, Status } from "@/configs/dataTypes"; // Assumed import

interface OfferFormProps {
  data: Offer;
  setData: React.Dispatch<React.SetStateAction<Offer>>;
}

// Helper to determine the initial type of discount selected
type DiscountType = "percentage" | "amount" | "none";

const getInitialDiscountType = (data: Offer): DiscountType => {
  if (
    data.discountPercentage !== null &&
    data.discountPercentage !== undefined
  ) {
    return "percentage";
  }
  if (data.discountAmount !== null && data.discountAmount !== undefined) {
    return "amount";
  }
  return "none";
};

export default function OfferForm({ data, setData }: OfferFormProps) {
  const statusOptions = Object.values(Status);
  const [discountType, setDiscountType] = useState<DiscountType>(
    getInitialDiscountType(data)
  );

  // Effect to ensure only one discount field is set when data changes externally
  useEffect(() => {
    setDiscountType(getInitialDiscountType(data));
  }, [data.discountPercentage, data.discountAmount]);

  const handleDiscountTypeChange = (event: SelectChangeEvent<DiscountType>) => {
    const newType = event.target.value as DiscountType;
    setDiscountType(newType);

    // Clear the non-selected discount field in the data state
    if (newType === "percentage") {
      setData((prev) => ({ ...prev, discountAmount: null }));
    } else if (newType === "amount") {
      setData((prev) => ({ ...prev, discountPercentage: null }));
    } else {
      setData((prev) => ({
        ...prev,
        discountPercentage: null,
        discountAmount: null,
      }));
    }
  };

  const handleDiscountValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);

    if (discountType === "percentage") {
      setData({ ...data, discountPercentage: value, discountAmount: null });
    } else if (discountType === "amount") {
      setData({ ...data, discountAmount: value, discountPercentage: null });
    }
  };

  const getCurrentDiscountValue = () => {
    if (discountType === "percentage")
      return data.discountPercentage === null ? "" : data.discountPercentage;
    if (discountType === "amount")
      return data.discountAmount === null ? "" : data.discountAmount;
    return "";
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      {/* Code */}
      <TextField
        label="Offer Code"
        value={data.code}
        onChange={(e) => setData({ ...data, code: e.target.value })}
        fullWidth
        required
        inputProps={{ maxLength: 50 }}
      />

      {/* Description */}
      <TextField
        label="Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        fullWidth
        required
        multiline
        rows={2}
        inputProps={{ maxLength: 250 }}
      />

      {/* Discount Type Selector */}
      <FormControl fullWidth required>
        <InputLabel>Discount Type</InputLabel>
        <Select
          value={discountType}
          label="Discount Type"
          onChange={handleDiscountTypeChange}
        >
          <MenuItem value="percentage">Percentage (%)</MenuItem>
          <MenuItem value="amount">Fixed Amount (₹)</MenuItem>
        </Select>
      </FormControl>

      {/* Discount Value Input (Conditional) */}
      {(discountType === "percentage" || discountType === "amount") && (
        <TextField
          label={
            discountType === "percentage"
              ? "Discount Percentage (%)"
              : "Discount Amount (₹)"
          }
          type="number"
          value={getCurrentDiscountValue()}
          onChange={handleDiscountValueChange}
          fullWidth
          required
          inputProps={{
            min: 1,
            max: discountType === "percentage" ? 100 : 99999, // Max 100% or large fixed amount
            step: discountType === "percentage" ? 0.01 : 1,
          }}
        />
      )}

      {/* Start Date */}
      <TextField
        label="Start Date"
        type="date"
        value={data.startDate ? data.startDate.split("T")[0] : ""}
        onChange={(e) => setData({ ...data, startDate: e.target.value })}
        fullWidth
        InputLabelProps={{ shrink: true }}
        required
      />

      {/* End Date */}
      <TextField
        label="End Date"
        type="date"
        value={data.endDate ? data.endDate.split("T")[0] : ""}
        onChange={(e) => setData({ ...data, endDate: e.target.value })}
        fullWidth
        InputLabelProps={{ shrink: true }}
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
    </Box>
  );
}
