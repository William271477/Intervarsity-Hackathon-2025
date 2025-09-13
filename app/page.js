import Image from "next/image";
import Link from "next/link";
import { Coins, Sparkles, Trophy, Target, Users } from "lucide-react";

export default function Home() {
  return (
     <div className="min-h-screen  flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 relative">
          <Image width={100} height={100}
            src={"/images/hero-chest.jpeg"} 
            alt="SaveQuest Treasure" 
            className="w-48 h-28 object-cover rounded-2xl"
          />
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
        </div>

        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          SaveQuest
        </h1>
        
        <p className="text-xl mt-4 text-gray-500 mb-8 max-w-[400px]">
          Turn saving money into an epic adventure! Level up your finances and unlock rewards.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Link href="/dashboard">
            <button className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-semibold shadow w-full h-10 flex items-center justify-center gap-4 text-lg py-6 rounded-xl transform transition-transform duration-200 hover:scale-105 cursor-pointer">
              <Trophy className="w-5 h-5" />
              Start Your Quest
            </button>
          </Link>
          
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-xm text-gray-500">Save Money</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-purple-600" />
              <span className="text-xm text-gray-500">Earn Rewards</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-xm text-gray-500">Level Up</span>
            </div>
          </div>
        </div>
      </div>

      
      <div className="px-6 pb-8 ">
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
          <div className=" p-4 text-center flex flex-col items-center justify-center  bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1">Goals</h3>
            <p className="text-xs text-muted-foreground">Set & track savings</p>
          </div>
          
          <div className=" p-4 text-center flex flex-col items-center justify-center  bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <Trophy className="w-8 h-8 text-[#f6ad1c] mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1">Badges</h3>
            <p className="text-xs text-muted-foreground">Unlock achievements</p>
          </div>
          
          <div className=" p-4 text-center flex flex-col items-center justify-center  bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <Users className="w-8 h-8 text-purple-700 mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1">Challenges</h3>
            <p className="text-xs text-muted-foreground">Compete with friends</p>
          </div>
        </div>
      </div>
    </div>
  );
}
