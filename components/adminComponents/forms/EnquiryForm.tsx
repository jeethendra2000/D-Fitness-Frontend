"use client";

import React from "react";
import { TextField, Box, MenuItem } from "@mui/material";
import { Enquiry, EnquiryStatus } from "@/configs/dataTypes"; // Assumed import

interface EnquiryFormProps {
  data: Enquiry;
  setData: React.Dispatch<React.SetStateAction<Enquiry>>;
}

export default function EnquiryForm({ data, setData }: EnquiryFormProps) {
  const statusOptions = Object.values(EnquiryStatus);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      {/* Full Name */}
      <TextField
        label="Full Name"
        value={data.fullName}
        onChange={(e) => setData({ ...data, fullName: e.target.value })}
        fullWidth
        required
        inputProps={{ maxLength: 150, minLength: 1 }}
      />

      {/* Email */}
      <TextField
        label="Email"
        type="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        fullWidth
        required
        inputProps={{ maxLength: 150, minLength: 1 }}
      />

      {/* Phone Number */}
      <TextField
        label="Phone Number"
        type="tel"
        value={data.phoneNumber}
        onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
        fullWidth
        required
        inputProps={{ maxLength: 15, minLength: 1 }}
      />

      {/* Message */}
      <TextField
        label="Message"
        value={data.message}
        onChange={(e) => setData({ ...data, message: e.target.value })}
        fullWidth
        required
        multiline
        rows={4}
        inputProps={{ maxLength: 1000, minLength: 1 }}
      />
      
      {/* Status (Editable only in Admin Form) */}
      <TextField
        select
        label="Enquiry Status"
        value={data.status}
        onChange={(e) =>
          setData({ ...data, status: e.target.value as EnquiryStatus })
        }
        fullWidth
      >
        {statusOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {/* Submitted At (Read-only for existing enquiries) */}
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