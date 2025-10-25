"use client";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";
import { Trainer } from "@/configs/dataType";
import { TextField } from "@mui/material";

export default function TrainersPage() {
  const apiUrl = "https://dfitnessgym.runasp.net/api/Trainers";

  const columns: GridColDef[] = [
    { field: "experience", headerName: "Experience (yrs)", flex: 1 },
    { field: "availableFrom", headerName: "From", flex: 1 },
    { field: "availableTo", headerName: "To", flex: 1 },
    { field: "dateOfBirth", headerName: "DOB", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
  ];

  const initialTrainer: Trainer = {
    id: "",
    experience: 0,
    availableFrom: "",
    availableTo: "",
    users: [],
    dateOfBirth: "",
    gender: 0,
    joinedDate: "",
    createdOn: "",
  };

  return (
    <GenericCrudTable<Trainer>
      title="Trainers"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialTrainer}
      renderForm={(data, setData) => (
        <>
          <TextField
            label="Experience"
            type="number"
            value={data.experience}
            onChange={(e) =>
              setData({ ...data, experience: Number(e.target.value) })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Available From"
            type="time"
            value={data.availableFrom}
            onChange={(e) =>
              setData({ ...data, availableFrom: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Available To"
            type="time"
            value={data.availableTo}
            onChange={(e) => setData({ ...data, availableTo: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => setData({ ...data, dateOfBirth: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
          />
        </>
      )}
    />
  );
}
