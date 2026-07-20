import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, CalendarCheck, Briefcase, FileText, Users, ArrowRight, ShieldCheck, Zap, Award, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const SplashLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-primary-500 selection:text-white overflow-hidden">
      {/* Header Bar */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-ch bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold shadow-glow">
            <span className="font-heading text-xl">CH</span>
          </div>
          <span className="font-heading font-extrabold text-xl tracking-tight">CampusHub</span>
        </div>
        <div className="flex items-center gap-4">
          <NavLink to="/login">
            <Button variant="ghost" className="text-white hover:bg-slate-900">
              Sign In
            </Button>
          </NavLink>
          <NavLink to="/onboarding">
            <Button variant="primary">
              Get Started <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </NavLink>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-6 text-center max-w-5xl mx-auto">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[140px]" />
          <div className="w-[400px] h-[400px] bg-accent-500/20 rounded-full blur-[100px]" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-950/80 border border-primary-800 text-primary-300 text-xs font-semibold mb-8 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-accent-400 animate-pulse" />
          <span>The Next-Gen Student Life Operating System</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          One Campus Platform. <br />
          <span className="bg-gradient-to-r from-primary-400 via-accent-300 to-primary-200 bg-clip-text text-transparent">
            Zero Scattered Apps.
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          CampusHub unifies attendance tracking, daily timetables, assignment deadlines, placement drives, campus events, and notes library into a single, lightning-fast dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <NavLink to="/login">
            <Button size="lg" variant="primary" className="w-full sm:w-auto text-base">
              Launch Student App Demo <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </NavLink>
          <NavLink to="/onboarding">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base border-slate-700 text-slate-200 hover:bg-slate-900">
              Explore User Personas
            </Button>
          </NavLink>
        </div>

        {/* Feature Grid Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-5 rounded-ch bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <CalendarCheck className="w-6 h-6 text-primary-400 mb-3" />
            <h3 className="font-bold text-sm mb-1">Live Attendance</h3>
            <p className="text-xs text-slate-400">Automatic 75% threshold warnings and class skip calculations.</p>
          </div>
          <div className="p-5 rounded-ch bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <Briefcase className="w-6 h-6 text-accent-400 mb-3" />
            <h3 className="font-bold text-sm mb-1">Placement Drives</h3>
            <p className="text-xs text-slate-400">1-click eligibility checks & CTC breakdown for top tech drives.</p>
          </div>
          <div className="p-5 rounded-ch bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <FileText className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="font-bold text-sm mb-1">Assignments</h3>
            <p className="text-xs text-slate-400">Track deadlines, instant PDF upload, and grade feedback.</p>
          </div>
          <div className="p-5 rounded-ch bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <Users className="w-6 h-6 text-amber-400 mb-3" />
            <h3 className="font-bold text-sm mb-1">Clubs & Events</h3>
            <p className="text-xs text-slate-400">Digital QR event tickets, hackathon check-ins & certificates.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 px-6 text-center text-xs text-slate-500">
        <p>© 2026 CampusHub Platform. Designed for modern university students.</p>
      </footer>
    </div>
  );
};
