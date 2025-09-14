
"use client";
import Image from "next/image";
import Link from "next/link";
import { Coins, Sparkles, Trophy, Target, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import levelupCoin from "@/public/levelup-coin.json";


export default function Home() {
  // Sparkle positions for floating effect
  const sparkles = [
    { top: '10%', left: '15%', size: 18, delay: 0 },
    { top: '20%', right: '12%', size: 14, delay: 0.5 },
    { bottom: '18%', left: '20%', size: 12, delay: 1 },
    { bottom: '10%', right: '18%', size: 16, delay: 1.5 },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e0f7fa 0%, #f3e8ff 100%)' }}>
      {/* Animated floating sparkles */}
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute z-0"
          style={{ ...s, pointerEvents: 'none' }}
          initial={{ opacity: 0, scale: 0.7, y: 0 }}
          animate={{ opacity: 0.7, scale: 1, y: [0, -10, 0] }}
          transition={{ delay: s.delay, duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <Sparkles className="text-yellow-300" style={{ width: s.size, height: s.size }} />
        </motion.div>
      ))}

      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          className="mb-6 sm:mb-8 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Lottie
            animationData={levelupCoin}
            loop
            style={{ width: 120, height: 120, margin: "0 auto" }}
          />
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
          </div>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
        >
          SaveQuest
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg lg:text-xl mt-3 sm:mt-4 text-gray-500 mb-6 sm:mb-8 max-w-xs sm:max-w-md lg:max-w-lg px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
        >
          Turn saving money into an epic adventure! Level up your finances and unlock rewards.
        </motion.p>

  <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm">
          <Link href="/dashboard">
            <motion.button
              className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-semibold shadow-xl w-full h-12 sm:h-14 flex items-center justify-center gap-2 sm:gap-4 text-base sm:text-lg rounded-xl transform transition-transform duration-200 hover:scale-110 active:scale-95 focus:ring-2 focus:ring-blue-300 cursor-pointer"
              whileHover={{ scale: 1.10, boxShadow: "0 8px 32px 0 rgba(59,130,246,0.25)" }}
              whileTap={{ scale: 0.97 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut", delay: 1.2 }}
            >
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
              Start Your Quest
            </motion.button>
          </Link>
          {/* ...existing code for feature icons... */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1">
              <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              <span className="text-gray-500">Save Money</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full hidden sm:block"></div>
            <div className="flex items-center gap-1">
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              <span className="text-gray-500">Earn Rewards</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full hidden sm:block"></div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="text-gray-500">Level Up</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } }
          }}
        >
          <motion.div
            className="p-3 sm:p-4 text-center flex flex-col items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.06, boxShadow: "0 8px 32px 0 rgba(34,197,94,0.15)" }}
            whileTap={{ scale: 0.97 }}
          >
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-1 sm:mb-2 group-hover:animate-pulse" />
            <h3 className="font-semibold text-xs sm:text-sm mb-1">Goals</h3>
            <p className="text-xs text-muted-foreground">Set & track savings</p>
          </motion.div>
          <motion.div
            className="p-3 sm:p-4 text-center flex flex-col items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.06, boxShadow: "0 8px 32px 0 rgba(246,173,28,0.15)" }}
            whileTap={{ scale: 0.97 }}
          >
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-[#f6ad1c] mx-auto mb-1 sm:mb-2 group-hover:animate-bounce" />
            <h3 className="font-semibold text-xs sm:text-sm mb-1">Badges</h3>
            <p className="text-xs text-muted-foreground">Unlock achievements</p>
          </motion.div>
          <motion.div
            className="p-3 sm:p-4 text-center flex flex-col items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.06, boxShadow: "0 8px 32px 0 rgba(139,92,246,0.15)" }}
            whileTap={{ scale: 0.97 }}
          >
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-700 mx-auto mb-1 sm:mb-2 group-hover:animate-pulse" />
            <h3 className="font-semibold text-xs sm:text-sm mb-1">Challenges</h3>
            <p className="text-xs text-muted-foreground">Compete with friends</p>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}

