# CampusHub — Unified Student Life Management Platform

> A premium, modern SaaS-grade educational portal built with React 19, TypeScript, Vite, and Tailwind CSS v4.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel)](https://campushub.vercel.app)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

---

## 📸 Features

- **Dashboard** — Animated stat counters, Recharts attendance trend & GPA growth charts, subject attendance rings
- **Attendance Tracker** — Per-subject analytics, skip-buffer calculator, 75% risk alert system
- **Assignment Portal** — Drag & drop PDF upload with real-time progress, toast notifications
- **Placement Drives** — Company listings, eligibility checks, one-click apply
- **Events & Tickets** — Browse, register, QR ticket generation
- **Clubs & Societies** — Join/leave communities, club feeds
- **Notes Library** — Upload & browse study materials
- **Student Profile** — Resume upload, skills, CGPA display
- **Campus AI Assistant** — ⌘K command palette
- **Dark Mode** — Full dark/light toggle with smooth transitions
- **Responsive** — Mobile bottom nav + desktop sidebar

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| Charts | Recharts 3 |
| Routing | React Router 7 |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/campus-hub.git
cd campus-hub

# Install dependencies
npm install

# Start development server
node ./node_modules/vite/bin/vite.js

# Build for production
node ./node_modules/vite/bin/vite.js build
```

> **Note:** If your folder path contains `&` or other special characters, use the direct `node` command instead of `npm run dev`.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/        # AppShell, Sidebar, Navbar, MobileBottomNav
│   └── ui/            # Button, Card, Badge, Toast, Modal, Input...
├── context/
│   ├── AppContext.tsx  # Global state management
│   └── ThemeContext.tsx
├── data/
│   └── mockData.ts    # Demo data generators
├── pages/
│   ├── auth/          # Splash, Login, Signup, OTP, Onboarding
│   ├── dashboard/     # Main dashboard with charts
│   ├── attendance/    # Attendance tracker
│   ├── assignments/   # Assignment portal & upload
│   ├── placement/     # Placement drives
│   ├── events/        # Events & tickets
│   ├── clubs/         # Clubs & societies
│   ├── notes/         # Notes library
│   ├── notifications/ # Notification center
│   ├── profile/       # Student profile
│   └── settings/      # App settings
└── types/
    └── index.ts       # TypeScript interfaces
```

---

## 🎨 Design System

- **Colors:** Primary `#2563EB` · Accent `#14B8A6` · Slate dark scale
- **Typography:** Poppins (headings) · Inter (body) · IBM Plex Sans (numbers)
- **Radius:** 12px cards · 16px panels · 24px modals
- **Animations:** Framer Motion spring physics throughout
- **Style:** Glassmorphism · Soft shadows · Apple-inspired spacing

---

## 🌐 Deployment

Deployed on **Vercel** with automatic CI/CD from the `main` branch.

```bash
# Using Vercel CLI
npx vercel
```

---

*Built as a UI/UX portfolio project demonstrating senior-level frontend development skills.*
