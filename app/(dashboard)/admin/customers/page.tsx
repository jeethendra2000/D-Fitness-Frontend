"use client";

import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import CustomerForm from "@/components/adminComponents/forms/CustomerForm";
import { Customer } from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";

export default function CustomersPage() {
  const apiUrl = `${API_BASE_URL}/Customers`;

  const columns: GridColDef[] = [
    { field: "firebase_UID", headerName: "Firebase UID", flex: 1 },
    { field: "height", headerName: "Height (cm)", flex: 0.6, type: "number" },
    { field: "weight", headerName: "Weight (kg)", flex: 0.6, type: "number" },
    {
      field: "trainerRequired",
      headerName: "Trainer Required",
      flex: 0.8,
      type: "boolean",
      valueFormatter: (params: { value: boolean }) =>
        params.value ? "Yes" : "No",
    },
    {
      field: "trainerId",
      headerName: "Assigned Trainer",
      flex: 1,
    },
  ];

  // Initial form data matches Customer type
  const initialCustomer: Customer = {
    id: "",
    firebase_UID: "",
    height: 0, // in cm
    weight: 0, // in kg
    trainerRequired: false,
    trainerId: "",
  };

  return (
    <GenericCrudTable<Customer>
      title="Customers"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialCustomer}
      renderForm={(data, setData) => (
        <CustomerForm data={data} setData={setData} />
      )}
    />
  );
}
