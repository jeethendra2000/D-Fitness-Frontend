// src/components/forms/MembershipForm.tsx
"use client";

import React from "react";
import { TextField, Box } from "@mui/material";
import type { Membership } from "@/configs/dataTypes";

interface MembershipFormProps {
  data: Membership;
  setData: React.Dispatch<React.SetStateAction<Membership>>;
}

export default function MembershipForm({ data, setData }: MembershipFormProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      <TextField
        label="Membership Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        fullWidth
        required
      />

      <TextField
        label="Amount"
        type="number"
        value={data.amount}
        onChange={(e) => setData({ ...data, amount: Number(e.target.value) })}
        fullWidth
        required
      />

      <TextField
        label="Duration (days)"
        type="number"
        value={data.duration}
        onChange={(e) => setData({ ...data, duration: Number(e.target.value) })}
        fullWidth
        required
      />

      <TextField
        label="Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        fullWidth
        multiline
        rows={3}
      />
    </Box>
  );
}
