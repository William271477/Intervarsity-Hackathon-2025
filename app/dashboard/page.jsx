"use client";

import React, { useState } from 'react';
import { withAuth, useAuth } from '@/components/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy, Users, Target, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import toast, { Toaster } from 'react-hot-toast';

const leaderboard = [
  { name: 'You', score: 1200, avatar: '/images/hero-chest.jpeg' },
  { name: 'Alex', score: 1100, avatar: '/images/hero-chest.jpeg' },
  { name: 'Sam', score: 900, avatar: '/images/hero-chest.jpeg' },
];

const DashboardPage = () => {
  const { logout } = useAuth();
  const [progress, setProgress] = useState(78); // percent
  const [streak, setStreak] = useState(3);
  const [showBadge, setShowBadge] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Simulate badge unlock
  const unlockBadge = () => {
    setShowBadge(true);
    setShowConfetti(true);
    toast.success('Level Up! New badge unlocked!');
    setTimeout(() => setShowBadge(false), 2000);
    setTimeout(() => setShowConfetti(false), 1800);
  };

  // Simulate streak increment
  const incrementStreak = () => {
    setStreak(s => s + 1);
    toast('🔥 Streak up!', { icon: '🔥' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50 flex flex-col items-center py-8 px-2 sm:px-6 lg:px-8 relative overflow-x-hidden">
      <Toaster />
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={120} recycle={false} />} 
      {/* Header */}
      <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex flex-col items-start">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent mb-1">Welcome back 👋</h1>
          <span className="text-gray-500 text-sm">Your adventure continues!</span>
        </div>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition font-semibold">Logout</button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-lg flex items-center gap-2"><Target className="w-5 h-5 text-green-500" />Goal Progress</span>
          <span className="text-sm text-gray-400">{progress}%</span>
        </div>
        <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ borderRadius: 999 }}
          />
          {/* Pulsing glow when near complete */}
          {progress > 70 && (
            <motion.div
              className="absolute right-0 top-0 h-full w-6 bg-green-300/40 blur-lg"
              animate={{ opacity: [0.7, 0.2, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            />
          )}
        </div>
        <button onClick={() => setProgress(p => Math.min(100, p + 10))} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">Log Save</button>
      </div>

      {/* Streak Counter */}
      <motion.div
        className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg mb-8 cursor-pointer select-none"
        whileTap={{ scale: 1.12 }}
        onClick={incrementStreak}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <Flame className="text-orange-500 w-5 h-5 animate-pulse" />
        <span className="font-semibold text-orange-600">{streak} day streak</span>
      </motion.div>

      {/* Badges */}
      <div className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <motion.div
          className="bg-white rounded-2xl shadow-md flex flex-col items-center justify-center p-4 cursor-pointer hover:scale-105 transition"
          whileTap={{ scale: 0.95, rotate: 8 }}
          onClick={unlockBadge}
        >
          <Trophy className="w-8 h-8 text-yellow-400 mb-2 animate-bounce" />
          <span className="font-semibold">First Save</span>
        </motion.div>
        <motion.div className="bg-white rounded-2xl shadow-md flex flex-col items-center justify-center p-4 opacity-60">
          <Trophy className="w-8 h-8 text-purple-400 mb-2" />
          <span className="font-semibold">Goal Complete</span>
        </motion.div>
        <motion.div className="bg-white rounded-2xl shadow-md flex flex-col items-center justify-center p-4 opacity-60">
          <Trophy className="w-8 h-8 text-green-400 mb-2" />
          <span className="font-semibold">3 Day Streak</span>
        </motion.div>
      </div>

      {/* Badge Modal */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center"
              initial={{ scale: 0.7, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.7, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Sparkles className="w-10 h-10 text-yellow-400 mb-2 animate-pulse" />
              <Trophy className="w-16 h-16 text-yellow-400 mb-4 animate-bounce" />
              <span className="font-bold text-lg mb-2">Badge Unlocked!</span>
              <span className="text-gray-500 mb-2">First Save</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leaderboard */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-purple-600" />
          <span className="font-semibold text-lg">Leaderboard</span>
        </div>
        <motion.div
          className="flex flex-col gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } }
          }}
        >
          {leaderboard.map((user, i) => (
            <motion.div
              key={user.name}
              className={`flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-3 shadow-sm ${i === 0 ? 'border-2 border-blue-400' : ''}`}
              variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }}
              whileHover={{ scale: 1.03, boxShadow: '0 4px 16px 0 rgba(59,130,246,0.10)' }}
            >
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-white shadow" />
              <span className="font-semibold flex-1">{user.name}</span>
              <span className="text-blue-600 font-bold">{user.score} XP</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Challenges (placeholder) */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-6 h-6 text-green-600" />
          <span className="font-semibold text-lg">Challenges</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="font-semibold">You</span>
            <motion.div
              className="w-full h-4 bg-gray-200 rounded-full mt-2 mb-1 relative"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <motion.div
                className="absolute left-0 top-0 h-full bg-blue-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '80%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </motion.div>
            <span className="text-blue-600 font-bold">80%</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="font-semibold">Alex</span>
            <motion.div
              className="w-full h-4 bg-gray-200 rounded-full mt-2 mb-1 relative"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <motion.div
                className="absolute left-0 top-0 h-full bg-purple-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </motion.div>
            <span className="text-purple-600 font-bold">60%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(DashboardPage);
