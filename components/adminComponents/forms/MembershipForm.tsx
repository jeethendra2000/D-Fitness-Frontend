"use client";

import React from "react";
import { TextField, Box, MenuItem } from "@mui/material";
import { Membership, MembershipType, Status } from "@/configs/dataTypes";

interface MembershipFormProps {
  data: Membership;
  setData: React.Dispatch<React.SetStateAction<Membership>>;
  readOnly?: boolean;
}

export default function MembershipForm({
  data,
  setData,
  readOnly,
}: MembershipFormProps) {
  // Guard Clause to prevent crash on load
  if (!data) return <Box>Loading...</Box>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      <TextField
        label="Membership Name"
        value={data.name || ""}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        fullWidth
        required
        disabled={readOnly}
      />
      <TextField
        select
        label="Type"
        value={data.type || MembershipType.Monthly}
        onChange={(e) =>
          setData({ ...data, type: e.target.value as MembershipType })
        }
        fullWidth
        disabled={readOnly}
      >
        {Object.values(MembershipType).map((t) => (
          <MenuItem key={t} value={t}>
            {t}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Amount (₹)"
          type="number"
          value={data.amount ?? 0}
          onChange={(e) => setData({ ...data, amount: Number(e.target.value) })}
          fullWidth
          required
          disabled={readOnly}
        />
        <TextField
          label="Duration (Days)"
          type="number"
          value={data.duration ?? 0}
          onChange={(e) =>
            setData({ ...data, duration: Number(e.target.value) })
          }
          fullWidth
          required
          disabled={readOnly}
        />
      </Box>
      <TextField
        label="Description"
        value={data.description || ""}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        fullWidth
        multiline
        rows={3}
        disabled={readOnly}
      />
      <TextField
        select
        label="Status"
        value={data.status || Status.Active}
        onChange={(e) => setData({ ...data, status: e.target.value as Status })}
        fullWidth
        disabled={readOnly}
      >
        {Object.values(Status).map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
