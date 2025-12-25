"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { permission } from "process";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = process.env.NEXT_PUBLIC_API_BASE;

export default function ResetForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: string[] = [];
    if (!email.trim()) newErrors.push("Email is required.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email))
      newErrors.push("Invalid email format.");
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
    await sendPasswordResetEmail(auth, email)
        .then(() => {
            toast.success("Password reset email sent!", { autoClose: 3000 });
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(`Error: ${errorMessage}`, { autoClose: 3000 });
        });
    setLoading(false);
  }

  return (
    <>
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 justify-center mx-auto">
              <div className="leave-comment">
                <form onSubmit={handleRegistration}>
                  <div className="section-title contact-title mt-5 flex justify-center">
                    <h2>ENTER EMAIL</h2>
                  </div>

                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email"
                  />

                  <button type="submit" disabled={loading}>
                    {loading ? (
                      <CircularProgress sx={{ color: "#ff1313" }} />
                    ) : (
                      "Reset Password"
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

