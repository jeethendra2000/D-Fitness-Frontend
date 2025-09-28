import type { Metadata } from "next";
import LoginClient from "@/components/authComponents/LoginClient";

export const metadata: Metadata = {
  title: "Login",
  description: "Login/SignIn for D-Fitness Website",
};

export default async function login() {
  return (
    <>
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 justify-center mx-auto my-5">
              <div className="leave-comment">
                  <div className="section-title contact-title mt-5">
                    {/* <span>Login</span> */}
                    <h2>LOGIN TO YOUR ACCOUNT</h2>
                  </div>
                  <LoginClient />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}