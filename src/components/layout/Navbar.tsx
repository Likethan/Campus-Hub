import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, Sparkles, Menu, Eye } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { NavLink, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onOpenAiAssistant: () => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiAssistant, onOpenMobileMenu }) => {
  const { isDark, toggleTheme, highContrast, toggleHighContrast } = useTheme();
  const { unreadNotificationCount, notifications } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/notes?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-glass border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Mobile Menu Toggle & Search Bar */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-ch"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md hidden sm:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search assignments, notes, placement companies, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full bg-slate-100 dark:bg-slate-800/80 border-0 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-slate-900 transition-all duration-200"
            />
          </form>
        </div>

        {/* Right Actions Header */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Quick Button */}
          <button
            onClick={onOpenAiAssistant}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-semibold text-xs transition-all shadow-sm shadow-primary-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>AI Assistant</span>
          </button>

          {/* High Contrast / Accessibility Toggle */}
          <button
            onClick={toggleHighContrast}
            title={highContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
            className={`p-2 rounded-full transition-colors ${
              highContrast
                ? 'bg-amber-500 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationsDropdown(prev => !prev)}
              aria-label="Notifications"
              className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>

            {/* Notifications Menu */}
            {showNotificationsDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-ch-lg shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Notifications</h4>
                  <NavLink
                    to="/notifications"
                    onClick={() => setShowNotificationsDropdown(false)}
                    className="text-[11px] font-semibold text-primary-600 hover:underline"
                  >
                    View All ({notifications.length})
                  </NavLink>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.slice(0, 3).map(n => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-ch text-xs ${
                        !n.isRead ? 'bg-primary-50/60 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-900/50' : 'bg-slate-50 dark:bg-slate-800/40'
                      }`}
                    >
                      <p className="font-bold text-slate-900 dark:text-slate-100 mb-0.5">{n.title}</p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">{n.message}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block font-mono">{n.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
