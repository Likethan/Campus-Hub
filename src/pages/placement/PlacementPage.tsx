import React, { useState } from 'react';
import { Briefcase, Building2, MapPin, Award, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const PlacementPage: React.FC = () => {
  const { placements, applyPlacement, user } = useApp();
  const [filter, setFilter] = useState<'all' | 'eligible' | 'applied'>('all');

  const filteredPlacements = placements.filter(p => {
    if (filter === 'eligible') return p.status === 'eligible' || p.status === 'shortlisted';
    if (filter === 'applied') return p.status === 'applied' || p.status === 'shortlisted';
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Briefcase className="w-7 h-7 text-accent-500" /> Placement & Internship Cell
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Verified campus drives for 2025/2026 Batch • Your CGPA: <span className="font-bold text-slate-900 dark:text-slate-100 font-numbers">{user.gpa}</span>
          </p>
        </div>

        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-ch">
          {(['all', 'eligible', 'applied'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold capitalize rounded-lg transition-colors ${
                filter === f
                  ? 'bg-white dark:bg-slate-900 text-primary-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {f} ({placements.filter(p => f === 'all' ? true : f === 'eligible' ? p.status === 'eligible' || p.status === 'shortlisted' : p.status === 'applied').length})
            </button>
          ))}
        </div>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPlacements.map((company) => {
          const isEligible = (user.gpa || 0) >= company.eligibilityCgpa;

          return (
            <Card key={company.id} className="flex flex-col justify-between space-y-4">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={company.logo}
                      alt={company.companyName}
                      className="w-12 h-12 object-contain p-2 rounded-ch bg-white border border-slate-200 shadow-sm shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                        {company.companyName}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{company.role}</p>
                    </div>
                  </div>
                  <Badge variant={company.status === 'shortlisted' ? 'success' : company.status === 'applied' ? 'accent' : isEligible ? 'primary' : 'danger'} size="sm">
                    {company.status === 'shortlisted' ? 'SHORTLISTED FOR INTERVIEW' : company.status === 'applied' ? 'APPLICATION SUBMITTED' : isEligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
                  </Badge>
                </div>

                {/* Key Metrics Pill */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-ch bg-slate-50 dark:bg-slate-800/60 text-xs my-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">CTC Package</span>
                    <span className="font-extrabold font-numbers text-emerald-600 dark:text-emerald-400 text-sm">
                      {company.ctc}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Location</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{company.location}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Min CGPA</span>
                    <span className="font-bold font-numbers text-slate-800 dark:text-slate-200">{company.eligibilityCgpa}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {company.description}
                </p>

                {/* Interview Rounds timeline */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-500 block mb-2">Recruitment Rounds:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {company.rounds.map((round, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                        {idx + 1}. {round}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-mono text-rose-500 flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5" /> Deadline: {company.deadline}
                </span>

                {company.status === 'applied' ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Applied
                  </span>
                ) : company.status === 'shortlisted' ? (
                  <Button size="sm" variant="accent">
                    Interview Portal →
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    disabled={!isEligible}
                    onClick={() => applyPlacement(company.id)}
                  >
                    1-Click Apply Now
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
