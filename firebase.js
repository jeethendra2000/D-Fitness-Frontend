// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDk_lmEBDUZkLdzvkStNf7amwkwKa6JQ2Q",
//   authDomain: "d-fitness7.firebaseapp.com",
//   projectId: "d-fitness7",
//   storageBucket: "d-fitness7.firebasestorage.app",
//   messagingSenderId: "463796648919",
//   appId: "1:463796648919:web:7ea732bfb27d5228abe992",
//   measurementId: "G-N6WKH91MHD",
//   databaseURL: "https://d-fitness7-default-rtdb.firebaseio.com/"
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);


// OAuth providers
export const googleProvider = new GoogleAuthProvider();
export const microsoftProvider = new OAuthProvider("microsoft.com");