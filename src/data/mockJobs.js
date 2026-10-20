/**
 * Initial Job Applications for Job Tracker in DevPrep
 * Statuses: 'Wishlist', 'Applied', 'Screening', 'Technical Interview', 'Final Interview', 'Offer', 'Rejected'
 */

export const JOB_STATUSES = [
  'Wishlist',
  'Applied',
  'Screening',
  'Technical Interview',
  'Final Interview',
  'Offer',
  'Rejected'
];

export const INITIAL_JOB_APPLICATIONS = [
  {
    id: 'job-1',
    company: 'Stripe',
    role: 'Full Stack Software Engineer',
    location: 'Remote (US)',
    salary: '$165,000 - $190,000',
    jobUrl: 'https://stripe.com/jobs/fullstack-eng',
    appliedDate: '2026-10-10',
    status: 'Technical Interview',
    followUpDate: '2026-10-22',
    notes: 'Completed recruiter screening call on Oct 14. Next is 60-min live pair programming round on API integration.'
  },
  {
    id: 'job-2',
    company: 'Google',
    role: 'Software Engineer II (L4) - Cloud Platform',
    location: 'Sunnyvale, CA (Hybrid)',
    salary: '$180,000 - $210,000',
    jobUrl: 'https://careers.google.com/jobs/cloud-swe',
    appliedDate: '2026-10-05',
    status: 'Final Interview',
    followUpDate: '2026-10-25',
    notes: 'Virtual onsite scheduled for this Friday: 2 DSA rounds + 1 System Design + 1 Googliness.'
  },
  {
    id: 'job-3',
    company: 'Microsoft',
    role: 'Frontend Engineer - Azure Portal',
    location: 'Redmond, WA (Hybrid)',
    salary: '$150,000 - $175,000',
    jobUrl: 'https://careers.microsoft.com/jobs/azure-fe',
    appliedDate: '2026-10-12',
    status: 'Screening',
    followUpDate: '2026-10-21',
    notes: 'Recruiter reached out on LinkedIn. Phone screen scheduled for Wednesday 2 PM.'
  },
  {
    id: 'job-4',
    company: 'Airbnb',
    role: 'Software Engineer, Core Services',
    location: 'San Francisco, CA (Remote)',
    salary: '$175,000 - $205,000',
    jobUrl: 'https://careers.airbnb.com/positions/core-eng',
    appliedDate: '2026-10-02',
    status: 'Offer',
    followUpDate: '2026-10-24',
    notes: 'Offer letter received! Reviewing equity grant and 401(k) matching. Decision deadline Oct 26.'
  },
  {
    id: 'job-5',
    company: 'Datadog',
    role: 'Backend Engineer - Distributed Metrics',
    location: 'New York, NY',
    salary: '$160,000 - $185,000',
    jobUrl: 'https://careers.datadoghq.com/jobs/metrics-be',
    appliedDate: '2026-10-08',
    status: 'Applied',
    followUpDate: '2026-10-20',
    notes: 'Applied via employee referral from Dave. Waiting for initial application review response.'
  },
  {
    id: 'job-6',
    company: 'Netflix',
    role: 'Senior UI Platform Engineer',
    location: 'Los Gatos, CA',
    salary: '$240,000 (All-cash)',
    jobUrl: 'https://jobs.netflix.com/jobs/ui-platform',
    appliedDate: '2026-09-28',
    status: 'Wishlist',
    followUpDate: '2026-10-23',
    notes: 'Need to refine portfolio with custom micro-frontend architecture before submitting application.'
  }
];
