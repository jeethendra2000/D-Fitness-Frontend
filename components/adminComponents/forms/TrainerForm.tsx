"use client";

import React from "react";
import { TextField, Box, MenuItem } from "@mui/material";
import { Trainer, Status } from "@/configs/dataTypes";

interface TrainerFormProps {
  data: Trainer;
  setData: React.Dispatch<React.SetStateAction<Trainer>>;
}

export default function TrainerForm({ data, setData }: TrainerFormProps) {
  const statusOptions = Object.values(Status);

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
        label="Salary (₹)"
        type="number"
        value={data.salary}
        onChange={(e) => setData({ ...data, salary: Number(e.target.value) })}
        fullWidth
        required
      />

      <TextField
        label="Specialization"
        value={data.specialization}
        onChange={(e) => setData({ ...data, specialization: e.target.value })}
        fullWidth
        required
      />

      <TextField
        label="Years of Experience"
        type="number"
        value={data.yearsOfExperience}
        onChange={(e) =>
          setData({ ...data, yearsOfExperience: Number(e.target.value) })
        }
        fullWidth
        required
      />

      <TextField
        label="Hire Date"
        type="date"
        value={data.hireDate ? data.hireDate.split("T")[0] : ""}
        onChange={(e) => setData({ ...data, hireDate: e.target.value })}
        fullWidth
        InputLabelProps={{ shrink: true }}
        required
      />

      <TextField
        label="Bio"
        value={data.bio}
        onChange={(e) => setData({ ...data, bio: e.target.value })}
        fullWidth
        multiline
        rows={3}
      />

      <TextField
        label="Certification"
        value={data.certification}
        onChange={(e) => setData({ ...data, certification: e.target.value })}
        fullWidth
      />

      <TextField
        label="Available From"
        type="time"
        value={data.availableFrom}
        onChange={(e) => setData({ ...data, availableFrom: e.target.value })}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Available To"
        type="time"
        value={data.availableTo}
        onChange={(e) => setData({ ...data, availableTo: e.target.value })}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Rating"
        type="number"
        inputProps={{ step: 0.1, min: 0, max: 5 }}
        value={data.rating}
        onChange={(e) => setData({ ...data, rating: Number(e.target.value) })}
        fullWidth
      />

      <TextField
        select
        label="Status"
        value={data.status}
        onChange={(e) =>
          setData({ ...data, status: e.target.value as unknown as Status })
        }
        fullWidth
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
