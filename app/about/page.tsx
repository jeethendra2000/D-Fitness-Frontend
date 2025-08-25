import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About US",
  description: "About D-Fitness WebApp and Developers",
};
export default async function About() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">About</h1>
    </>
  );
}