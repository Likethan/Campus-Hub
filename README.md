# 🎓 CampusHub

<div align="center">

# One Platform. Every Student Need.

A Premium Student Life Management Platform built with **React, TypeScript, Vite, Tailwind CSS, and Framer Motion**.

Modern SaaS-inspired experience for managing attendance, assignments, placements, events, clubs, notes, and student activities in one centralized platform.

</div>

---

## 🌐 Live Demo

**Live URL:**  
https://campus-hub-c6ri-gs9u2t9s7-likethankj751-5239s-projects.vercel.app

---

# ✨ Overview

CampusHub is a modern student life management platform designed to simplify and unify the digital campus experience.

Instead of using multiple disconnected systems, students can access attendance records, assignments, placements, events, clubs, notes, and academic information from a single dashboard.

The project demonstrates modern frontend engineering practices, scalable architecture, responsive design, reusable components, and premium UI/UX principles.

---

# 🚀 Feature Showcase

## 📊 Dashboard
- Academic insights
- Activity timeline
- KPI tracking
- Quick access navigation
- Personalized experience

## 📚 Attendance Management
- Subject-wise attendance tracking
- Progress visualization
- Attendance analytics
- Performance monitoring

## 📝 Assignment Portal
- Assignment management
- Submission workflow
- Deadline tracking
- Status monitoring

## 💼 Placement Management
- Placement opportunities
- Internship listings
- Eligibility tracking
- Company details

## 🎉 Events Module
- Event registration
- Schedule management
- Upcoming events
- Participation tracking

## 👥 Clubs & Communities
- Club announcements
- Student engagement
- Community updates
- Activity feeds

## 📖 Notes Library
- Organized resources
- Academic materials
- Quick access notes
- Learning support

## 🤖 Campus AI Assistant
- Smart navigation
- Platform guidance
- Faster information discovery

---

# 🏗 Enterprise Architecture

```text
                                     ┌────────────────────────────┐
                                     │          User              │
                                     └─────────────┬──────────────┘
                                                   │
                                                   ▼
                                   ┌────────────────────────────────┐
                                   │      React Application         │
                                   └────────────────┬───────────────┘
                                                    │
            ┌───────────────────────────────────────┼──────────────────────────────────────┐
            │                                       │                                      │
            ▼                                       ▼                                      ▼
 ┌────────────────────┐                  ┌────────────────────┐                  ┌────────────────────┐
 │    Routing Layer   │                  │   Context Layer    │                  │     Hooks Layer    │
 │ React Router v7    │                  │ Global State       │                  │ Custom Hooks       │
 └─────────┬──────────┘                  └─────────┬──────────┘                  └─────────┬──────────┘
           │                                       │                                     │
           └───────────────────────┬───────────────┴───────────────────────┬─────────────┘
                                   │                                       │
                                   ▼                                       ▼
                      ┌────────────────────────┐             ┌────────────────────────┐
                      │      Pages Layer       │             │   Components Layer     │
                      │ Dashboard              │             │ Navbar                 │
                      │ Attendance             │             │ Sidebar                │
                      │ Assignments            │             │ Cards                  │
                      │ Placements             │             │ Charts                 │
                      │ Events                 │             │ Forms                  │
                      │ Clubs                  │             │ Dialogs                │
                      │ Notes                  │             │ Shared Components      │
                      └────────────┬───────────┘             └────────────┬───────────┘
                                   │                                      │
                                   └──────────────────┬───────────────────┘
                                                      │
                                                      ▼
                                  ┌─────────────────────────────────────┐
                                  │ Utility & Services Layer            │
                                  │ Validation • Types • Helpers        │
                                  │ Constants • Static Data             │
                                  └────────────────┬────────────────────┘
                                                   │
                                                   ▼
                                  ┌─────────────────────────────────────┐
                                  │ Premium Responsive SaaS Interface   │
                                  └─────────────────────────────────────┘
```

### Architecture Principles

- Component-driven development
- Modular and scalable structure
- Separation of concerns
- Type-safe development
- Responsive-first design
- Reusable design system
- Future-ready architecture

---

# 🛠 Technology Stack

| Category | Technologies |
|-----------|-------------|
| Frontend | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Animations | Framer Motion |
| Forms | React Hook Form |
| Validation | Zod |
| Charts | Recharts |
| Icons | Lucide React |

---

# 📂 Project Structure

```bash
src/
├── assets/
├── components/
├── context/
├── data/
├── hooks/
├── pages/
├── types/
├── utils/
├── App.tsx
├── main.tsx
└── index.css
```

---

# 🎨 Design System

- Apple-inspired spacing
- Glassmorphism cards
- Premium typography
- Soft shadows
- Rounded components
- Responsive layouts
- Consistent design tokens
- Dark mode ready

---

# ⚡ Performance Optimizations

- Vite optimized builds
- Fast Refresh
- Tree Shaking
- Lazy Loading
- Component Reusability
- Type-safe architecture
- Optimized rendering

---

# ♿ Accessibility

- Semantic HTML
- Keyboard navigation
- Screen-reader friendly
- Responsive layouts
- Color contrast awareness

---

# 🔄 Application Workflow

```text
Login
   │
   ▼
Dashboard
   ├── Attendance
   ├── Assignments
   ├── Placements
   ├── Events
   ├── Clubs
   ├── Notes
   └── Profile
```

---

# 🚀 Installation

```bash
git clone https://github.com/Likethan/CampusHub.git
cd CampusHub
npm install
npm run dev
```

---

# 📜 Available Scripts

```bash
npm run dev
npm run build
npm run preview
```

---

# 🚧 Future Roadmap

- Backend Integration
- Authentication System
- Faculty Portal
- Parent Dashboard
- AI Enhancements
- Calendar Sync
- Push Notifications
- Progressive Web App
- Offline Support
- Real-time Updates

---

# 💡 Learning Outcomes

This project demonstrates:

- React Architecture
- TypeScript Development
- Responsive UI Design
- SaaS Product Design
- Component Reusability
- Frontend Optimization
- Modern Development Practices

---

# 📈 Project Highlights

✅ Modern SaaS UI

✅ Responsive Design

✅ Premium User Experience

✅ Type-Safe Development

✅ Modular Architecture

✅ Scalable Codebase

✅ Clean Design System

---

# 👨‍💻 Author

## Likethan K J

Artificial Intelligence & Data Science Student  
Frontend Developer • UI/UX Enthusiast • Problem Solver

### Connect With Me

GitHub: https://github.com/Likethan

LinkedIn: https://www.linkedin.com/in/likethan-k-j-b434b632b/

Portfolio: https://likethan-portfolio-eohs.vercel.app

LeetCode: https://leetcode.com/u/Likethan/

---

# ⭐ Support

If you found this project useful:

- Star the repository
- Fork the project
- Share feedback
- Contribute improvements

---

# 📄 License

This project is intended for educational, learning, and portfolio purposes.

---

<div align="center">

## CampusHub

### One Platform. Every Student Need.

Built with ❤️ using React, TypeScript, Tailwind CSS, Vite, and Framer Motion.

</div>
