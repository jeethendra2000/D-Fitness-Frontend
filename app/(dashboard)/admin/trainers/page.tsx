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
    { field: "fullName", headerName: "Full Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
    { field: "phoneNumber", headerName: "Phone", flex: 0.8 },
    { field: "specialization", headerName: "Specialization", flex: 0.7 },
    { field: "jobTitle", headerName: "Title", flex: 0.6 },
    {
      field: "salary",
      headerName: "Salary",
      flex: 0.4,
      minWidth: 100,
      valueFormatter: (value) => (value ? `₹${value}` : "₹0"),
    },
    { field: "status", headerName: "Status", flex: 0.4 },
  ];

  const initialTrainer: Trainer = {
    id: "",
    // Personal
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    gender: Gender.Male,
    dateOfBirth: new Date().toISOString().split("T")[0],
    address: "",

    // Professional
    jobTitle: "Trainer",
    hireDate: new Date().toISOString().split("T")[0],
    salary: 0,
    status: Status.Active,
    specialization: "",
    yearsOfExperience: 0,
    bio: "",
    certification: "",
    availableFrom: "09:00",
    availableTo: "18:00",
    profileImageFile: null,
  };

  // ✅ Converts JSON State -> FormData for .NET Backend
  const transformTrainerPayload = (
    data: Trainer,
    isUpdate: boolean
  ): FormData => {
    const formData = new FormData();

    // --- 1. AccountDto Fields ---
    if (data.firstname) formData.append("Firstname", data.firstname);
    if (data.lastname) formData.append("Lastname", data.lastname);
    if (data.email) formData.append("Email", data.email);
    if (data.phoneNumber) formData.append("PhoneNumber", data.phoneNumber);
    if (data.gender) formData.append("Gender", data.gender);
    if (data.address) formData.append("Address", data.address || "");
    if (data.bio) formData.append("Bio", data.bio || ""); // Or "Description" depending on DTO inheritance

    if (data.dateOfBirth) {
      formData.append("DateOfBirth", data.dateOfBirth.split("T")[0]);
    }

    // --- 2. EmployeeDto Fields ---
    if (data.jobTitle) formData.append("JobTitle", data.jobTitle);
    formData.append("Salary", data.salary.toString());
    formData.append("YearsOfExperience", data.yearsOfExperience.toString());
    if (data.status) formData.append("Status", data.status);

    if (data.hireDate) {
      // .NET DateTime usually accepts YYYY-MM-DD from forms fine
      formData.append("HireDate", data.hireDate.split("T")[0]);
    }

    // --- 3. TrainerDto Fields ---
    if (data.specialization)
      formData.append("Specialization", data.specialization);
    if (data.certification)
      formData.append("Certification", data.certification || "");

    // TimeOnly: Backend expects "HH:mm:ss" usually.
    // Input[type="time"] gives "HH:mm". append ":00" to be safe.
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
      // ✅ Pass the converter logic
      payloadConverter={transformTrainerPayload}
      renderForm={(data, setData, readOnly) => (
        <TrainerForm data={data} setData={setData} readOnly={readOnly} />
      )}
    />
  );
}
