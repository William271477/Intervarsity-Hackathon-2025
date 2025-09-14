"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebaseConfig";
import { useUser } from "@/components/UserProvider";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function LessonsPage() {
  const { user, loading } = useUser();
  const [lessons, setLessons] = useState([]);
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchLessons = async () => {
      const snap = await getDocs(collection(db, "lessons"));
      setLessons(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      // Optionally, fetch user's completed lessons from profile
      // setCompleted(...)
    };
    fetchLessons();
  }, [user]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!user) return <div className="flex justify-center items-center min-h-screen">Please log in to access lessons.</div>;
  if (lessons.length === 0) return <div className="flex justify-center items-center min-h-screen">No lessons available yet.</div>;

  const lesson = lessons[current];
  const isCompleted = completed.includes(lesson.id);

  const handleAnswer = (idx) => {
    setSelectedOption(idx);
    setShowResult(true);
    setCorrect(idx === lesson.quiz[0].answer);
  };

  const handleNext = async () => {
    setShowResult(false);
    setSelectedOption(null);
    setCorrect(false);
    setCompleted([...completed, lesson.id]);
    // Award XP and mark lesson as completed in Firestore
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        xp: (user.xp || 0) + (lesson.xpReward || 10),
        badges: user.badges || [], // Optionally award badge
      });
      toast.success(`+${lesson.xpReward || 10} XP!`);
    } catch (err) {
      toast.error("Failed to update XP");
    }
    if (current < lessons.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-2 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-50">
      <h1 className="text-3xl font-bold mb-6">Financial Literacy Lessons</h1>
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl flex flex-col gap-4">
        <div className="font-semibold text-lg mb-2">Lesson {current + 1}: {lesson.title}</div>
        <div className="mb-4">{lesson.content}</div>
        <div className="font-semibold mb-2">Quiz:</div>
        {lesson.quiz[0] && (
          <div className="flex flex-col gap-2">
            <div>{lesson.quiz[0].question}</div>
            {lesson.quiz[0].options.map((opt, idx) => (
              <button
                key={idx}
                className={`btn w-full ${selectedOption === idx ? (correct ? "btn-success" : "btn-error") : "btn-outline"}`}
                onClick={() => !showResult && handleAnswer(idx)}
                disabled={showResult}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
        {showResult && (
          <div className={`mt-2 font-bold ${correct ? "text-green-600" : "text-red-600"}`}>
            {correct ? "Correct!" : "Incorrect."}
          </div>
        )}
        <button
          className="btn btn-primary mt-4"
          onClick={handleNext}
          disabled={!showResult || isCompleted}
        >
          {current < lessons.length - 1 ? "Next Lesson" : "Finish"}
        </button>
      </div>
    </div>
  );
}
