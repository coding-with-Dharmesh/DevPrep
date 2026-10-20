/**
 * Comprehensive Interview Library for DevPrep
 * Covers: Java, JavaScript, OOP, DBMS, SQL, Operating Systems,
 * Computer Networks, System Design, and Behavioral Questions.
 */

export const INTERVIEW_TOPICS = [
  'All',
  'Java',
  'JavaScript',
  'OOP',
  'DBMS & SQL',
  'Operating Systems',
  'Computer Networks',
  'System Design',
  'Behavioral'
];

export const MOCK_INTERVIEW_QUESTIONS = [
  // --- JAVASCRIPT ---
  {
    id: 'js-event-loop',
    topic: 'JavaScript',
    title: 'Explain the JavaScript Event Loop, Call Stack, Microtasks, and Macrotasks',
    difficulty: 'Medium',
    summary: 'How JavaScript executes asynchronous code in a single-threaded runtime using the event loop and task queues.',
    answer: `### Overview
JavaScript has a **single-threaded** runtime engine (one Call Stack and one Memory Heap). Asynchronous behavior is facilitated by browser Web APIs (or libuv in Node.js) and the **Event Loop**.

### Components of the Architecture
1. **Call Stack**: Executes synchronous instructions LIFO (Last In, First Out).
2. **Web APIs / Node APIs**: Handles async operations such as \`fetch()\`, \`setTimeout\`, DOM events, and crypto.
3. **Microtask Queue**: Holds callbacks from Promises (\`.then\`, \`.catch\`, \`.finally\`), \`queueMicrotask()\`, and \`MutationObserver\`. **Always takes highest priority over macrotasks!**
4. **Macrotask Queue (Task Queue)**: Holds callbacks from \`setTimeout\`, \`setInterval\`, \`setImmediate\`, and I/O.
5. **Event Loop**: Constantly checks if the Call Stack is empty. Once empty:
   - It drains **all microtasks** in the microtask queue until it is completely dry.
   - It re-renders the DOM if necessary.
   - It picks the **oldest macrotask** from the task queue and pushes it to the Call Stack.

### Code Execution Example:
\`\`\`javascript
console.log('1'); // Synchronous

setTimeout(() => {
  console.log('2'); // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // Microtask
});

console.log('4'); // Synchronous

// Output order: 1 -> 4 -> 3 -> 2
\`\`\`

### Common Pitfalls in Interviews:
- Believing \`setTimeout(fn, 0)\` executes instantly. It only specifies a *minimum* delay before being enqueued into the macrotask queue.
- Starvation: If microtasks continuously schedule new microtasks, the macrotask queue and UI rendering will be starved!`,
    tags: ['Core JS', 'Async', 'Event Loop', 'Engine']
  },

  {
    id: 'js-closures',
    topic: 'JavaScript',
    title: 'What is a Closure in JavaScript and what are its practical use cases?',
    difficulty: 'Easy',
    summary: 'Lexical scoping, persistent outer variable references, data privacy, and memoization.',
    answer: `### Definition
A **closure** is the combination of a function bundled together with references to its surrounding state (**the lexical environment**). In other words, a closure gives an inner function access to an outer function's scope even after the outer function has finished executing.

### Code Example:
\`\`\`javascript
function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable via closure

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.getCount());  // 11
// count variable cannot be accessed directly from outside!
\`\`\`

### Practical Real-World Use Cases:
1. **Data Encapsulation / Emulating Private Variables**: Protecting variables from external mutation.
2. **Function Currying & Partial Application**: Pre-configuring functions with preset parameters.
3. **Event Handlers & Callbacks**: Retaining context in event listeners or async hooks.
4. **Memoization / Caching**: Caching expensive function return values based on arguments.`,
    tags: ['Core JS', 'Closures', 'Scope', 'Design Patterns']
  },

  // --- JAVA ---
  {
    id: 'java-jvm-memory',
    topic: 'Java',
    title: 'Explain JVM Memory Architecture (Heap, Stack, Metaspace) and Garbage Collection',
    difficulty: 'Hard',
    summary: 'Detailed explanation of JVM memory regions, Young/Old generation, and modern GC algorithms.',
    answer: `### JVM Memory Model
The Java Virtual Machine organizes memory into several runtime data areas:
1. **Heap Area**: Shared across all threads. Stores all class instances and arrays.
   - **Young Generation**:
     - *Eden Space*: Where newly allocated objects arrive.
     - *Survivor Spaces (S0 / S1)*: Objects that survive Minor GC are copied here and aged.
   - **Old (Tenured) Generation**: Holds long-lived objects that survived multiple Minor GC cycles (based on \`MaxTenuringThreshold\`).
2. **Stack Area**: Thread-private. Stores stack frames containing local variables, partial results, and method invocation/return data. Destroyed when thread ends.
3. **Metaspace (Native Memory)**: Introduced in Java 8 replacing PermGen. Stores class metadata, bytecode, and runtime constant pool in native OS memory.
4. **PC Registers**: Thread-private, stores the address of the JVM instruction currently being executed.

### Garbage Collection (GC) Mechanisms:
- **Mark & Sweep**: Identifies live objects reachable from GC Roots (thread stacks, static variables, JNI references) and reclaims unreachable memory.
- **Stop-The-World (STW)**: Pauses application threads while garbage collectors compact or finalize objects.
- **Popular Collectors**:
  - **G1 GC**: Region-based garbage collector, default since Java 9, aims for predictable pause times.
  - **ZGC / Shenandoah**: Ultra-low pause time collectors (< 1ms pauses) operating concurrently with application threads.`,
    tags: ['JVM', 'Garbage Collection', 'Memory Management', 'Java']
  },

  {
    id: 'java-multithreading',
    topic: 'Java',
    title: 'Difference between synchronized, volatile, and ReentrantLock in Java',
    difficulty: 'Medium',
    summary: 'Thread safety, memory visibility, race conditions, and synchronization primitives.',
    answer: `### Comparison of Java Concurrency Primitives

| Feature | \`volatile\` | \`synchronized\` | \`ReentrantLock\` |
| :--- | :--- | :--- | :--- |
| **Atomicity** | No (only visibility) | Yes | Yes |
| **Visibility** | Yes (flushes to main RAM) | Yes (on monitor release) | Yes |
| **Scope** | Variables only | Methods or code blocks | Explicit code blocks |
| **Fairness Policy** | N/A | No (random lock contention) | Yes (\`new ReentrantLock(true)\`) |
| **Interruption** | N/A | Cannot interrupt waiting thread | Supports \`lockInterruptibly()\` |
| **Timeout Support** | N/A | No | \`tryLock(time, unit)\` |

### Key Takeaway for Interviews:
- Use \`volatile\` for simple flags where one thread writes and others read.
- Use \`synchronized\` for simplicity and built-in JVM intrinsic monitor locks.
- Use \`ReentrantLock\` when you need timed lock attempts, fair scheduling, or multiple condition variables (\`Condition\`).`,
    tags: ['Java', 'Concurrency', 'Multithreading', 'Locks']
  },

  // --- OBJECT ORIENTED PROGRAMMING (OOP) ---
  {
    id: 'oop-solid-principles',
    topic: 'OOP',
    title: 'Explain SOLID Design Principles with Real-world Architecture Examples',
    difficulty: 'Medium',
    summary: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.',
    answer: `### 1. S - Single Responsibility Principle (SRP)
> *"A class should have one, and only one, reason to change."*
- **Bad**: \`UserService\` handles saving users to DB, generating PDF invoices, and sending notification emails.
- **Good**: Split into \`UserRepository\`, \`InvoiceGenerator\`, and \`NotificationService\`.

### 2. O - Open/Closed Principle (OCP)
> *"Software entities should be open for extension, but closed for modification."*
- Add new behavior by subclassing or implementing interfaces rather than modifying battle-tested existing code.
- *Example*: Strategy pattern for payment gateways (\`StripeProcessor\`, \`PayPalProcessor\` implementing \`PaymentProcessor\`).

### 3. L - Liskov Substitution Principle (LSP)
> *"Subtypes must be substitutable for their base types without altering correctness."*
- Classic violation: \`Square\` extending \`Rectangle\` where changing width alters height unexpectedly.

### 4. I - Interface Segregation Principle (ISP)
> *"Clients should not be forced to depend on interfaces they do not use."*
- Favor small, cohesive interfaces over "fat" monolith interfaces.
- *Example*: Instead of \`WorkerInterface\` with \`code()\`, \`eat()\`, \`sleep()\`, have \`Codeable\` and \`Eatable\`.

### 5. D - Dependency Inversion Principle (DIP)
> *"High-level modules should not depend on low-level modules; both should depend on abstractions."*
- Depend on abstractions (interfaces) rather than concrete implementations. Used extensively in Spring Boot, NestJS, and Angular via Dependency Injection.`,
    tags: ['OOP', 'SOLID', 'Design Patterns', 'Architecture']
  },

  // --- DBMS & SQL ---
  {
    id: 'dbms-acid-transactions',
    topic: 'DBMS & SQL',
    title: 'Explain ACID Properties in Relational Databases and Transaction Isolation Levels',
    difficulty: 'Medium',
    summary: 'Atomicity, Consistency, Isolation, Durability, and Dirty Reads vs Phantom Reads.',
    answer: `### ACID Properties
- **Atomicity**: "All or nothing". Either the entire transaction succeeds, or in case of failure, all operations roll back.
- **Consistency**: The database transitions from one valid state to another, preserving all schema constraints, foreign keys, and triggers.
- **Isolation**: Concurrent transactions execute without interfering with one another.
- **Durability**: Once a transaction commits, its modifications are permanently recorded (in WAL / Write-Ahead Log) even in the event of power outages or crashes.

### Transaction Isolation Levels & Anomalies:
1. **Read Uncommitted**: Suffers from *Dirty Reads* (reading uncommitted changes from another transaction that might later roll back).
2. **Read Committed**: Solves Dirty Reads, but allows *Non-Repeatable Reads* (re-reading a row yields modified values).
3. **Repeatable Read**: Solves Non-Repeatable Reads using snapshot isolation/locks, but may allow *Phantom Reads* (new rows inserted matching search condition).
4. **Serializable**: Strict serial execution via two-phase locking (2PL) or optimistic concurrency control (OCC). Highest isolation, lowest throughput.`,
    tags: ['DBMS', 'SQL', 'Transactions', 'ACID']
  },

  {
    id: 'dbms-indexes-btree',
    topic: 'DBMS & SQL',
    title: 'How Database Indexes Work: B-Tree vs Hash Indexes and Composite Index Ordering',
    difficulty: 'Hard',
    summary: 'Internal structure of B+ Trees, lookup complexity, clustered vs non-clustered, and Leftmost Prefix Rule.',
    answer: `### Why B+ Trees in Databases?
Almost all relational databases (PostgreSQL, MySQL InnoDB, Oracle) use **B+ Trees** for primary and secondary indexes rather than binary search trees or hash tables because:
1. **High Fan-out**: Nodes correspond to disk page sizes (e.g. 16KB), fitting hundreds of keys per node. A tree with height 3 or 4 can index millions of rows with minimal disk I/O.
2. **Sequential Leaf Pointers**: In B+ Trees, all actual data pointers reside strictly in the bottom leaf nodes, linked as a bidirectional linked list. This enables lightning-fast **range queries** (\`BETWEEN\`, \`>\`, \`<\`, \`ORDER BY\`).
3. **Logarithmic Lookup**: Search, insert, and delete all execute in \`O(log N)\`.

### Hash Indexes vs B-Tree:
- Hash indexes provide \`O(1)\` equality lookups (\`WHERE id = 100\`), but **cannot** perform range scans, prefix searches, or sorting.

### The Leftmost Prefix Rule (Composite Indexes):
If an index exists on \`(status, created_at, user_id)\`:
- Queries filtering on \`status\` OR \`(status, created_at)\` will effectively use the index.
- A query filtering only on \`created_at\` **cannot** utilize this index!`,
    tags: ['DBMS', 'B-Tree', 'Performance', 'Indexing']
  },

  // --- OPERATING SYSTEMS ---
  {
    id: 'os-deadlock-conditions',
    topic: 'Operating Systems',
    title: 'Deadlock in Operating Systems: Coffman Conditions, Prevention, and Banker’s Algorithm',
    difficulty: 'Medium',
    summary: 'The four necessary conditions for deadlocks, resource allocation graphs, and avoidance strategies.',
    answer: `### Definition
A **Deadlock** occurs when a set of concurrent processes are permanently blocked because each process holds a resource and waits for another resource held by another process.

### The 4 Coffman Conditions (All 4 must hold simultaneously):
1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode.
2. **Hold and Wait**: A process holds at least one resource while waiting to acquire additional resources held by others.
3. **No Preemption**: Resources cannot be forcibly confiscated from a process; they can only be released voluntarily.
4. **Circular Wait**: A closed chain of processes exists where \`P0\` waits for a resource held by \`P1\`, and \`Pn\` waits for \`P0\`.

### Deadlock Handling Strategies:
- **Prevention**: Invalidate any one of the 4 Coffman conditions (e.g. enforce strict global resource ordering to prevent circular wait).
- **Avoidance**: Use dynamic resource checking such as Dijkstra's **Banker's Algorithm** to ensure system remains in a "Safe State".
- **Detection & Recovery**: Allow deadlock to happen, detect via cycle detection in Resource Allocation Graph (RAG), and kill processes or preempt resources.
- **Ostrich Algorithm**: Ignore the problem (used by most general-purpose OS like Linux and Windows when deadlocks are rare).`,
    tags: ['OS', 'Deadlock', 'Concurrency', 'Process Management']
  },

  // --- COMPUTER NETWORKS ---
  {
    id: 'cn-tcp-handshake',
    topic: 'Computer Networks',
    title: 'TCP 3-Way Handshake, 4-Way Termination, and TIME_WAIT State Explained',
    difficulty: 'Medium',
    summary: 'Connection establishment, sequence synchronization, graceful teardown, and why TIME_WAIT is essential.',
    answer: `### TCP 3-Way Handshake (Connection Establishment)
1. **SYN**: Client sends a SYN segment with initial sequence number \`seq = x\`. Client state: \`SYN_SENT\`.
2. **SYN-ACK**: Server responds with its own SYN sequence number \`seq = y\` and acknowledges client's sequence: \`ack = x + 1\`. Server state: \`SYN_RCVD\`.
3. **ACK**: Client acknowledges server sequence with \`ack = y + 1\`. Client and server enter \`ESTABLISHED\` state.

### TCP 4-Way Termination (Connection Teardown)
Because TCP is full-duplex (data flows independently in both directions):
1. **FIN (Client -> Server)**: Client says "I have finished sending data".
2. **ACK (Server -> Client)**: Server acknowledges client's FIN. (Server can still send remaining buffered data).
3. **FIN (Server -> Client)**: Server finishes sending and transmits its own FIN.
4. **ACK (Client -> Server)**: Client sends final ACK.

### Why does TIME_WAIT exist?
The initiator stays in **TIME_WAIT** for **2 * MSL (Maximum Segment Lifetime)** (~2 minutes) to:
- Ensure the final ACK was reliably received by the other peer (if lost, retransmit).
- Allow lingering duplicate packets from the connection to drain from the network so they don't corrupt a new socket on the same IP:port.`,
    tags: ['Networks', 'TCP/IP', 'Handshake', 'Protocols']
  },

  // --- SYSTEM DESIGN ---
  {
    id: 'sd-rate-limiter',
    topic: 'System Design',
    title: 'Design a Distributed Rate Limiter (Token Bucket vs Leaky Bucket vs Sliding Window)',
    difficulty: 'Hard',
    summary: 'Architecting a scalable, low-latency API rate limiting service using Redis and sliding window counters.',
    answer: `### Requirements & Scale
- Limit client requests to e.g. 100 requests per minute per API key or IP.
- Low latency overhead (< 5ms).
- High availability across distributed servers.

### Common Rate Limiting Algorithms:
1. **Token Bucket**:
   - Central bucket holds up to \`Capacity\` tokens. Refilled at fixed rate \`r\` tokens/sec.
   - Each incoming request consumes 1 token. If empty, request is rejected with HTTP 429.
   - *Pros*: Memory efficient, permits controlled bursts. Used by AWS and Stripe.
2. **Leaky Bucket**:
   - Requests enter a FIFO queue and leak out at a constant rate.
   - *Pros*: Smooths traffic, but delays bursts.
3. **Sliding Window Counter**:
   - Blends weighted counts of the current window and previous window:
     \`\`\`
     requests = current_count + prev_count * (1 - current_window_progress)
     \`\`\`
   - *Pros*: Low memory footprint, prevents burst abuse at window boundaries.

### Distributed Architecture:
- Place Rate Limiter at the **API Gateway** level.
- Store counters in **Redis** with TTL.
- Use **Redis Lua Scripts** or Redis sorted sets (\`ZADD\`, \`ZREMRANGEBYSCORE\`) to execute counter check-and-increment atomically without race conditions!
- Return HTTP headers:
  - \`X-RateLimit-Limit\`: 100
  - \`X-RateLimit-Remaining\`: 42
  - \`X-RateLimit-Reset\`: 1729382900`,
    tags: ['System Design', 'Redis', 'Rate Limiting', 'Scalability']
  },

  // --- BEHAVIORAL ---
  {
    id: 'beh-star-conflict',
    topic: 'Behavioral',
    title: 'Behavioral: Tell me about a time you had a technical disagreement with a teammate',
    difficulty: 'Medium',
    summary: 'Mastering the STAR framework (Situation, Task, Action, Result) for behavioral engineering rounds.',
    answer: `### The STAR Framework

#### 1. Situation (15% of your answer)
"On our payments team at my previous company, we were redesigning our microservice architecture to migrate from synchronous REST polling to event-driven processing."

#### 2. Task (15% of your answer)
"A senior engineer advocated strongly for Apache Kafka due to its high throughput and durability, while I proposed RabbitMQ because our team had strict routing requirements, lower total throughput, and limited operational bandwidth for Kafka cluster management."

#### 3. Action (50% of your answer - focus on 'I', not just 'we')
- "Instead of engaging in opinion-based debates, I suggested we build an objective decision matrix evaluating 4 criteria: Operational complexity, required message delivery guarantees, routing needs, and team familiarity.
- I drafted a 2-day proof-of-concept benchmark measuring latency and setup time under our expected traffic.
- During the review meeting, I actively listened to his concerns regarding future data replication to data warehouses, which was a valid point I had underweighted.
- We compromised: We chose RabbitMQ for the immediate transactional payment state machine, and documented a blueprint to introduce Kafka later if analytics event streams required it."

#### 4. Result (20% of your answer - quantify if possible!)
"We launched on schedule without operational incidents. System latency dropped by 45%, and the collaborative benchmark process strengthened mutual trust between me and that senior engineer."

### Key Interviewer Evaluation Signals:
- High emotional intelligence (EQ) and active listening.
- Data-driven decision making over ego.
- Ability to disagree and commit.`,
    tags: ['Behavioral', 'STAR Method', 'Leadership', 'Communication']
  }
];
