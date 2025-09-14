// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6lBfYjCtY3BzgP6FV1GB65SkqhcvR72U",
  authDomain: "savequest25.firebaseapp.com",
  projectId: "savequest25",
  storageBucket: "savequest25.firebasestorage.app",
  messagingSenderId: "563341602618",
  appId: "1:563341602618:web:542fa093dad726273eaa03",
  measurementId: "G-DM8RW7XFSV"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);