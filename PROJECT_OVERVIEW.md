# ML Faculty Performance Analyzer - Project Overview

## 📁 Complete File Structure

```
frontend/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── ChartComponents/
│   │   │   ├── ChartContainer.jsx
│   │   │   ├── DepartmentBarChart.jsx
│   │   │   ├── FeedbackPieChart.jsx
│   │   │   └── PerformanceLineChart.jsx
│   │   ├── DashboardCard/
│   │   │   └── DashboardCard.jsx
│   │   ├── Forms/
│   │   │   └── FormInput.jsx
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx
│   │   ├── ProtectedRoute/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── Sidebar/
│   │   │   └── Sidebar.jsx
│   │   ├── Tables/
│   │   │   └── DataTable.jsx
│   │   └── DashboardShell.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/
│   │   └── useAuth.js
│   │
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   ├── FacultyLayout.jsx
│   │   ├── HodLayout.jsx
│   │   └── StudentLayout.jsx
│   │
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AddFaculty.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── EditFaculty.jsx
│   │   │   ├── ManageDepartments.jsx
│   │   │   └── ManageFaculty.jsx
│   │   │
│   │   ├── auth/
│   │   │   └── Login.jsx
│   │   │
│   │   ├── faculty/
│   │   │   ├── FacultyDashboard.jsx
│   │   │   ├── FacultyRanking.jsx
│   │   │   └── PerformanceAnalytics.jsx
│   │   │
│   │   ├── hod/
│   │   │   ├── AddFaculty.jsx
│   │   │   ├── DepartmentPerformance.jsx
│   │   │   ├── FacultyList.jsx
│   │   │   └── HodDashboard.jsx
│   │   │
│   │   └── student/
│   │       ├── MyFeedback.jsx
│   │       ├── StudentDashboard.jsx
│   │       └── SubmitFeedback.jsx
│   │
│   ├── services/
│   │   ├── adminService.js
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── facultyService.js
│   │   ├── feedbackService.js
│   │   └── mockDb.js
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   └── roleHelpers.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 🗺️ Application Flow

```
┌─────────────┐
│   Login     │
│  /login     │
└──────┬──────┘
       │
       ├─ student@mlfpa.com  →  /student/dashboard
       ├─ faculty@mlfpa.com  →  /faculty/dashboard
       ├─ hod@mlfpa.com      →  /hod/dashboard
       └─ admin@mlfpa.com    →  /admin/dashboard
```

### Student Flow
```
/student/dashboard (Home)
   ├─ Submit Feedback
   │    ├─ Select Faculty
   │    ├─ Rate: Teaching, Communication, Knowledge, Punctuality
   │    └─ Submit
   │
   └─ My Feedback
        └─ View all submitted feedback
```

### Faculty Flow
```
/faculty/dashboard (Home)
   ├─ Performance Score Card
   ├─ Monthly Performance Chart
   ├─ Feedback Distribution
   └─ Top 5 Faculty Ranking
   
/faculty/analytics
   ├─ Department Average Performance
   └─ Overall Feedback Distribution
   
/faculty/ranking
   └─ Full Faculty Ranking Leaderboard
```

### HOD Flow
```
/hod/dashboard (Home)
   ├─ Department Overview Cards
   ├─ Department Ranking Chart
   └─ Faculty Performance Table
   
/hod/faculty-list
   └─ All Faculty in Department
   
/hod/department-performance
   └─ Department Comparison Chart
   
/hod/add-faculty
   └─ Add Faculty to Department
```

### Admin Flow
```
/admin/dashboard (Home)
   ├─ System Analytics Cards
   ├─ Department Performance Chart
   └─ Top Performers Table
   
/admin/manage-faculty
   ├─ View All Faculty
   ├─ Edit Faculty → /admin/edit-faculty/:id
   └─ Delete Faculty
   
/admin/add-faculty
   └─ Add New Faculty
   
/admin/manage-departments
   ├─ View All Departments
   └─ Add Department
```

## 🔄 Data Flow Architecture

```
┌──────────────┐
│  Components  │
└──────┬───────┘
       │
       ├─ Read: useAuth() → AuthContext
       │
       ├─ Action: authService.login()
       │              ↓
       │         localStorage
       │              ↓
       │         mockDb.js
       │              ↓
       │         Update AuthContext
       │
       ├─ Feedback: feedbackService.submitFeedback()
       │              ↓
       │         localStorage (feedbacks)
       │              ↓
       │         Update faculty scores
       │
       └─ Faculty: facultyService.addFaculty()
                      ↓
                 localStorage (faculties)
                      ↓
                 Persist & re-render
```

## 📊 Component Hierarchy

```
App
└─ BrowserRouter
   └─ Routes
      ├─ /login → Login
      │
      ├─ /student → ProtectedRoute
      │   └─ StudentLayout (DashboardShell)
      │      ├─ Sidebar
      │      ├─ Navbar
      │      └─ Outlet
      │         ├─ StudentDashboard
      │         ├─ SubmitFeedback
      │         └─ MyFeedback
      │
      ├─ /faculty → ProtectedRoute
      │   └─ FacultyLayout (DashboardShell)
      │      └─ Outlet
      │         ├─ FacultyDashboard
      │         ├─ PerformanceAnalytics
      │         └─ FacultyRanking
      │
      ├─ /hod → ProtectedRoute
      │   └─ HodLayout (DashboardShell)
      │      └─ Outlet
      │         ├─ HodDashboard
      │         ├─ FacultyList
      │         ├─ DepartmentPerformance
      │         └─ AddFaculty
      │
      └─ /admin → ProtectedRoute
          └─ AdminLayout (DashboardShell)
             └─ Outlet
                ├─ AdminDashboard
                ├─ ManageFaculty
                ├─ AddFaculty
                ├─ EditFaculty
                └─ ManageDepartments
```

## 🎯 Feature Matrix

| Feature                     | Student | Faculty | HOD | Admin |
|-----------------------------|---------|---------|-----|-------|
| Submit Feedback             | ✅      | ❌      | ❌  | ❌    |
| View My Feedback            | ✅      | ❌      | ❌  | ❌    |
| View Performance Analytics  | ❌      | ✅      | ✅  | ✅    |
| View Faculty Ranking        | ❌      | ✅      | ✅  | ✅    |
| Add Faculty (Dept)          | ❌      | ❌      | ✅  | ❌    |
| View Department Performance | ❌      | ❌      | ✅  | ✅    |
| Add Faculty (System)        | ❌      | ❌      | ❌  | ✅    |
| Edit Faculty                | ❌      | ❌      | ❌  | ✅    |
| Delete Faculty              | ❌      | ❌      | ❌  | ✅    |
| Manage Departments          | ❌      | ❌      | ❌  | ✅    |

## 🔐 Authentication Flow

```
1. User visits /login
2. Enters email + password
3. authService.login(email, password)
4. Search DUMMY_USERS for matching credentials
5. If found:
   - Generate JWT token (base64 encoded)
   - Store in localStorage: mlfpa_token
   - Store user in localStorage: mlfpa_user
   - Update AuthContext (user, token, isAuthenticated)
   - Navigate to role-specific dashboard
6. If not found:
   - Show error message
```

## 🛡️ Route Protection

```
ProtectedRoute Component:

1. Check AuthContext.isAuthenticated
   - If false → Navigate to /login

2. Check hasRoleAccess(user.role, allowedRoles)
   - If false → Navigate to user's home dashboard

3. If both pass → Render children
```

## 🎨 UI Component Library

### Core Components
- **DashboardCard** - Metric display card
- **ChartContainer** - Chart wrapper with title
- **DataTable** - Generic table with columns/rows
- **FormInput** - Form input with label (text/select/number)

### Chart Components
- **PerformanceLineChart** - Recharts LineChart
- **FeedbackPieChart** - Recharts PieChart
- **DepartmentBarChart** - Recharts BarChart

### Layout Components
- **Navbar** - Top header with user info + logout
- **Sidebar** - Role-based navigation menu
- **DashboardShell** - Wrapper combining Navbar + Sidebar

## 📈 Performance Metrics

### Bundle Size (estimated)
- React + React DOM: ~140 KB
- React Router: ~45 KB
- Recharts: ~250 KB
- Tailwind CSS: ~10 KB (purged)
- Application Code: ~60 KB
- **Total**: ~505 KB (gzipped: ~180 KB)

### Load Time Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Largest Contentful Paint: < 2.5s

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## 📝 Environment Setup

No environment variables required. Everything runs client-side with localStorage.

## 🔧 Configuration Files

- **tailwind.config.js** - Tailwind theme customization
- **postcss.config.js** - PostCSS plugins (Tailwind + Autoprefixer)
- **vite.config.js** - Vite build configuration
- **eslint.config.js** - ESLint rules
- **package.json** - Dependencies and scripts

## 📞 Support & Documentation

- React Docs: https://react.dev
- React Router: https://reactrouter.com
- Recharts: https://recharts.org
- Tailwind CSS: https://tailwindcss.com
- Vite: https://vite.dev

---

**Last Updated**: March 7, 2026
