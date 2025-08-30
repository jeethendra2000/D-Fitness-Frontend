import NotFound from "@/components/utilityComponents/notFound";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Page",
  description: "D-Fitness Admin Page",
};

export default async function Admin() {
  return (
    <>
      {/* <h1>Admin</h1> */}
      <NotFound/>
    </>
  );
}