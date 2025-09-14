import React from "react";
import { Star, Award, CheckCircle, Lock } from "lucide-react";

const levelStyles = {
  Beginner: {
    badge: "bg-green-100 text-green-700",
    button: "bg-green-600 hover:bg-green-700 text-white",
  },
  Intermediate: {
    badge: "bg-orange-100 text-orange-700",
    button: "bg-orange-600 hover:bg-orange-700 text-white",
  },
  Advanced: {
    badge: "bg-red-100 text-red-700",
    button: "bg-red-600 hover:bg-red-700 text-white",
  },
};

const QuestCard = ({
  title,
  description,
  level = "Beginner",
  xp,
  badge,
  completed = false,
  locked = false,
  unlocksAtXp = 0,
}) => {
  const { badge: badgeClass, button: buttonClass } =
    levelStyles[level] || levelStyles.Beginner;

  return (
    <div
      className={`w-full rounded-2xl p-4 flex flex-col gap-3 transition ${
        locked
          ? "bg-gray-200 text-gray-400 shadow-inner cursor-not-allowed"
          : "bg-white shadow-md hover:shadow-lg"
      }`}
    >
      {/* Title + Status */}
      <div className="flex items-start justify-between">
        <div>
          <h2
            className={`text-lg font-semibold ${
              locked ? "text-gray-400" : "text-gray-800"
            }`}
          >
            {title}
          </h2>
          <p className="text-sm">{description}</p>
        </div>
        {completed && !locked && (
          <CheckCircle className="text-green-500 w-6 h-6 shrink-0" />
        )}
        {locked && <Lock className="text-gray-500 w-6 h-6 shrink-0" />}
      </div>

      {/* Quest Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span
          className={`px-2 py-1 rounded-full font-medium ${
            locked ? "bg-gray-300 text-gray-500" : badgeClass
          }`}
        >
          {level}
        </span>
        <span
          className={`flex items-center gap-1 font-medium ${
            locked ? "text-gray-500" : "text-yellow-600"
          }`}
        >
          <Star className="w-4 h-4" />
          {xp} XP
        </span>
        {badge && (
          <span
            className={`flex items-center gap-1 font-medium ${
              locked ? "text-gray-500" : "text-purple-600"
            }`}
          >
            <Award className="w-4 h-4" />
            Badge: {badge}
          </span>
        )}
      </div>

      {/* Button */}
      <button
        disabled={locked}
        className={`w-full py-2 rounded-xl font-semibold transition ${
          locked
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : buttonClass
        }`}
      >
        {locked ? `Locked (Unlocks at ${unlocksAtXp} XP)` : completed ? "Review Quest" : "Start Quest"}
      </button>
    </div>
  );
};

export default QuestCard;
