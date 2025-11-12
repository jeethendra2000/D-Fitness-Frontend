"use client";

import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EmployeeForm from "@/components/adminComponents/forms/EmployeeForm";
import { Employee, Status } from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";

export default function EmployeesPage() {
  const apiUrl = `${API_BASE_URL}/Employees`;

  const columns: GridColDef<Employee>[] = [
    {
      field: "firebase_UID",
      headerName: "Firebase UID",
      flex: 1,
      minWidth: 120,
    },
    { field: "jobTitle", headerName: "Job Title", flex: 0.5, minWidth: 100 },
    {
      field: "salary",
      headerName: "Salary", // Simplified header name
      flex: 0.4,
      minWidth: 100,
      type: "number",
      renderCell: (params: GridRenderCellParams<Employee, number>) =>
        params.value != null ? `₹${params.value.toFixed(2)}` : "₹0.00",
    },
    {
      field: "hireDate",
      headerName: "Hire Date",
      flex: 0.4,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams<Employee, string>) => {
        if (!params.value) return "";
        const dateObj = new Date(params.value);
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        return `${day}-${month}-${year}`;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.3,
      minWidth: 80,
    },
  ];

  const initialEmployee: Employee = {
    id: "",
    firebase_UID: "",
    jobTitle: "",
    hireDate: "",
    salary: 0,
    status: Status.Active,
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
