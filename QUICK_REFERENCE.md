# 🚀 Quick Reference Guide

## 🔗 Application URL
http://localhost:5174/

---

## 🔑 Demo Accounts

```
Student:  student@mlfpa.com  / 123456
Faculty:  faculty@mlfpa.com  / 123456
HOD:      hod@mlfpa.com      / 123456
Admin:    admin@mlfpa.com    / 123456
```

---

## 📍 Route Map

### Public Routes
- `/login` - Login page

### Student Routes
- `/student/dashboard` - Main dashboard
- `/student/submit-feedback` - Submit feedback form
- `/student/my-feedback` - View feedback history

### Faculty Routes
- `/faculty/dashboard` - Performance dashboard
- `/faculty/analytics` - Analytics page
- `/faculty/ranking` - Faculty ranking

### HOD Routes
- `/hod/dashboard` - Department overview
- `/hod/faculty-list` - Faculty list
- `/hod/department-performance` - Department charts
- `/hod/add-faculty` - Add faculty form

### Admin Routes
- `/admin/dashboard` - System analytics
- `/admin/manage-faculty` - Faculty management
- `/admin/add-faculty` - Add faculty
- `/admin/edit-faculty/:id` - Edit faculty
- `/admin/manage-departments` - Department management

---

## 🛠️ NPM Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Code quality check
npm run preview  # Preview production build
```

---

## 📊 Features by Role

### Student ✏️
- Submit feedback
- View feedback history
- Dashboard metrics

### Faculty 📈
- Performance analytics
- Monthly trends
- Faculty ranking
- Feedback distribution

### HOD 👔
- Department overview
- Faculty comparison
- Add faculty
- Performance charts

### Admin 🔧
- System analytics
- CRUD faculty
- Manage departments
- Top performers

---

## 🎨 UI Components

```jsx
// Dashboard Card
<DashboardCard title="Score" value="92%" hint="Latest" />

// Data Table
<DataTable columns={cols} rows={data} />

// Form Input
<FormInput label="Name" id="name" value={val} onChange={fn} />

// Charts
<PerformanceLineChart data={monthlyData} />
<FeedbackPieChart data={distribution} />
<DepartmentBarChart data={deptPerf} />
```

---

## 📁 Key Directories

```
src/components/     Reusable UI components
src/pages/          Page components (4 roles)
src/services/       API service modules
src/context/        Auth context
src/hooks/          Custom hooks
src/utils/          Helper functions
src/layouts/        Layout wrappers
```

---

## 🔐 Auth Flow

1. Login → authService.login()
2. Store token + user → localStorage
3. Update AuthContext
4. Navigate to role dashboard
5. Protected routes validate access

---

## 💾 Data Storage

**localStorage Keys:**
- `mlfpa_token` - JWT token
- `mlfpa_user` - User object
- `mlfpa_faculties` - Faculty list
- `mlfpa_departments` - Departments
- `mlfpa_feedbacks` - Feedback entries

---

## 🎯 Testing Checklist

- [ ] Login with all 4 roles
- [ ] Navigate through all pages
- [ ] Submit feedback (Student)
- [ ] View charts (Faculty/HOD/Admin)
- [ ] Add faculty (HOD/Admin)
- [ ] Edit faculty (Admin)
- [ ] Delete faculty (Admin)
- [ ] Add department (Admin)
- [ ] Logout and re-login

---

## 🐛 Troubleshooting

**Port already in use?**
→ Vite auto-selects next available port

**Charts not rendering?**
→ Check console for errors
→ Verify Recharts is installed

**Routes not working?**
→ Check ProtectedRoute logic
→ Verify role in localStorage

**Tailwind styles missing?**
→ Run `npm run dev` again
→ Check tailwind.config.js

---

## 📞 Quick Links

- Dev Server: http://localhost:5174/
- README: [README.md](README.md)
- Overview: [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)
- Deployment: [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)

---

**Last Updated**: March 7, 2026
