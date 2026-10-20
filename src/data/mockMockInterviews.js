/**
 * Mock Interview Simulator Questions and Historical Sessions for DevPrep
 */

export const MOCK_INTERVIEW_QUESTIONS_POOL = [
  {
    id: 'mock-q-1',
    category: 'Data Structures & Algorithms',
    difficulty: 'Medium',
    timeLimitMinutes: 30,
    title: 'Two Sum II - Input Array Is Sorted with O(1) Space',
    prompt: `Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.

You may not use the same element twice. Your solution must use only O(1) additional space.

Explain your thoughts out loud, discuss the edge cases, and write clean, working code.`,
    rubric: [
      'Did you clarify input constraints (e.g. sorted order, negatives)?',
      'Did you propose the Two-Pointer approach before jumping to code?',
      'Is the space complexity strictly O(1)?',
      'Did you trace the code with an example and test boundary conditions?'
    ]
  },
  {
    id: 'mock-q-2',
    category: 'System Design',
    difficulty: 'Senior / Hard',
    timeLimitMinutes: 45,
    title: 'Design a Scalable URL Shortener (e.g. bit.ly or TinyURL)',
    prompt: `Design a high-scale URL shortening service like TinyURL.

Key requirements:
1. Shortening: Given a long URL, return a unique 7-character alias.
2. Redirection: When accessing the short URL, redirect to the original destination with sub-10ms latency.
3. High write volume (100M URLs/month) and 10x read traffic.
4. Analytics: Track click counts and geographic metrics.

Walk through: Functional & Non-functional requirements, Back-of-the-envelope estimations, High-Level Architecture, Data Schema, and Key Deep Dives (Base62 encoding vs Key Generation Service).`,
    rubric: [
      'Did you formulate requirements and estimate QPS and storage needs?',
      'Did you design an effective database schema and partitioning strategy?',
      'Did you choose an appropriate caching strategy (Redis / Memcached)?',
      'Did you explain collision resolution and 301 vs 302 HTTP redirects?'
    ]
  },
  {
    id: 'mock-q-3',
    category: 'Behavioral & Leadership',
    difficulty: 'All Levels',
    timeLimitMinutes: 20,
    title: 'Behavioral: Overcoming a Critical Production Outage or Severe Incident',
    prompt: `Tell me about a time when a critical bug or performance outage occurred under your watch.

How did you diagnose the issue, manage stakeholder communication, mitigate the failure, and establish preventative post-mortem mechanisms?

Structure your answer using the STAR (Situation, Task, Action, Result) method.`,
    rubric: [
      'Did you clearly frame the Situation without shifting blame?',
      'Did you detail actionable technical steps taken to remediate the incident?',
      'Did you highlight blameless post-mortem culture and monitoring improvements?',
      'Did you measure the outcome with quantifiable impact?'
    ]
  },
  {
    id: 'mock-q-4',
    category: 'Frontend Engineering',
    difficulty: 'Medium',
    timeLimitMinutes: 30,
    title: 'Implement an Accessible, Debounced Autocomplete Search Component',
    prompt: `Design and implement an Autocomplete Search input component in React.

Requirements:
1. Debounce network requests by 300ms.
2. Support keyboard navigation (Arrow Up, Arrow Down, Enter to select, Escape to close).
3. Handle loading, empty state, and API error states gracefully.
4. Meet WAI-ARIA combobox guidelines.`,
    rubric: [
      'Did you implement proper debounce cleanup using useEffect or custom hook?',
      'Is keyboard navigation fully functional without breaking focus?',
      'Are ARIA attributes (role="combobox", aria-expanded) handled correctly?',
      'Did you prevent race conditions when previous requests resolve out of order?'
    ]
  },
  {
    id: 'mock-q-5',
    category: 'Backend Architecture',
    difficulty: 'Medium - Hard',
    timeLimitMinutes: 35,
    title: 'Design an Idempotent Payment Processing API Endpoint',
    prompt: `You are creating a \`POST /api/v1/payments/charge\` endpoint.

Network timeouts and client retries can cause duplicate charges if not guarded.
Explain how you would design this endpoint to be strictly idempotent using idempotency keys, atomic distributed locks, and database transactions.`,
    rubric: [
      'Did you explain Idempotency-Key headers and caching their status in Redis?',
      'Did you address race conditions if two identical requests arrive simultaneously?',
      'Did you explain database transactions and state transitions (PENDING, SUCCESS, FAILED)?',
      'How are webhook notifications handled gracefully?'
    ]
  }
];

export const INITIAL_MOCK_HISTORY = [
  {
    id: 'mock-hist-1',
    date: '2026-10-18',
    questionTitle: 'Two Sum II - Input Array Is Sorted with O(1) Space',
    category: 'Data Structures & Algorithms',
    durationMinutes: 24,
    ratings: {
      problemSolving: 5,
      communication: 4,
      codeQuality: 5,
      timeManagement: 4
    },
    overallScore: 90,
    feedbackNotes: 'Identified the two pointer pattern within 2 minutes. Clear code with comments. Could improve by explicitly testing duplicate values earlier.'
  },
  {
    id: 'mock-hist-2',
    date: '2026-10-15',
    questionTitle: 'Design a Scalable URL Shortener (e.g. bit.ly or TinyURL)',
    category: 'System Design',
    durationMinutes: 42,
    ratings: {
      problemSolving: 4,
      communication: 4,
      codeQuality: 4,
      timeManagement: 3
    },
    overallScore: 78,
    feedbackNotes: 'Solid understanding of Base62 encoding and Redis caching. Spent a bit too long calculating disk storage bytes, leaving slightly rushed time for rate limiting discussion.'
  },
  {
    id: 'mock-hist-3',
    date: '2026-10-11',
    questionTitle: 'Behavioral: Overcoming a Critical Production Outage',
    category: 'Behavioral & Leadership',
    durationMinutes: 18,
    ratings: {
      problemSolving: 5,
      communication: 5,
      codeQuality: 4,
      timeManagement: 5
    },
    overallScore: 95,
    feedbackNotes: 'Excellent STAR structure. Emphasized blameless culture and quantified MTTR reduction from 45 mins to 8 mins.'
  }
];
