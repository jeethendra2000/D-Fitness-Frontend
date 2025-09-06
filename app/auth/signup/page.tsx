import type { Metadata } from "next";
import MyPassField from "@/components/authComponents/passField";

export const metadata: Metadata = {
  title: "Register",
  description: "Register for D-Fitness Website",
};

export default async function SignUp() {
  return (
    <>
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 justify-center mx-auto">
                <div className="leave-comment">
                    <form action="#">
                        <div className="section-title contact-title mt-5 flex justify-center">
                            {/* <span>REGISTER</span> */}
                            {/* <p>Create an account if you are a new user</p> */}
                            <h2>CREATE YOUR ACCOUNT</h2>
                        </div>
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                        <input type="text" placeholder="Email" />
                        <MyPassField label="New Password" />
                        <MyPassField label="Confirm Password" />
                        <div className="flex justify-center mb-4">
                            <p>Have an account? <a href="/auth/login" style={{ color: "#ff1313" }}>Login</a></p>
                        </div>
                        <button type="submit">Create Account</button>
                    </form>
                </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
