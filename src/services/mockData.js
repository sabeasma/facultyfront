export const DEMO_DELAY_MIN = 1000;
export const DEMO_DELAY_MAX = 2000;

export const DEFAULT_USERS = [
  {
    id: 'u-1',
    name: 'Student Demo',
    email: 'student@mlfpa.com',
    password: '123456',
    role: 'student',
  },
  {
    id: 'u-2',
    name: 'Faculty Demo',
    email: 'faculty@mlfpa.com',
    password: '123456',
    role: 'faculty',
  },
  {
    id: 'u-3',
    name: 'HOD Demo',
    email: 'hod@mlfpa.com',
    password: '123456',
    role: 'hod',
  },
  {
    id: 'u-4',
    name: 'Admin Demo',
    email: 'admin@mlfpa.com',
    password: '123456',
    role: 'admin',
  },
];

export const DEFAULT_EXPENSES = [
  {
    id: 'e-1',
    title: 'Cloud Hosting',
    category: 'Infrastructure',
    amount: 220,
    note: 'Demo monthly hosting bill',
    createdAt: '2026-03-25T09:05:00.000Z',
  },
  {
    id: 'e-2',
    title: 'Model Experiment Credits',
    category: 'ML Ops',
    amount: 145,
    note: 'Sandbox testing budget',
    createdAt: '2026-03-26T15:20:00.000Z',
  },
  {
    id: 'e-3',
    title: 'Design License',
    category: 'Tools',
    amount: 75,
    note: 'UI asset package',
    createdAt: '2026-03-28T11:42:00.000Z',
  },
];

export const PREDICTION_SCENARIOS = [
  {
    id: 'p-1',
    modelVersion: 'v2.6-demo',
    confidence: 0.89,
    riskLabel: 'Low Risk',
    recommendation:
      'Faculty engagement trend is healthy. Keep weekly office-hour reminders active.',
  },
  {
    id: 'p-2',
    modelVersion: 'v2.6-demo',
    confidence: 0.81,
    riskLabel: 'Medium Risk',
    recommendation:
      'Communication scores dipped in one section. Trigger an early intervention workflow.',
  },
  {
    id: 'p-3',
    modelVersion: 'v2.6-demo',
    confidence: 0.93,
    riskLabel: 'Excellent',
    recommendation:
      'Performance indicators are stable. Share this faculty profile as a best-practice example.',
  },
];
