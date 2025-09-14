"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { db } from "@/lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Signup started");
    try {
      console.log("Calling createUserWithEmailAndPassword");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created", userCredential);
      await updateProfile(userCredential.user, { displayName });
      console.log("Profile updated");
      // Save user profile to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        displayName,
        xp: 0,
        streak: 0,
        createdAt: new Date(),
      });
      console.log("User document written to Firestore");
      toast.success("Welcome to SaveQuest!");
      console.log("Navigating to /dashboard");
      router.push("/dashboard");
    } catch (err) {
      console.error("Signup error", err);
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please use a different email or log in.");
      } else {
        toast.error(err.message);
      }
    }
    setLoading(false);
    console.log("Signup finished");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm space-y-4 text-center">
        <h2 className="text-2xl font-bold">Sign Up Disabled</h2>
        <p>Sign up is currently disabled. Please check back later.</p>
      </div>
    </div>
  );
}