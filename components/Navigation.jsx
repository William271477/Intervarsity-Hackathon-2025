"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Target, Award, Users, Scroll } from "lucide-react"; // icons

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Badges", href: "/badges", icon: Award },
  { name: "Challenges", href: "/challenges", icon: Users },
  { name: "Quests", href: "/quests", icon: Scroll },
];

const Navigation = () => {
    const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-gray-400 shadow-md">
      <ul className="flex justify-center gap-12 items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex flex-col items-center text-[10px] transition-colors px-3 py-2 rounded-lg ${
                  isActive
                    ? "text-green-600 bg-green-100"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon
                  className={`h-6 w-6 mb-1 ${
                    isActive ? "text-green-500" : ""
                  }`}
                />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  )
}

export default Navigation
