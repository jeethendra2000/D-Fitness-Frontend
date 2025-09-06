import Sidebar from "@/components/layoutComponents/sidebar";
import Breadcrumb from "@/components/sections/breadcrumb";
import type { Metadata } from "next";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export const metadata: Metadata = {
  title: "Dashboard Page",
  description: "D-Fitness Dashboard Page",
};

export default async function Dashboard() {
  return (
    <>
      <Breadcrumb title="Dashboard" />
    </>
  );
}
