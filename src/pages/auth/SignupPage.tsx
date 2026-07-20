import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Mail, Lock, User, Hash, ArrowRight } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/otp');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-ch-xl shadow-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-ch bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold shadow-glow">
            <span className="font-heading text-xl">CH</span>
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-slate-100">Create Account</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Join 12,000+ Students on CampusHub</p>
          </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Alex Vance"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="College Email"
              type="email"
              placeholder="alex@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />
            <Input
              label="Student Roll / Registration No."
              placeholder="2023CSE0184"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              leftIcon={<Hash className="w-4 h-4" />}
              required
            />
          </div>

          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Department & Branch</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-ch bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100"
            >
              <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
              <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
              <option value="Information Technology">Information Technology (IT)</option>
              <option value="Mechanical Engineering">Mechanical Engineering (ME)</option>
              <option value="Civil Engineering">Civil Engineering (CE)</option>
            </select>
          </div>

          <Input
            label="Create Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <Button type="submit" className="w-full mt-2" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Proceed to Verification
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
          Already registered?{' '}
          <NavLink to="/login" className="font-bold text-primary-600 hover:underline">
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
};
