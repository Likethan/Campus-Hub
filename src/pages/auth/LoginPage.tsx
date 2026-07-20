import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useApp } from '../../context/AppContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('alex.vance@campushub.edu');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login();
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-ch-xl shadow-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-ch bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold shadow-glow">
            <span className="font-heading text-xl">CH</span>
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-slate-100">Welcome Back</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">CampusHub Student Portal</p>
          </div>
        </div>

        {/* Demo Auto-Fill Notification */}
        <div className="p-3 mb-6 rounded-ch bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800 text-xs text-primary-800 dark:text-primary-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary-500 shrink-0" />
          <span>Demo Credentials Pre-filled (Student Role)</span>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="College Email / Student ID"
            type="email"
            placeholder="student@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-primary-600 focus:ring-primary-500" />
              <span>Remember this device</span>
            </label>
            <NavLink to="/forgot-password" className="font-semibold text-primary-600 hover:underline">
              Forgot password?
            </NavLink>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full mt-2" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Sign In to CampusHub
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          Don't have a student account?{' '}
          <NavLink to="/signup" className="font-bold text-primary-600 hover:underline">
            Create Account
          </NavLink>
        </div>
      </div>
    </div>
  );
};
