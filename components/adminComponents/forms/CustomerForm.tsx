"use client";

import React from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  Typography,
} from "@mui/material";
import type { Customer } from "@/configs/dataTypes"; // Assuming this is your type path

// Define the props our form will accept
interface CustomerFormProps {
  formData: Omit<
    Customer,
    "id" | "trainer" | "joinedDate" | "createdOn" | "role"
  >;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors: {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
  };
  readOnly?: boolean; // To disable fields if just viewing
}

export default function CustomerForm({
  formData,
  setFormData,
  errors,
  readOnly = false,
}: CustomerFormProps) {
  // Generic handler to update form state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Specific handler for number inputs
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
    >
      <TextField
        name="firstname"
        label="First Name"
        value={formData.firstname}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.firstname}
        helperText={errors.firstname}
        InputProps={{
          readOnly: readOnly,
        }}
      />
      <TextField
        name="lastname"
        label="Last Name"
        value={formData.lastname}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.lastname}
        helperText={errors.lastname}
        InputProps={{
          readOnly: readOnly,
        }}
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.email}
        helperText={errors.email}
        InputProps={{
          readOnly: readOnly,
        }}
      />
      <TextField
        name="phoneNumber"
        label="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        fullWidth
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
        InputProps={{
          readOnly: readOnly,
        }}
      />
      <TextField
        name="dateOfBirth"
        label="Date of Birth"
        type="date"
        value={formData.dateOfBirth}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        InputProps={{
          readOnly: readOnly,
        }}
      />
      <Typography variant="subtitle1">Gender</Typography>
      <RadioGroup
        row
        name="gender"
        value={formData.gender.toString()}
        onChange={handleChange}
      >
        <FormControlLabel
          value="0"
          control={<Radio />}
          label="Male"
          disabled={readOnly}
        />
        <FormControlLabel
          value="1"
          control={<Radio />}
          label="Female"
          disabled={readOnly}
        />
        <FormControlLabel
          value="2"
          control={<Radio />}
          label="Others"
          disabled={readOnly}
        />
      </RadioGroup>
      <TextField
        name="height"
        label="Height (cm)"
        type="number"
        value={formData.height}
        onChange={handleNumberChange}
        fullWidth
        InputProps={{
          readOnly: readOnly,
        }}
      />
      <TextField
        name="weight"
        label="Weight (kg)"
        type="number"
        value={formData.weight}
        onChange={handleNumberChange}
        fullWidth
        InputProps={{
          readOnly: readOnly,
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <FormControlLabel
          control={
            <Switch
              name="trainerRequired"
              checked={formData.trainerRequired}
              onChange={handleChange}
              disabled={readOnly}
            />
          }
          label="Trainer Required"
          labelPlacement="start"
        />
      </Box>
    </Box>
  );
}
