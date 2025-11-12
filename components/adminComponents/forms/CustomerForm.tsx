"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import type { Customer, Trainer } from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";

interface CustomerFormProps {
  data: Customer;
  setData: React.Dispatch<React.SetStateAction<Customer>>;
}

export default function CustomerForm({ data, setData }: CustomerFormProps) {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);

  /** ✅ Fetch Trainers */
  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE_URL}/Trainers?filterOn=status&filterBy=Active`
        );
        const json = await res.json();

        // handle both possible API formats
        const trainerList = Array.isArray(json)
          ? json
          : Array.isArray(json.data)
          ? json.data
          : [];

        setTrainers(trainerList);
      } catch (error) {
        console.error("Failed to fetch trainers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const selectedTrainer = trainers.find((t) => t.id === data.trainerId) || null;

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
        label="Height (cm)"
        type="number"
        value={data.height}
        onChange={(e) => setData({ ...data, height: Number(e.target.value) })}
        fullWidth
        required
      />

      <TextField
        label="Weight (kg)"
        type="number"
        value={data.weight}
        onChange={(e) => setData({ ...data, weight: Number(e.target.value) })}
        fullWidth
        required
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={data.trainerRequired}
            onChange={(e) =>
              setData({ ...data, trainerRequired: e.target.checked })
            }
          />
        }
        label="Trainer Required"
      />

      {data.trainerRequired && (
        <Autocomplete
          loading={loading}
          options={trainers}
          value={selectedTrainer}
          getOptionLabel={(option) =>
            option.jobTitle
              ? `${option.jobTitle} (${option.firebase_UID})`
              : option.firebase_UID
          }
          onChange={(_, newValue) =>
            setData({
              ...data,
              trainerId: newValue?.id ?? null,
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Trainer"
              fullWidth
              required
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          filterOptions={(options, { inputValue }) =>
            options.filter(
              (opt) =>
                opt.firebase_UID
                  ?.toLowerCase()
                  .includes(inputValue.toLowerCase()) ||
                opt.jobTitle?.toLowerCase().includes(inputValue.toLowerCase())
            )
          }
        />
      )}
    </Box>
  );
}
