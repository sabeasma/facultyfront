import {
  DEFAULT_EXPENSES,
  DEFAULT_USERS,
  DEMO_DELAY_MAX,
  DEMO_DELAY_MIN,
  PREDICTION_SCENARIOS,
} from './mockData';

const USERS_KEY = 'demo_users';
const EXPENSES_KEY = 'demo_expenses';

function randomDelay() {
  const ms =
    Math.floor(Math.random() * (DEMO_DELAY_MAX - DEMO_DELAY_MIN + 1)) +
    DEMO_DELAY_MIN;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
}

function getStoredArray(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

function saveArray(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function sanitizeUser(user) {
  const { password: _password, ...safeUser } = user;
  return safeUser;
}

export async function login({ email, password }) {
  await randomDelay();

  // Real integration point: replace with POST /auth/login.
  const users = getStoredArray(USERS_KEY, DEFAULT_USERS);
  const found = users.find(
    (user) => user.email === email.trim().toLowerCase() && user.password === password
  );

  if (!found) {
    throw new Error('Invalid email or password. Try one of the demo credentials.');
  }

  return {
    token: `demo-token-${found.id}`,
    user: sanitizeUser(found),
  };
}

export async function signup({ name, email, password, role }) {
  await randomDelay();

  // Real integration point: replace with POST /auth/signup.
  const users = getStoredArray(USERS_KEY, DEFAULT_USERS);
  const normalizedEmail = email.trim().toLowerCase();
  const existing = users.some((item) => item.email === normalizedEmail);

  if (existing) {
    throw new Error('Email already exists. Use another email or log in.');
  }

  const newUser = {
    id: randomId('u'),
    name: name.trim(),
    email: normalizedEmail,
    password,
    role,
  };

  const updatedUsers = [...users, newUser];
  saveArray(USERS_KEY, updatedUsers);

  return {
    token: `demo-token-${newUser.id}`,
    user: sanitizeUser(newUser),
  };
}

export async function fetchDashboardData() {
  await randomDelay();

  // Real integration point: replace with GET /dashboard/summary.
  const expenses = getStoredArray(EXPENSES_KEY, DEFAULT_EXPENSES);
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  return {
    kpis: [
      { label: 'Active Faculty', value: 48, trend: '+6% this month' },
      { label: 'Feedback Completion', value: '92%', trend: '+2.1% this week' },
      { label: 'Prediction Accuracy', value: '89%', trend: '+1.4 model uplift' },
      { label: 'Expense Entries', value: expenses.length, trend: '$' + totalExpenses.toFixed(0) },
    ],
    recentExpenses: expenses
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5),
  };
}

export async function fetchPrediction() {
  await randomDelay();

  // Real integration point: replace with POST /ml/predict.
  const index = Math.floor(Math.random() * PREDICTION_SCENARIOS.length);
  return {
    ...PREDICTION_SCENARIOS[index],
    generatedAt: new Date().toISOString(),
  };
}

export async function fetchExpenses() {
  await randomDelay();

  // Real integration point: replace with GET /expenses.
  return getStoredArray(EXPENSES_KEY, DEFAULT_EXPENSES)
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function createExpense(input) {
  await randomDelay();

  // Real integration point: replace with POST /expenses.
  const expenses = getStoredArray(EXPENSES_KEY, DEFAULT_EXPENSES);

  const newExpense = {
    id: randomId('e'),
    title: input.title.trim(),
    category: input.category.trim(),
    amount: Number(input.amount),
    note: input.note.trim(),
    createdAt: new Date().toISOString(),
  };

  const updated = [newExpense, ...expenses];
  saveArray(EXPENSES_KEY, updated);
  return newExpense;
}

export async function resetDemoData() {
  await randomDelay();

  localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(DEFAULT_EXPENSES));

  return { ok: true };
}
