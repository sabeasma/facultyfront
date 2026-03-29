import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import {
  createExpense,
  fetchDashboardData,
  fetchExpenses,
  fetchPrediction,
  resetDemoData,
} from './services/mockApi';
import { useEffect, useMemo, useState } from 'react';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

function HomeRoute() {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <FullScreenStatus label="Restoring demo session..." />;
  }

  return isAuthenticated ? <DashboardPage /> : <AuthPage />;
}

function AuthPage() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: 'student@mlfpa.com',
    password: '123456',
    role: 'student',
  });

  const title = mode === 'login' ? 'Welcome back' : 'Create your demo account';
  const subtitle =
    mode === 'login'
      ? 'Use sample credentials or your own account created in signup mode.'
      : 'Signup is simulated with local state and persists in browser storage.';

  function onChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await login({
          email: form.email,
          password: form.password,
        });
      } else {
        await signup({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        });
      }
    } catch (err) {
      setError(err.message || 'Request failed.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-wrap">
      <div className="bg-shape bg-shape-a" />
      <div className="bg-shape bg-shape-b" />
      <main className="auth-shell fade-in-up">
        <section className="auth-head">
          <p className="kicker">Portfolio Demo</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </section>

        <section className="segment-control" aria-label="auth mode switch">
          <button
            type="button"
            className={mode === 'login' ? 'is-active' : ''}
            onClick={() => {
              setMode('login');
              setError('');
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'signup' ? 'is-active' : ''}
            onClick={() => {
              setMode('signup');
              setError('');
            }}
          >
            Signup
          </button>
        </section>

        <form className="auth-form" onSubmit={onSubmit}>
          {mode === 'signup' && (
            <label>
              Full Name
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                placeholder="Amina Rahman"
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder="Enter password"
              minLength={6}
              required
            />
          </label>

          {mode === 'signup' && (
            <label>
              Role
              <select name="role" value={form.role} onChange={onChange}>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="hod">HOD</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          )}

          {error && <p className="error-banner">{error}</p>}

          <button className="primary-btn" disabled={isSubmitting}>
            {isSubmitting
              ? 'Simulating request...'
              : mode === 'login'
                ? 'Sign in'
                : 'Create account'}
          </button>
        </form>

        <aside className="demo-tip">
          <h2>Demo Credentials</h2>
          <p>student@mlfpa.com / 123456</p>
          <p>faculty@mlfpa.com / 123456</p>
          <p>hod@mlfpa.com / 123456</p>
          <p>admin@mlfpa.com / 123456</p>
        </aside>
      </main>
    </div>
  );
}

function DashboardPage() {
  const { user, logout } = useAuth();

  const [dashboard, setDashboard] = useState({ kpis: [], recentExpenses: [] });
  const [prediction, setPrediction] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState({
    dashboard: true,
    prediction: true,
    expenses: true,
    adding: false,
    resetting: false,
  });
  const [error, setError] = useState('');
  const [entry, setEntry] = useState({
    title: '',
    category: 'Operations',
    amount: '',
    note: '',
  });

  useEffect(() => {
    let active = true;

    async function loadInitial() {
      setError('');
      try {
        const [dashboardData, predictionData, expenseData] = await Promise.all([
          fetchDashboardData(),
          fetchPrediction(),
          fetchExpenses(),
        ]);

        if (!active) {
          return;
        }

        setDashboard(dashboardData);
        setPrediction(predictionData);
        setExpenses(expenseData);
      } catch (err) {
        if (!active) {
          return;
        }
        setError(err.message || 'Failed to load dashboard data.');
      } finally {
        if (active) {
          setLoading({
            dashboard: false,
            prediction: false,
            expenses: false,
            adding: false,
            resetting: false,
          });
        }
      }
    }

    loadInitial();

    return () => {
      active = false;
    };
  }, []);

  function onEntryChange(event) {
    const { name, value } = event.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  }

  async function onAddExpense(event) {
    event.preventDefault();
    setError('');
    setLoading((prev) => ({ ...prev, adding: true }));

    try {
      await createExpense(entry);
      const [dashboardData, expenseData] = await Promise.all([
        fetchDashboardData(),
        fetchExpenses(),
      ]);
      setDashboard(dashboardData);
      setExpenses(expenseData);
      setEntry({
        title: '',
        category: 'Operations',
        amount: '',
        note: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to add entry.');
    } finally {
      setLoading((prev) => ({ ...prev, adding: false }));
    }
  }

  async function onRefreshPrediction() {
    setError('');
    setLoading((prev) => ({ ...prev, prediction: true }));

    try {
      const response = await fetchPrediction();
      setPrediction(response);
    } catch (err) {
      setError(err.message || 'Could not fetch prediction.');
    } finally {
      setLoading((prev) => ({ ...prev, prediction: false }));
    }
  }

  async function onResetDemo() {
    setError('');
    setLoading((prev) => ({ ...prev, resetting: true }));

    try {
      await resetDemoData();
      const [dashboardData, predictionData, expenseData] = await Promise.all([
        fetchDashboardData(),
        fetchPrediction(),
        fetchExpenses(),
      ]);
      setDashboard(dashboardData);
      setPrediction(predictionData);
      setExpenses(expenseData);
    } catch (err) {
      setError(err.message || 'Failed to reset demo data.');
    } finally {
      setLoading((prev) => ({ ...prev, resetting: false }));
    }
  }

  const totalExpense = useMemo(
    () => expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [expenses]
  );

  return (
    <div className="dashboard-wrap">
      <header className="topbar">
        <div>
          <p className="kicker">Frontend-Only Demo</p>
          <h1>ML Faculty Performance Analyzer</h1>
          <p>
            Logged in as {user.name} ({user.role})
          </p>
        </div>

        <div className="topbar-actions">
          <button
            type="button"
            className="ghost-btn"
            onClick={onResetDemo}
            disabled={loading.resetting}
          >
            {loading.resetting ? 'Resetting...' : 'Reset Demo Data'}
          </button>
          <button type="button" className="danger-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {error && <p className="error-banner">{error}</p>}

      <section className="kpi-grid">
        {loading.dashboard && (
          <div className="card"><SkeletonRows lines={4} /></div>
        )}

        {!loading.dashboard &&
          dashboard.kpis.map((item) => (
            <article className="card card-hover" key={item.label}>
              <p>{item.label}</p>
              <h2>{item.value}</h2>
              <small>{item.trend}</small>
            </article>
          ))}
      </section>

      <section className="dashboard-grid">
        <article className="card card-hover">
          <div className="card-head">
            <h3>ML Prediction Output</h3>
            <button type="button" className="primary-btn" onClick={onRefreshPrediction}>
              Refresh
            </button>
          </div>

          {loading.prediction && <SkeletonRows lines={5} />}

          {!loading.prediction && prediction && (
            <div className="prediction-result">
              <p>
                <strong>Model:</strong> {prediction.modelVersion}
              </p>
              <p>
                <strong>Risk:</strong> {prediction.riskLabel}
              </p>
              <p>
                <strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(1)}%
              </p>
              <p>
                <strong>Generated:</strong>{' '}
                {new Date(prediction.generatedAt).toLocaleString()}
              </p>
              <p className="recommendation">{prediction.recommendation}</p>
            </div>
          )}
        </article>

        <article className="card card-hover">
          <div className="card-head">
            <h3>Add Expense Entry</h3>
            <p>Total: ${totalExpense.toFixed(2)}</p>
          </div>

          <form className="entry-form" onSubmit={onAddExpense}>
            <label>
              Title
              <input
                name="title"
                value={entry.title}
                onChange={onEntryChange}
                placeholder="Workshop travel"
                required
              />
            </label>

            <label>
              Category
              <select name="category" value={entry.category} onChange={onEntryChange}>
                <option value="Operations">Operations</option>
                <option value="Research">Research</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Training">Training</option>
              </select>
            </label>

            <label>
              Amount
              <input
                name="amount"
                type="number"
                min="0"
                step="0.01"
                value={entry.amount}
                onChange={onEntryChange}
                placeholder="99.00"
                required
              />
            </label>

            <label>
              Note
              <textarea
                name="note"
                value={entry.note}
                onChange={onEntryChange}
                placeholder="Optional details for reviewers"
                rows={3}
              />
            </label>

            <button className="primary-btn" disabled={loading.adding}>
              {loading.adding ? 'Saving with mock API...' : 'Save Entry'}
            </button>
          </form>
        </article>

        <article className="card card-hover expense-table-wrap">
          <h3>Recent Entries</h3>
          {loading.expenses ? (
            <SkeletonRows lines={6} />
          ) : (
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>${Number(item.amount).toFixed(2)}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </article>
      </section>
    </div>
  );
}

function FullScreenStatus({ label }) {
  return (
    <div className="page-wrap center-content">
      <div className="card">
        <div className="spinner" />
        <p>{label}</p>
      </div>
    </div>
  );
}

function SkeletonRows({ lines }) {
  return (
    <div className="skeleton-wrap" aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <span className="skeleton-line" key={index} />
      ))}
    </div>
  );
}

export default App;
