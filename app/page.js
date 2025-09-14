import Image from "next/image";
import Link from "next/link";
import { Coins, Sparkles, Trophy, Target, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 sm:mb-8 relative">
          <Image 
            width={100} 
            height={100}
            src={"/images/hero-chest.jpeg"} 
            alt="SaveQuest Treasure" 
            className="w-32 h-20 sm:w-48 sm:h-28 lg:w-56 lg:h-32 object-cover rounded-2xl"
          />
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          SaveQuest
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl mt-3 sm:mt-4 text-gray-500 mb-6 sm:mb-8 max-w-xs sm:max-w-md lg:max-w-lg px-2">
          Turn saving money into an epic adventure! Level up your finances and unlock rewards.
        </p>

        <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm">
          <Link href="/dashboard">
            <button className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-semibold shadow w-full h-12 sm:h-14 flex items-center justify-center gap-2 sm:gap-4 text-base sm:text-lg rounded-xl transform transition-transform duration-200 hover:scale-105 cursor-pointer">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
              Start Your Quest
            </button>
          </Link>
          
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto">
          <div className="p-3 sm:p-4 text-center flex flex-col items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-1 sm:mb-2" />
            <h3 className="font-semibold text-xs sm:text-sm mb-1">Goals</h3>
            <p className="text-xs text-muted-foreground">Set & track savings</p>
          </div>
          
          <div className="p-3 sm:p-4 text-center flex flex-col items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-[#f6ad1c] mx-auto mb-1 sm:mb-2" />
            <h3 className="font-semibold text-xs sm:text-sm mb-1">Badges</h3>
            <p className="text-xs text-muted-foreground">Unlock achievements</p>
          </div>
          
          <div className="p-3 sm:p-4 text-center flex flex-col items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-700 mx-auto mb-1 sm:mb-2" />
            <h3 className="font-semibold text-xs sm:text-sm mb-1">Challenges</h3>
            <p className="text-xs text-muted-foreground">Compete with friends</p>
          </div>
        </div>
      </div>
    </div>
  );
}
