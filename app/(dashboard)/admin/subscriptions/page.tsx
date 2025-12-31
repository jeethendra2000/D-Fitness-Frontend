"use client";

import React, { useEffect, useState } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";
import SubscriptionForm from "@/components/adminComponents/forms/SubscriptionForm";
import {
  Subscription,
  SubscriptionStatus,
  Customer,
  Membership,
} from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";

export default function SubscriptionsPage() {
  const apiUrl = `${API_BASE_URL}/Subscriptions`;

  const [customerMap, setCustomerMap] = useState<Record<string, string>>({});
  const [membershipMap, setMembershipMap] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, memRes] = await Promise.all([
          fetch(`${API_BASE_URL}/Customers`),
          fetch(`${API_BASE_URL}/Memberships`),
        ]);
        const [custJson, memJson] = await Promise.all([
          custRes.json(),
          memRes.json(),
        ]);

        const customers: Customer[] = Array.isArray(custJson)
          ? custJson
          : custJson.data || [];
        const memberships: Membership[] = Array.isArray(memJson)
          ? memJson
          : memJson.data || [];

        const cMap: Record<string, string> = {};
        customers.forEach((c) => {
          cMap[c.id] = c.fullName || c.email || "Unknown Customer";
        });

        const mMap: Record<string, string> = {};
        memberships.forEach((m) => {
          mMap[m.id] = m.name;
        });

        setCustomerMap(cMap);
        setMembershipMap(mMap);
      } catch (err) {
        console.error("Failed to fetch mappings", err);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef<Subscription>[] = [
    {
      field: "customerId",
      headerName: "Customer",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<Subscription, string>) =>
        customerMap[params.value || ""] || "—",
    },
    {
      field: "membershipId",
      headerName: "Membership",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<Subscription, string>) =>
        membershipMap[params.value || ""] || "—",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 0.5,
      minWidth: 120,
      renderCell: (params) => {
        if (!params.value) return "";
        const d = new Date(params.value);
        return d.toLocaleDateString();
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 0.5,
      minWidth: 120,
      renderCell: (params) => {
        if (!params.value) return "";
        const d = new Date(params.value);
        return d.toLocaleDateString();
      },
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
      flex: 0.4,
      minWidth: 100,
    },
  ];

  const initialSubscription: Subscription = {
    id: "",
    customerId: "",
    membershipId: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split("T")[0],
    status: SubscriptionStatus.New,
    createdOn: new Date().toISOString(),
  };

  return (
    <GenericCrudTable<Subscription>
      title="Subscriptions"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialSubscription}
      renderForm={(data, setData, readOnly) => (
        <SubscriptionForm data={data} setData={setData} readOnly={readOnly} />
      )}
    />
  );
}
