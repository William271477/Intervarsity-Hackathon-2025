import Image from "next/image";
import Link from "next/link";
import { Coins, Sparkles, Trophy } from "lucide-react";
import FeatureGrid from "@/components/FeatureGrid";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex flex-col items-center justify-start px-6 text-center pt-16 sm:pt-12">
        <div className="mb-8 relative w-full max-w-xs sm:max-w-sm">
          <Image
            width={400}
            height={200}
            src={"/images/hero-chest.jpeg"}
            alt="SaveQuest Treasure"
            className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-2xl animate-bounce-slow"
          />
          <div className="absolute -top-2 -right-2 animate-pulse animate-float" style={{ animationDelay: "0.3s" }}>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent animate-float" style={{ animationDelay: "0.15s" }}>
          SaveQuest
        </h1>
        <p className="text-sm sm:text-lg md:text-xl mt-4 sm:mt-6 text-gray-500 mb-5 sm:mb-8 max-w-[300px] sm:max-w-[400px]">
          Turn saving money into an epic adventure! Level up your finances and unlock rewards.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs sm:max-w-sm">
          <Link href="/dashboard">
            <button className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-semibold shadow-xl w-full h-10 sm:h-12 flex items-center justify-center gap-3 sm:gap-4 text-sm sm:text-lg py-2 sm:py-3 rounded-xl transform transition-transform duration-200 hover:scale-105 cursor-pointer">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
              Start Your Quest
            </button>
          </Link>
          <div className="flex flex-wrap justify-center gap-3 mt-1 text-xs sm:text-sm">
            <div className="flex items-center gap-1">
              <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              <span className="text-gray-500">Save Money</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full self-center"></div>
            <div className="flex items-center gap-1">
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              <span className="text-gray-500">Earn Rewards</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full self-center"></div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="text-gray-500">Level Up</span>
            </div>
          </div>
        </div>
      </div>
      <FeatureGrid />
    </div>
  );
}