"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Autocomplete,
  Button,
  Avatar,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Gender, type Customer, type Trainer } from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";

interface CustomerFormProps {
  data: Customer;
  setData: React.Dispatch<React.SetStateAction<Customer>>;
  readOnly?: boolean;
}

export default function CustomerForm({
  data,
  setData,
  readOnly,
}: CustomerFormProps) {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  // Separate preview state so we don't put base64 strings into the submit payload unnecessarily
  const [imagePreview, setImagePreview] = useState<string | null>(
    data.profileImageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE_URL}/Trainers?filterOn=status&filterBy=Active`
        );
        if (!res.ok) return;
        const json = await res.json();
        const trainerList = Array.isArray(json) ? json : json.data || [];
        setTrainers(trainerList);
      } catch (error) {
        console.error("Failed to fetch trainers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  // Update preview if data changes externally (e.g. switching rows)
  useEffect(() => {
    setImagePreview(data.profileImageUrl || null);
  }, [data.id, data.profileImageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. Create preview URL for UI
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      // 2. Store the actual File object for upload
      setData((prev) => ({
        ...prev,
        profileImageFile: file,
      }));
    }
  };

  const handleDateChange =
    (field: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleChange =
    (field: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [field]: e.target.value });
    };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      {/* Profile Image Section */}
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

      <TextField
        label="Email"
        type="email"
        value={data.email || ""}
        onChange={handleChange("email")}
        fullWidth
        disabled={readOnly}
      />

      <TextField
        label="Phone Number"
        value={data.phoneNumber || ""}
        onChange={handleChange("phoneNumber")}
        fullWidth
        disabled={readOnly}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Date of Birth"
          type="date"
          value={data.dateOfBirth ? data.dateOfBirth.split("T")[0] : ""}
          onChange={handleDateChange("dateOfBirth")}
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          disabled={readOnly}
        />
        <TextField
          select
          label="Gender"
          value={data.gender || ""}
          onChange={(e) =>
            setData({ ...data, gender: e.target.value as Gender })
          }
          fullWidth
          disabled={readOnly}
          SelectProps={{ native: true }}
        >
          <option value="" disabled>
            Select Gender
          </option>
          {Object.values(Gender).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
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

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Height (cm)"
          type="number"
          value={data.height ?? 0}
          onChange={(e) => setData({ ...data, height: Number(e.target.value) })}
          fullWidth
          disabled={readOnly}
        />
        <TextField
          label="Weight (kg)"
          type="number"
          value={data.weight ?? 0}
          onChange={(e) => setData({ ...data, weight: Number(e.target.value) })}
          fullWidth
          disabled={readOnly}
        />
      </Box>

      <TextField
        label="Joined Date"
        type="date"
        value={data.joinedDate ? data.joinedDate.split("T")[0] : ""}
        onChange={handleDateChange("joinedDate")}
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
        disabled={readOnly}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={data.trainerRequired}
            onChange={(e) =>
              setData({ ...data, trainerRequired: e.target.checked })
            }
            disabled={readOnly}
          />
        }
        label="Trainer Required"
      />

      {data.trainerRequired && (
        <Autocomplete
          loading={loading}
          options={trainers}
          disabled={readOnly}
          isOptionEqualToValue={(option, value) => option.id === value?.id}
          value={trainers.find((t) => t.id === data.trainerId) || null}
          getOptionLabel={(option) => {
            if (typeof option === "string") return option;
            return (
              option.fullName ||
              `${option.firstname || ""} ${option.lastname || ""}`.trim() ||
              "Unnamed Trainer"
            );
          }}
          onChange={(_, newValue) =>
            setData({ ...data, trainerId: newValue?.id ?? null })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Trainer"
              fullWidth
              required={data.trainerRequired}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.id}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="subtitle1">
                  {option.fullName || "Unnamed"}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {option.yearsOfExperience ?? 0} Years Exp
                </Typography>
              </Box>
            </Box>
          )}
        />
      )}
    </Box>
  );
}
