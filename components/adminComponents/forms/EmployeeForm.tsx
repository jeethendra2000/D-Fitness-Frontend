"use client";

import React from "react";
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Employee, Status } from "@/configs/dataTypes";

interface EmployeeFormProps {
  data: Employee;
  setData: React.Dispatch<React.SetStateAction<Employee>>;
}

export default function EmployeeForm({ data, setData }: EmployeeFormProps) {
  const statusOptions = Object.values(Status);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      <TextField
        label="Firebase UID"
        value={data.firebase_UID}
        onChange={(e) => setData({ ...data, firebase_UID: e.target.value })}
        fullWidth
        required
        inputProps={{ maxLength: 100 }}
      />

      <TextField
        label="Job Title"
        value={data.jobTitle}
        onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
        fullWidth
        required
        inputProps={{ maxLength: 100 }}
      />

      <TextField
        label="Hire Date"
        type="date"
        value={data.hireDate ? data.hireDate.split("T")[0] : ""}
        onChange={(e) => setData({ ...data, hireDate: e.target.value })}
        InputLabelProps={{ shrink: true }}
        fullWidth
        required
      />

      <TextField
        label="Salary (₹)"
        type="number"
        value={data.salary}
        onChange={(e) =>
          setData({ ...data, salary: Number(e.target.value) || 0 })
        }
        fullWidth
        required
        inputProps={{ min: 0, max: 2147483647 }}
      />

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={data.status}
          label="Status"
          onChange={(e) =>
            setData({ ...data, status: e.target.value as Status })
          }
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
