/**
 * Company Preparation Guides for DevPrep
 * Detailed interview breakdowns for Google, Microsoft, Amazon, Adobe, Meta, Apple, Netflix, Uber.
 */

export const MOCK_COMPANIES = [
  {
    id: 'google',
    name: 'Google',
    ticker: 'GOOGL',
    logoColor: 'from-blue-500 via-red-500 to-yellow-500',
    difficulty: 'Very High',
    acceptanceRate: '~0.2%',
    hiringProcessDuration: '4 - 8 Weeks',
    headquarters: 'Mountain View, CA',
    summary: 'Focuses heavily on raw algorithmic problem solving, clean code, optimal big-O complexity, scalable system design, and Googliness (collaborative leadership & humility).',
    interviewRounds: [
      {
        round: '1. Online Assessment (OA)',
        duration: '90 Minutes',
        focus: '2 Algorithmic coding problems on HackerRank / internal platform (Graphs, DP, Trees).'
      },
      {
        round: '2. Technical Phone Screen',
        duration: '45 Minutes',
        focus: '1-2 DSA problems on Google Docs / Interview Sandbox with a Google Software Engineer.'
      },
      {
        round: '3. Virtual Onsite: Tech Round 1',
        duration: '45 Minutes',
        focus: 'Advanced Graph Algorithms / Dynamic Programming / Data Structure Design.'
      },
      {
        round: '4. Virtual Onsite: Tech Round 2',
        duration: '45 Minutes',
        focus: 'Tree Traversals, Trie, Priority Queue, or Sliding Window optimizations.'
      },
      {
        round: '5. Virtual Onsite: System Design (L4+)',
        duration: '45 Minutes',
        focus: 'Distributed systems, load balancing, consensus, and Google-scale services (e.g. Design Google Drive / Web Crawler).'
      },
      {
        round: '6. Googliness & Leadership',
        duration: '45 Minutes',
        focus: 'Behavioral scenarios, handling ambiguity, ethical dilemmas, peer collaboration, and inclusive culture.'
      }
    ],
    topTopics: [
      'Graphs & Topological Sort',
      'Dynamic Programming & Memoization',
      'Trie & String Algorithms',
      'Tree Traversals & BST',
      'Distributed Caching & Sharding'
    ],
    sampleQuestions: [
      { id: 'course-schedule', title: 'Course Schedule (Cycle in Graph)' },
      { id: 'number-of-islands', title: 'Number of Islands' },
      { id: 'trapping-rain-water', title: 'Trapping Rain Water' },
      { id: 'search-in-rotated-sorted-array', title: 'Search in Rotated Sorted Array' }
    ],
    culturalPrinciples: [
      { title: 'Googliness', desc: 'Thriving in ambiguity, doing the right thing, valuing diversity, and intellectually humble collaboration.' },
      { title: 'First Principles Thinking', desc: 'Break down complex scale problems into foundational mathematical truths.' },
      { title: '10x Scale Mindset', desc: 'Always consider what happens when users increase from millions to billions.' }
    ],
    interviewChecklist: [
      { id: 'g-chk-1', text: 'Clarify constraints & edge cases before writing any code (empty array, negative numbers, overflow)' },
      { id: 'g-chk-2', text: 'Verbally articulate multiple approaches and calculate their Big-O time and space tradeoffs' },
      { id: 'g-chk-3', text: 'Write modular, production-ready code with clean variable naming' },
      { id: 'g-chk-4', text: 'Manually dry-run your code with an example test case before saying you are finished' }
    ]
  },

  {
    id: 'amazon',
    name: 'Amazon',
    ticker: 'AMZN',
    logoColor: 'from-amber-500 to-orange-600',
    difficulty: 'High',
    acceptanceRate: '~1.5%',
    hiringProcessDuration: '3 - 6 Weeks',
    headquarters: 'Seattle, WA',
    summary: 'Heavily weighted on the 16 Amazon Leadership Principles (LP) integrated into every single technical and behavioral round, combined with practical DSA and OOP design.',
    interviewRounds: [
      {
        round: '1. Online Assessment (OA1 & OA2)',
        duration: '120 Minutes',
        focus: '2 coding problems + Amazon Work Style Simulation & LP behavioral survey.'
      },
      {
        round: '2. Technical Phone Screen',
        duration: '60 Minutes',
        focus: '20 mins LP behavioral questions + 40 mins DSA coding.'
      },
      {
        round: '3. Virtual Onsite: Coding & LP 1',
        duration: '60 Minutes',
        focus: 'Arrays, Strings, Hash Maps, Priority Queues + 2 LP stories.'
      },
      {
        round: '4. Virtual Onsite: Coding & LP 2',
        duration: '60 Minutes',
        focus: 'Trees, Graphs, or Dynamic Programming + 2 LP stories.'
      },
      {
        round: '5. Virtual Onsite: Object Oriented Design / System Design',
        duration: '60 Minutes',
        focus: 'OOP design (e.g. Design Locker System / Parking Lot) or High-Level System Design.'
      },
      {
        round: '6. The Bar Raiser Round',
        duration: '60 Minutes',
        focus: 'Interview with an independent Amazon Bar Raiser verifying high technical & LP bar.'
      }
    ],
    topTopics: [
      'Amazon 16 Leadership Principles (STAR stories)',
      'Hash Maps & Two Pointers',
      'Priority Queues / Top K Elements',
      'Object Oriented Design (SOLID)',
      'BFS / DFS on Grids'
    ],
    sampleQuestions: [
      { id: 'two-sum', title: 'Two Sum' },
      { id: 'best-time-to-buy-and-sell-stock', title: 'Best Time to Buy and Sell Stock' },
      { id: 'product-of-array-except-self', title: 'Product of Array Except Self' },
      { id: 'coin-change', title: 'Coin Change' }
    ],
    culturalPrinciples: [
      { title: 'Customer Obsession', desc: 'Start with the customer and work backwards; vigorously earn and keep customer trust.' },
      { title: 'Ownership & Bias for Action', desc: 'Leaders act on behalf of the entire company, never say "that’s not my job", and value calculated risk-taking.' },
      { title: 'Dive Deep & Have Backbone', desc: 'Operate at all levels, stay connected to details, challenge decisions when you disagree, then commit.' }
    ],
    interviewChecklist: [
      { id: 'a-chk-1', text: 'Prepare 2 unique STAR stories for each of the core Amazon Leadership Principles' },
      { id: 'a-chk-2', text: 'Always quantify results in your stories with metrics (%, $, latency, users)' },
      { id: 'a-chk-3', text: 'In technical rounds, ask clarifying questions showing Customer Obsession' },
      { id: 'a-chk-4', text: 'Be prepared for follow-up pushback questions from the Bar Raiser' }
    ]
  },

  {
    id: 'microsoft',
    name: 'Microsoft',
    ticker: 'MSFT',
    logoColor: 'from-blue-600 to-cyan-500',
    difficulty: 'High',
    acceptanceRate: '~2.0%',
    hiringProcessDuration: '3 - 5 Weeks',
    headquarters: 'Redmond, WA',
    summary: 'Focuses on solid fundamentals, data structures, OOP patterns, growth mindset, collaboration, and practical problem solving with clear communication.',
    interviewRounds: [
      {
        round: '1. Online Assessment (Codility)',
        duration: '75-90 Minutes',
        focus: '3 algorithmic problems on Codility platform with strict time constraints.'
      },
      {
        round: '2. Phone Screen / Recruiter Chat',
        duration: '45-60 Minutes',
        focus: 'Resume deep dive, technical questions, and 1 coding problem.'
      },
      {
        round: '3. Virtual Onsite: Round 1 (DSA)',
        duration: '45-60 Minutes',
        focus: 'Linked Lists, Strings, Binary Search, or Stack problems.'
      },
      {
        round: '4. Virtual Onsite: Round 2 (Trees & Graphs)',
        duration: '45-60 Minutes',
        focus: 'Binary Trees, BST, DFS/BFS traversals, recursion.'
      },
      {
        round: '5. Virtual Onsite: Round 3 (System / Architecture)',
        duration: '45-60 Minutes',
        focus: 'Low-level OOP design, API design, or distributed systems.'
      },
      {
        round: '6. Virtual Onsite: Round 4 (Hiring Manager / AA)',
        duration: '45-60 Minutes',
        focus: 'Team fit, past project architecture, culture, and Growth Mindset.'
      }
    ],
    topTopics: [
      'Linked Lists & Binary Trees',
      'Binary Search & Two Pointers',
      'Object Oriented Design Patterns',
      'Database Schema Design & SQL',
      'Growth Mindset & Team Collaboration'
    ],
    sampleQuestions: [
      { id: 'reverse-linked-list', title: 'Reverse Linked List' },
      { id: 'valid-parentheses', title: 'Valid Parentheses' },
      { id: 'validate-binary-search-tree', title: 'Validate Binary Search Tree' },
      { id: 'binary-search', title: 'Binary Search' }
    ],
    culturalPrinciples: [
      { title: 'Growth Mindset', desc: 'View challenges as opportunities to learn rather than static limitations; learn-it-all vs know-it-all.' },
      { title: 'Customer Focus & Empathy', desc: 'Design software that is universally accessible and empowers every person and organization.' },
      { title: 'One Microsoft', desc: 'Cross-boundary collaboration without internal territorialism.' }
    ],
    interviewChecklist: [
      { id: 'm-chk-1', text: 'Demonstrate clean, readable, modular object-oriented code' },
      { id: 'm-chk-2', text: 'Highlight times you learned from failure during behavioral questions' },
      { id: 'm-chk-3', text: 'Discuss code maintainability, extensibility, and unit testing strategy' }
    ]
  },

  {
    id: 'adobe',
    name: 'Adobe',
    ticker: 'ADBE',
    logoColor: 'from-red-600 to-rose-700',
    difficulty: 'High',
    acceptanceRate: '~2.5%',
    hiringProcessDuration: '3 - 5 Weeks',
    headquarters: 'San Jose, CA',
    summary: 'Emphasizes core computer science fundamentals, OS concepts, multithreading, memory management, trees, dynamic programming, and creative problem solving.',
    interviewRounds: [
      {
        round: '1. Online Assessment',
        duration: '90 Minutes',
        focus: 'MCQs on CS fundamentals (OS, DBMS, OOP) + 2 coding problems.'
      },
      {
        round: '2. Technical Round 1',
        duration: '60 Minutes',
        focus: 'DSA (Arrays, Strings, Recursion) + Core OS & Memory management.'
      },
      {
        round: '3. Technical Round 2',
        duration: '60 Minutes',
        focus: 'Trees, Graphs, DP + Multithreading and Concurrency in Java/C++.'
      },
      {
        round: '4. Technical Round 3 (Design / Advanced)',
        duration: '60 Minutes',
        focus: 'Low Level Design (LLD), design patterns, and architectural trade-offs.'
      },
      {
        round: '5. HR / Director Round',
        duration: '45 Minutes',
        focus: 'Cultural fit, team collaboration, career trajectory, and behavioral questions.'
      }
    ],
    topTopics: [
      'Dynamic Programming & Strings',
      'Operating Systems & Concurrency',
      'Design Patterns (Singleton, Factory, Observer)',
      'Trees & Binary Search',
      'Memory Management & Pointers'
    ],
    sampleQuestions: [
      { id: 'trapping-rain-water', title: 'Trapping Rain Water' },
      { id: 'longest-substring-without-repeating-characters', title: 'Longest Substring Without Repeating Characters' },
      { id: '3sum', title: '3Sum' },
      { id: 'coin-change', title: 'Coin Change' }
    ],
    culturalPrinciples: [
      { title: 'Genuine & Exceptional', desc: 'Transparent integrity and continuous pursuit of technical craftsmanship.' },
      { title: 'Innovative & Involved', desc: 'Pioneering new creative paradigms and active community contribution.' }
    ],
    interviewChecklist: [
      { id: 'ad-chk-1', text: 'Review core OS concepts: Deadlock, Virtual Memory, and Thread Synchronization' },
      { id: 'ad-chk-2', text: 'Practice DP and Two Pointer problems thoroughly' },
      { id: 'ad-chk-3', text: 'Be prepared to write code without IDE assistance with clean syntax' }
    ]
  },

  {
    id: 'meta',
    name: 'Meta',
    ticker: 'META',
    logoColor: 'from-blue-600 to-indigo-700',
    difficulty: 'Very High',
    acceptanceRate: '~0.8%',
    hiringProcessDuration: '3 - 6 Weeks',
    headquarters: 'Menlo Park, CA',
    summary: 'Speed and precision are paramount. Meta rounds typically require solving TWO full LeetCode Medium/Hard algorithmic questions in 40 minutes with zero bugs.',
    interviewRounds: [
      {
        round: '1. Recruiter Screen',
        duration: '30 Minutes',
        focus: 'Background review, timeline, and candidate level calibration.'
      },
      {
        round: '2. Technical Screen',
        duration: '45 Minutes',
        focus: '2 coding problems in 40 mins (Arrays, Strings, Binary Search, Trees).'
      },
      {
        round: '3. Virtual Onsite: Coding 1',
        duration: '45 Minutes',
        focus: '2 coding problems (Graphs, Sliding Window, Two Pointers).'
      },
      {
        round: '4. Virtual Onsite: Coding 2',
        duration: '45 Minutes',
        focus: '2 coding problems (DP, Backtracking, Custom Data Structure).'
      },
      {
        round: '5. Virtual Onsite: System Design',
        duration: '45 Minutes',
        focus: 'Large-scale social architectures (e.g. Design Instagram Feed / WhatsApp).'
      },
      {
        round: '6. Virtual Onsite: Behavioral',
        duration: '45 Minutes',
        focus: 'Impact focus, resolving disagreements, and moving fast.'
      }
    ],
    topTopics: [
      'Two Problems in 40 Minutes Speed Execution',
      'Graph Traversals & BFS Shortest Path',
      'Binary Search & Sorted Arrays',
      'System Design (Feeds, Messaging, Real-time)',
      'Focus on Impact & Moving Fast'
    ],
    sampleQuestions: [
      { id: '3sum', title: '3Sum' },
      { id: 'number-of-islands', title: 'Number of Islands' },
      { id: 'subsets', title: 'Subsets' },
      { id: 'product-of-array-except-self', title: 'Product of Array Except Self' }
    ],
    culturalPrinciples: [
      { title: 'Move Fast', desc: 'Speed matters. Build and test iteratively rather than over-analyzing.' },
      { title: 'Focus on Long-Term Impact', desc: 'Prioritize solutions that create measurable long-term value.' },
      { title: 'Be Open', desc: 'Share information broadly and value transparent discourse.' }
    ],
    interviewChecklist: [
      { id: 'fb-chk-1', text: 'Practice solving standard LeetCode Mediums in under 15 minutes each' },
      { id: 'fb-chk-2', text: 'Communicate continuously while writing code without long silences' },
      { id: 'fb-chk-3', text: 'Practice System Design focusing on Feed Generation and Caching' }
    ]
  }
];
