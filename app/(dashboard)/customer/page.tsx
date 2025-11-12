import Breadcrumb from "@/components/sections/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Dashboard Page",
  description: "D-Fitness Customer Dashboard Page",
};

export default async function Dashboard() {
  return (
    <>
      <Breadcrumb title="Customer Dashboard"/>
    </>
  );
}
