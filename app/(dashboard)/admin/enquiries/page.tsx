"use client";

import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";
import EnquiryForm from "@/components/adminComponents/forms/EnquiryForm";
import { Enquiry, EnquiryStatus } from "@/configs/dataTypes"; // Assumed import
import { API_BASE_URL } from "@/configs/constants";

export default function EnquiriesPage() {
  const apiUrl = `${API_BASE_URL}/Enquiries`;

  const columns: GridColDef<Enquiry>[] = [
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 0.7,
      minWidth: 150,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      flex: 0.4,
      minWidth: 120,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 0.5,
      minWidth: 100,
      // Truncate message for table view
      renderCell: (params: GridRenderCellParams<Enquiry, string>) => {
        const message = params.value || "";
        return message.length > 80 ? message.substring(0, 77) + "..." : message;
      },
    },
    {
      field: "submittedAt",
      headerName: "Submitted On",
      flex: 0.4,
      minWidth: 170,
      valueFormatter: (value: any) => {
        if (!value) return "—";

        const dateStr = value as string;

        const utcString = dateStr.endsWith("Z") ? dateStr : `${dateStr}Z`;

        return new Date(utcString)
          .toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .toUpperCase();
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      minWidth: 100,
    },
  ];

  // Based on CreateEnquiryDto and sample data
  const initialEnquiry: Enquiry = {
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
    status: EnquiryStatus.New,
    submittedAt: new Date().toISOString(), // Use current time
  };

  return (
    <GenericCrudTable<Enquiry>
      title="Enquiries"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialEnquiry}
      renderForm={(data, setData) => (
        <EnquiryForm data={data} setData={setData} />
      )}
    />
  );
}
