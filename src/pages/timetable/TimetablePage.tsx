import React, { useState } from 'react';
import { CalendarDays, Clock, MapPin, User, Download, Filter } from 'lucide-react';
import { mockTimetable } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const TimetablePage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredSlots = mockTimetable.filter(slot => slot.day === selectedDay);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <CalendarDays className="w-7 h-7 text-primary-500" /> Interactive Class Timetable
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Semester 6 • CSE-A • Academic Year 2025-2026
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-ch">
            <button
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === 'daily'
                  ? 'bg-white dark:bg-slate-900 text-primary-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Daily Schedule
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === 'weekly'
                  ? 'bg-white dark:bg-slate-900 text-primary-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Weekly Overview
            </button>
          </div>
          <Button size="sm" variant="outline" leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export iCal / PDF
          </Button>
        </div>
      </div>

      {/* Day Selector Pills (Daily View Mode) */}
      {viewMode === 'daily' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-2.5 rounded-ch text-xs font-bold transition-all shrink-0 ${
                selectedDay === day
                  ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      {/* Daily View Slots List */}
      {viewMode === 'daily' ? (
        <div className="space-y-4">
          {filteredSlots.length > 0 ? (
            filteredSlots.map((slot) => (
              <Card
                key={slot.id}
                className={`transition-all ${
                  slot.isCurrent
                    ? 'border-2 border-primary-500 bg-primary-50/30 dark:bg-primary-950/30 shadow-md'
                    : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="px-4 py-2.5 rounded-ch bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-numbers font-extrabold text-xs shrink-0 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary-500" />
                      <span>{slot.startTime} - {slot.endTime}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-primary-600 dark:text-primary-400">
                          {slot.subjectCode}
                        </span>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                          {slot.subjectName}
                        </h3>
                        {slot.isCurrent && <Badge variant="primary" size="sm">HAPPENING NOW</Badge>}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" /> {slot.professor}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" /> {slot.room}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant={slot.type === 'Lab' ? 'warning' : slot.type === 'Tutorial' ? 'accent' : 'secondary'}
                    size="md"
                  >
                    {slot.type}
                  </Badge>
                </div>
              </Card>
            ))
          ) : (
            <Card className="text-center py-12 text-slate-400 text-xs">
              No scheduled classes for this day. Enjoy your study break! 🎉
            </Card>
          )}
        </div>
      ) : (
        /* Weekly Grid Overview */
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="p-3 text-left w-28">Day</th>
                <th className="p-3 text-left">09:00 - 10:00 AM</th>
                <th className="p-3 text-left">10:15 - 11:15 AM</th>
                <th className="p-3 text-left">11:30 AM - 01:30 PM</th>
                <th className="p-3 text-left">02:30 - 04:00 PM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {days.map((day) => {
                const daySlots = mockTimetable.filter(s => s.day === day);
                return (
                  <tr key={day} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{day}</td>
                    {[0, 1, 2, 3].map((slotIdx) => {
                      const slot = daySlots[slotIdx];
                      return (
                        <td key={slotIdx} className="p-2">
                          {slot ? (
                            <div className="p-2.5 rounded-ch bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                              <span className="font-mono text-[10px] font-bold text-primary-600 block">{slot.subjectCode}</span>
                              <span className="font-bold text-xs line-clamp-1">{slot.subjectName}</span>
                              <span className="text-[10px] text-slate-400 block mt-1">{slot.room}</span>
                            </div>
                          ) : (
                            <span className="text-slate-300 dark:text-slate-700 font-mono text-[10px]">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
