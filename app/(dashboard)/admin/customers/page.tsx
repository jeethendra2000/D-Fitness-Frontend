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
    { field: "fullName", headerName: "Full Name", flex: 0.7, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 0.7, minWidth: 150 },
    { field: "phoneNumber", headerName: "Phone", flex: 0.4, minWidth: 120 },
    { field: "gender", headerName: "Gender", flex: 0.25, minWidth: 80 },
    { field: "address", headerName: "Address", flex: 0.5, minWidth: 100 },
    {
      field: "trainerRequired",
      headerName: "Trainer",
      flex: 0.2,
      minWidth: 70,
    },
    {
      field: "joinedDate",
      headerName: "Joined Date",
      flex: 0.3,
      valueFormatter: (value) =>
        value ? new Date(value).toLocaleDateString() : "—",
      minWidth: 100,
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
    height: 0,
    weight: 0,
    trainerRequired: false,
    trainerId: null,
    joinedDate: new Date().toISOString().split("T")[0],
    createdOn: new Date().toISOString(), // Required by Account type
    profileImageUrl: null,
    profileImageFile: null,
  };

  const transformCustomerPayload = (
    data: Customer,
    isUpdate: boolean
  ): FormData => {
    const formData = new FormData();

    // Account Fields
    if (data.firstname) formData.append("Firstname", data.firstname);
    if (data.lastname) formData.append("Lastname", data.lastname);
    if (data.email) formData.append("Email", data.email);
    if (data.phoneNumber) formData.append("PhoneNumber", data.phoneNumber);
    if (data.gender) formData.append("Gender", data.gender);
    if (data.address) formData.append("Address", data.address || "");
    if (data.dateOfBirth) {
      formData.append("DateOfBirth", data.dateOfBirth.split("T")[0]);
    }

    // Customer Specific Fields
    if (data.joinedDate) {
      formData.append("JoinedDate", data.joinedDate.split("T")[0]);
    }
    formData.append("Height", data.height.toString());
    formData.append("Weight", data.weight.toString());
    formData.append("TrainerRequired", data.trainerRequired.toString());

    // Nullable Guid Logic
    if (data.trainerId) {
      formData.append("TrainerId", data.trainerId);
    } else if (isUpdate) {
      formData.append("TrainerId", ""); // Send empty string to unassign in backend
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
      payloadConverter={transformCustomerPayload}
      renderForm={(data, setData, readOnly) => (
        <CustomerForm data={data} setData={setData} readOnly={readOnly} />
      )}
    />
  );
}
