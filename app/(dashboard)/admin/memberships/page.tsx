// src/app/memberships/page.tsx
"use client";

import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import MembershipForm from "@/components/adminComponents/forms/MembershipForm";
import { Membership } from "@/configs/dataType";
import { API_BASE_URL } from "@/configs/constants";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";
import { Trainer } from "@/configs/dataType";

export default function MembershipsPage() {
  const apiUrl = `${API_BASE_URL}/Memberships`; // <-- your API endpoint

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "amount", headerName: "Amount ($)", flex: 0.6, type: "number" },
    {
      field: "duration",
      headerName: "Duration (days)",
      flex: 0.7,
      type: "number",
    },
    { field: "description", headerName: "Description", flex: 1.2 },
  ];

  const initialMembership: Membership = {
    id: "",
    name: "",
    amount: 0,
    duration: 0,
    description: "",
    subscriptions: [],
  };

  return (
    <GenericCrudTable<Membership>
      title="Membership Plans"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialMembership}
      renderForm={(data, setData) => (
        <MembershipForm data={data} setData={setData} />
      )}
    />
  );
}
