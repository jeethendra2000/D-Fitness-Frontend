"use client";
import MyPassField from "@/components/authComponents/passField";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { permission } from "process";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const backendUrl = process.env.NEXT_PUBLIC_API_BASE;

export default function SignUpForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);


  const validate = () => {
    const newErrors: string[] = [];
    if (!firstName.trim()) newErrors.push("First name is required.");
    if (!email.trim()) newErrors.push("Email is required.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email))
      newErrors.push("Invalid email format.");
    if (!newPassword) newErrors.push("Password is required.");
    if (!confirmPassword) newErrors.push("Please confirm your password.");
    if (newPassword && confirmPassword && newPassword !== confirmPassword)
      newErrors.push("Passwords do not match.");
    return newErrors;
  };

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    const errs = validate();
    if (errs.length) {
      setErrors(errs);
      console.log("Errors: ", errs);
      errs.forEach((err) => toast.error(err, { autoClose: 3000 }));
      return;
    }

    setLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(email, newPassword);

      toast.success("Registration successful! Please log in.", {
        autoClose: 3000,
      });
      router.push("/auth/login");
    } catch (error: unknown) {
      console.error("Error during registration:", error);
      let errorMessage = "Registration failed. Please try again.";

      // Safely check if the caught error is an instance of the Error class
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, { autoClose: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 justify-center mx-auto">
              <div className="leave-comment">
                <form onSubmit={handleRegistration}>
                  <div className="section-title contact-title mt-5 flex justify-center">
                    {/* <span>REGISTER</span> */}
                    {/* <p>Create an account if you are a new user</p> */}
                    <h2>CREATE YOUR ACCOUNT</h2>
                  </div>

                  {/* Error is being displayed above the inputs */}
                  {/* {errors.length > 0 && (
                            <div style={{ color: "#ff4d4f", marginBottom: 12 }}>
                                {errors.map((err, i) => (
                                    <div key={i}>{err}</div>
                                ))}
                            </div>
                        )} */}

                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    aria-label="First Name"
                  />

                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    aria-label="Last Name"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email"
                  />

                  <MyPassField
                    label="New Password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <MyPassField
                    label="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <div className="flex justify-center mb-4">
                    <p>
                      Have an account?{" "}
                      <a href="/auth/login" style={{ color: "#ff1313" }}>
                        Login
                      </a>
                    </p>
                  </div>
                  <button type="submit" disabled={loading}>
                    {loading ? (
                      <CircularProgress sx={{ color: "#ff1313" }} />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
