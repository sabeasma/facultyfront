# Frontend-Backend Connection Test Guide

## Status: ✅ CONNECTED

All frontend service files have been updated to connect to the real backend API at `http://localhost:8080/api`.

## Updated Service Files

### 1. **authService.js** ✅
- **Status**: Connected to backend
- **Endpoint**: `POST /auth/login`
- **Changes**: 
  - Now calls `api.post('/auth/login', { email, password })`
  - Extracts JWT token and user data from backend response
  - Stores token in localStorage for subsequent requests

### 2. **api.js** ✅
- **Status**: Connected to backend
- **Configuration**:
  - Base URL: `http://localhost:8080/api`
  - Request interceptor: Adds Bearer token from localStorage
  - Response interceptor: Handles 401 errors with logout redirect
  - Content-Type: application/json

### 3. **facultyService.js** ✅
- **Status**: Connected to backend
- **Endpoints Connected**:
  - `GET /faculty` - List all faculties
  - `GET /faculty/ranking` - Get faculty ranking
  - `GET /faculty/dashboard` - Get faculty dashboard
  - `POST /faculty` - Add new faculty
  - `PUT /faculty/{id}` - Update faculty
  - `DELETE /faculty/{id}` - Delete faculty

### 4. **adminService.js** ✅
- **Status**: Connected to backend
- **Endpoints Connected**:
  - `GET /admin/departments` - List departments
  - `POST /admin/departments` - Add department
  - `PUT /admin/departments/{id}` - Update department
  - `DELETE /admin/departments/{id}` - Delete department
  - `GET /admin/analytics` - Get system analytics
  - `GET /admin/faculty` - List all faculty
  - `POST /admin/faculty` - Add faculty
  - `PUT /admin/faculty/{id}` - Update faculty
  - `DELETE /admin/faculty/{id}` - Delete faculty

### 5. **feedbackService.js** ✅
- **Status**: Connected to backend
- **Endpoints Connected**:
  - `POST /student/feedback` - Submit feedback
  - `GET /student/feedback/my` - Get my feedback
  - `GET /student/feedback` - Get all feedback
  - `POST /ml/predict` - ML performance prediction

## Testing the Connection

### Prerequisites
1. **Backend must be running**
   ```bash
   cd demo
   mvn spring-boot:run
   ```
   Backend will start at: `http://localhost:8080`

2. **Frontend must be running**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will start at: `http://localhost:5173`

3. **Database must be ready**
   - MySQL running at `localhost:3306`
   - Database: `faculty_analyzer`
   - User: `root` / Password: `root`

### Test Credentials

#### Admin Account
- Email: `admin@university.edu`
- Password: `admin123`
- Role: `ADMIN`

#### Faculty Account
- Email: `vikram.sharma@university.edu`
- Password: `password123`
- Role: `FACULTY`

#### Student Account
- Email: `student1@university.edu`
- Password: `password123`
- Role: `STUDENT`

#### HOD Account
- Email: `hod.cse@university.edu`
- Password: `password123`
- Role: `HOD`

### Manual Testing Steps

1. **Test Login**
   - Open browser: `http://localhost:5173`
   - Login with: `admin@university.edu` / `admin123`
   - Check browser DevTools → Application → LocalStorage
   - Verify `mlfpa_token` is stored with JWT token
   - Verify `mlfpa_user` contains user data

2. **Test Admin Dashboard**
   - Navigate to Admin Dashboard
   - Verify departments list loads (should show CSE, ECE, ME, CIVIL)
   - Verify faculty list loads
   - Verify system analytics appears

3. **Test Faculty Dashboard**
   - Logout and login with: `vikram.sharma@university.edu` / `password123`
   - Navigate to Faculty Dashboard
   - Verify ranking displays correctly
   - Verify performance analytics loads

4. **Test Student Feedback**
   - Logout and login with: `student1@university.edu` / `password123`
   - Navigate to Submit Feedback
   - Verify faculty list loads
   - Submit feedback form
   - Verify success message

5. **Test HOD Dashboard**
   - Logout and login with: `hod.cse@university.edu` / `password123`
   - Navigate to HOD Dashboard
   - Verify department performance data loads

### Browser Console Testing

Open DevTools Console and test API calls directly:

```javascript
// Test token storage
console.log(localStorage.getItem('mlfpa_token'))

// Test getting user data
const user = JSON.parse(localStorage.getItem('mlfpa_user'))
console.log(user)

// Test API call with token
const token = localStorage.getItem('mlfpa_token')
fetch('http://localhost:8080/api/admin/analytics', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}).then(r => r.json()).then(console.log)
```

### Network Inspection

1. Open DevTools → Network tab
2. Perform an action (e.g., login, fetch faculty list)
3. Look for requests to `http://localhost:8080/api/...`
4. Verify:
   - Status: 200 (success) or 401 (auth error)
   - Authorization header: `Bearer <token>`
   - Response contains expected data

## Troubleshooting

### Issue: CORS Error
**Error Message**: `Access to XMLHttpRequest at 'http://localhost:8080/api/...' from origin 'http://localhost:5173' has been blocked`

**Solution**:
- Verify backend CORS config allows `http://localhost:5173`
- Check backend is running on port 8080
- Verify frontend is running on port 5173

### Issue: 401 Unauthorized
**Error Message**: `"error": "Invalid or expired JWT token"`

**Solution**:
- Clear localStorage: `localStorage.clear()` in console
- Login again to get new token
- Verify credentials are correct
- Check JWT token expiry (default: 24 hours)

### Issue: Backend Connection Refused
**Error Message**: `Failed to fetch` or `Connection refused`

**Solution**:
- Verify backend is running: `mvn spring-boot:run`
- Check backend port: 8080
- Verify MySQL is running
- Check firewall/network settings

### Issue: API Returns 404
**Error Message**: `"status": 404, "message": "endpoint not found"`

**Solution**:
- Verify correct endpoint path in service file
- Check backend controller routing
- Verify request method (GET, POST, PUT, DELETE)
- Refer to BACKEND_API.md for endpoint documentation

## Backend API Documentation

For complete backend API reference, see: `demo/BACKEND_API.md`

### Available Endpoints Summary

**Authentication**
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh JWT token

**Faculty**
- `GET /faculty` - List all faculty
- `GET /faculty/ranking` - Get faculty ranking
- `GET /faculty/{id}` - Get faculty details
- `POST /faculty` - Create faculty (Admin only)
- `PUT /faculty/{id}` - Update faculty
- `DELETE /faculty/{id}` - Delete faculty

**Student**
- `GET /student/feedback` - Get all feedback submissions
- `GET /student/feedback/my` - Get my feedback submissions
- `POST /student/feedback` - Submit feedback

**HOD**
- `GET /hod/department` - Get department details
- `GET /hod/faculty` - Get department faculty
- `GET /hod/performance` - Get department performance

**Admin**
- `GET /admin/departments` - List all departments
- `POST /admin/departments` - Create department
- `PUT /admin/departments/{id}` - Update department
- `DELETE /admin/departments/{id}` - Delete department
- `GET /admin/analytics` - Get system analytics
- `GET /admin/faculty` - List all faculty
- `POST /admin/faculty` - Create faculty
- `PUT /admin/faculty/{id}` - Update faculty
- `DELETE /admin/faculty/{id}` - Delete faculty

**ML**
- `POST /ml/predict` - Get ML performance prediction

## Next Steps

1. ✅ Start backend: `cd demo && mvn spring-boot:run`
2. ✅ Start frontend: `cd frontend && npm run dev`
3. ✅ Test login with provided credentials
4. ✅ Navigate through all dashboard views
5. ✅ Test feedback submission
6. ✅ Verify data persists in database

## Success Criteria

- [ ] Login successful with real backend credentials
- [ ] JWT token appears in localStorage after login
- [ ] Admin Dashboard loads department and faculty data
- [ ] Faculty Dashboard shows ranking and analytics
- [ ] Student can submit feedback
- [ ] HOD can view department performance
- [ ] All API requests show correct endpoints in Network tab
- [ ] No CORS errors in console
- [ ] No 401 Unauthorized errors

## Additional Resources

- Backend Setup: `demo/BACKEND_SETUP.md`
- Backend API Docs: `demo/BACKEND_API.md`
- Quick Start: `demo/QUICKSTART.md`
- Deployment Guide: `demo/DEPLOYMENT.md`
