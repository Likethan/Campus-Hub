import type { UserProfile, SubjectAttendance, TimetableSlot, Assignment, PlacementCompany, EventItem, ClubItem, NoteItem, NotificationItem } from '../types';

export const mockCurrentUser: UserProfile = {
  id: 'usr_101',
  name: 'Alex Vance',
  email: 'alex.vance@campushub.edu',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  studentId: '2023CSE0184',
  department: 'Computer Science & Engineering',
  semester: 6,
  section: 'CSE-A',
  batch: '2021-2025',
  gpa: 8.92,
  phone: '+1 (555) 019-2834',
  bio: '6th Semester CSE Undergrad | Full-Stack & UI/UX Enthusiast | Competitive Programmer & Hackathon Winner',
  skills: ['React', 'TypeScript', 'Node.js', 'Figma', 'Python', 'Tailwind CSS', 'PostgreSQL', 'System Design'],
  achievements: [
    { id: 'ach_1', title: '1st Place - National Hackathon 2025', issuer: 'TechNation', date: 'Feb 2025', icon: 'Trophy' },
    { id: 'ach_2', title: 'Dean\'s Honor Roll', issuer: 'School of Engineering', date: 'Jan 2025', icon: 'Award' },
    { id: 'ach_3', title: 'Best Open Source Contributor', issuer: 'DevClub', date: 'Nov 2024', icon: 'Star' },
  ],
  certificates: [
    { id: 'cert_1', name: 'AWS Certified Cloud Practitioner', issueDate: 'Jan 2025', url: '#', category: 'Cloud' },
    { id: 'cert_2', name: 'Meta Front-End Developer Specialization', issueDate: 'Oct 2024', url: '#', category: 'Web' },
    { id: 'cert_3', name: 'UI/UX Masterclass Certificate', issueDate: 'Aug 2024', url: '#', category: 'Design' },
  ],
  socials: {
    github: 'https://github.com/alexvance',
    linkedin: 'https://linkedin.com/in/alexvance',
    twitter: 'https://twitter.com/alexvance_dev',
    portfolio: 'https://alexvance.dev'
  }
};

export const mockSubjects: SubjectAttendance[] = [
  {
    id: 'sub_1',
    code: 'CS601',
    name: 'Advanced Data Structures & Algorithms',
    professor: 'Dr. Robert Chen',
    attended: 38,
    total: 42,
    percentage: 90.4,
    requiredForTarget: 75,
    status: 'safe',
    history: [
      { date: '2026-03-24', status: 'present' },
      { date: '2026-03-22', status: 'present' },
      { date: '2026-03-19', status: 'absent' },
      { date: '2026-03-17', status: 'present' },
    ]
  },
  {
    id: 'sub_2',
    code: 'CS602',
    name: 'Distributed Systems & Cloud Computing',
    professor: 'Prof. Sarah Jenkins',
    attended: 28,
    total: 35,
    percentage: 80.0,
    requiredForTarget: 75,
    status: 'safe',
    history: [
      { date: '2026-03-25', status: 'present' },
      { date: '2026-03-23', status: 'present' },
      { date: '2026-03-20', status: 'present' },
    ]
  },
  {
    id: 'sub_3',
    code: 'CS603',
    name: 'Artificial Intelligence & Machine Learning',
    professor: 'Dr. Michael Ross',
    attended: 24,
    total: 34,
    percentage: 70.5,
    requiredForTarget: 75,
    status: 'warning',
    history: [
      { date: '2026-03-24', status: 'absent' },
      { date: '2026-03-21', status: 'present' },
      { date: '2026-03-18', status: 'absent' },
    ]
  },
  {
    id: 'sub_4',
    code: 'CS604',
    name: 'Database Management Systems Lab',
    professor: 'Prof. Emily Watson',
    attended: 14,
    total: 22,
    percentage: 63.6,
    requiredForTarget: 75,
    status: 'critical',
    history: [
      { date: '2026-03-25', status: 'absent' },
      { date: '2026-03-18', status: 'absent' },
    ]
  },
  {
    id: 'sub_5',
    code: 'HS601',
    name: 'Engineering Economics & Management',
    professor: 'Dr. Alan Harper',
    attended: 29,
    total: 31,
    percentage: 93.5,
    requiredForTarget: 75,
    status: 'safe',
    history: [
      { date: '2026-03-24', status: 'present' },
    ]
  }
];

export const mockTimetable: TimetableSlot[] = [
  { id: 't_1', day: 'Monday', startTime: '09:00 AM', endTime: '10:00 AM', subjectCode: 'CS601', subjectName: 'Data Structures & Algorithms', room: 'LH-301', professor: 'Dr. Robert Chen', type: 'Lecture', isCurrent: false },
  { id: 't_2', day: 'Monday', startTime: '10:15 AM', endTime: '11:15 AM', subjectCode: 'CS602', subjectName: 'Distributed Systems', room: 'LH-301', professor: 'Prof. Sarah Jenkins', type: 'Lecture', isCurrent: true },
  { id: 't_3', day: 'Monday', startTime: '11:30 AM', endTime: '01:30 PM', subjectCode: 'CS604', subjectName: 'DBMS Lab (Group A)', room: 'Computer Lab 4', professor: 'Prof. Emily Watson', type: 'Lab' },
  { id: 't_4', day: 'Monday', startTime: '02:30 PM', endTime: '03:30 PM', subjectCode: 'HS601', subjectName: 'Engineering Economics', room: 'LH-102', professor: 'Dr. Alan Harper', type: 'Lecture' },
  
  { id: 't_5', day: 'Tuesday', startTime: '09:00 AM', endTime: '10:00 AM', subjectCode: 'CS603', subjectName: 'Artificial Intelligence', room: 'LH-302', professor: 'Dr. Michael Ross', type: 'Lecture' },
  { id: 't_6', day: 'Tuesday', startTime: '10:15 AM', endTime: '12:15 PM', subjectCode: 'CS601', subjectName: 'DSA Problem Solving Lab', room: 'Lab 2', professor: 'Dr. Robert Chen', type: 'Lab' },
  { id: 't_7', day: 'Tuesday', startTime: '01:30 PM', endTime: '02:30 PM', subjectCode: 'CS602', subjectName: 'Distributed Systems', room: 'LH-301', professor: 'Prof. Sarah Jenkins', type: 'Lecture' },

  { id: 't_8', day: 'Wednesday', startTime: '09:00 AM', endTime: '10:00 AM', subjectCode: 'CS601', subjectName: 'Data Structures & Algorithms', room: 'LH-301', professor: 'Dr. Robert Chen', type: 'Lecture' },
  { id: 't_9', day: 'Wednesday', startTime: '10:15 AM', endTime: '11:15 AM', subjectCode: 'CS603', subjectName: 'Artificial Intelligence', room: 'LH-302', professor: 'Dr. Michael Ross', type: 'Lecture' },
  { id: 't_10', day: 'Wednesday', startTime: '11:30 AM', endTime: '12:30 PM', subjectCode: 'HS601', subjectName: 'Engineering Economics', room: 'LH-102', professor: 'Dr. Alan Harper', type: 'Tutorial' },

  { id: 't_11', day: 'Thursday', startTime: '09:00 AM', endTime: '11:00 AM', subjectCode: 'CS603', subjectName: 'AI & ML Lab', room: 'AI Innovation Lab', professor: 'Dr. Michael Ross', type: 'Lab' },
  { id: 't_12', day: 'Thursday', startTime: '11:15 AM', endTime: '12:15 PM', subjectCode: 'CS602', subjectName: 'Distributed Systems', room: 'LH-301', professor: 'Prof. Sarah Jenkins', type: 'Lecture' },

  { id: 't_13', day: 'Friday', startTime: '09:00 AM', endTime: '10:00 AM', subjectCode: 'HS601', subjectName: 'Engineering Economics', room: 'LH-102', professor: 'Dr. Alan Harper', type: 'Lecture' },
  { id: 't_14', day: 'Friday', startTime: '10:15 AM', endTime: '11:15 AM', subjectCode: 'CS601', subjectName: 'Data Structures & Algorithms', room: 'LH-301', professor: 'Dr. Robert Chen', type: 'Lecture' },
  { id: 't_15', day: 'Friday', startTime: '02:00 PM', endTime: '04:00 PM', subjectCode: 'SEM6', subjectName: 'Placement Aptitude & Mock Interviews', room: 'Auditorium B', professor: 'Placement Cell', type: 'Tutorial' },
];

export const mockAssignments: Assignment[] = [
  {
    id: 'asg_1',
    title: 'Distributed Consensus & Raft Algorithm Implementation',
    subjectCode: 'CS602',
    subjectName: 'Distributed Systems & Cloud Computing',
    dueDate: '2026-03-28',
    dueTime: '11:59 PM',
    totalMarks: 50,
    status: 'pending',
    description: 'Implement a basic leader election and log replication module using Raft consensus in Node.js or Go. Submit source code as a ZIP archive along with a documentation report.',
    fileTypesAllowed: ['.zip', '.pdf']
  },
  {
    id: 'asg_2',
    title: 'Convolutional Neural Network for Image Classification',
    subjectCode: 'CS603',
    subjectName: 'Artificial Intelligence & Machine Learning',
    dueDate: '2026-03-31',
    dueTime: '05:00 PM',
    totalMarks: 100,
    status: 'pending',
    description: 'Train a PyTorch/TensorFlow CNN model on the CIFAR-10 dataset achieving >85% test accuracy. Include hyperparameter tuning plots and confusion matrix.',
    fileTypesAllowed: ['.ipynb', '.pdf']
  },
  {
    id: 'asg_3',
    title: 'B+ Tree Indexing & Query Execution Plan Optimization',
    subjectCode: 'CS604',
    subjectName: 'Database Management Systems Lab',
    dueDate: '2026-03-20',
    dueTime: '11:59 PM',
    totalMarks: 30,
    status: 'submitted',
    description: 'Design and benchmark B+ tree index creation on a 1 million row database. Compare execution time with non-indexed scans.',
    fileTypesAllowed: ['.pdf'],
    submittedFile: 'CS604_Assignment3_AlexVance.pdf'
  },
  {
    id: 'asg_4',
    title: 'Economic Feasibility Study of Cloud Migration',
    subjectCode: 'HS601',
    subjectName: 'Engineering Economics & Management',
    dueDate: '2026-03-10',
    dueTime: '05:00 PM',
    totalMarks: 20,
    status: 'graded',
    description: 'Case study report evaluating CapEx vs OpEx for migrating on-premise infrastructure to AWS.',
    fileTypesAllowed: ['.pdf'],
    submittedFile: 'Cloud_Migration_Feasibility_Report.pdf',
    grade: '19/20 (A+)',
    feedback: 'Excellent ROI calculation and clear risk breakdown. Well structured!'
  }
];

export const mockPlacementCompanies: PlacementCompany[] = [
  {
    id: 'cmp_1',
    companyName: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
    role: 'Software Development Engineer (SDE-1)',
    ctc: '$140,000 / 28.5 LPA',
    location: 'Bangalore / Mountain View',
    eligibilityCgpa: 8.5,
    eligibleBranches: ['CSE', 'ECE', 'IT'],
    deadline: '2026-03-30',
    rounds: ['Online Coding Assessment', 'Tech Round 1 (Algorithms)', 'Tech Round 2 (System Design)', 'Googley & HR'],
    status: 'applied',
    description: 'Build high-performance distributed systems, AI applications, and cloud infrastructures supporting millions of users worldwide.',
    jobType: 'Full-Time'
  },
  {
    id: 'cmp_2',
    companyName: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    role: 'Product Development Engineer',
    ctc: '$130,000 / 26.0 LPA',
    location: 'Hyderabad / Redmond',
    eligibilityCgpa: 8.0,
    eligibleBranches: ['CSE', 'ECE', 'EEE', 'IT'],
    deadline: '2026-04-05',
    rounds: ['Aptitude & Coding', 'Technical Interview 1', 'Technical Interview 2', 'AA Round'],
    status: 'shortlisted',
    description: 'Join Azure Cloud or Office 365 core engineering teams to shape the future of enterprise software.',
    jobType: 'Full-Time'
  },
  {
    id: 'cmp_3',
    companyName: 'Adobe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg',
    role: 'UI/UX Engineer & Frontend Specialist',
    ctc: '22.0 LPA',
    location: 'Noida / San Jose',
    eligibilityCgpa: 7.5,
    eligibleBranches: ['CSE', 'IT', 'Design'],
    deadline: '2026-04-12',
    rounds: ['Design Challenge', 'Portfolio Review', 'Technical Deep Dive', 'Culture Fit'],
    status: 'eligible',
    description: 'Create pixel-perfect, accessible, and fast web experiences for Creative Cloud applications.',
    jobType: 'Internship + PPO'
  },
  {
    id: 'cmp_4',
    companyName: 'Atlassian',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Atlassian_logo_2017.svg',
    role: 'Site Reliability Engineer (SRE)',
    ctc: '32.0 LPA',
    location: 'Remote / Bangalore',
    eligibilityCgpa: 8.2,
    eligibleBranches: ['CSE', 'IT'],
    deadline: '2026-04-02',
    rounds: ['Coding Test', 'Systems & Networking', 'Troubleshooting Simulation', 'Values Match'],
    status: 'eligible',
    description: 'Maintain 99.99% uptime for Jira, Confluence, and Trello across global infrastructure.',
    jobType: 'Full-Time'
  }
];

export const mockEvents: EventItem[] = [
  {
    id: 'evt_1',
    title: 'HackNova 2026: 36-Hour AI & Web3 Hackathon',
    organizer: 'CodeCraft Club & Google Developer Student Club',
    category: 'Hackathon',
    date: 'April 10-12, 2026',
    time: '09:00 AM Onwards',
    venue: 'Main Auditorium & Innovation Lab',
    banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    description: 'Build innovative products solving real-world problems. Over $10,000 in cash prizes, sponsor swag, direct mentorship from industry engineers, and fast-track interviews.',
    isRegistered: true,
    ticketQrCode: 'CAMPUSHUB-TKT-902184',
    seatsRemaining: 42
  },
  {
    id: 'evt_2',
    title: 'Mastering Modern UI/UX Design & Design Systems',
    organizer: 'DesignStudio & Figma Community',
    category: 'Workshop',
    date: 'April 02, 2026',
    time: '02:00 PM - 05:00 PM',
    venue: 'Seminar Hall 3',
    banner: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
    description: 'Learn component architecture, auto layout v5, design tokens, responsive breakpoints, and WCAG AA accessibility directly from senior product designers.',
    isRegistered: false,
    seatsRemaining: 18
  },
  {
    id: 'evt_3',
    title: 'Annual Cultural Fest - Rhythm & Lights 2026',
    organizer: 'Student Council',
    category: 'Cultural',
    date: 'April 20-22, 2026',
    time: '05:00 PM Onwards',
    venue: 'Open Air Theatre (OAT)',
    banner: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    description: 'Music nights, dance competitions, fashion shows, food stalls, and live performance by top indie artists.',
    isRegistered: true,
    ticketQrCode: 'CAMPUSHUB-TKT-554190',
    hasCertificate: true,
    seatsRemaining: 120
  }
];

export const mockClubs: ClubItem[] = [
  {
    id: 'clb_1',
    name: 'CodeCraft Developers Club',
    category: 'Technical & Coding',
    logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    lead: 'Alex Vance (President)',
    memberCount: 340,
    description: 'The premier software engineering and competitive programming club on campus. We host weekly workshops, hackathons, open source sprints, and interview prep bootcamps.',
    isMember: true,
    gallery: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
    ],
    upcomingEventsCount: 3
  },
  {
    id: 'clb_2',
    name: 'DesignStudio UI/UX Club',
    category: 'Design & Creative',
    logo: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1542744094-3a31216994c9?auto=format&fit=crop&q=80&w=800',
    lead: 'Maya Lin (Design Lead)',
    memberCount: 210,
    description: 'Exploring human-centered design, UI prototyping, wireframing, motion graphics, and graphic design for brand identity.',
    isMember: true,
    gallery: [
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600',
    ],
    upcomingEventsCount: 2
  },
  {
    id: 'clb_3',
    name: 'Robotics & Embedded Systems Guild',
    category: 'Hardware & IoT',
    logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    lead: 'David Zhang',
    memberCount: 180,
    description: 'Building autonomous robots, drone systems, IoT hardware nodes, and competing in international RoboCon events.',
    isMember: false,
    gallery: [],
    upcomingEventsCount: 1
  }
];

export const mockNotes: NoteItem[] = [
  {
    id: 'note_1',
    title: 'Advanced DSA Master Cheatsheet & Graph Algorithms',
    subjectCode: 'CS601',
    subjectName: 'Advanced Data Structures & Algorithms',
    uploaderName: 'Prof. Robert Chen',
    uploadDate: '2026-03-15',
    fileSize: '4.2 MB',
    pages: 28,
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isBookmarked: true,
    downloads: 1420,
    tags: ['Graph', 'Dynamic Programming', 'Cheatsheet', 'Exams']
  },
  {
    id: 'note_2',
    title: 'Distributed Systems Lecture Notes - Raft & Paxos Consensus',
    subjectCode: 'CS602',
    subjectName: 'Distributed Systems & Cloud Computing',
    uploaderName: 'Alex Vance',
    uploadDate: '2026-03-18',
    fileSize: '2.8 MB',
    pages: 18,
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isBookmarked: true,
    downloads: 890,
    tags: ['Raft', 'Consensus', 'Cloud', 'Midterm']
  },
  {
    id: 'note_3',
    title: 'Neural Networks Architecture & Backpropagation Derivatives',
    subjectCode: 'CS603',
    subjectName: 'Artificial Intelligence & Machine Learning',
    uploaderName: 'Dr. Michael Ross',
    uploadDate: '2026-03-10',
    fileSize: '5.1 MB',
    pages: 34,
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isBookmarked: false,
    downloads: 2150,
    tags: ['Deep Learning', 'PyTorch', 'Mathematics']
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Attendance Warning in DBMS Lab',
    message: 'Your current attendance in DBMS Lab (CS604) is 63.6%, which is below the mandatory 75% threshold. Please meet Prof. Emily Watson.',
    timestamp: '10 mins ago',
    category: 'academic',
    isRead: false,
    actionUrl: '/attendance'
  },
  {
    id: 'notif_2',
    title: 'New Placement Drive: Google SDE-1',
    message: 'Google has opened applications for 2025 Batch CSE/IT students. Application deadline: March 30, 2026.',
    timestamp: '2 hours ago',
    category: 'placement',
    isRead: false,
    actionUrl: '/placement'
  },
  {
    id: 'notif_3',
    title: 'Assignment Submitted Successfully',
    message: 'Your submission for CS604 Assignment 3 was successfully received.',
    timestamp: 'Yesterday',
    category: 'academic',
    isRead: true
  },
  {
    id: 'notif_4',
    title: 'HackNova 2026 Schedule Updated',
    message: 'Venue for Day 1 opening ceremony has been moved to Main Auditorium.',
    timestamp: '2 days ago',
    category: 'event',
    isRead: true,
    actionUrl: '/events'
  }
];
