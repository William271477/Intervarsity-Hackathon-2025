import React from 'react'
import Link from "next/link";
import { Target, Trophy, Users } from "lucide-react";

const cardData = [
  {
    name: "Goals",
    description: "Set & track savings",
    icon: Target,
    href: "/goals",
    iconColor: "text-green-600",
  },
  {
    name: "Badges",
    description: "Unlock achievements",
    icon: Trophy,
    href: "/badges",
    iconColor: "text-[#f6ad1c]",
  },
  {
    name: "Challenges",
    description: "Compete with friends",
    icon: Users,
    href: "/challenges",
    iconColor: "text-purple-700",
  },
];


const Card = ({ name, description, Icon, href, iconColor }) => {
  return (
     <Link href={href}>
      <div className="p-4 text-center flex flex-col items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
        <Icon className={`w-6 h-6 mb-2 ${iconColor}`} />
        <h3 className="font-semibold text-sm mb-1">{name}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </Link>
  );
}


const FeatureGrid = () => {
  return (
    <div className="px-6 pb-8 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        {cardData.map((card) => (
          <Card
            key={card.name}
            name={card.name}
            description={card.description}
            Icon={card.icon}
            href={card.href}
            iconColor={card.iconColor}
          />
        ))}
      </div>
    </div>
  );
}

export default FeatureGrid
