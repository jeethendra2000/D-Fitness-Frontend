"use client";

import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import MembershipForm from "@/components/adminComponents/forms/MembershipForm";
import { Membership, MembershipType, Status } from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";

export default function MembershipsPage() {
  const apiUrl = `${API_BASE_URL}/Memberships`; // <-- your API endpoint

  const columns: GridColDef<Membership>[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    {
      field: "amount",
      headerName: "Amount", // Simplified header name
      flex: 0.5,
      minWidth: 100,
      type: "number",
      renderCell: (params: GridRenderCellParams<Membership, number>) =>
        params.value != null ? `₹${params.value.toFixed(2)}` : "₹0.00",
    },
    {
      field: "duration",
      headerName: "Duration (days)",
      flex: 0.5,
      type: "number",
      minWidth: 120,
    },
    { field: "type", headerName: "Type", flex: 0.4, minWidth: 120 },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 100,
    },
    { field: "status", headerName: "Status", flex: 0.2, minWidth: 80 },
  ];

  const initialMembership: Membership = {
    id: "",
    name: "",
    description: "",
    amount: 1,
    duration: 1,
    type: MembershipType.Monthly,
    status: Status.Active,
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
