"use client";

import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";
import OfferForm from "@/components/adminComponents/forms/OfferForm";
import { Status, Offer } from "@/configs/dataTypes"; // Assumed imports
import { API_BASE_URL } from "@/configs/constants";

export default function OfferPage() {
  const apiUrl = `${API_BASE_URL}/Offers`;

  const columns: GridColDef<Offer>[] = [
    {
      field: "code",
      headerName: "Code",
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
      minWidth: 200,
    },
    // NEW: Dedicated column for Discount Percentage
    {
      field: "discountPercentage",
      headerName: "Discount %",
      flex: 0.8,
      minWidth: 120,
      // FIX: Allow undefined in generic type parameter and use != null check
      renderCell: (
        params: GridRenderCellParams<Offer, number | null | undefined>
      ) => (params.value != null ? `${params.value}%` : "N/A"),
    },
    // NEW: Dedicated column for Discount Amount
    {
      field: "discountAmount",
      headerName: "Discount Amount (₹)",
      flex: 0.8,
      minWidth: 150,
      // FIX: Allow undefined in generic type parameter and use != null check
      renderCell: (
        params: GridRenderCellParams<Offer, number | null | undefined>
      ) => (params.value != null ? `₹${params.value.toFixed(2)}` : "N/A"),
    },
    {
      field: "startDate",
      headerName: "Valid From",
      flex: 1,
      minWidth: 180,
      // FIX: Explicitly allow null or undefined in the params type
      renderCell: (
        params: GridRenderCellParams<Offer, string | null | undefined>
      ) => {
        if (!params.value) return "";
        const dateObj = new Date(params.value);

        // Date part: DD-MM-YYYY
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        const datePart = `${day}-${month}-${year}`;

        // Time part: HH:MM AM/PM (12-hour format)
        let hours = dateObj.getHours();
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const hour12 = String(hours).padStart(2, "0");
        const timePart = `${hour12}:${minutes} ${ampm}`;

        return `${datePart} ${timePart}`;
      },
    },
    {
      field: "endDate",
      headerName: "Expires On",
      flex: 1,
      minWidth: 180,
      // FIX: Explicitly allow null or undefined in the params type
      renderCell: (
        params: GridRenderCellParams<Offer, string | null | undefined>
      ) => {
        if (!params.value) return "";
        const dateObj = new Date(params.value);

        // Date part: DD-MM-YYYY
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        const datePart = `${day}-${month}-${year}`;

        // Time part: HH:MM AM/PM (12-hour format)
        let hours = dateObj.getHours();
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const hour12 = String(hours).padStart(2, "0");
        const timePart = `${hour12}:${minutes} ${ampm}`;

        return `${datePart} ${timePart}`;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.6,
      minWidth: 100,
    },
  ];

  const initialOffer: Offer = {
    id: "",
    code: "",
    description: "",
    discountPercentage: null,
    discountAmount: null,
    startDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split("T")[0], // +1 month
    status: Status.Active,
  };

  return (
    <GenericCrudTable<Offer>
      title="Promotional Offers"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialOffer}
      renderForm={(data, setData) => (
        <OfferForm data={data} setData={setData} />
      )}
    />
  );
}
