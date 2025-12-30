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
    { field: "fullName", headerName: "Full Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
    { field: "phoneNumber", headerName: "Phone", flex: 0.8 },
    { field: "jobTitle", headerName: "Job Title", flex: 0.7, minWidth: 120 },
    {
      field: "yearsOfExperience",
      headerName: "Experience (yrs)",
      flex: 0.5,
      minWidth: 120,
    },
    {
      field: "salary",
      headerName: "Salary",
      flex: 0.4,
      minWidth: 100,
      valueFormatter: (value) => (value ? `₹${value}` : "₹0"),
    },
    {
      field: "hireDate",
      headerName: "Hire Date",
      flex: 0.5,
      minWidth: 120,
      valueFormatter: (value) =>
        value ? new Date(value).toLocaleDateString() : "—",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.4,
      minWidth: 80,
    },
  ];

  const initialEmployee: Employee = {
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
    jobTitle: "",
    hireDate: new Date().toISOString().split("T")[0],
    salary: 0,
    yearsOfExperience: 0,
    bio: "",
    status: Status.Active,
    profileImageFile: null,
  };

  // ✅ Converts JSON State -> FormData for .NET Backend
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
    formData.append("Salary", data.salary.toString());
    formData.append("YearsOfExperience", data.yearsOfExperience.toString());
    if (data.bio) formData.append("Bio", data.bio || "");
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
      // ✅ Pass the converter logic
      payloadConverter={transformEmployeePayload}
      renderForm={(data, setData, readOnly) => (
        <EmployeeForm data={data} setData={setData} readOnly={readOnly} />
      )}
    />
  );
}
