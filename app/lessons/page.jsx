
"use client";
import React, { useState } from "react";

	export default function LessonsPage() {
		const demoLessons = [
			{
				id: 1,
				title: "Why Saving Early Matters",
				content: "The earlier you start saving, the more your money can grow thanks to compound interest! Even small amounts add up over time.",
				xp: 10,
				quiz: {
					question: "What is the main benefit of starting to save early?",
					options: [
						"You can buy more things immediately",
						"Your money has more time to grow",
						"You pay less in taxes",
						"You don't need a budget"
					],
					answer: 1
				}
			},
			{
				id: 2,
				title: "Budgeting 101",
				content: "A budget helps you track your income and expenses, so you can save more and spend wisely. Try the 50/30/20 rule!",
				xp: 10,
				quiz: {
					question: "What does the 50/30/20 rule suggest you do with your income?",
					options: [
						"Spend 50% on fun, 30% on bills, 20% on savings",
						"Save 50%, spend 50%",
						"50% needs, 30% wants, 20% savings",
						"All on needs"
					],
					answer: 2
				}
			},
			{
				id: 3,
				title: "Setting SMART Goals",
				content: "Make your savings goals Specific, Measurable, Achievable, Relevant, and Time-bound for the best results.",
				xp: 10,
				quiz: {
					question: "What does the 'M' in SMART goals stand for?",
					options: [
						"Money",
						"Measurable",
						"Manageable",
						"Monthly"
					],
					answer: 1
				}
			},
			{
				id: 4,
				title: "Emergency Funds",
				content: "An emergency fund is money set aside for unexpected expenses. Aim for 3-6 months of living costs.",
				xp: 15,
				quiz: {
					question: "How much should you ideally have in your emergency fund?",
					options: [
						"1 week of expenses",
						"1 month of expenses",
						"3-6 months of expenses",
						"A year's salary"
					],
					answer: 2
				}
			},
			{
				id: 5,
				title: "Good Debt vs Bad Debt",
				content: "Not all debt is equal. Good debt (like student loans) can help you grow, while bad debt (like high-interest credit cards) can hurt your finances.",
				xp: 15,
				quiz: {
					question: "Which is an example of 'bad debt'?",
					options: [
						"Student loan for education",
						"Home mortgage",
						"Credit card debt with high interest",
						"Business loan"
					],
					answer: 2
				}
			},
			{
				id: 6,
				title: "Investing Basics",
				content: "Investing helps your money grow faster than regular savings. Start small, think long-term, and diversify your investments.",
				xp: 20,
				quiz: {
					question: "What is a key principle of investing?",
					options: [
						"Put all your money in one stock",
						"Invest for the long-term and diversify",
						"Only invest in things you don't understand",
						"Never invest"
					],
					answer: 1
				}
			}
		];
		const [completed, setCompleted] = useState([]);
		const [xp, setXp] = useState(0);
		const [active, setActive] = useState(null); // lesson id
		const [selectedOption, setSelectedOption] = useState(null);
		const [quizResult, setQuizResult] = useState(null);

		function handleQuizSubmit(lesson) {
			if (selectedOption === lesson.quiz.answer) {
				setQuizResult('correct');
				if (!completed.includes(lesson.id)) {
					setCompleted([...completed, lesson.id]);
					setXp(xp + lesson.xp);
				}
			} else {
				setQuizResult('incorrect');
			}
		}

		return (
			<div className="min-h-screen flex flex-col items-center py-8 px-2 bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
				<h1 className="text-3xl font-bold mb-6">Financial Literacy Course</h1>
				<div className="mb-4 text-lg font-semibold text-blue-700">XP: <span className="font-bold">{xp}</span></div>
				<div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-6">
					{active === null ? demoLessons.map(lesson => (
						<div
							key={lesson.id}
							className={`bg-white rounded-xl shadow p-6 flex flex-col gap-2 cursor-pointer transition hover:scale-105 ${completed.includes(lesson.id) ? 'ring-2 ring-green-400' : ''}`}
							onClick={() => { setActive(lesson.id); setSelectedOption(null); setQuizResult(null); }}
						>
							<h2 className="text-xl font-bold mb-2">{lesson.title}</h2>
							<p className="mb-2 text-gray-700">{lesson.content}</p>
							<div className="flex items-center gap-2 mt-auto">
								<span className="text-green-600 font-bold">+{lesson.xp} XP</span>
								{completed.includes(lesson.id) && <span className="ml-auto text-green-600 font-bold">✓ Completed</span>}
							</div>
						</div>
					)) : (
						<div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 col-span-2 animate-fade-in">
							<button className="btn btn-sm btn-outline w-24 mb-2" onClick={() => { setActive(null); setSelectedOption(null); setQuizResult(null); }}>Back</button>
							<h2 className="text-2xl font-bold mb-2">{demoLessons.find(l => l.id === active).title}</h2>
							<div className="mb-4 text-gray-700">{demoLessons.find(l => l.id === active).content}</div>
							<div className="font-semibold mb-1">Quiz:</div>
							<div className="mb-2">{demoLessons.find(l => l.id === active).quiz.question}</div>
							<div className="flex flex-col gap-2">
								{demoLessons.find(l => l.id === active).quiz.options.map((opt, idx) => (
									<label key={opt} className={`flex items-center gap-2 p-2 rounded cursor-pointer border ${selectedOption === idx ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
										<input
											type="radio"
											name="quiz"
											value={idx}
											checked={selectedOption === idx}
											onChange={() => setSelectedOption(idx)}
											disabled={quizResult === 'correct'}
										/>
										{opt}
									</label>
								))}
							</div>
							{quizResult === null && (
								<button
									className="btn btn-primary mt-2"
									disabled={selectedOption === null}
									onClick={() => handleQuizSubmit(demoLessons.find(l => l.id === active))}
								>
									Submit
								</button>
							)}
							{quizResult === 'correct' && <div className="text-green-600 font-bold mt-2">🎉 Correct! +{demoLessons.find(l => l.id === active).xp} XP</div>}
							{quizResult === 'incorrect' && <div className="text-red-600 font-bold mt-2">❌ Incorrect. Try again!</div>}
						</div>
					)}
				</div>
				{completed.length === demoLessons.length && (
					<div className="mt-8 text-xl font-bold text-green-600 animate-bounce">🎉 Course Complete! You earned a badge!</div>
				)}
			</div>
		);
	}
// End of file
