import Breadcrumb from "@/components/sections/breadcrumb";
import type { Metadata } from "next";
import Link from "next/link";
import MyPassField from "@/components/authComponents/passField";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Login",
  description: "Login/SignIn for D-Fitness Website",
};

export default async function login() {
  return (
    <>
      <Breadcrumb title="Login"/>

        <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 justify-center mx-auto">
              <div className="leave-comment">
                <form action="#">
                  <div className="section-title contact-title">
                    <span>Login</span>
                    <h2>LOGIN TO YOUR ACCOUNT</h2>
                  </div>
                  <input type="text" placeholder="Email" />
                  <MyPassField label="Password" />
                  <div className="flex justify-between mb-4">
                    <p>Don't have an account? <a href="/auth/signup" style={{ color: "#ff1313" }}>Register</a></p>
                    <p><Link href="/forgot-password" style={{ color: "#ff1313" }}>Forgot Password</Link></p>
                  </div>
                  <button type="submit">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
