export type Role = 'student' | 'faculty' | 'placement_officer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  studentId?: string;
  department?: string;
  semester?: number;
  section?: string;
  batch?: string;
  gpa?: number;
  phone?: string;
  bio?: string;
  skills?: string[];
  achievements?: { id: string; title: string; issuer: string; date: string; icon: string }[];
  certificates?: { id: string; name: string; issueDate: string; url: string; category: string }[];
  socials?: { github?: string; linkedin?: string; twitter?: string; portfolio?: string };
}

export interface SubjectAttendance {
  id: string;
  code: string;
  name: string;
  professor: string;
  attended: number;
  total: number;
  percentage: number;
  requiredForTarget: number; // minimum percentage needed e.g. 75%
  status: 'safe' | 'warning' | 'critical';
  history: { date: string; status: 'present' | 'absent' | 'excused' }[];
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  room: string;
  professor: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
  isCurrent?: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  dueDate: string;
  dueTime: string;
  totalMarks: number;
  status: 'pending' | 'submitted' | 'graded';
  description: string;
  fileTypesAllowed: string[];
  submittedFile?: string;
  grade?: string;
  feedback?: string;
}

export interface PlacementCompany {
  id: string;
  companyName: string;
  logo: string;
  role: string;
  ctc: string; // e.g. "18.5 LPA"
  location: string;
  eligibilityCgpa: number;
  eligibleBranches: string[];
  deadline: string;
  rounds: string[];
  status: 'eligible' | 'not_eligible' | 'applied' | 'shortlisted' | 'rejected' | 'offered';
  description: string;
  jobType: 'Full-Time' | 'Internship' | 'Internship + PPO';
}

export interface EventItem {
  id: string;
  title: string;
  organizer: string;
  category: 'Hackathon' | 'Workshop' | 'Cultural' | 'Technical' | 'Sports' | 'Seminar';
  date: string;
  time: string;
  venue: string;
  banner: string;
  description: string;
  isRegistered: boolean;
  ticketQrCode?: string;
  hasCertificate?: boolean;
  seatsRemaining: number;
}

export interface ClubItem {
  id: string;
  name: string;
  category: string;
  logo: string;
  banner: string;
  lead: string;
  memberCount: number;
  description: string;
  isMember: boolean;
  gallery: string[];
  upcomingEventsCount: number;
}

export interface NoteItem {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  uploaderName: string;
  uploadDate: string;
  fileSize: string;
  pages: number;
  pdfUrl: string;
  isBookmarked: boolean;
  downloads: number;
  tags: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'academic' | 'placement' | 'event' | 'fees' | 'system';
  isRead: boolean;
  actionUrl?: string;
}
