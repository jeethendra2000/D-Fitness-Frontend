"use client";

import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";
import TrainerForm from "@/components/adminComponents/forms/TrainerForm";
import { Gender, Status, Trainer } from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";

export default function TrainersPage() {
  const apiUrl = `${API_BASE_URL}/Trainers`;

  const columns: GridColDef<Trainer>[] = [
    { field: "fullName", headerName: "Full Name", flex: 0.5, minWidth: 150 },
    { field: "phoneNumber", headerName: "Phone", flex: 0.3, minWidth: 120 },
    {
      field: "specialization",
      headerName: "Specialization",
      flex: 0.4,
      minWidth: 120,
    },
    {
      field: "yearsOfExperience",
      headerName: "Exp (yrs)",
      flex: 0.2,
      minWidth: 100,
    },
    {
      field: "availableFrom",
      headerName: "Avail. From",
      flex: 0.2,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams<Trainer, string>) => {
        if (!params.value) return "—";
        // Handle "HH:mm:ss" or "HH:mm"
        const parts = params.value.split(":");
        if (parts.length < 2) return params.value;

        let hour = parseInt(parts[0]);
        const minute = parseInt(parts[1]);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
      },
    },
    {
      field: "availableTo",
      headerName: "Avail. To",
      flex: 0.2,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams<Trainer, string>) => {
        if (!params.value) return "—";
        const parts = params.value.split(":");
        if (parts.length < 2) return params.value;

        let hour = parseInt(parts[0]);
        const minute = parseInt(parts[1]);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
      },
    },
    {
      field: "createdOn",
      headerName: "Created On",
      flex: 0.3,
      minWidth: 180,
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
    { field: "status", headerName: "Status", flex: 0.2, minWidth: 80 },
  ];

  const initialTrainer: Trainer = {
    id: "",
    // Personal (Account)
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    gender: Gender.Male,
    dateOfBirth: new Date().toISOString().split("T")[0],
    address: "",
    createdOn: new Date().toISOString(),

    // Professional (Employee)
    jobTitle: "Trainer",
    hireDate: new Date().toISOString().split("T")[0],
    salary: 0,
    yearsOfExperience: 0,
    bio: "",
    status: Status.Active,

    // Trainer Specific
    specialization: "",
    certification: "",
    availableFrom: "",
    availableTo: "",
    profileImageUrl: null,
    profileImageFile: null,
  };

  const transformTrainerPayload = (
    data: Trainer,
    isUpdate: boolean
  ): FormData => {
    const formData = new FormData();

    // --- 1. Account Fields ---
    if (data.firstname) formData.append("Firstname", data.firstname);
    if (data.lastname) formData.append("Lastname", data.lastname);
    if (data.email) formData.append("Email", data.email);
    if (data.phoneNumber) formData.append("PhoneNumber", data.phoneNumber);
    if (data.gender) formData.append("Gender", data.gender);
    if (data.address) formData.append("Address", data.address || "");
    if (data.dateOfBirth) {
      formData.append("DateOfBirth", data.dateOfBirth.split("T")[0]);
    }

    // --- 2. Employee Fields ---
    if (data.jobTitle) formData.append("JobTitle", data.jobTitle);
    formData.append("Salary", (data.salary || 0).toString());
    formData.append(
      "YearsOfExperience",
      (data.yearsOfExperience || 0).toString()
    );
    formData.append("Bio", data.bio || "");
    if (data.status) formData.append("Status", data.status);

    if (data.hireDate) {
      formData.append("HireDate", data.hireDate.split("T")[0]);
    }

    // --- 3. Trainer Fields ---
    if (data.specialization)
      formData.append("Specialization", data.specialization);
    if (data.certification)
      formData.append("Certification", data.certification || "");

    // Time Formatting: Ensure "HH:mm:ss" if value exists
    if (data.availableFrom) {
      const time =
        data.availableFrom.length === 5
          ? `${data.availableFrom}:00`
          : data.availableFrom;
      formData.append("AvailableFrom", time);
    }
    if (data.availableTo) {
      const time =
        data.availableTo.length === 5
          ? `${data.availableTo}:00`
          : data.availableTo;
      formData.append("AvailableTo", time);
    }

    // --- 4. File Upload ---
    if (data.profileImageFile) {
      formData.append("ProfileImageFile", data.profileImageFile);
    }

    return formData;
  };

  return (
    <GenericCrudTable<Trainer>
      title="Trainers"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialTrainer}
      payloadConverter={transformTrainerPayload}
      renderForm={(data, setData, readOnly) => (
        <TrainerForm data={data} setData={setData} readOnly={readOnly} />
      )}
    />
  );
}
