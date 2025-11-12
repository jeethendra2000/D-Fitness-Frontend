"use client";

import React, { useEffect, useState } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";
import SubscriptionForm from "@/components/adminComponents/forms/SubscriptionForm";
import { Subscription, Status } from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";

interface Customer {
  id: string;
  firebase_UID: string;
}

interface Membership {
  id: string;
  name: string;
}

export default function SubscriptionsPage() {
  const apiUrl = `${API_BASE_URL}/Subscriptions`;

  const [customerMap, setCustomerMap] = useState<Record<string, string>>({});
  const [membershipMap, setMembershipMap] = useState<Record<string, string>>(
    {}
  );

  // ✅ Fetch related data for display
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
          cMap[c.id] = c.firebase_UID;
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
      field: "membershipID",
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
        return `${String(d.getDate()).padStart(2, "0")}-${String(
          d.getMonth() + 1
        ).padStart(2, "0")}-${d.getFullYear()}`;
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
        return `${String(d.getDate()).padStart(2, "0")}-${String(
          d.getMonth() + 1
        ).padStart(2, "0")}-${d.getFullYear()}`;
      },
    },
    {
      field: "autoRenew",
      headerName: "Auto Renew",
      flex: 0.4,
      minWidth: 100,
      renderCell: (params) => (params.value ? "Yes" : "No"),
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
    membershipID: "",
    startDate: new Date().toISOString(),
    endDate: new Date(
      new Date().setMonth(new Date().getMonth() + 1)
    ).toISOString(),
    autoRenew: false,
    status: Status.Inactive,
  };

  return (
    <GenericCrudTable<Subscription>
      title="Subscriptions"
      apiUrl={apiUrl}
      columns={columns}
      initialFormData={initialSubscription}
      renderForm={(data, setData) => (
        <SubscriptionForm data={data} setData={setData} />
      )}
    />
  );
}
