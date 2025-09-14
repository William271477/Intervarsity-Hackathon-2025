
"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebaseConfig";
import { useUser } from "@/components/UserProvider";
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import toast from "react-hot-toast";

export default function LessonsPage() {
	const { user, loading, profile } = useUser();
	const [lessons, setLessons] = useState([]);
	const [selected, setSelected] = useState(null);
	const [answer, setAnswer] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [completed, setCompleted] = useState([]);

	useEffect(() => {
		const fetchLessons = async () => {
			const snap = await getDocs(collection(db, "lessons"));
			setLessons(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
		};
		fetchLessons();
	}, []);

	useEffect(() => {
		if (profile) setCompleted(profile.completedLessons || []);
	}, [profile]);

	const handleQuiz = async (e) => {
		e.preventDefault();
		if (!selected || !answer) return;
		setSubmitting(true);
		const correct = selected.quiz[0].answer === answer;
		if (correct) {
			try {
				// Award XP and mark lesson complete
				const userRef = doc(db, "users", user.uid);
				await updateDoc(userRef, {
					xp: (profile?.xp || 0) + selected.xpReward,
					completedLessons: arrayUnion(selected.id),
				});
				toast.success("Correct! +" + selected.xpReward + " XP");
				setCompleted([...completed, selected.id]);
			} catch {
				toast.error("Could not update progress");
			}
		} else {
			toast.error("Incorrect. Try again!");
		}
		setSubmitting(false);
	};

	if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

	return (
		<div className="min-h-screen flex flex-col items-center py-8 px-2 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-50">
			<h1 className="text-3xl font-bold mb-6">Financial Literacy Lessons</h1>
			{!selected ? (
				<div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
					{lessons.map(lesson => (
						<div
							key={lesson.id}
							className={`bg-white rounded-xl shadow p-4 flex flex-col gap-2 cursor-pointer border-2 ${completed.includes(lesson.id) ? 'border-green-400' : 'border-transparent'}`}
							onClick={() => setSelected(lesson)}
						>
							<span className="font-semibold text-lg">{lesson.title}</span>
							<span className="text-sm text-gray-500">XP: {lesson.xpReward}</span>
							{completed.includes(lesson.id) && <span className="text-green-600 font-bold text-xs">Completed</span>}
						</div>
					))}
				</div>
			) : (
				<div className="w-full max-w-lg bg-white rounded-xl shadow p-6 flex flex-col gap-4">
					<button className="btn btn-sm btn-outline w-24 mb-2" onClick={() => { setSelected(null); setAnswer(""); }}>Back</button>
					<h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
					<div className="mb-4 text-gray-700">{selected.content}</div>
					<form onSubmit={handleQuiz} className="flex flex-col gap-2">
						<div className="font-semibold mb-1">Quiz:</div>
						<div className="mb-2">{selected.quiz[0].question}</div>
						{selected.quiz[0].options.map(opt => (
							<label key={opt} className="flex items-center gap-2">
								<input
									type="radio"
									name="quiz"
									value={opt}
									checked={answer === opt}
									onChange={() => setAnswer(opt)}
									disabled={completed.includes(selected.id)}
									className="radio"
								/>
								{opt}
							</label>
						))}
						<button type="submit" className="btn btn-primary mt-2" disabled={submitting || completed.includes(selected.id)}>
							{completed.includes(selected.id) ? "Completed" : submitting ? "Submitting..." : "Submit"}
						</button>
					</form>
				</div>
			)}
		</div>
	);
}
