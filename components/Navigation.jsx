
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Target, Users, Zap, BookOpen, ListOrdered } from 'lucide-react';
import { clsx } from 'clsx';


export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/dashboard', icon: Zap, label: 'Dashboard' },
    { href: '/goals', icon: Target, label: 'Goals' },
    { href: '/leaderboard', icon: ListOrdered, label: 'Leaderboard' },
    { href: '/challenges', icon: Users, label: 'Challenges' },
    { href: '/lessons', icon: BookOpen, label: 'Lessons' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 sm:py-3">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}>
            <div className={clsx(
              'flex flex-col items-center gap-1 p-2 rounded-lg transition-colors',
              pathname === href 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-500 hover:text-gray-700'
            )}>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xs font-medium">{label}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}