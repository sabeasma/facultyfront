# ML Faculty Performance Analyzer - Frontend

A professional production-level React.js application for analyzing faculty performance using machine learning insights.

## 🚀 Tech Stack

- **React.js 19** - Functional components with hooks
- **React Router DOM 7** - Client-side routing
- **Axios** - HTTP API client
- **Tailwind CSS 3** - Utility-first styling
- **Recharts 3** - Responsive charting library
- **Context API** - Global state management
- **Vite 7** - Fast build tool

## 📦 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar/              # Top navigation bar
│   │   ├── Sidebar/             # Role-based sidebar navigation
│   │   ├── ProtectedRoute/      # Route access control
│   │   ├── DashboardCard/       # Reusable metric card
│   │   ├── ChartComponents/     # Chart visualization components
│   │   ├── Tables/              # DataTable component
│   │   ├── Forms/               # FormInput component
│   │   └── DashboardShell.jsx   # Shared layout wrapper
│   │
│   ├── layouts/
│   │   ├── StudentLayout.jsx    # Student role layout
│   │   ├── FacultyLayout.jsx    # Faculty role layout
│   │   ├── HodLayout.jsx        # HOD role layout
│   │   └── AdminLayout.jsx      # Admin role layout
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   └── Login.jsx        # Login page
│   │   │
│   │   ├── student/
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── SubmitFeedback.jsx
│   │   │   └── MyFeedback.jsx
│   │   │
│   │   ├── faculty/
│   │   │   ├── FacultyDashboard.jsx
│   │   │   ├── PerformanceAnalytics.jsx
│   │   │   └── FacultyRanking.jsx
│   │   │
│   │   ├── hod/
│   │   │   ├── HodDashboard.jsx
│   │   │   ├── FacultyList.jsx
│   │   │   ├── DepartmentPerformance.jsx
│   │   │   └── AddFaculty.jsx
│   │   │
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── ManageFaculty.jsx
│   │       ├── AddFaculty.jsx
│   │       ├── EditFaculty.jsx
│   │       └── ManageDepartments.jsx
│   │
│   ├── services/
│   │   ├── api.js               # Axios instance with interceptors
│   │   ├── authService.js       # Authentication logic
│   │   ├── facultyService.js    # Faculty CRUD operations
│   │   ├── feedbackService.js   # Feedback submission & retrieval
│   │   ├── adminService.js      # Admin operations
│   │   └── mockDb.js            # LocalStorage-based mock database
│   │
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication context provider
│   │
│   ├── hooks/
│   │   └── useAuth.js           # Custom hook for auth access
│   │
│   ├── utils/
│   │   ├── constants.js         # App-wide constants
│   │   └── roleHelpers.js       # Role utility functions
│   │
│   ├── App.jsx                  # Root component with routing
│   └── main.jsx                 # Application entry point
│
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS plugins
├── vite.config.js               # Vite bundler config
└── package.json                 # Dependencies
```

## 🔐 Role-Based Access Control

### 4 User Roles

1. **Student**
   - Submit feedback for faculty
   - View submitted feedback history
   - Dashboard with submission count

2. **Faculty**
   - View performance analytics
   - Monthly performance trends
   - Faculty ranking leaderboard
   - Feedback distribution charts

3. **HOD (Head of Department)**
   - Department-level analytics
   - Faculty performance comparison
   - Add faculty to department
   - View department rankings

4. **Admin**
   - System-wide analytics
   - Add/Edit/Delete faculty
   - Manage departments
   - View top performers

## 🔑 Demo Credentials

| Role    | Email                    | Password |
|---------|--------------------------|----------|
| Student | student@mlfpa.com        | 123456   |
| Faculty | faculty@mlfpa.com        | 123456   |
| HOD     | hod@mlfpa.com            | 123456   |
| Admin   | admin@mlfpa.com          | 123456   |

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (current: 20.18.0 - upgrade recommended)
- npm 10+

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5174/` (or another port if 5174 is busy).

### Build for Production

```bash
npm run build
```

Outputs optimized production bundle to `dist/`.

### Code Quality

```bash
npm run lint
```

Runs ESLint to check code quality.

## 📊 Features

### Student Features
- **Feedback Submission Form**
  - Teaching Quality (1-5)
  - Communication (1-5)
  - Subject Knowledge (1-5)
  - Punctuality (1-5)
  - Overall Rating (1-5)
- Faculty selection dropdown
- View all submitted feedback

### Faculty Features
- **Performance Dashboard**
  - Current performance score card
  - Monthly performance line chart (6 months)
  - Feedback distribution pie chart
  - Top 5 ranking table
- Department-wide analytics
- Personal ranking position

### HOD Features
- Department faculty list
- Performance comparison charts
- Add faculty to department
- Department ranking comparison
- Average department score

### Admin Features
- System-wide analytics dashboard
- Total faculties & departments count
- Top performers showcase
- Add/Edit/Delete faculty operations
- Department management
- Department performance bar chart

## 🎨 UI/UX Design

### Design Principles
- **Clean & Professional** - Enterprise SaaS aesthetic
- **Card-Based Layout** - Modern dashboard cards
- **Responsive** - Mobile-first design approach
- **Accessible** - Semantic HTML and ARIA labels
- **Consistent** - Reusable component library

### Color Palette
- **Primary Brand**: Indigo (`#4f46e5`)
- **Background**: Slate 50-100
- **Text**: Slate 700-900
- **Sidebar**: Slate 950 (dark)
- **Accent Colors**: Emerald, Amber, Red for actions

### Typography
- **Font Family**: Inter, Segoe UI, sans-serif
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

## 🔧 Key Components

### Reusable Components

#### DashboardCard
```jsx
<DashboardCard 
  title="Performance Score" 
  value="92%" 
  hint="Latest composite score" 
/>
```

#### ChartContainer
```jsx
<ChartContainer title="Monthly Performance">
  <PerformanceLineChart data={monthlyData} />
</ChartContainer>
```

#### DataTable
```jsx
<DataTable 
  columns={columns} 
  rows={rows} 
  emptyMessage="No data available" 
/>
```

#### FormInput
```jsx
<FormInput 
  label="Faculty Name" 
  id="name" 
  value={form.name} 
  onChange={handleChange} 
/>
```

## 🗄️ Data Management

### Mock Database (localStorage)

The application uses localStorage to simulate a backend database with:
- **Faculties** - Faculty profiles with scores
- **Departments** - Department metadata
- **Feedbacks** - Student feedback submissions

### Services Layer

All API interactions are abstracted through service modules:
- `authService` - Login/logout operations
- `facultyService` - Faculty CRUD
- `feedbackService` - Feedback management
- `adminService` - Admin operations

### State Management

- **AuthContext** - Global authentication state
- **useState** - Component-level state
- **localStorage** - Persistent storage

## 🛡️ Security

- JWT token stored in localStorage
- Protected routes with role validation
- Role-based component rendering
- Automatic logout on token expiry (planned)
- Password masking in forms

## 📱 Responsive Design

Breakpoints:
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md-lg)
- **Desktop**: > 1024px (xl)

Grid layouts adapt from 1 column (mobile) to 2-4 columns (desktop).

## 🧪 Testing

The application includes:
- **Dummy Data** - Pre-populated mock data
- **Demo Users** - Four role-based test accounts
- **Error Handling** - Try-catch blocks in async operations

## 🚀 Deployment

### Environment Variables
None required - fully client-side application.

### Build Output
The `dist/` folder contains:
- Minified JavaScript bundles
- Optimized CSS
- Static assets
- index.html entry point

Deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📈 Future Enhancements

- [ ] Real backend API integration
- [ ] Advanced ML-based predictions
- [ ] Email notifications
- [ ] Export reports (PDF/Excel)
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Real-time updates (WebSockets)
- [ ] Advanced filtering & search
- [ ] Role permission customization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - See LICENSE file for details.

## 👨‍💻 Development Notes

### Code Style
- Use functional components
- Prefer arrow functions
- Use async/await over promises
- Follow React hooks best practices
- Keep components small and focused

### File Naming
- Components: PascalCase (e.g., `DashboardCard.jsx`)
- Utilities: camelCase (e.g., `roleHelpers.js`)
- Services: camelCase with suffix (e.g., `authService.js`)

### Import Order
1. React imports
2. Third-party imports
3. Component imports
4. Service imports
5. Utility imports
6. Context/Hook imports

---

**Built with ❤️ for ML Faculty Performance Analysis**
