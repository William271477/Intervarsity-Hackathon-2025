"use client";
import React, { useState } from "react";

const demoUsers = [
  { id: 1, name: "You", xp: 0, streak: 0, color: "bg-blue-500" },
  { id: 2, name: "Alex", xp: 80, streak: 4, color: "bg-green-500" },
  { id: 3, name: "Sam", xp: 60, streak: 2, color: "bg-purple-500" },
  { id: 4, name: "Jamie", xp: 40, streak: 1, color: "bg-yellow-500" },
];

export default function LeaderboardPage() {
  // In a real app, you would pass your XP/streak from state or context
  const [yourXp, setYourXp] = useState(0);
  const [yourStreak, setYourStreak] = useState(0);

  // Replace "You" with your actual stats
  const users = demoUsers.map(u =>
    u.name === "You" ? { ...u, xp: yourXp, streak: yourStreak } : u
  ).sort((a, b) => b.xp - a.xp || b.streak - a.streak);

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-2 bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
        {users.map((user, i) => (
          <div
            key={user.id}
            className={`flex items-center gap-4 rounded-xl px-4 py-3 shadow-sm ${user.color} ${i === 0 ? 'border-2 border-yellow-400' : ''}`}
          >
            <span className="text-xl font-bold text-white w-8 text-center">{i + 1}</span>
            <span className="font-semibold flex-1 text-white">{user.name}</span>
            <span className="text-yellow-200 font-bold">{user.xp} XP</span>
            <span className="text-orange-200 font-bold">🔥 {user.streak}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
