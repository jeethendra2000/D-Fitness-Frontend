// import type { Metadata } from "next";
// import Link from "next/link";
// import MyPassField from "@/components/authComponents/passField";

// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { auth, googleProvider, microsoftProvider } from "@/firebase";

// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login/SignIn for D-Fitness Website",
// };

// export default async function login() {
//   const onEmail = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await signInWithEmailAndPassword(
//       auth,
//       (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value || "",
//       (e.currentTarget.elements.namedItem("password") as HTMLInputElement)?.value || ""
//     );
//   };

//   return (
//     <>
//       <section className="contact-section spad">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-6 justify-center mx-auto my-5">
//               <div className="leave-comment">
//                 <form onSubmit={onEmail}>
//                   <div className="section-title contact-title mt-5">
//                     {/* <span>Login</span> */}
//                     <h2>LOGIN TO YOUR ACCOUNT</h2>
//                   </div>
//                   <input type="text" placeholder="Email" name="email" />
//                   <MyPassField label="Password" name="password" />
//                   <div className="flex justify-between mb-5">
//                     <p>Don't have an account? <a href="/auth/signup" style={{ color: "#ff1313" }}>Register</a></p>
//                     <p><Link href="/forgot-password" style={{ color: "#ff1313" }}>Forgot Password</Link></p>
//                   </div>
//                   <button type="submit">Login</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


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