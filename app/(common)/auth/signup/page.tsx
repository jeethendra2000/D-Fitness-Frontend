import type { Metadata } from "next";
import SignUpForm from "@/app/auth/signup/SignUpForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Register for D-Fitness Website",
};

export default function SignUp() {
    return <SignUpForm />;
}
