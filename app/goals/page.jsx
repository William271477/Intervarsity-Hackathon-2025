"use client";
import React, { useState } from "react";
import ConfettiBurst from "@/components/ConfettiBurst";

export default function GoalsPage() {
  const [goals, setGoals] = useState([
    { id: 1, title: "Save for Books", targetAmount: 500, currentAmount: 120 },
    { id: 2, title: "New Phone", targetAmount: 2000, currentAmount: 400 },
  ]);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastSaveDate, setLastSaveDate] = useState(null);
  const [badges, setBadges] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  function handleCreateGoal(e) {
    e.preventDefault();
    if (!title || !targetAmount) return;
    setGoals([
      ...goals,
      {
        id: Date.now(),
        title,
        targetAmount: parseFloat(targetAmount),
        currentAmount: 0,
      },
    ]);
    setTitle("");
    setTargetAmount("");
  }

  function handleLogSave(goalId, amount) {
    setGoals(goals.map(g => g.id === goalId ? { ...g, currentAmount: Math.min(g.currentAmount + amount, g.targetAmount) } : g));
    // Award XP: 1 XP per R10 saved (rounded down)
    setXp(prev => prev + Math.floor(amount / 10));

    // Streak logic: if saved today, increment; if yesterday, increment; else reset
    const today = new Date().toDateString();
    if (!lastSaveDate) {
      setStreak(1);
    } else {
      const last = new Date(lastSaveDate);
      const diff = Math.floor((new Date(today) - new Date(last.toDateString())) / (1000 * 60 * 60 * 24));
      if (diff === 1) setStreak(s => s + 1);
      else if (diff === 0) setStreak(s => s); // same day
      else setStreak(1);
    }
    setLastSaveDate(new Date());

    // Badges logic
    let newBadges = [...badges];
    if (!badges.includes("First Save")) {
      newBadges.push("First Save");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1800);
    }
    if (streak + 1 === 3 && !badges.includes("3-Day Streak")) {
      newBadges.push("3-Day Streak");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1800);
    }
    if (xp + Math.floor(amount / 10) >= 50 && !badges.includes("50 XP Club")) {
      newBadges.push("50 XP Club");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1800);
    }
    setBadges(newBadges);
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-2 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      <ConfettiBurst show={showConfetti} />
      <h1 className="text-3xl font-bold mb-2">Your Savings Goals</h1>
      <div className="mb-2 text-lg font-semibold text-blue-700">XP: <span className="font-bold">{xp}</span></div>
      <div className="mb-2 text-lg font-semibold text-orange-600">Streak: <span className="font-bold">{streak}</span> day{streak === 1 ? '' : 's'}</div>
      <div className="mb-6 flex flex-wrap gap-2 items-center">
        {badges.length === 0 ? (
          <span className="text-gray-400">No badges yet</span>
        ) : (
          badges.map(badge => (
            <span key={badge} className="inline-block bg-yellow-200 text-yellow-800 rounded-full px-3 py-1 text-sm font-semibold shadow">🏅 {badge}</span>
          ))
        )}
      </div>
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
        >
          Create Goal
        </button>
      </form>
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goals.length === 0 && <div className="col-span-2 text-center text-gray-400">No goals yet. Create one!</div>}
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onLogSave={handleLogSave}
          />
        ))}
      </div>
    </div>
  );
}

// GoalCard component for logging savings (local state only)
function GoalCard({ goal, onLogSave }) {
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amount || isNaN(amt) || amt <= 0) return;
    onLogSave(goal.id, amt);
    setAmount("");
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
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
      <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
        <input
          type="number"
          min="1"
          placeholder="Amount"
          className="input input-bordered flex-1"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn btn-success"
        >
          Log Save
        </button>
      </form>
    </div>
  );
}
