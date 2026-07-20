import React, { createContext, useContext, useState } from 'react';
import type { UserProfile, SubjectAttendance, Assignment, PlacementCompany, EventItem, NoteItem, NotificationItem } from '../types';
import { mockCurrentUser, mockSubjects, mockAssignments, mockPlacementCompanies, mockEvents, mockNotes, mockNotifications } from '../data/mockData';

interface AppContextType {
  user: UserProfile;
  subjects: SubjectAttendance[];
  assignments: Assignment[];
  placements: PlacementCompany[];
  events: EventItem[];
  notes: NoteItem[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  submitAssignment: (id: string, fileName: string) => void;
  applyPlacement: (companyId: string) => void;
  registerEvent: (eventId: string) => void;
  addNote: (note: NoteItem) => void;
  updateUserResume: (resumeName: string, resumeUrl: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(mockCurrentUser);
  const [subjects, setSubjects] = useState<SubjectAttendance[]>(mockSubjects);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [placements, setPlacements] = useState<PlacementCompany[]>(mockPlacementCompanies);
  const [events, setEvents] = useState<EventItem[]>(mockEvents);
  const [notes, setNotes] = useState<NoteItem[]>(mockNotes);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const submitAssignment = (id: string, fileName: string) => {
    setAssignments(prev => prev.map(a => a.id === id ? {
      ...a,
      status: 'submitted',
      submittedFile: fileName
    } : a));
  };

  const applyPlacement = (companyId: string) => {
    setPlacements(prev => prev.map(p => p.id === companyId ? {
      ...p,
      status: 'applied'
    } : p));
  };

  const registerEvent = (eventId: string) => {
    setEvents(prev => prev.map(e => e.id === eventId ? {
      ...e,
      isRegistered: true,
      ticketQrCode: `CAMPUSHUB-TKT-${Math.floor(100000 + Math.random() * 900000)}`,
      seatsRemaining: Math.max(0, e.seatsRemaining - 1)
    } : e));
  };

  const addNote = (note: NoteItem) => {
    setNotes(prev => [note, ...prev]);
  };

  const updateUserResume = (resumeName: string, resumeUrl: string) => {
    setUser(prev => ({
      ...prev,
      certificates: [...(prev.certificates || []), {
        id: `resume_${Date.now()}`,
        name: resumeName,
        issueDate: 'Just now',
        url: resumeUrl,
        category: 'Resume'
      }]
    }));
  };

  return (
    <AppContext.Provider value={{
      user,
      subjects,
      assignments,
      placements,
      events,
      notes,
      notifications,
      unreadNotificationCount,
      isAuthenticated,
      login,
      logout,
      markNotificationRead,
      markAllNotificationsRead,
      submitAssignment,
      applyPlacement,
      registerEvent,
      addNote,
      updateUserResume
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
