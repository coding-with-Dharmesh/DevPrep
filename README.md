# DevPrep - Software Developer Job Preparation Portal

**DevPrep** is a complete, modern, responsive Software Developer Job Preparation web application built with **React, Vite, JavaScript, Tailwind CSS, React Router, Lucide React, and Recharts**.

It is architected for aspiring and senior software engineers preparing for technical interviews, DSA rounds, system design, core computer science concepts, and behavioral evaluations at Tier-1 and FAANG tech companies.

---

## 🌟 Key Features

### 1. Authentication & Demo Mode
- **Zero-Storage Password Security**: Sensitive credentials are never stored in `localStorage`.
- **Demo Mode**: 1-click preset login for **Senior Staff Engineer** or **Associate Software Engineer** with pre-populated study stats.
- **Login & Signup**: Form validation with customizable target role and experience.

### 2. Interactive Dashboard
- **Daily Preparation Goals**: Interactive target tracking for DSA problems, study hours, and mock interviews.
- **KPI Metrics**: Total solved, study streak counter, active pipeline, and average mock interview scores.
- **Recharts Analytics**: 14-day study activity & time spent trend chart, difficulty distribution donut chart.
- **Recent Activity Feed**: Real-time study logs.

### 3. DSA Practice Library & Code Sandbox
- **Comprehensive Coverage**: Arrays, Strings, Linked Lists, Stacks, Queues, Trees, Graphs, Recursion & Backtracking, Sorting & Searching, Greedy Algorithms, and Dynamic Programming.
- **Filtering & Search**: Difficulty filter (Easy, Medium, Hard), topic pills, company tags (Google, Amazon, Microsoft, Adobe, Meta, Apple, Netflix, Uber), and search bar.
- **Problem Details**: Full descriptions, input/output examples, constraints, and progressive hints.
- **Interactive Code Sandbox**: Multi-language starter code (JavaScript, Python, Java), **Run Code** testcase simulator with simulated runtime (ms) and memory stats, and **Submit Solution** with confetti celebration.
- **Official Solutions**: Optimal approach, time & space Big-O complexity analysis, and clean reference code.

### 4. Technical Interview Library
- **Core Topics**: Java, JavaScript, Object-Oriented Programming (OOP & SOLID), DBMS & SQL (ACID, B-Tree indexes), Operating Systems (Deadlocks, Virtual Memory), Computer Networks (TCP/IP handshake, HTTP/2), System Design (Distributed Rate Limiter), and Behavioral (STAR method).
- **Mastery & Bookmarking**: Mark questions as mastered or bookmarked with persistent counts.

### 5. Structured Learning Roadmaps
- **5 Career Tracks**: Beginner Foundations, Frontend Engineer, Backend Engineer, Full-Stack Engineer, and Data Structures & Algorithms.
- **Interactive Milestones**: Checklists with real-time percentage progress persisted in `localStorage`.

### 6. Company-Specific Preparation
- **Top Tech Employers**: Google, Amazon, Microsoft, Adobe, Meta, and more.
- **Hiring Blueprint**: Round-by-round interview breakdown (OA, Phone Screen, Coding Rounds 1-3, System Design, Bar Raiser/Cultural).
- **Cultural Principles**: Amazon 16 Leadership Principles, Googliness, Microsoft Growth Mindset.
- **Curated Questions**: Company-specific questions linked directly to the DevPrep DSA sandbox.
- **Pre-Interview Checklist**: Practical step-by-step checklist before interview day.

### 7. Kanban Job Tracker
- **Dual Views**: Kanban Board with drag-and-drop or status selector dropdown + Table/List view.
- **Pipeline Stages**: Wishlist, Applied, Screening, Technical Interview, Final Interview, Offer, Rejected.
- **Application Details**: Company, role, location, salary range, job URL, application date, follow-up deadline alerts, and interview notes.

### 8. Mock Interview Simulator
- **Live Simulator**: Timer countdown (30/45 min) with pause, resume, and reset.
- **Notepad & Scratchpad**: Draft code, estimations, and architectural notes.
- **Rubrics & Signals**: Concrete interviewer evaluation signals.
- **Self-Assessment Modal**: 1 to 5 star rating across Problem Solving, Communication, Code Quality, and Time Management with feedback notes.
- **Historical Log**: Saved past mock interview sessions with scores.

### 9. Visual Analytics
- **Study Velocity Chart**: 14-day study hours and problems completed.
- **Topic Mastery**: Proficiency percentages across algorithmic concepts.
- **Difficulty Spread**: Easy / Medium / Hard distribution.
- **Mock Performance Trends**: Track score improvements over time.

### 10. Settings & Preferences
- **Profile Customization**: Edit name, email, target role, experience, bio, and avatar.
- **Study Goal Targets**: Set custom daily problem and hour targets.
- **Theme**: Persistent Dark Mode and Light Mode with Tailwind CSS.
- **Data Export & Reset**: 1-click JSON backup export and data reset.

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Launch
```bash
# Navigate to the project directory
cd C:\Users\Win-11\scratch\devprep

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at:
`http://localhost:5173/`

### Building for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Architecture

```
src/
├── assets/
├── components/
│   ├── common/
│   │   ├── Badge.jsx            # Difficulty & topic badges
│   │   ├── Button.jsx           # Reusable styled buttons & loading spinners
│   │   ├── Card.jsx             # Sleek dark/light cards
│   │   ├── Modal.jsx            # Accessible modals with escape & click-outside
│   │   ├── ProgressBar.jsx      # Animated gradient progress indicators
│   │   ├── SearchBar.jsx        # Search inputs with clear button
│   │   └── StatCard.jsx         # KPI summary cards with trends
│   └── layout/
│       ├── AppLayout.jsx        # Shell coordinating Sidebar + Navbar + Content
│       ├── Navbar.jsx           # Streak counter, notifications, profile menu
│       ├── Sidebar.jsx          # Collapsible responsive navigation drawer
│       └── Footer.jsx           # Clean footer with privacy notes
├── context/
│   ├── AuthContext.jsx          # Authentication, demo candidate profiles
│   ├── DataContext.jsx          # Centralized data management & actions
│   ├── ThemeContext.jsx         # Dark/light theme mode with HTML class
│   └── ToastContext.jsx         # Toast alert notification system
├── data/
│   ├── initialStats.js          # Default profile, metrics & analytics
│   ├── mockCompanies.js         # Company guides, rounds & principles
│   ├── mockDsaProblems.js       # 40+ DSA challenges & starter code
│   ├── mockInterviewQuestions.js# Core CS conceptual questions
│   ├── mockJobs.js              # Job applications for tracker
│   ├── mockMockInterviews.js    # Mock interview questions & session history
│   └── mockRoadmaps.js          # 5 learning roadmap tracks
├── pages/
│   ├── AnalyticsPage.jsx        # Recharts visualizations
│   ├── CompanyDetailPage.jsx   # Specific company hiring blueprint
│   ├── CompanyPrepPage.jsx      # Top tech companies list
│   ├── DashboardPage.jsx        # Goals, stats, charts & quick links
│   ├── DsaDetailPage.jsx        # Problem sandbox & code runner
│   ├── DsaListPage.jsx          # Filterable DSA catalog
│   ├── InterviewLibraryPage.jsx # Core CS questions with markdown
│   ├── JobTrackerPage.jsx       # Kanban & table job tracker
│   ├── LandingPage.jsx          # SaaS landing page with demo triggers
│   ├── LoginPage.jsx            # Secure login with demo modes
│   ├── MockInterviewPage.jsx    # Live interview timer & assessment
│   ├── NotFoundPage.jsx         # 404 handler
│   ├── RoadmapDetailPage.jsx   # Interactive milestone checklists
│   ├── RoadmapsPage.jsx         # Career roadmaps overview
│   ├── SettingsPage.jsx         # Profile, daily goals, theme & backup
│   └── SignupPage.jsx           # Account creation
├── services/
│   └── storageService.js        # localStorage abstraction layer
├── App.jsx                      # React Router configuration
├── index.css                    # Tailwind CSS directives & scrollbar styles
└── main.jsx                     # Entry point
```

---

## 🔌 Future Backend & MongoDB Integration

The code is organized with a clean service abstraction (`storageService.js`) and unified context providers (`DataContext.jsx`, `AuthContext.jsx`).

To connect a Node.js/Express backend:
1. Replace `storageService.js` calls with REST or GraphQL endpoints (e.g. `/api/problems`, `/api/jobs`, `/api/mock`).
2. Add JSON Web Token (JWT) handling in `AuthContext.jsx`.
3. Store users, solved problem IDs, bookmarks, roadmaps, and applications in MongoDB collections.
