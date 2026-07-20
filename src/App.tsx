import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './components/ui/Toast';
import { AppShell } from './components/layout/AppShell';

import { SplashLanding } from './pages/auth/SplashLanding';
import { OnboardingPage } from './pages/auth/OnboardingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { OtpVerificationPage } from './pages/auth/OtpVerificationPage';

import { DashboardPage } from './pages/dashboard/DashboardPage';
import { AttendancePage } from './pages/attendance/AttendancePage';
import { TimetablePage } from './pages/timetable/TimetablePage';
import { AssignmentsPage } from './pages/assignments/AssignmentsPage';
import { PlacementPage } from './pages/placement/PlacementPage';
import { EventsPage } from './pages/events/EventsPage';
import { ClubsPage } from './pages/clubs/ClubsPage';
import { NotesPage } from './pages/notes/NotesPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { SettingsPage } from './pages/settings/SettingsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Page transition wrapper — subtle slide-up + fade
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
    className="min-h-0"
  >
    {children}
  </motion.div>
);

// AnimatedRoutes wraps route content with page transitions
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Public Auth Routes */}
        <Route path="/" element={<PageTransition><SplashLanding /></PageTransition>} />
        <Route path="/onboarding" element={<PageTransition><OnboardingPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignupPage /></PageTransition>} />
        <Route path="/otp" element={<PageTransition><OtpVerificationPage /></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><LoginPage /></PageTransition>} />

        {/* Protected Student Portal Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/timetable" element={<TimetablePage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/placement" element={<PlacementPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <ToastProvider>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </ToastProvider>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
