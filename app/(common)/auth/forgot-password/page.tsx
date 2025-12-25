import type { Metadata } from "next";
import ResetForm from "@/app/(common)/auth/forgot-password/ResetForm";

export const metadata: Metadata = {
  title: "Forgot-Password",
  description: "Forgot Password for D-Fitness Website",
};

export default function ForgotPassword() {
  return <ResetForm />;
}
