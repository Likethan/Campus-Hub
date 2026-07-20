import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileBottomNav } from './MobileBottomNav';
import { AiAssistantModal } from './AiAssistantModal';
import { Modal } from '../ui/Modal';
import { NavLink } from 'react-router-dom';
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
  Settings
} from 'lucide-react';

export const AppShell: React.FC = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileNavLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Attendance', path: '/attendance', icon: CalendarCheck },
    { label: 'Timetable', path: '/timetable', icon: CalendarDays },
    { label: 'Assignments', path: '/assignments', icon: FileText },
    { label: 'Placement Drives', path: '/placement', icon: Briefcase },
    { label: 'Events & Tickets', path: '/events', icon: CalendarRange },
    { label: 'Clubs & Societies', path: '/clubs', icon: Users },
    { label: 'Notes Library', path: '/notes', icon: BookOpen },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Student Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-primary-500 selection:text-white">
      {/* Desktop Sidebar */}
      <Sidebar onOpenAiAssistant={() => setIsAiOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        <Navbar
          onOpenAiAssistant={() => setIsAiOpen(true)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-300">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Bar */}
      <MobileBottomNav />

      {/* AI Assistant Modal */}
      <AiAssistantModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

      {/* Mobile Slide-out Menu Drawer */}
      <Modal isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} maxWidth="sm">
        <div className="p-2 space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
            <h3 className="font-heading font-bold text-base">CampusHub Navigation</h3>
          </div>
          <div className="space-y-1 max-h-[70vh] overflow-y-auto">
            {mobileNavLinks.map(link => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-ch text-xs font-semibold ${
                      isActive ? 'bg-primary-500 text-white font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};
