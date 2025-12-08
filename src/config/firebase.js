// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOON9_rY9Bi225_Qri-4G7RkdAfRcCm3k",
  authDomain: "enantra-foodstall.firebaseapp.com",
  projectId: "enantra-foodstall",
  storageBucket: "enantra-foodstall.firebasestorage.app",
  messagingSenderId: "996583551132",
  appId: "1:996583551132:web:98a2f70041a46299a43d59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;

