import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  CalendarCheck,
  CalendarDays,
  FileText,
  Briefcase,
  Sparkles,
  AlertTriangle,
  Clock,
  MapPin,
  TrendingUp,
  ChevronRight,
  BookOpen,
  Zap,
  Star,
  Target,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';

// ── Animated Counter ────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    start.current = null;
    const step = (timestamp: number) => {
      if (!start.current) start.current = timestamp;
      const progress = Math.min((timestamp - start.current) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return count;
}

// ── Custom Tooltip for charts ────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-ch shadow-lg px-3 py-2">
      <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-xs font-bold mt-0.5" style={{ color: p.color }}>
          {p.name}: {p.value}{p.dataKey === 'attendance' ? '%' : ''}
        </p>
      ))}
    </div>
  );
};

// Attendance trend data (mock)
const attendanceTrend = [
  { month: 'Feb', attendance: 88 },
  { month: 'Mar', attendance: 82 },
  { month: 'Apr', attendance: 79 },
  { month: 'May', attendance: 85 },
  { month: 'Jun', attendance: 91 },
  { month: 'Jul', attendance: 87 },
];

// GPA trend data
const gpaTrend = [
  { sem: 'S1', gpa: 7.4 },
  { sem: 'S2', gpa: 7.9 },
  { sem: 'S3', gpa: 8.1 },
  { sem: 'S4', gpa: 8.4 },
  { sem: 'S5', gpa: 8.7 },
  { sem: 'S6', gpa: 8.92 },
];

// Subject attendance bar chart data
const subjectAttBar = [
  { subject: 'DS', attendance: 92, fill: '#2563EB' },
  { subject: 'DBMS', attendance: 88, fill: '#14B8A6' },
  { subject: 'OS', attendance: 79, fill: '#F59E0B' },
  { subject: 'ML', attendance: 64, fill: '#EF4444' },
  { subject: 'SE', attendance: 85, fill: '#8B5CF6' },
];

// ── Stat Card Component ──────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  iconBg: string;
  sub?: string;
  badge?: React.ReactNode;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  label, value, suffix = '', trend, trendUp, icon, iconBg, sub, badge, delay = 0
}) => {
  const count = useCountUp(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card hoverable padding="sm" className="flex flex-col justify-between h-full group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-tight">{label}</span>
          <div className={`p-2 rounded-lg ${iconBg} transition-transform duration-300 group-hover:scale-110`}>
            {icon}
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-numbers text-slate-900 dark:text-slate-100">
              {count}{suffix}
            </span>
            {trend && (
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                <TrendingUp className={`w-3 h-3 ${!trendUp ? 'rotate-180' : ''}`} />
                {trend}
              </span>
            )}
          </div>
          {badge && <div className="mt-1.5">{badge}</div>}
          {sub && <p className="text-[11px] text-slate-400 mt-1.5 truncate">{sub}</p>}
        </div>
      </Card>
    </motion.div>
  );
};

// ── Main Dashboard ───────────────────────────────────────────────────
export const DashboardPage: React.FC = () => {
  const { user, subjects, assignments, placements, events } = useApp();

  const overallAttendance = Math.round(
    subjects.reduce((acc, curr) => acc + curr.percentage, 0) / subjects.length
  );
  const pendingAssignmentsCount = assignments.filter(a => a.status === 'pending').length;
  const eligiblePlacementsCount = placements.filter(p => p.status === 'eligible' || p.status === 'applied').length;
  const registeredEventsCount = events.filter(e => e.isRegistered).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ── Welcome Banner ─────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="relative overflow-hidden rounded-ch-lg p-6 sm:p-8 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white shadow-soft-lg">
          {/* Animated background shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/5 blur-xl animate-pulse" />
            <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-accent-400/10 blur-2xl" />
            <div className="absolute top-4 right-1/4 w-32 h-32 rounded-full bg-primary-400/20 blur-lg" />
            {/* Dot grid pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dot-grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold mb-3 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Semester 6 — Computer Science Engineering</span>
              </div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight mb-2">
                Good Morning, {user.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-primary-100 font-light leading-relaxed">
                You have <span className="font-bold text-white">2 classes remaining today</span> and 1 assignment due in 48 hours.
                Keep up your <span className="font-bold text-yellow-300">8.92 GPA</span> momentum!
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-5">
                <NavLink to="/timetable">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-primary-700 rounded-ch text-xs font-bold hover:bg-primary-50 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    View Timetable
                  </button>
                </NavLink>
                <NavLink to="/placement">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/15 text-white rounded-ch text-xs font-bold hover:bg-white/25 transition-all duration-200 border border-white/30 hover:-translate-y-0.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    Placement Drives
                  </button>
                </NavLink>
              </div>
            </div>

            {/* GPA Ring Widget */}
            <div className="hidden sm:flex flex-col items-center justify-center gap-2 shrink-0">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="rgba(255,255,255,0.85)" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(8.92 / 10) * 251.2} 251.2`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-extrabold font-numbers text-white">8.92</span>
                  <span className="text-[9px] font-semibold text-primary-200 uppercase tracking-wider">CGPA</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-primary-100 font-semibold">
                <TrendingUp className="w-3 h-3 text-emerald-300" />
                <span>+0.12 this semester</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── KPI Stats Grid ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Overall Attendance"
          value={overallAttendance}
          suffix="%"
          trend="+1.2%"
          trendUp
          icon={<CalendarCheck className="w-4 h-4 text-primary-600" />}
          iconBg="bg-primary-50 dark:bg-primary-950"
          sub="75% threshold: Safe"
          delay={0.1}
        />
        <StatCard
          label="Pending Assignments"
          value={pendingAssignmentsCount}
          icon={<FileText className="w-4 h-4 text-amber-600" />}
          iconBg="bg-amber-50 dark:bg-amber-950"
          badge={<Badge variant="warning" size="sm">Due Soon</Badge>}
          sub="CS602 Raft Algorithm"
          delay={0.15}
        />
        <StatCard
          label="Active Placement Drives"
          value={eligiblePlacementsCount}
          icon={<Briefcase className="w-4 h-4 text-teal-600" />}
          iconBg="bg-teal-50 dark:bg-teal-950"
          badge={<Badge variant="accent" size="sm">Google & Microsoft</Badge>}
          sub="1 Application Under Review"
          delay={0.2}
        />
        <StatCard
          label="Registered Events"
          value={registeredEventsCount}
          icon={<Star className="w-4 h-4 text-purple-600" />}
          iconBg="bg-purple-50 dark:bg-purple-950"
          badge={<Badge variant="success" size="sm">Ticket Ready</Badge>}
          sub="HackNova 2026 · April 10"
          delay={0.25}
        />
      </div>

      {/* ── Charts Row ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Attendance Trend Area Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <Card className="h-full">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100">Attendance Trend</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Last 6 months overview</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 text-[11px] font-bold">
                <TrendingUp className="w-3 h-3" />
                +3.2%
              </div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={attendanceTrend} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone" dataKey="attendance" name="Attendance"
                  stroke="#2563EB" strokeWidth={2.5}
                  fill="url(#attGrad)"
                  dot={{ fill: '#2563EB', r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#2563EB', stroke: 'white', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* GPA Trend Bar Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100">GPA Growth</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Semester-wise CGPA</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-600 text-[11px] font-bold">
                <Target className="w-3 h-3" />
                9.0 goal
              </div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={gpaTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
                <XAxis dataKey="sem" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[7, 10]} tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="gpa" name="CGPA" radius={[4, 4, 0, 0]}>
                  {gpaTrend.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === gpaTrend.length - 1 ? '#2563EB' : '#CBD5E1'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* ── Subject-wise Attendance Mini Bar ─────────────────────── */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-primary-500" />
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100">Subject Attendance</h3>
            </div>
            <NavLink to="/attendance" className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-1">
              View Detail <ChevronRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {subjectAttBar.map((s, i) => (
              <motion.div
                key={s.subject}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * i + 0.3, duration: 0.4 }}
                className="flex flex-col items-center gap-2 p-3 rounded-ch border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
              >
                <div className="relative w-12 h-12">
                  <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
                    <circle cx="20" cy="20" r="15" fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="4" />
                    <circle
                      cx="20" cy="20" r="15" fill="none"
                      stroke={s.fill} strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${(s.attendance / 100) * 94.2} 94.2`}
                      className="transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-extrabold font-numbers" style={{ color: s.fill }}>
                      {s.attendance}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{s.subject}</p>
                  {s.attendance < 75 && (
                    <span className="text-[9px] font-bold text-rose-500">⚠ Risk</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* ── Bottom 3-Column Section ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary-50 dark:bg-primary-950">
                  <CalendarDays className="w-4 h-4 text-primary-500" />
                </div>
                <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100">Today's Schedule (Monday)</h3>
              </div>
              <NavLink to="/timetable" className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-1">
                Full View <ChevronRight className="w-3.5 h-3.5" />
              </NavLink>
            </div>

            <div className="space-y-3">
              {/* LIVE Class */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="relative p-4 rounded-ch border border-primary-400/60 bg-primary-50/60 dark:bg-primary-950/40 overflow-hidden group hover:border-primary-500 transition-colors"
              >
                {/* Live pulse indicator */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-red-400 animate-ping opacity-75" />
                  </div>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Live</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="px-2.5 py-1.5 rounded-lg bg-primary-500 text-white font-numbers font-bold text-xs shrink-0">
                    10:15 AM
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Distributed Systems</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-3">
                      <span>CS602 • Prof. Sarah Jenkins</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> LH-301</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Upcoming Classes */}
              {[
                { time: '11:30 AM', name: 'DBMS Lab (Group A)', code: 'CS604', prof: 'Prof. Emily Watson', room: 'Computer Lab 4', badge: <Badge variant="warning" size="sm">Lab</Badge> },
                { time: '2:00 PM', name: 'Machine Learning', code: 'CS606', prof: 'Prof. Arvind Kumar', room: 'LH-205', badge: <Badge variant="default" size="sm">Upcoming</Badge> },
              ].map((cls, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  className="p-4 rounded-ch border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-numbers font-bold text-xs shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                      {cls.time}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{cls.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-3">
                        <span>{cls.code} • {cls.prof}</span>
                        <span className="hidden sm:flex items-center gap-1"><MapPin className="w-3 h-3" /> {cls.room}</span>
                      </p>
                    </div>
                  </div>
                  {cls.badge}
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Urgent Deadlines */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950">
                  <FileText className="w-4 h-4 text-amber-500" />
                </div>
                <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100">Urgent Deadlines</h3>
              </div>
              <NavLink to="/assignments" className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </NavLink>
            </div>

            <div className="space-y-3">
              {assignments.slice(0, 2).map((asg, i) => (
                <motion.div
                  key={asg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="p-4 rounded-ch border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-800 hover:bg-amber-50/30 dark:hover:bg-amber-950/20 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                        {asg.subjectCode} • {asg.subjectName}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5 truncate">{asg.title}</h4>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-mono text-rose-500 font-semibold">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          Due: {asg.dueDate} ({asg.dueTime})
                        </span>
                        <span className="hidden sm:block">Total: {asg.totalMarks} Marks</span>
                      </div>
                    </div>
                    <NavLink to="/assignments" className="shrink-0">
                      <Button size="sm" variant="outline" className="group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all duration-200">
                        Submit PDF
                      </Button>
                    </NavLink>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Attendance Risk Alert */}
          <div className="rounded-ch-lg border border-rose-200 dark:border-rose-900/60 bg-gradient-to-br from-rose-50 to-red-50/40 dark:from-rose-950/40 dark:to-rose-900/10 p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-rose-900 dark:text-rose-200">Critical Attendance Risk</h4>
                <p className="text-xs text-rose-700 dark:text-rose-300 mt-1 leading-relaxed">
                  ML Lab (CS606) is at <span className="font-bold font-numbers">63.6%</span>. Attend next{' '}
                  <span className="font-bold">4 consecutive labs</span> to reach 75%.
                </p>
              </div>
            </div>
            <div className="space-y-1.5 pl-1">
              <div className="flex justify-between text-[11px] font-semibold text-rose-700 dark:text-rose-300">
                <span>Current</span>
                <span>Target</span>
              </div>
              <div className="h-1.5 rounded-full bg-rose-200 dark:bg-rose-900 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '63.6%' }}
                  transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-rose-500"
                />
              </div>
              <div className="flex justify-between text-[10px] font-numbers text-rose-600 dark:text-rose-400">
                <span>63.6%</span>
                <span>75%</span>
              </div>
            </div>
            <NavLink
              to="/attendance"
              className="flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-300 hover:underline"
            >
              Calculate Skip Buffer <ChevronRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

          {/* Featured Placement */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                Featured Drive
              </h3>
              <Badge variant="accent" size="sm">Eligible</Badge>
            </div>
            {placements[0] && (
              <div className="space-y-3">
                <div className="p-4 rounded-ch bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={placements[0].logo}
                      alt={placements[0].companyName}
                      className="w-10 h-10 object-contain p-1.5 rounded-ch bg-white shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{placements[0].companyName}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{placements[0].role}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 dark:border-slate-700">
                    <span className="text-sm font-extrabold font-numbers text-emerald-600 dark:text-emerald-400">
                      {placements[0].ctc}
                    </span>
                    <NavLink to="/placement">
                      <Button size="sm" variant="primary">
                        Apply Now →
                      </Button>
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Quick Links */}
          <Card padding="sm">
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 mb-3">Quick Access</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { to: '/notes', icon: BookOpen, label: 'Study Notes', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950' },
                { to: '/events', icon: Sparkles, label: 'Events', color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-950' },
                { to: '/clubs', icon: Star, label: 'Clubs', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950' },
                { to: '/profile', icon: Target, label: 'Profile', color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-950' },
              ].map(({ to, icon: Icon, label, color, bg }) => (
                <NavLink key={to} to={to}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-ch ${bg} ${color} cursor-pointer transition-all duration-200 hover:shadow-sm`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{label}</span>
                  </motion.div>
                </NavLink>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
