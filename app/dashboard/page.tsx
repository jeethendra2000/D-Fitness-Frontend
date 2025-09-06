import Breadcrumb from "@/components/sections/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Page",
  description: "D-Fitness Dashboard Page",
};

export default async function Dashboard() {
  return (
    <>
      <Breadcrumb title="Dashboard"/>
      <h1>Dashboard</h1>
    </>
  );
}