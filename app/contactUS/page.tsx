import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact US",
  description: "Contact Enquiry for D-Fitness Gym Owner",
};

export default async function ContactUS() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">ContactUS</h1>
    </>
  );
}