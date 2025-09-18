import Breadcrumb from "@/components/sections/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trainer Dashboard Page",
  description: "D-Fitness Trainer Dashboard Page",
};

export default async function Dashboard() {
  return (
    <>
      <Breadcrumb title="Trainer Dashboard"/>
      <h1>Trainer Dashboard</h1>
    </>
  );
}
