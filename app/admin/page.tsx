import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Page",
  description: "D-Fitness Admin Page",
};

export default async function Admin() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Admin</h1>
    </>
  );
}