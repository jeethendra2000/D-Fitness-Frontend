"use client";

import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EmployeeForm from "@/components/adminComponents/forms/EmployeeForm";
import { Employee, Gender, Status } from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";

export default function EmployeesPage() {
  const apiUrl = `${API_BASE_URL}/Employees`;

  const columns: GridColDef<Employee>[] = [
    { field: "fullName", headerName: "Full Name", flex: 0.5, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 0.5, minWidth: 150 },
    { field: "phoneNumber", headerName: "Phone", flex: 0.3, minWidth: 120 },
    { field: "jobTitle", headerName: "Job Title", flex: 0.4, minWidth: 120 },
    {
      field: "yearsOfExperience",
      headerName: "Exp (Yrs)",
      flex: 0.2,
      minWidth: 80,
    },
    {
      field: "salary",
      headerName: "Salary",
      flex: 0.2,
      minWidth: 100,
      valueFormatter: (value) => (value ? `₹${value}` : "₹0"),
    },
    {
      field: "hireDate",
      headerName: "Hire Date",
      flex: 0.25,
      minWidth: 120,
      valueFormatter: (value) =>
        value ? new Date(value).toLocaleDateString() : "—",
    },
    {
      field: "createdOn",
      headerName: "Created On",
      flex: 0.4,
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
    {
      field: "status",
      headerName: "Status",
      flex: 0.2,
      minWidth: 80,
    },
  ];

  const initialEmployee: Employee = {
    id: "",
    // Personal (Account)
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    gender: Gender.Male,
    dateOfBirth: new Date().toISOString().split("T")[0],
    address: "",
    createdOn: new Date().toISOString(), // Required by Account type

    // Professional (Employee)
    jobTitle: "",
    hireDate: new Date().toISOString().split("T")[0],
    salary: 0,
    yearsOfExperience: 0,
    bio: "",
    status: Status.Active,
    profileImageUrl: null,
    profileImageFile: null,
  };

  const transformEmployeePayload = (
    data: Employee,
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
    if (data.dateOfBirth) {
      formData.append("DateOfBirth", data.dateOfBirth.split("T")[0]);
    }

    // --- 2. EmployeeDto Fields ---
    if (data.jobTitle) formData.append("JobTitle", data.jobTitle);

    // Numeric handling
    formData.append("Salary", (data.salary || 0).toString());
    formData.append(
      "YearsOfExperience",
      (data.yearsOfExperience || 0).toString()
    );

    // Optional fields
    formData.append("Bio", data.bio || "");
    if (data.status) formData.append("Status", data.status);

    if (data.hireDate) {
      formData.append("HireDate", data.hireDate.split("T")[0]);
    }

    // --- 3. File Upload ---
    if (data.profileImageFile) {
      formData.append("ProfileImageFile", data.profileImageFile);
    }

    return formData;
  };

  return (
    <GenericCrudTable<Employee>
      title="Employees"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialEmployee}
      payloadConverter={transformEmployeePayload}
      renderForm={(data, setData, readOnly) => (
        <EmployeeForm data={data} setData={setData} readOnly={readOnly} />
      )}
    />
  );
}
