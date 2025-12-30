"use client";

import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import CustomerForm from "@/components/adminComponents/forms/CustomerForm";
import { Customer, Gender } from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";

export default function CustomersPage() {
  const apiUrl = `${API_BASE_URL}/Customers`;

  const columns: GridColDef<Customer>[] = [
    { field: "fullName", headerName: "Full Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
    { field: "phoneNumber", headerName: "Phone", flex: 0.8 },
    { field: "gender", headerName: "Gender", flex: 0.5 },
    { field: "address", headerName: "Address", flex: 0.5 },
    {
      field: "joinedDate",
      headerName: "Joined Date",
      flex: 0.5,
      valueFormatter: (value) =>
        value ? new Date(value).toLocaleDateString() : "—",
    },
  ];

  const initialCustomer: Customer = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    gender: Gender.Male,
    dateOfBirth: new Date().toISOString().split("T")[0],
    address: "",
    height: 100,
    weight: 50,
    trainerRequired: false,
    trainerId: null,
    joinedDate: new Date().toISOString().split("T")[0],
    profileImageFile: null,
  };

  // ✅ Converts JSON State -> FormData for .NET Backend
  const transformCustomerPayload = (
    data: Customer,
    isUpdate: boolean
  ): FormData => {
    const formData = new FormData();

    // Map keys to match Backend DTO Property Names exactly
    // .NET DTO: Firstname, Lastname, Email, etc.

    if (data.firstname) formData.append("Firstname", data.firstname);
    if (data.lastname) formData.append("Lastname", data.lastname);
    if (data.email) formData.append("Email", data.email);
    if (data.phoneNumber) formData.append("PhoneNumber", data.phoneNumber);
    if (data.gender) formData.append("Gender", data.gender);
    if (data.address) formData.append("Address", data.address || "");

    // Dates: .NET DateOnly expects "yyyy-MM-dd"
    if (data.dateOfBirth) {
      formData.append("DateOfBirth", data.dateOfBirth.split("T")[0]);
    }
    if (data.joinedDate) {
      formData.append("JoinedDate", data.joinedDate.split("T")[0]);
    }

    // Numbers
    formData.append("Height", data.height.toString());
    formData.append("Weight", data.weight.toString());

    // Boolean
    formData.append("TrainerRequired", data.trainerRequired.toString());

    // Nullable Guid
    if (data.trainerId) {
      formData.append("TrainerId", data.trainerId);
    } else if (isUpdate) {
      // If updating and we want to clear it, backend might need empty string or specific handling
      // Usually, simply omitting it keeps existing, or sending empty string sets null
      // depending on .NET binding configuration.
      formData.append("TrainerId", "");
    }

    // File Upload
    if (data.profileImageFile) {
      formData.append("ProfileImageFile", data.profileImageFile);
    }

    return formData;
  };

  return (
    <GenericCrudTable<Customer>
      title="Customers"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialCustomer}
      // ✅ Pass the converter logic
      payloadConverter={transformCustomerPayload}
      renderForm={(data, setData, readOnly) => (
        <CustomerForm data={data} setData={setData} readOnly={readOnly} />
      )}
    />
  );
}
