"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Box,
  MenuItem,
  Avatar,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Employee, Status, Gender } from "@/configs/dataTypes";

interface EmployeeFormProps {
  data: Employee;
  setData: React.Dispatch<React.SetStateAction<Employee>>;
  readOnly?: boolean;
}

export default function EmployeeForm({
  data,
  setData,
  readOnly,
}: EmployeeFormProps) {
  // ✅ Prevent crash if data is undefined initially
  const [imagePreview, setImagePreview] = useState<string | null>(
    data?.profileImageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preview if external data changes
  useEffect(() => {
    if (data) {
      setImagePreview(data.profileImageUrl || null);
    }
  }, [data]);

  // ✅ Guard Clause
  if (!data) {
    return <Box sx={{ p: 2 }}>Loading form data...</Box>;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      setData((prev) => ({ ...prev, profileImageFile: file }));
    }
  };

  const handleChange =
    (field: keyof Employee) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [field]: e.target.value });
    };

  const handleNumberChange =
    (field: keyof Employee) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [field]: Number(e.target.value) });
    };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      {/* 📸 Image Upload */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Avatar
          src={imagePreview || ""}
          sx={{ width: 100, height: 100, border: "2px solid #ddd" }}
        />
        {!readOnly && (
          <>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <Button
              variant="outlined"
              size="small"
              startIcon={<CloudUploadIcon />}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Photo
            </Button>
          </>
        )}
      </Box>

      {/* 👤 Personal Information */}
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
        Personal Details
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="First Name"
          value={data.firstname || ""}
          onChange={handleChange("firstname")}
          fullWidth
          required
          disabled={readOnly}
        />
        <TextField
          label="Last Name"
          value={data.lastname || ""}
          onChange={handleChange("lastname")}
          fullWidth
          required
          disabled={readOnly}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Email"
          type="email"
          value={data.email || ""}
          onChange={handleChange("email")}
          fullWidth
          required
          disabled={readOnly}
        />
        <TextField
          label="Phone"
          value={data.phoneNumber || ""}
          onChange={handleChange("phoneNumber")}
          fullWidth
          required
          disabled={readOnly}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Date of Birth"
          type="date"
          value={data.dateOfBirth ? data.dateOfBirth.split("T")[0] : ""}
          onChange={handleChange("dateOfBirth")}
          fullWidth
          InputLabelProps={{ shrink: true }}
          required
          disabled={readOnly}
        />
        <TextField
          select
          label="Gender"
          value={data.gender || ""}
          onChange={handleChange("gender")}
          fullWidth
          required
          disabled={readOnly}
        >
          {Object.values(Gender).map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TextField
        label="Address"
        value={data.address || ""}
        onChange={handleChange("address")}
        multiline
        rows={2}
        fullWidth
        disabled={readOnly}
      />

      <Divider />

      {/* 💼 Professional Information */}
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
        Professional Details
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Job Title"
          value={data.jobTitle || ""}
          onChange={handleChange("jobTitle")}
          fullWidth
          required
          disabled={readOnly}
        />
        <TextField
          label="Experience (Years)"
          type="number"
          value={data.yearsOfExperience ?? 0}
          onChange={handleNumberChange("yearsOfExperience")}
          fullWidth
          required
          disabled={readOnly}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Salary (₹)"
          type="number"
          value={data.salary ?? 0}
          onChange={handleNumberChange("salary")}
          fullWidth
          required
          disabled={readOnly}
        />
        <TextField
          label="Hire Date"
          type="date"
          value={data.hireDate ? data.hireDate.split("T")[0] : ""}
          onChange={handleChange("hireDate")}
          fullWidth
          InputLabelProps={{ shrink: true }}
          required
          disabled={readOnly}
        />
      </Box>

      <TextField
        label="Bio"
        value={data.bio || ""}
        onChange={handleChange("bio")}
        fullWidth
        multiline
        rows={3}
        disabled={readOnly}
      />
      <TextField
        label="Status"
        select
        value={data.status || Status.Active}
        onChange={handleChange("status")}
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
