"use client";

import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";
import TrainerForm from "@/components/adminComponents/forms/TrainerForm";
import { Status, Trainer } from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";

export default function TrainersPage() {
  const apiUrl = `${API_BASE_URL}/Trainers`;

  const columns: GridColDef<Trainer>[] = [
    {
      field: "firebase_UID",
      headerName: "Firebase UID",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "specialization",
      headerName: "Specialization",
      flex: 0.7,
      minWidth: 120,
    },
    {
      field: "salary",
      headerName: "Salary", // Simplified header name
      flex: 0.4,
      minWidth: 100,
      type: "number",
      renderCell: (params: GridRenderCellParams<Trainer, number>) =>
        params.value != null ? `₹${params.value.toFixed(2)}` : "₹0.00",
    },
    {
      field: "yearsOfExperience",
      headerName: "Experience (yrs)",
      flex: 0.5,
      minWidth: 120,
      type: "number",
    },
    {
      field: "hireDate",
      headerName: "Hire Date",
      flex: 0.4,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams<Trainer, string>) => {
        if (!params.value) return "";
        const dateObj = new Date(params.value);
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        return `${day}-${month}-${year}`;
      },
    },
    {
      field: "availableFrom",
      headerName: "Available From",
      flex: 0.45,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams<Trainer, string>) => {
        if (!params.value) return "";
        const [hourStr, minuteStr] = params.value.split(":");
        let hour = parseInt(hourStr);
        const minute = parseInt(minuteStr);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12; // convert 0 → 12
        return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
      },
    },
    {
      field: "availableTo",
      headerName: "Available To",
      flex: 0.45,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams<Trainer, string>) => {
        if (!params.value) return "";
        const [hourStr, minuteStr] = params.value.split(":");
        let hour = parseInt(hourStr);
        const minute = parseInt(minuteStr);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
      },
    },

    { field: "status", headerName: "Status", flex: 0.4, minWidth: 100 },
  ];

  const initialTrainer: Trainer = {
    id: "",
    firebase_UID: "",
    jobTitle: "Trainer",
    hireDate: new Date().toISOString(),
    salary: 0,
    status: Status.Active,
    specialization: "",
    yearsOfExperience: 0,
    bio: "",
    certification: "",
    rating: 0,
    availableFrom: "09:00:00",
    availableTo: "18:00:00",
    reportsToEmployeeID: null,
  };

  return (
    <GenericCrudTable<Trainer>
      title="Trainers"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialTrainer}
      renderForm={(data, setData) => (
        <TrainerForm data={data} setData={setData} />
      )}
    />
  );
}
