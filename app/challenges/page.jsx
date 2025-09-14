
"use client";
import React, { useState } from "react";


export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([
    { id: "ABC123", name: "Race to R500!", target: 500, participants: ["You", "Alex"], winner: null },
    { id: "XYZ789", name: "Save for Summer", target: 1000, participants: ["You", "Sam"], winner: "Sam" },
  ]);
  const [newChallenge, setNewChallenge] = useState({ name: "", target: "" });
  const [inviteCode, setInviteCode] = useState("");
  const [joined, setJoined] = useState(null);

  function randomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  function handleCreate(e) {
    e.preventDefault();
    if (!newChallenge.name || !newChallenge.target) return;
    const code = randomCode();
    setChallenges([
      ...challenges,
      { id: code, name: newChallenge.name, target: parseFloat(newChallenge.target), participants: ["You"], winner: null },
    ]);
    setNewChallenge({ name: "", target: "" });
    setJoined(code);
  }

  function handleJoin(e) {
    e.preventDefault();
    const found = challenges.find(c => c.id === inviteCode.trim().toUpperCase());
    if (found && !found.participants.includes("You")) {
      found.participants.push("You");
      setChallenges([...challenges]);
      setJoined(found.id);
    } else if (found) {
      setJoined(found.id);
    } else {
      alert("Challenge not found!");
    }
    setInviteCode("");
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-2 bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      <h1 className="text-3xl font-bold mb-6">Friend Challenges</h1>
      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          className="input input-bordered"
          placeholder="Challenge Name"
          value={newChallenge.name}
          onChange={e => setNewChallenge({ ...newChallenge, name: e.target.value })}
          required
        />
        <input
          className="input input-bordered"
          placeholder="Target Amount"
          type="number"
          min="1"
          value={newChallenge.target}
          onChange={e => setNewChallenge({ ...newChallenge, target: e.target.value })}
          required
        />
        <button className="btn btn-primary" type="submit">Create</button>
      </form>
      <form onSubmit={handleJoin} className="flex gap-2 mb-8">
        <input
          className="input input-bordered"
          placeholder="Enter Invite Code"
          value={inviteCode}
          onChange={e => setInviteCode(e.target.value)}
          required
        />
        <button className="btn btn-success" type="submit">Join</button>
      </form>
      <div className="w-full max-w-xl space-y-4">
        {challenges.map(ch => (
          <div key={ch.id} className={`bg-white rounded-xl shadow p-4 flex flex-col gap-2 ${joined === ch.id ? 'ring-2 ring-blue-400' : ''}`}>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">{ch.name}</span>
              <span className="text-gray-500">Target: R{ch.target}</span>
              <span className="text-xs text-gray-400">Code: {ch.id}</span>
            </div>
            <div className="flex gap-2 flex-wrap text-sm">
              {ch.participants.map(p => (
                <span key={p} className="bg-blue-100 text-blue-700 rounded-full px-3 py-1">{p}</span>
              ))}
            </div>
            {ch.winner && <div className="text-green-600 font-bold mt-1">🏆 Winner: {ch.winner}</div>}
            {joined === ch.id && <div className="text-blue-600 font-semibold mt-1">You joined this challenge!</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
            {/* duplicate line removed */}

