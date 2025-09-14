"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/components/UserProvider";
import { db } from "@/lib/firebaseConfig";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import toast from "react-hot-toast";

export default function GoalsPage() {
  const { user, loading } = useUser();
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [goals, setGoals] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchGoals = async () => {
      const q = query(collection(db, "savingsGoals"), where("uid", "==", user.uid), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setGoals(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchGoals();
  }, [user]);

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    if (!title || !targetAmount) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, "savingsGoals"), {
        uid: user.uid,
        title,
        targetAmount: Number(targetAmount),
        currentAmount: 0,
        createdAt: new Date(),
        completed: false,
      });
      setTitle("");
      setTargetAmount("");
      toast.success("Goal created!");
      // Refresh goals
      const q = query(collection(db, "savingsGoals"), where("uid", "==", user.uid), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setGoals(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      toast.error("Failed to create goal");
    }
    setSubmitting(false);
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-2 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      <h1 className="text-3xl font-bold mb-6">Your Savings Goals</h1>
      <form onSubmit={handleCreateGoal} className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md flex flex-col gap-4 mb-8">
        <input
          type="text"
          placeholder="Goal Title"
          className="input input-bordered w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Target Amount (e.g. 500)"
          className="input input-bordered w-full"
          value={targetAmount}
          onChange={e => setTargetAmount(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Goal"}
        </button>
      </form>
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goals.length === 0 && <div className="col-span-2 text-center text-gray-400">No goals yet. Create one!</div>}
        {goals.map(goal => (
          <div key={goal.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">{goal.title}</span>
              <span className="text-sm text-gray-500">Target: R{goal.targetAmount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all"
                style={{ width: `${Math.round((goal.currentAmount / goal.targetAmount) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>Saved: R{goal.currentAmount}</span>
              <span>{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
