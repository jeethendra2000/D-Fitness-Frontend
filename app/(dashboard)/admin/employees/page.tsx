"use client";

import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EmployeeForm from "@/components/adminComponents/forms/EmployeeForm";
import { Employee } from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";

export default function EmployeesPage() {
  const apiUrl = `${API_BASE_URL}/Employees`;

  // ✅ Corrected columns for Employee model
  const columns: GridColDef[] = [
    { field: "firebase_UID", headerName: "Firebase UID", flex: 1 },
    { field: "jobTitle", headerName: "Job Title", flex: 1 },
    { field: "salary", headerName: "Salary", type: "number", flex: 0.6 },
    { field: "hireDate", headerName: "Hire Date", flex: 0.8 },
  ];

  // ✅ Initial form data matches Employee type
  const initialEmployee: Employee = {
    id: "",
    firebase_UID: "",
    jobTitle: "",
    salary: 0,
    hireDate: "",
    status: "Active",
  };

  return (
    <GenericCrudTable<Employee>
      title="Employees"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialEmployee}
      renderForm={(data, setData) => (
        <EmployeeForm data={data} setData={setData} />
      )}
    />
  );
}
