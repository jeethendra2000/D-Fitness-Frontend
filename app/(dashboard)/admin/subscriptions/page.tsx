"use client";

import React, { useEffect, useState } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconButton, Tooltip, Box } from "@mui/material";
// Icons
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import GenericCrudTable from "@/components/adminComponents/tables/GenericCrudTable";
import SubscriptionForm from "@/components/adminComponents/forms/SubscriptionForm";
import {
  Subscription,
  SubscriptionStatus,
  Customer,
  Membership,
} from "@/configs/dataTypes";
import { API_BASE_URL } from "@/configs/constants";

// Helper interface to store customer contact info
interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export default function SubscriptionsPage() {
  const apiUrl = `${API_BASE_URL}/Subscriptions`;

  // ✅ Updated state to store full customer info, not just name
  const [customerMap, setCustomerMap] = useState<Record<string, CustomerInfo>>(
    {}
  );
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

        // ✅ Map ID -> CustomerInfo Object
        const cMap: Record<string, CustomerInfo> = {};
        customers.forEach((c) => {
          cMap[c.id] = {
            name: c.fullName || c.firstname + " " + c.lastname || "Unknown",
            email: c.email || "",
            phone: c.phoneNumber || "",
          };
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

  // Helper to clean phone number for WhatsApp API
  const formatPhoneForWhatsapp = (phone: string) => {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, "");
    return cleaned;
  };

  const columns: GridColDef<Subscription>[] = [
    {
      field: "customerId",
      headerName: "Customer",
      flex: 1,
      minWidth: 150,
      // ✅ Update render to access .name property
      renderCell: (params: GridRenderCellParams<Subscription, string>) =>
        customerMap[params.value || ""]?.name || "—",
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
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 0.5,
      minWidth: 120,
      renderCell: (params) => {
        if (!params.value) return "";
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.3,
      minWidth: 100,
    },
    // ✅ NEW COLUMN: Reminders
    {
      field: "reminders",
      headerName: "Reminders",
      flex: 0.3,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => {
        const customer = customerMap[params.row.customerId];
        if (!customer) return null;

        // Construct Messages
        const endDate = new Date(params.row.endDate).toLocaleDateString();
        const subject = encodeURIComponent("Subscription Reminder - D-Fitness");
        const body = encodeURIComponent(
          `Hello ${customer.name},\n\nThis is a friendly reminder that your gym subscription expires on ${endDate}.\n\nPlease renew soon to continue your fitness journey!\n\nRegards,\nD-Fitness Team`
        );

        const handleEmailClick = (e: React.MouseEvent) => {
          e.stopPropagation(); // Prevent row selection
          if (customer.email) {
            window.location.href = `mailto:${customer.email}?subject=${subject}&body=${body}`;
          } else {
            alert("No email address found for this customer.");
          }
        };

        const handleWhatsAppClick = (e: React.MouseEvent) => {
          e.stopPropagation(); // Prevent row selection
          if (customer.phone) {
            const cleanPhone = formatPhoneForWhatsapp(customer.phone);
            // Assuming country code is needed, you might need to prepend it if not stored in DB.
            // Example: `91${cleanPhone}` for India if local numbers are stored.
            // Using logic: if length is 10, add 91, else use as is.
            const finalPhone =
              cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

            window.open(`https://wa.me/${finalPhone}?text=${body}`, "_blank");
          } else {
            alert("No phone number found for this customer.");
          }
        };

        return (
          <Box>
            <Tooltip title="Send Email Reminder">
              <IconButton
                onClick={handleEmailClick}
                color="primary"
                size="small"
              >
                <EmailIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Send WhatsApp Reminder">
              <IconButton
                onClick={handleWhatsAppClick}
                color="success"
                size="small"
                sx={{ ml: 1 }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
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
