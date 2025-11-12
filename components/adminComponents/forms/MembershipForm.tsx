"use client";

import React from "react";
import {
  TextField,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import type { Membership } from "@/configs/dataTypes";
import { MembershipType, Status } from "@/configs/dataTypes";

interface MembershipFormProps {
  data: Membership;
  setData: React.Dispatch<React.SetStateAction<Membership>>;
}

export default function MembershipForm({ data, setData }: MembershipFormProps) {
  const membershipTypes = Object.values(MembershipType);
  const statusOptions = Object.values(Status);

  const handleSelectChange = <K extends keyof Membership>(
    e: SelectChangeEvent<Membership[K]>,
    field: K
  ) => {
    setData({ ...data, [field]: e.target.value as Membership[K] });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      <TextField
        label="Membership Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        fullWidth
        required
        inputProps={{ maxLength: 150, minLength: 1 }}
      />

      <TextField
        label="Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        fullWidth
        required
        multiline
        rows={3}
        inputProps={{ maxLength: 500, minLength: 1 }}
      />

      <TextField
        label="Amount (₹)"
        type="number"
        value={data.amount}
        onChange={(e) => setData({ ...data, amount: Number(e.target.value) })}
        fullWidth
        required
        inputProps={{ min: 1, max: 100000 }}
      />

      <TextField
        label="Duration (days)"
        type="number"
        value={data.duration}
        onChange={(e) => setData({ ...data, duration: Number(e.target.value) })}
        fullWidth
        required
        inputProps={{ min: 1, max: 10000 }}
      />

      <FormControl fullWidth required>
        <InputLabel>Membership Type</InputLabel>
        <Select
          value={data.type}
          label="Membership Type"
          onChange={(e) => handleSelectChange(e, "type")}
        >
          {membershipTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth required>
        <InputLabel>Status</InputLabel>
        <Select
          value={data.status}
          label="Status"
          onChange={(e) => handleSelectChange(e, "status")}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
