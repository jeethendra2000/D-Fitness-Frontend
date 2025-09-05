import Breadcrumb from "@/components/sections/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login/SignUp",
  description: "Login/SignUp for D-Fitness Website",
};

export default async function login() {
  return (
    <>
      <Breadcrumb title="Login/SignUp"/>

        <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
                <div className="leave-comment">
                    <form action="#">
                        <div className="section-title contact-title">
                            <span>REGISTER</span>
                            <p>Create an account if you are a new user</p>
                            <h2>CREATE YOUR ACCOUNT</h2>
                        </div>
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                        <input type="text" placeholder="Email" />
                        <input type="password" placeholder="New Password" />
                        <input type="password" placeholder="Confirm Password" />
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>

            <div className="col-lg-6">
              <div className="leave-comment">
                <form action="#">
                  <div className="section-title contact-title">
                    <span>Login</span>
                    <p>If you already have an account</p>
                    <h2>LOGIN TO YOUR ACCOUNT</h2>
                  </div>
                  <input type="text" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                  <button type="submit">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Contact Section End --> */}
    </>
  );
}
