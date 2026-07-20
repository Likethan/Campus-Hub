import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  FileText,
  Briefcase,
  CalendarRange,
  Users,
  BookOpen,
  Bell,
  User,
  Settings,
  Sparkles,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';

interface SidebarProps {
  onOpenAiAssistant: () => void;
}

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Attendance', path: '/attendance', icon: CalendarCheck },
  { label: 'Timetable', path: '/timetable', icon: CalendarDays },
  { label: 'Assignments', path: '/assignments', icon: FileText },
  { label: 'Placement', path: '/placement', icon: Briefcase, badge: 'Hot' },
  { label: 'Events & Tickets', path: '/events', icon: CalendarRange },
  { label: 'Clubs & Societies', path: '/clubs', icon: Users },
  { label: 'Notes Library', path: '/notes', icon: BookOpen },
  { label: 'Notifications', path: '/notifications', icon: Bell, countKey: 'notifications' as const },
  { label: 'Student Profile', path: '/profile', icon: User },
  { label: 'Settings', path: '/settings', icon: Settings },
];

const sidebarVariants = {
  hidden: { x: -16, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

const navListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
};

const navItemVariants = {
  hidden: { x: -12, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
};

export const Sidebar: React.FC<SidebarProps> = ({ onOpenAiAssistant }) => {
  const { user, unreadNotificationCount, logout } = useApp();

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0 shrink-0 z-30"
    >
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          {/* Animated logo */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: 4 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-10 h-10 rounded-ch bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold shadow-glow-primary"
          >
            <span className="font-heading text-lg font-black">CH</span>
          </motion.div>
          <div>
            <h2 className="font-heading font-extrabold text-base text-slate-900 dark:text-slate-100 tracking-tight leading-none">
              CampusHub
            </h2>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-primary-600 dark:text-primary-400">
              Student OS v2.5
            </span>
          </div>
        </div>
      </div>

      {/* AI Assistant Quick Trigger */}
      <div className="px-4 py-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenAiAssistant}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-ch bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/5 hover:from-primary-500/20 hover:to-accent-500/20 border border-primary-200/60 dark:border-primary-800/40 text-primary-700 dark:text-primary-300 font-medium text-xs transition-all duration-200 group"
        >
          <Sparkles className="w-4 h-4 text-primary-500 group-hover:rotate-12 transition-transform duration-300" />
          <span>Ask Campus AI</span>
          <span className="ml-auto text-[10px] bg-primary-500 text-white px-1.5 py-0.5 rounded font-mono">⌘K</span>
        </motion.button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <motion.ul
          variants={navListVariants}
          initial="hidden"
          animate="visible"
          className="space-y-0.5 list-none"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const count = item.countKey === 'notifications' ? unreadNotificationCount : undefined;
            return (
              <motion.li key={item.path} variants={navItemVariants}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative flex items-center justify-between px-3 py-2.5 rounded-ch text-xs font-semibold transition-all duration-200 group ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active left bar indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active-indicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary-600 rounded-full"
                          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        />
                      )}
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isActive ? 'text-primary-600' : 'group-hover:scale-110'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="accent" size="sm">{item.badge}</Badge>
                      )}
                      {count && count > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0"
                        >
                          {count}
                        </motion.span>
                      )}
                    </>
                  )}
                </NavLink>
              </motion.li>
            );
          })}
        </motion.ul>
      </nav>

      {/* User Footer Profile */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar src={user.avatar} name={user.name} size="sm" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">{user.studentId}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={logout}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            <LogOut className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
};
