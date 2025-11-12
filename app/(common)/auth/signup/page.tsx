import type { Metadata } from "next";
import SignUpForm from "@/app/(common)/auth/signup/SignUpForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Register for D-Fitness Website",
};

export default function SignUp() {
  return <SignUpForm />;
}
