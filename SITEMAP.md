# 🗺️ Application Sitemap

```
┌─────────────────────────────────────────────────────────────────┐
│                      ML Faculty Performance Analyzer            │
│                      http://localhost:5174/                     │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  │
                          ┌───────▼────────┐
                          │  Login Page    │
                          │   /login       │
                          └───────┬────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         │                        │                        │
         │                        │                        │
    ┌────▼────┐             ┌────▼────┐             ┌────▼────┐
    │ Student │             │ Faculty │             │   HOD   │
    └────┬────┘             └────┬────┘             └────┬────┘
         │                        │                        │
         │                        │                        │
┌────────▼─────────┐    ┌─────────▼─────────┐    ┌────────▼─────────┐
│ STUDENT PORTAL   │    │  FACULTY PORTAL   │    │    HOD PORTAL    │
│                  │    │                   │    │                  │
│ /student/*       │    │  /faculty/*       │    │  /hod/*          │
├──────────────────┤    ├───────────────────┤    ├──────────────────┤
│                  │    │                   │    │                  │
│ ├─ Dashboard     │    │ ├─ Dashboard      │    │ ├─ Dashboard     │
│ │  (Home)        │    │ │  (Home)         │    │ │  (Home)        │
│ │  📊 Metrics    │    │ │  📈 Analytics   │    │ │  📊 Dept Stats │
│ │  📝 Forms      │    │ │  📊 Charts      │    │ │  📈 Charts     │
│ │                │    │ │  🏆 Rankings    │    │ │  👥 Faculty    │
│ │                │    │ │                 │    │ │                │
│ ├─ Submit        │    │ ├─ Performance    │    │ ├─ Faculty List  │
│ │  Feedback      │    │ │  Analytics      │    │ │  👥 All Profs  │
│ │  ⭐ Rate       │    │ │  📊 Trends      │    │ │  📋 Table      │
│ │  Faculty       │    │ │  📉 Charts      │    │ │                │
│ │                │    │ │                 │    │ │                │
│ └─ My Feedback   │    │ └─ Faculty        │    │ ├─ Department    │
│    📋 History    │    │    Ranking        │    │ │  Performance   │
│    ✅ Status     │    │    🏆 Leaderboard │    │ │  📊 Compare    │
│                  │    │    📊 All Ranks   │    │ │                │
│                  │    │                   │    │ └─ Add Faculty   │
│                  │    │                   │    │    ➕ Form       │
│                  │    │                   │    │                  │
└──────────────────┘    └───────────────────┘    └──────────────────┘


                          ┌────────────┐
                          │   Admin    │
                          └──────┬─────┘
                                 │
                     ┌───────────▼────────────┐
                     │    ADMIN PORTAL        │
                     │                        │
                     │    /admin/*            │
                     ├────────────────────────┤
                     │                        │
                     │ ├─ Dashboard           │
                     │ │  (Home)              │
                     │ │  📊 System Stats     │
                     │ │  🏆 Top Performers   │
                     │ │  📈 Charts           │
                     │ │                      │
                     │ ├─ Manage Faculty      │
                     │ │  👥 CRUD Operations  │
                     │ │  📋 Table            │
                     │ │  ✏️ Edit / 🗑️ Delete│
                     │ │                      │
                     │ ├─ Add Faculty         │
                     │ │  ➕ Create New       │
                     │ │  📝 Form             │
                     │ │                      │
                     │ ├─ Edit Faculty        │
                     │ │  ✏️ Update Existing  │
                     │ │  📝 Form             │
                     │ │                      │
                     │ └─ Manage Departments  │
                     │    🏢 Dept List        │
                     │    ➕ Add Dept         │
                     │    📋 Table            │
                     │                        │
                     └────────────────────────┘
```

---

## 📊 Feature Distribution

```
┌─────────────────────────────────────────────────────────────┐
│                    FEATURE MATRIX                           │
├─────────────────┬───────┬─────────┬──────┬────────┬────────┤
│ Feature         │ Guest │ Student │ Fac. │  HOD   │ Admin  │
├─────────────────┼───────┼─────────┼──────┼────────┼────────┤
│ Login           │   ✅  │    ✅   │  ✅  │   ✅   │   ✅   │
│ View Dashboard  │   ❌  │    ✅   │  ✅  │   ✅   │   ✅   │
│ Submit Feedback │   ❌  │    ✅   │  ❌  │   ❌   │   ❌   │
│ View Feedback   │   ❌  │    ✅   │  ❌  │   ❌   │   ❌   │
│ View Analytics  │   ❌  │    ❌   │  ✅  │   ✅   │   ✅   │
│ View Rankings   │   ❌  │    ❌   │  ✅  │   ✅   │   ✅   │
│ Add Faculty     │   ❌  │    ❌   │  ❌  │   ✅   │   ✅   │
│ Edit Faculty    │   ❌  │    ❌   │  ❌  │   ❌   │   ✅   │
│ Delete Faculty  │   ❌  │    ❌   │  ❌  │   ❌   │   ✅   │
│ Manage Dept     │   ❌  │    ❌   │  ❌  │   ❌   │   ✅   │
└─────────────────┴───────┴─────────┴──────┴────────┴────────┘
```

---

## 🔄 User Journey Flows

### Student Journey
```
Login → Student Dashboard
  │
  ├─→ Submit Feedback
  │     ├─ Select Faculty (dropdown)
  │     ├─ Rate Teaching Quality (1-5)
  │     ├─ Rate Communication (1-5)
  │     ├─ Rate Subject Knowledge (1-5)
  │     ├─ Rate Punctuality (1-5)
  │     ├─ Rate Overall (1-5)
  │     └─ Submit ✅
  │
  └─→ My Feedback
        └─ View all submitted feedback (table)
```

### Faculty Journey
```
Login → Faculty Dashboard
  │     ├─ View Performance Score
  │     ├─ Monthly Trend Chart
  │     ├─ Feedback Distribution
  │     └─ Top 5 Rankings
  │
  ├─→ Performance Analytics
  │     ├─ Department Average Chart
  │     └─ Overall Distribution
  │
  └─→ Faculty Ranking
        └─ Full Leaderboard (table)
```

### HOD Journey
```
Login → HOD Dashboard
  │     ├─ Department Stats
  │     ├─ Ranking Comparison
  │     └─ Faculty Table
  │
  ├─→ Faculty List
  │     └─ All faculty in department
  │
  ├─→ Department Performance
  │     └─ Department comparison chart
  │
  └─→ Add Faculty
        ├─ Enter name
        ├─ Select/Enter department
        └─ Submit ✅
```

### Admin Journey
```
Login → Admin Dashboard
  │     ├─ System Analytics
  │     ├─ Department Chart
  │     └─ Top Performers
  │
  ├─→ Manage Faculty
  │     ├─ View all faculty (table)
  │     ├─ Edit → /admin/edit-faculty/:id
  │     └─ Delete (confirm)
  │
  ├─→ Add Faculty
  │     ├─ Enter name
  │     ├─ Select department
  │     └─ Submit ✅
  │
  └─→ Manage Departments
        ├─ View all departments (table)
        ├─ Add new department
        │   ├─ Enter name
        │   ├─ Set strength
        │   ├─ Set avg performance
        │   └─ Submit ✅
        └─ Department list
```

---

## 🎨 Layout Structure

```
┌──────────────────────────────────────────────────────────────┐
│  NAVBAR (Top Bar)                                            │
│  ┌──────────────────┐               ┌───────────────────┐   │
│  │ ML Faculty Perf. │               │ User Name         │   │
│  │ Student Panel    │               │ Department        │   │
│  └──────────────────┘               │ [Logout]          │   │
│                                      └───────────────────┘   │
├──────────────┬───────────────────────────────────────────────┤
│              │                                               │
│  SIDEBAR     │           MAIN CONTENT AREA                  │
│  (Left)      │                                               │
│              │   ┌───────────────────────────────────────┐   │
│  ┌────────┐  │   │                                       │   │
│  │  Role  │  │   │  Dashboard Cards                      │   │
│  │ Panel  │  │   │  ┌──────┐ ┌──────┐ ┌──────┐          │   │
│  └────────┘  │   │  │ Card │ │ Card │ │ Card │          │   │
│              │   │  └──────┘ └──────┘ └──────┘          │   │
│  Navigation  │   │                                       │   │
│  ┌────────┐  │   │  Charts Section                       │   │
│  │► Dash  │  │   │  ┌──────────────┐ ┌──────────────┐   │   │
│  │  board │  │   │  │              │ │              │   │   │
│  ├────────┤  │   │  │  Line Chart  │ │  Pie Chart   │   │   │
│  │  Menu  │  │   │  │              │ │              │   │   │
│  │  Item  │  │   │  └──────────────┘ └──────────────┘   │   │
│  ├────────┤  │   │                                       │   │
│  │  Menu  │  │   │  Data Table                           │   │
│  │  Item  │  │   │  ┌────────────────────────────────┐   │   │
│  └────────┘  │   │  │ Name │ Dept │ Score │ Action │   │   │
│              │   │  ├──────┼──────┼───────┼────────┤   │   │
│              │   │  │ ...  │ ...  │  ...  │ Edit   │   │   │
│              │   │  └────────────────────────────────┘   │   │
│              │   └───────────────────────────────────────┘   │
│              │                                               │
└──────────────┴───────────────────────────────────────────────┘
```

---

## 📍 Component Hierarchy

```
App (Router)
└── Routes
    ├── /login → Login
    │
    ├── /student → ProtectedRoute
    │   └── StudentLayout (DashboardShell)
    │       ├── Sidebar (role="student")
    │       ├── Navbar
    │       └── Outlet
    │           ├── StudentDashboard
    │           │   ├── DashboardCard (×3)
    │           │   └── SubmitFeedback
    │           ├── SubmitFeedback
    │           │   └── FormInput (×6)
    │           └── MyFeedback
    │               └── DataTable
    │
    ├── /faculty → ProtectedRoute
    │   └── FacultyLayout (DashboardShell)
    │       └── Outlet
    │           ├── FacultyDashboard
    │           │   ├── DashboardCard (×3)
    │           │   ├── ChartContainer
    │           │   │   ├── PerformanceLineChart
    │           │   │   └── FeedbackPieChart
    │           │   └── DataTable
    │           ├── PerformanceAnalytics
    │           │   └── ChartContainer (×2)
    │           └── FacultyRanking
    │               └── DataTable
    │
    ├── /hod → ProtectedRoute
    │   └── HodLayout (DashboardShell)
    │       └── Outlet
    │           ├── HodDashboard
    │           │   ├── DashboardCard (×3)
    │           │   ├── ChartContainer
    │           │   │   └── DepartmentBarChart
    │           │   └── DataTable
    │           ├── FacultyList
    │           │   └── DataTable
    │           ├── DepartmentPerformance
    │           │   └── ChartContainer
    │           │       └── DepartmentBarChart
    │           └── AddFaculty
    │               └── FormInput (×2)
    │
    └── /admin → ProtectedRoute
        └── AdminLayout (DashboardShell)
            └── Outlet
                ├── AdminDashboard
                │   ├── DashboardCard (×4)
                │   ├── ChartContainer
                │   │   └── DepartmentBarChart
                │   └── DataTable
                ├── ManageFaculty
                │   └── DataTable (with actions)
                ├── AddFaculty
                │   └── FormInput (×2)
                ├── EditFaculty
                │   └── FormInput (×3)
                └── ManageDepartments
                    ├── FormInput (×3)
                    └── DataTable
```

---

## 🎯 Quick Navigation Shortcuts

```
Home Pages (After Login):
─────────────────────────
Student:  /student/dashboard
Faculty:  /faculty/dashboard
HOD:      /hod/dashboard
Admin:    /admin/dashboard

Most Used Features:
──────────────────
Submit Feedback:        /student/submit-feedback
View Rankings:          /faculty/ranking
Add Faculty (HOD):      /hod/add-faculty
Manage Faculty (Admin): /admin/manage-faculty
```

---

**Last Updated**: March 7, 2026
