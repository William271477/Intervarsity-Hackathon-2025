import QuestCard from '@/components/QuestCard'
import React from 'react'

const page = () => {
  const quests = [
    {
      title: "What is Compound Interest?",
      description: "Learn how your money can grow over time",
      level: "Beginner",
      xp: 50,
      badge: "Interest Explorer",
      completed: true,
      locked: false,
      unlocksAtXp: 0,
    },
    {
      title: "Building an Emergency Fund",
      description: "Why you need 3-6 months of expenses saved",
      level: "Beginner",
      xp: 75,
      badge: "Safety First",
      completed: true,
      locked: false,
      unlocksAtXp: 0,
    },
    {
      title: "Saving vs. Spending",
      description: "Learn how to balance short-term wants with long-term goals",
      level: "Beginner",
      xp: 60,
      badge: "Saver Starter",
      completed: false,
      locked: false,
      unlocksAtXp: 0,
    },
    {
      title: "Bank Accounts 101",
      description: "Checking vs. savings accounts explained",
      level: "Beginner",
      xp: 70,
      badge: "Account Explorer",
      completed: false,
      locked: false,
      unlocksAtXp: 0,
    },
    {
      title: "Understanding Paychecks",
      description: "Taxes, deductions, and take-home pay",
      level: "Beginner",
      xp: 80,
      badge: "Income Decoder",
      completed: false,
      locked: true,
      unlocksAtXp: 150,
    },
    {
      title: "Needs vs. Wants",
      description: "How to prioritize what really matters",
      level: "Beginner",
      xp: 65,
      badge: "Smart Spender",
      completed: false,
      locked: true,
      unlocksAtXp: 200,
    },

    // Intermediate
    {
      title: "Understanding Investment Basics",
      description: "Stocks, bonds, and mutual funds explained",
      level: "Intermediate",
      xp: 100,
      badge: "Investment Rookie",
      completed: false,
      locked: false,
      unlocksAtXp: 250,
    },
    {
      title: "Budgeting Like a Pro",
      description: "Master the 50/30/20 rule and track expenses",
      level: "Intermediate",
      xp: 125,
      badge: "Budget Master",
      completed: false,
      locked: true,
      unlocksAtXp: 300,
    },
    {
      title: "Smart Debt Management",
      description: "Good debt vs. bad debt and repayment strategies",
      level: "Intermediate",
      xp: 110,
      badge: "Debt Defender",
      completed: false,
      locked: true,
      unlocksAtXp: 350,
    },
    {
      title: "Insurance Basics",
      description: "Why health, car, and life insurance matter",
      level: "Intermediate",
      xp: 115,
      badge: "Risk Reducer",
      completed: false,
      locked: true,
      unlocksAtXp: 400,
    },
    {
      title: "Taxes Simplified",
      description: "Learn how income tax works and what deductions mean",
      level: "Intermediate",
      xp: 120,
      badge: "Tax Explorer",
      completed: false,
      locked: true,
      unlocksAtXp: 450,
    },
    {
      title: "Retirement Accounts Explained",
      description: "Intro to 401(k)s and IRAs",
      level: "Intermediate",
      xp: 130,
      badge: "Future Planner",
      completed: false,
      locked: true,
      unlocksAtXp: 500,
    },

    // Advanced
    {
      title: "Credit Scores Demystified",
      description: "How credit scores work and why they matter",
      level: "Advanced",
      xp: 150,
      badge: "Credit Guru",
      completed: false,
      locked: false,
      unlocksAtXp: 550,
    },
    {
      title: "Building Wealth with Real Estate",
      description: "Renting vs. owning vs. investing in property",
      level: "Advanced",
      xp: 175,
      badge: "Property Pro",
      completed: false,
      locked: true,
      unlocksAtXp: 600,
    },
    {
      title: "Advanced Investing Strategies",
      description: "ETFs, index funds, and diversification explained",
      level: "Advanced",
      xp: 180,
      badge: "Portfolio Pilot",
      completed: false,
      locked: true,
      unlocksAtXp: 650,
    },
    {
      title: "Entrepreneurship & Side Hustles",
      description: "How to turn ideas into income streams",
      level: "Advanced",
      xp: 160,
      badge: "Hustle Hero",
      completed: false,
      locked: true,
      unlocksAtXp: 700,
    },
    {
      title: "Financial Independence & FIRE",
      description: "How people retire early by saving and investing aggressively",
      level: "Advanced",
      xp: 200,
      badge: "FIRE Seeker",
      completed: false,
      locked: true,
      unlocksAtXp: 750,
    },
  ];

  const currentXp = 125;
  const nextLevelXp = 400;
  const progressPercent = (currentXp / nextLevelXp) * 100;

  return (
    <div>
      <div className="relative bg-yellow-500 w-full h-[160px] px-10 text-white flex flex-col gap-3 pt-12">
        <h1 className="text-2xl font-bold">Side Quests</h1>
        <p>Level up your financial knowledge</p>

        {/* Stats & Progress */}
        <div className="absolute -bottom-32 inset-x-10 bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-4">
          {/* Stats Row */}
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <p className="text-green-700 text-lg font-semibold">2</p>
              <p className="text-gray-400 text-sm">Completed</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-yellow-500 text-lg font-semibold">{currentXp}</p>
              <p className="text-gray-400 text-sm">XP Earned</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-purple-700 text-lg font-semibold">4</p>
              <p className="text-gray-400 text-sm">Available</p>
            </div>
          </div>

          {/* Beginner Progress Bar */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-semibold text-gray-700">Beginner Progress</p>
            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>

              {/* Level markers */}
              <span className="absolute -top-5 left-0 text-xs font-medium text-green-600">
                Beginner
              </span>
              <span className="absolute -top-5 right-0 text-xs font-medium text-purple-600">
                Intermediate
              </span>

              {/* Unlock milestone marker */}
              <div className="absolute top-0 right-0 h-3 w-[2px] bg-purple-600"></div>
            </div>
            <p className="text-xs text-gray-500">
              {currentXp} / {nextLevelXp} XP — Next: Intermediate
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 grid gap-6 max-w-4xl mx-auto mt-40 mb-25">
        {quests.map((quest, index) => (
          <QuestCard key={index} {...quest} />
        ))}
      </div>
    </div>
  );
};

export default page;
