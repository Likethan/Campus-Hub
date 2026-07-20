import React from 'react';
import { Settings, Moon, Sun, Eye, Bell, Lock, Globe, LogOut, Shield } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const SettingsPage: React.FC = () => {
  const { isDark, toggleTheme, highContrast, toggleHighContrast } = useTheme();
  const { logout } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Settings className="w-7 h-7 text-slate-600 dark:text-slate-400" /> Platform Settings & Accessibility
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize UI aesthetics, dark theme, high contrast ratio, and notification channels.
        </p>
      </div>

      {/* Appearance & Accessibility */}
      <Card space-y-4>
        <h3 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b pb-3 border-slate-100 dark:border-slate-800">
          <Sun className="w-5 h-5 text-amber-500" /> Visual & Accessibility Preferences
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">Dark Mode</h4>
              <p className="text-[11px] text-slate-500">Sleek dark theme optimized for late-night study sessions.</p>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-12 h-6 rounded-full transition-colors p-1 ${isDark ? 'bg-primary-600' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isDark ? 'translate-x-6' : ''}`} />
            </button>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">WCAG AA High Contrast Mode</h4>
              <p className="text-[11px] text-slate-500">Enhanced border visibility and high contrast text ratios.</p>
            </div>
            <button
              onClick={toggleHighContrast}
              className={`w-12 h-6 rounded-full transition-colors p-1 ${highContrast ? 'bg-amber-500' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${highContrast ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card space-y-4>
        <h3 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b pb-3 border-slate-100 dark:border-slate-800">
          <Bell className="w-5 h-5 text-rose-500" /> Push Notifications & Email Digest
        </h3>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between cursor-pointer">
            <span>Instant Attendance Warning Alerts (&lt;75% threshold)</span>
            <input type="checkbox" defaultChecked className="rounded text-primary-600" />
          </label>
          <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>New Placement Drive Openings (Google, Microsoft)</span>
            <input type="checkbox" defaultChecked className="rounded text-primary-600" />
          </label>
          <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Assignment Deadline Reminders (24 Hours before)</span>
            <input type="checkbox" defaultChecked className="rounded text-primary-600" />
          </label>
        </div>
      </Card>

      {/* Account Danger Zone */}
      <Card className="border-rose-200 dark:border-rose-900/50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-xs text-rose-900 dark:text-rose-200">Sign Out of Session</h4>
            <p className="text-[11px] text-rose-700 dark:text-rose-300">Clears auth tokens and returns to splash page.</p>
          </div>
          <Button variant="danger" size="sm" onClick={logout} leftIcon={<LogOut className="w-4 h-4" />}>
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
};
