"use client";

import React, { useEffect, useState } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import CustomerForm from "@/components/adminComponents/forms/CustomerForm";
import { Customer, Trainer } from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";

export default function CustomersPage() {
  const apiUrl = `${API_BASE_URL}/Customers`;
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [trainerMap, setTrainerMap] = useState<Record<string, string>>({});

  // ✅ Fetch all trainers once
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/Trainers`);
        const json = await res.json();

        const trainerList: Trainer[] = Array.isArray(json)
          ? json
          : Array.isArray(json.data)
          ? json.data
          : [];

        setTrainers(trainerList);

        // ✅ Build ID → Name map
        const map: Record<string, string> = {};
        trainerList.forEach((t: Trainer) => {
          if (t.id) {
            map[t.id] = t.jobTitle
              ? `${t.jobTitle} (${t.firebase_UID})`
              : t.firebase_UID;
          }
        });
        setTrainerMap(map);
      } catch (error) {
        console.error("Failed to fetch trainers:", error);
      }
    };
    fetchTrainers();
  }, []);

  const columns: GridColDef<Customer>[] = [
    {
      field: "firebase_UID",
      headerName: "Firebase UID",
      flex: 1,
      minWidth: 100,
    },
    { field: "height", headerName: "Height (cm)", flex: 0.6, type: "number" },
    { field: "weight", headerName: "Weight (kg)", flex: 0.6, type: "number" },
    {
      field: "trainerRequired",
      headerName: "Trainer Required",
      flex: 0.5,
      type: "boolean",
      valueFormatter: (params: { value: boolean }) =>
        params.value ? "Yes" : "No",
    },
    {
      field: "trainerId",
      headerName: "Assigned Trainer",
      flex: 0.8,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams<Customer, string>) =>
        params.value ? trainerMap[params.value] || "—" : "—",
    },
  ];

  const initialCustomer: Customer = {
    id: "",
    firebase_UID: "",
    height: 0,
    weight: 0,
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
