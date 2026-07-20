import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Home, Briefcase, Check, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedPersona, setSelectedPersona] = useState<string>('engineering');
  const navigate = useNavigate();

  const personas = [
    {
      id: 'engineering',
      title: 'Engineering Student',
      tagline: 'Focus on Labs, GPA, Projects & Hackathons',
      icon: GraduationCap,
      description: 'Ideal for CS, ECE, & ME students needing tight timetable scheduling, assignment uploads, and code repository sync.',
      features: ['Automated Lab Attendance Alerts', 'Assignment Deadline Tracker', 'Peer Notes & PDF Library']
    },
    {
      id: 'hosteller',
      title: 'Hosteller & Campus Resident',
      tagline: 'Mess Menu, Outpass, Club Events & Sports',
      icon: Home,
      description: 'Built for students living in campus dorms who want instant mess menu notifications, club gallery updates, and QR tickets.',
      features: ['Campus Event QR Tickets', 'Club Memberships & Gallery', 'Late Night Notice Board']
    },
    {
      id: 'placement',
      title: 'Placement Aspirant',
      tagline: 'Resume Builder, Mock Tests, Company CTC Tracker',
      icon: Briefcase,
      description: 'Targeted for 3rd and 4th year students preparing for campus placements, interviews, and company eligibility matching.',
      features: ['Instant CGPA Eligibility Matcher', 'Interview Schedule Alerts', 'Resume & Certificate Locker']
    }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-ch-xl shadow-2xl p-6 sm:p-10">
        {/* Progress Dots */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step ? 'w-8 bg-primary-500' : 'w-2 bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-400 font-mono">Step {step} of 3</span>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-600 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Select Persona
              </div>
              <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-slate-100">
                Tailor Your CampusHub Experience
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Choose the student profile that best matches your primary goals this semester.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {personas.map((p) => {
                const Icon = p.icon;
                const isSelected = selectedPersona === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPersona(p.id)}
                    className={`p-4 rounded-ch border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50/40 dark:bg-primary-950/40 ring-2 ring-primary-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-ch shrink-0 ${isSelected ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{p.title}</h3>
                          {isSelected && <Check className="w-4 h-4 text-primary-500" />}
                        </div>
                        <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mt-0.5">{p.tagline}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">{p.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">Features Customized</span>
              <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-slate-100 mt-1">
                Here is what we prepared for you
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Your dashboard layout and priority widgets have been configured for maximum productivity.
              </p>
            </div>

            <div className="p-6 rounded-ch bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Activated Modules:</h4>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">✓</div>
                  <span>Attendance Threshold Optimizer (75% Rule Engine)</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">✓</div>
                  <span>Live Timetable & Room Navigation Assistant</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">✓</div>
                  <span>Placement Drive Matcher & Automated CTC Alerts</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center animate-in fade-in py-6">
            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-600 flex items-center justify-center mx-auto shadow-glow">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-slate-100">
              You're Ready to Launch!
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Sign in with your student credentials to access your personalized CampusHub dashboard.
            </p>
          </div>
        )}

        {/* Footer Controls */}
        <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-100 dark:border-slate-800">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
          ) : <div />}

          <Button onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
            {step === 3 ? 'Continue to Login' : 'Next Step'}
          </Button>
        </div>
      </div>
    </div>
  );
};
