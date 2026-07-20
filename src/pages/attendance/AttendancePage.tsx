import React, { useState } from 'react';
import { CalendarCheck, AlertTriangle, CheckCircle2, Info, Calculator, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';

export const AttendancePage: React.FC = () => {
  const { subjects } = useApp();
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  // Skip class buffer calculator logic
  const calculateBuffer = (attended: number, total: number, requiredPct: number = 75) => {
    // Math to find max classes that can be skipped: (attended / (total + X)) >= requiredPct / 100
    // attended >= 0.75 * (total + X) => X <= (attended / 0.75) - total
    const maxTotal = Math.floor(attended / (requiredPct / 100));
    const canSkip = maxTotal - total;
    if (canSkip > 0) return { type: 'safe', count: canSkip, text: `You can safely skip ${canSkip} more class(es) while staying above ${requiredPct}%.` };
    if (canSkip === 0) return { type: 'warning', count: 0, text: `Zero skip buffer! Missing the next class will drop you below ${requiredPct}%.` };

    // Need to attend consecutive classes: (attended + Y) / (total + Y) >= 0.75
    // attended + Y >= 0.75*total + 0.75*Y => 0.25*Y >= 0.75*total - attended => Y >= (0.75*total - attended) / 0.25
    const mustAttend = Math.ceil((0.75 * total - attended) / 0.25);
    return { type: 'critical', count: mustAttend, text: `Attendance Deficit! You MUST attend the next ${mustAttend} consecutive class(es) to reach 75%.` };
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <CalendarCheck className="w-7 h-7 text-primary-500" /> Attendance Manager & 75% Rule Engine
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track live attendance across subjects, calculate class skip safety buffers, and prevent exam condonation warnings.
          </p>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub) => {
          const buffer = calculateBuffer(sub.attended, sub.total, sub.requiredForTarget);
          return (
            <Card
              key={sub.id}
              hoverable
              onClick={() => setSelectedSubject(sub)}
              className={`cursor-pointer transition-all ${
                selectedSubject.id === sub.id ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[11px] font-bold text-primary-600 dark:text-primary-400 font-mono">
                    {sub.code}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 line-clamp-1 mt-0.5">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub.professor}</p>
                </div>
                <Badge
                  variant={sub.status === 'safe' ? 'success' : sub.status === 'warning' ? 'warning' : 'danger'}
                  size="sm"
                >
                  {sub.percentage.toFixed(1)}%
                </Badge>
              </div>

              <div className="my-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Attended / Total</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {sub.attended} / {sub.total} classes
                  </span>
                </div>
                <ProgressBar
                  value={sub.percentage}
                  color={sub.status === 'safe' ? 'success' : sub.status === 'warning' ? 'warning' : 'danger'}
                  showValue={false}
                />
              </div>

              {/* Skip Calculator Box */}
              <div
                className={`p-3 rounded-ch text-xs flex items-start gap-2 ${
                  buffer.type === 'safe'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200/60'
                    : buffer.type === 'warning'
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-200/60'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200/60'
                }`}
              >
                <Calculator className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-snug">{buffer.text}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detailed Subject History & Attendance Log */}
      <Card>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100">
              Detailed History: {selectedSubject.name} ({selectedSubject.code})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Faculty: {selectedSubject.professor} • Target Rule: {selectedSubject.requiredForTarget}%
            </p>
          </div>
          <Badge variant="primary" size="md">
            {selectedSubject.attended} / {selectedSubject.total} Present
          </Badge>
        </div>

        {/* History Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3 rounded-l-ch">Date</th>
                <th className="p-3">Slot & Room</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-ch">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {selectedSubject.history.map((h, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono font-medium">{h.date}</td>
                  <td className="p-3">Regular Lecture (LH-301)</td>
                  <td className="p-3">
                    <Badge
                      variant={h.status === 'present' ? 'success' : 'danger'}
                      size="sm"
                    >
                      {h.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-3 text-primary-600 font-semibold cursor-pointer hover:underline">
                    Request Leave / Medical Slip
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
