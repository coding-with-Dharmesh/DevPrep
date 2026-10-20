/**
 * Comprehensive Developer Career Roadmaps for DevPrep
 * Roadmaps: Beginner, Frontend, Backend, Full-Stack, and DSA.
 */

export const MOCK_ROADMAPS = [
  {
    id: 'frontend',
    title: 'Frontend Engineer Career Track',
    badge: 'Popular',
    level: 'Intermediate',
    estimatedWeeks: '16-20 Weeks',
    color: 'from-blue-500 to-indigo-600',
    description: 'Master modern client-side engineering: JavaScript ES6+, React, TypeScript, Performance optimization, State management, and Web Architecture.',
    milestones: [
      {
        id: 'fe-phase-1',
        title: 'Phase 1: Foundations of Modern Web',
        duration: 'Weeks 1-4',
        description: 'Semantic HTML5, CSS Flexbox/Grid, and JavaScript ES6+ internals.',
        items: [
          { id: 'fe-html', text: 'Semantic HTML5 tags, accessibility (a11y), and SEO fundamentals' },
          { id: 'fe-css-layout', text: 'Master modern CSS: Flexbox, CSS Grid, animations, and Tailwind CSS' },
          { id: 'fe-js-basics', text: 'JS Engine internals: Scopes, Closures, Hoisting, and Prototypes' },
          { id: 'fe-js-async', text: 'Asynchronous JS: Event Loop, Promises, async/await, and Fetch API' }
        ]
      },
      {
        id: 'fe-phase-2',
        title: 'Phase 2: React & Modern UI Architecture',
        duration: 'Weeks 5-10',
        description: 'Component lifecycles, custom hooks, React Router, and state modeling.',
        items: [
          { id: 'fe-react-components', text: 'Functional components, JSX, and Props/State management patterns' },
          { id: 'fe-react-hooks', text: 'Deep dive into hooks: useState, useEffect, useMemo, useCallback, useRef' },
          { id: 'fe-custom-hooks', text: 'Building reusable custom hooks (e.g. useDebounce, useLocalStorage, useFetch)' },
          { id: 'fe-routing', text: 'Client-side routing with React Router (loaders, nested routes, protected routes)' },
          { id: 'fe-state-mgmt', text: 'Global state: Context API, Redux Toolkit, or Zustand' }
        ]
      },
      {
        id: 'fe-phase-3',
        title: 'Phase 3: TypeScript & Production Readiness',
        duration: 'Weeks 11-15',
        description: 'Static typing, testing frameworks, and web performance optimization.',
        items: [
          { id: 'fe-typescript', text: 'TypeScript: Generics, Utility Types, Interfaces vs Types, and React typing' },
          { id: 'fe-testing', text: 'Unit and integration testing with Vitest / Jest and React Testing Library' },
          { id: 'fe-perf', text: 'Core Web Vitals, code-splitting (React.lazy), tree-shaking, and memoization' },
          { id: 'fe-build-tools', text: 'Vite build tooling, modern bundlers, and CI/CD pipelines' }
        ]
      },
      {
        id: 'fe-phase-4',
        title: 'Phase 4: Advanced Systems & Next.js',
        duration: 'Weeks 16-20',
        description: 'Server components, SSR/SSG, security headers, and micro-frontends.',
        items: [
          { id: 'fe-nextjs', text: 'Next.js App Router: Server Components (RSC), SSR, SSG, and Server Actions' },
          { id: 'fe-security', text: 'Web Security: CORS, XSS, CSRF mitigation, and Content Security Policy' },
          { id: 'fe-capstone', text: 'Build & deploy a high-performance production SaaS capstone application' }
        ]
      }
    ]
  },

  {
    id: 'backend',
    title: 'Backend Engineer Career Track',
    badge: 'High Demand',
    level: 'Intermediate - Advanced',
    estimatedWeeks: '18-24 Weeks',
    color: 'from-emerald-500 to-teal-600',
    description: 'Architect scalable server applications, relational & NoSQL databases, REST/GraphQL APIs, message queues, and cloud deployments.',
    milestones: [
      {
        id: 'be-phase-1',
        title: 'Phase 1: Server Runtimes & API Fundamentals',
        duration: 'Weeks 1-5',
        description: 'Node.js/Express, Go or Java, HTTP status codes, and RESTful guidelines.',
        items: [
          { id: 'be-node-intro', text: 'Runtime internals: Node.js event loop, streams, and buffers' },
          { id: 'be-express-routing', text: 'REST API design: Express middleware, routing, and error handlers' },
          { id: 'be-validation', text: 'Request validation with Zod / Joi and comprehensive logging' },
          { id: 'be-auth-basics', text: 'Authentication: JWT, Session cookies, bcrypt password hashing, and OAuth 2.0' }
        ]
      },
      {
        id: 'be-phase-2',
        title: 'Phase 2: Database Mastery & ORMs',
        duration: 'Weeks 6-11',
        description: 'Relational databases (PostgreSQL), NoSQL (MongoDB), schema migrations, and indexing.',
        items: [
          { id: 'be-postgres', text: 'PostgreSQL: ACID transactions, foreign keys, normalization, and complex joins' },
          { id: 'be-indexing', text: 'Query optimization: EXPLAIN ANALYZE, B-Tree indexes, and connection pooling' },
          { id: 'be-mongodb', text: 'MongoDB: Document modeling, aggregation pipelines, and sharding concepts' },
          { id: 'be-orms', text: 'Prisma / TypeORM / Mongoose schema migrations and data relations' }
        ]
      },
      {
        id: 'be-phase-3',
        title: 'Phase 3: Caching, Queues & Distributed Systems',
        duration: 'Weeks 12-17',
        description: 'Redis in-memory caching, message brokers, and background worker jobs.',
        items: [
          { id: 'be-redis', text: 'Redis: Caching strategies (write-through/cache-aside), rate-limiting, pub/sub' },
          { id: 'be-queues', text: 'Asynchronous queues with BullMQ, RabbitMQ, or Apache Kafka' },
          { id: 'be-microservices', text: 'Microservices architecture vs modular monoliths & API Gateways' },
          { id: 'be-websockets', text: 'Real-time bidirectional communication using WebSockets and Socket.io' }
        ]
      },
      {
        id: 'be-phase-4',
        title: 'Phase 4: DevOps, Containers & Cloud',
        duration: 'Weeks 18-24',
        description: 'Docker containerization, AWS / GCP services, monitoring, and CI/CD.',
        items: [
          { id: 'be-docker', text: 'Docker: Multi-stage builds, Docker Compose, and container networking' },
          { id: 'be-cloud', text: 'Cloud primitives: AWS S3, ECS, RDS, IAM, and serverless Lambda functions' },
          { id: 'be-monitoring', text: 'Observability: Prometheus, Grafana, OpenTelemetry, and structured logging' }
        ]
      }
    ]
  },

  {
    id: 'dsa',
    title: 'Data Structures & Algorithms Mastery',
    badge: 'Essential',
    level: 'All Levels',
    estimatedWeeks: '12-16 Weeks',
    color: 'from-amber-500 to-orange-600',
    description: 'Systematic approach to conquering technical coding interviews for top tier tech firms (FAANG / MANGA).',
    milestones: [
      {
        id: 'dsa-phase-1',
        title: 'Phase 1: Asymptotic Analysis & Linear Structures',
        duration: 'Weeks 1-4',
        description: 'Big-O notation, Two pointers, Sliding window, and Hash Maps.',
        items: [
          { id: 'dsa-big-o', text: 'Big-O Time and Space Complexity analysis & recursion tree formulas' },
          { id: 'dsa-arrays', text: 'Arrays & Two Pointers patterns (Two Sum, 3Sum, Container with Most Water)' },
          { id: 'dsa-sliding-window', text: 'Fixed and dynamic Sliding Window technique (Substrings, Max Sum)' },
          { id: 'dsa-hash-maps', text: 'Hash Tables, collision handling, and prefix sums' },
          { id: 'dsa-linked-lists', text: 'Singly and Doubly Linked Lists: Reversal, Fast/Slow pointers, Cycle detection' }
        ]
      },
      {
        id: 'dsa-phase-2',
        title: 'Phase 2: Stacks, Queues & Binary Search',
        duration: 'Weeks 5-8',
        description: 'Monotonic stacks, BFS queues, and logarithmic search patterns.',
        items: [
          { id: 'dsa-stacks', text: 'Stacks: Matching brackets, Monotonic stack (Next Greater Element, Rain Water)' },
          { id: 'dsa-queues', text: 'Queues, Deques, and Circular Buffers' },
          { id: 'dsa-binary-search', text: 'Binary Search: Rotated arrays, Search on answer space (Capacity, Median)' },
          { id: 'dsa-heaps', text: 'Binary Heaps and Priority Queues: Top K Frequent Elements, Merge K Lists' }
        ]
      },
      {
        id: 'dsa-phase-3',
        title: 'Phase 3: Trees, Graphs & Backtracking',
        duration: 'Weeks 9-12',
        description: 'Binary trees, BSTs, Graph traversals, Topological sort, and Combinatorics.',
        items: [
          { id: 'dsa-trees-traversal', text: 'Binary Tree traversals: Pre/In/Post order, Level-order BFS, and DFS' },
          { id: 'dsa-bst', text: 'Binary Search Trees: Validation, LCA, Inorder successor, and Deletion' },
          { id: 'dsa-graphs-bfs-dfs', text: 'Graph traversals: BFS, DFS, Connected Components (Number of Islands)' },
          { id: 'dsa-topological-sort', text: "Directed Acyclic Graphs (DAG), Kahn's algorithm, and Course Schedule" },
          { id: 'dsa-backtracking', text: 'Backtracking: Subsets, Permutations, Combination Sum, and N-Queens' }
        ]
      },
      {
        id: 'dsa-phase-4',
        title: 'Phase 4: Dynamic Programming & Greedy',
        duration: 'Weeks 13-16',
        description: 'Overlapping subproblems, Memoization, Tabulation, and Interval Scheduling.',
        items: [
          { id: 'dsa-dp-1d', text: '1D Dynamic Programming: Climbing Stairs, House Robber, Coin Change' },
          { id: 'dsa-dp-2d', text: '2D DP: Longest Common Subsequence, Edit Distance, 0/1 Knapsack' },
          { id: 'dsa-greedy', text: 'Greedy choices: Jump Game, Gas Station, and Meeting Rooms / Intervals' },
          { id: 'dsa-mock-rounds', text: 'Timed Mock Coding assessments under 45-minute interview pressure' }
        ]
      }
    ]
  },

  {
    id: 'fullstack',
    title: 'Full-Stack Software Engineer',
    badge: 'Comprehensive',
    level: 'Intermediate - Advanced',
    estimatedWeeks: '20-26 Weeks',
    color: 'from-purple-500 to-pink-600',
    description: 'Bridge frontend user experiences with robust backend systems, databases, cloud architecture, and DevOps.',
    milestones: [
      {
        id: 'fs-phase-1',
        title: 'Phase 1: Full-Stack Architecture Principles',
        duration: 'Weeks 1-6',
        description: 'End-to-end data flow, client vs server rendering, and git team workflows.',
        items: [
          { id: 'fs-git', text: 'Advanced Git: Rebasing, cherry-picking, PR reviews, and GitHub Actions' },
          { id: 'fs-react-node', text: 'Connecting React client to Express REST API with unified TypeScript types' },
          { id: 'fs-monorepo', text: 'Monorepo tooling (Turborepo or pnpm workspaces) for shared codebases' }
        ]
      },
      {
        id: 'fs-phase-2',
        title: 'Phase 2: Authentication & Security Patterns',
        duration: 'Weeks 7-12',
        description: 'Enterprise grade authentication, RBAC authorization, and API security.',
        items: [
          { id: 'fs-rbac', text: 'Role-Based Access Control (RBAC) and permission matrices' },
          { id: 'fs-oauth', text: 'Social OAuth integration (Google, GitHub) with secure session handling' },
          { id: 'fs-csrf-cors', text: 'Cross-origin configuration, CSRF prevention, and rate-limiting safeguards' }
        ]
      },
      {
        id: 'fs-phase-3',
        title: 'Phase 3: Database & Cloud Infrastructure',
        duration: 'Weeks 13-19',
        description: 'Dual relational + caching layers, file uploads, and container deployment.',
        items: [
          { id: 'fs-db-layer', text: 'PostgreSQL + Prisma with automated migration scripts in CI' },
          { id: 'fs-caching', text: 'Redis caching layer for high-throughput API endpoints' },
          { id: 'fs-s3-upload', text: 'Direct client-to-cloud presigned URL uploads (AWS S3 or Cloudinary)' }
        ]
      },
      {
        id: 'fs-phase-4',
        title: 'Phase 4: Production Observability & Scale',
        duration: 'Weeks 20-26',
        description: 'Real user monitoring, zero-downtime deployments, and end-to-end testing.',
        items: [
          { id: 'fs-e2e', text: 'End-to-End automation tests using Playwright or Cypress' },
          { id: 'fs-deploy', text: 'Zero-downtime deployment setup on Vercel, Render, or AWS ECS' },
          { id: 'fs-monitoring', text: 'Error tracking with Sentry, logging, and performance alerts' }
        ]
      }
    ]
  },

  {
    id: 'beginner',
    title: 'Beginner Developer Foundations',
    badge: 'Starter',
    level: 'Beginner',
    estimatedWeeks: '10-14 Weeks',
    color: 'from-emerald-400 to-cyan-500',
    description: 'Zero-to-One guide covering programming fundamentals, computer science basics, and building your first functional web applications.',
    milestones: [
      {
        id: 'beg-phase-1',
        title: 'Phase 1: How Computers & Code Work',
        duration: 'Weeks 1-3',
        description: 'Bits, bytes, algorithms, terminal commands, and version control.',
        items: [
          { id: 'beg-cs-fundamentals', text: 'Understand how the internet, DNS, HTTP, and browsers work' },
          { id: 'beg-cli', text: 'Master Command Line Interface (Bash / PowerShell navigation and commands)' },
          { id: 'beg-git-basics', text: 'Version control with Git: commit, push, pull, branches, and GitHub' }
        ]
      },
      {
        id: 'beg-phase-2',
        title: 'Phase 2: Programming Fundamentals',
        duration: 'Weeks 4-7',
        description: 'Variables, loops, conditionals, functions, and data structures.',
        items: [
          { id: 'beg-js-syntax', text: 'JavaScript syntax: variables, data types, functions, and arrays/objects' },
          { id: 'beg-logic', text: 'Solving algorithmic problem challenges with loops and conditionals' },
          { id: 'beg-debugging', text: 'Using browser DevTools, breakpoints, and console debugging' }
        ]
      },
      {
        id: 'beg-phase-3',
        title: 'Phase 3: Building Interactive Web Apps',
        duration: 'Weeks 8-11',
        description: 'DOM manipulation, forms, and consuming third-party APIs.',
        items: [
          { id: 'beg-dom', text: 'DOM manipulation: selecting elements, event listeners, and dynamic UI' },
          { id: 'beg-fetch', text: 'Fetching live data from public APIs and rendering cards/tables' },
          { id: 'beg-localstorage', text: 'Persisting application state in browser localStorage' }
        ]
      },
      {
        id: 'beg-phase-4',
        title: 'Phase 4: Launching Your Portfolio',
        duration: 'Weeks 12-14',
        description: 'Showcase projects, resume building, and preparing for junior job hunts.',
        items: [
          { id: 'beg-portfolio', text: 'Design and deploy a personal developer portfolio website' },
          { id: 'beg-resume', text: 'Craft an ATS-compliant software developer resume and LinkedIn profile' },
          { id: 'beg-first-interviews', text: 'Practice beginner coding challenges and technical phone screens' }
        ]
      }
    ]
  }
];
