
"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebaseConfig";
import { useUser } from "@/components/UserProvider";
import { collection, addDoc, query, where, getDocs, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

export default function ChallengesPage() {
  const { user, loading } = useUser();
  const [goalAmount, setGoalAmount] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [joining, setJoining] = useState(false);
  const [creating, setCreating] = useState(false);

  // Fetch challenges user is in
  useEffect(() => {
    if (!user) return;
    const fetchChallenges = async () => {
      const q = query(collection(db, "challenges"), where("participants", "array-contains", user.uid));
      const snap = await getDocs(q);
      setChallenges(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchChallenges();
  }, [user]);

  // Generate a simple invite code
  function generateInviteCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Create a new challenge
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!goalAmount || isNaN(goalAmount) || Number(goalAmount) <= 0) return;
    setCreating(true);
    try {
      const code = generateInviteCode();
      await addDoc(collection(db, "challenges"), {
        creatorUid: user.uid,
        inviteCode: code,
        goalAmount: Number(goalAmount),
        participants: [user.uid],
        progress: { [user.uid]: 0 },
        winnerUid: null,
        createdAt: serverTimestamp(),
      });
      setGoalAmount("");
      toast.success("Challenge created!");
    } catch (err) {
      toast.error("Failed to create challenge");
    }
    setCreating(false);
  };

  // Join a challenge by invite code
  const handleJoin = async (e) => {
    e.preventDefault();
    if (!inviteCode) return;
    setJoining(true);
    try {
      const q = query(collection(db, "challenges"), where("inviteCode", "==", inviteCode.toUpperCase()));
      const snap = await getDocs(q);
      if (snap.empty) {
        toast.error("No challenge found with that code");
      } else {
        const challengeDoc = snap.docs[0];
        const challengeRef = doc(db, "challenges", challengeDoc.id);
        const data = challengeDoc.data();
        if (data.participants.includes(user.uid)) {
          toast("You are already in this challenge");
        } else {
          await updateDoc(challengeRef, {
            participants: [...data.participants, user.uid],
            [`progress.${user.uid}`]: 0,
          });
          toast.success("Joined challenge!");
        }
      }
      setInviteCode("");
    } catch (err) {
      toast.error("Failed to join challenge");
    }
    setJoining(false);
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-2 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      <h1 className="text-3xl font-bold mb-6">Challenges</h1>
      <form onSubmit={handleCreate} className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md flex flex-col gap-4 mb-6">
        <div className="font-semibold">Create a Challenge</div>
        <input
          type="number"
          placeholder="Goal Amount (e.g. 1000)"
          className="input input-bordered w-full"
          value={goalAmount}
          onChange={e => setGoalAmount(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full" disabled={creating}>
          {creating ? "Creating..." : "Create Challenge"}
        </button>
      </form>
      <form onSubmit={handleJoin} className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md flex flex-col gap-4 mb-8">
        <div className="font-semibold">Join a Challenge</div>
        <input
          type="text"
          placeholder="Invite Code"
          className="input input-bordered w-full uppercase"
          value={inviteCode}
          onChange={e => setInviteCode(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success w-full" disabled={joining}>
          {joining ? "Joining..." : "Join Challenge"}
        </button>
      </form>
      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Your Challenges</h2>
        {challenges.length === 0 && <div className="text-gray-400">No challenges yet. Create or join one!</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {challenges.map(challenge => (
            <div key={challenge.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">Goal: R{challenge.goalAmount}</span>
                <span className="text-xs text-gray-500">Invite: {challenge.inviteCode}</span>
              </div>
              <div className="text-sm">Participants: {challenge.participants.length}</div>
              <div className="flex flex-col gap-1 mt-2">
                {challenge.participants.map(uid => (
                  <div key={uid} className="flex justify-between text-xs">
                    <span>{uid === user.uid ? "You" : uid.slice(0, 6) + "..."}</span>
                    <span>Saved: R{challenge.progress?.[uid] ?? 0}</span>
                  </div>
                ))}
              </div>
              {challenge.winnerUid && (
                <div className="text-green-600 font-bold mt-2">Winner: {challenge.winnerUid === user.uid ? "You" : challenge.winnerUid.slice(0, 6) + "..."}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
