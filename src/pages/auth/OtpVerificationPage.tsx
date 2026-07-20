import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const OtpVerificationPage: React.FC = () => {
  const [otp, setOtp] = useState(['4', '8', '2', '9']);
  const navigate = useNavigate();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-ch-xl shadow-2xl p-6 sm:p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-600 flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-slate-100 mb-1">
          Verify Email OTP
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          We sent a 4-digit code to your college email <span className="font-semibold text-slate-700 dark:text-slate-300">alex.vance@campushub.edu</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex items-center justify-center gap-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  const val = e.target.value;
                  const newOtp = [...otp];
                  newOtp[idx] = val;
                  setOtp(newOtp);
                }}
                className="w-12 h-12 text-center text-lg font-bold font-numbers rounded-ch bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-slate-100"
              />
            ))}
          </div>

          <Button type="submit" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Verify & Proceed
          </Button>
        </form>
      </div>
    </div>
  );
};
