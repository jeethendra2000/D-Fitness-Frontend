// src/components/forms/EmployeeForm.tsx
"use client";

import React from "react";
import { TextField, Box } from "@mui/material";
import type { Employee } from "@/configs/dataTypes";

interface EmployeeFormProps {
  data: Employee;
  setData: React.Dispatch<React.SetStateAction<Employee>>;
}

export default function EmployeeForm({ data, setData }: EmployeeFormProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      <TextField
        label="Firebase UID"
        value={data.firebase_UID}
        onChange={(e) => setData({ ...data, firebase_UID: e.target.value })}
        fullWidth
        required
      />
      <TextField
        label="Job Title"
        value={data.jobTitle}
        onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
        fullWidth
        multiline
        rows={3}
      />

      <TextField
        label="Salary"
        type="number"
        value={data.salary}
        onChange={(e) => setData({ ...data, salary: Number(e.target.value) })}
        fullWidth
        required
      />
      <TextField
        label="Hire Date"
        type="date"
        value={data.hireDate}
        onChange={(e) => setData({ ...data, hireDate: e.target.value })}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
    </Box>
  );
}
