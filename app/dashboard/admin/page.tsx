import Breadcrumb from "@/components/sections/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard Page",
  description: "D-Fitness Admin Dashboard Page",
};

export default async function Dashboard() {
  return (
    <>
      <Breadcrumb title="Admin Dashboard"/>
    </>
  );
}