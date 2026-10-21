export interface SkillTopicLevel {
  level_number: number;
  topic: string;
}

export interface SkillRoadmap {
  skill_set_id: number;
  skill_set_name: string;
  levels: SkillTopicLevel[];
}

export const SKILL_TOPICS_MAP: Record<number, SkillTopicLevel[]> = {
  1: [ // Data Structures & Algorithms
    { level_number: 1, topic: "Time and Space Complexity, Big-O Notation, Primitive Arrays" },
    { level_number: 2, topic: "Singly & Doubly Linked Lists, Pointer Manipulation" },
    { level_number: 3, topic: "Stacks, Queues, Circular Buffers, and Deques" },
    { level_number: 4, topic: "Recursion Basics, Divide and Conquer, Binary Search" },
    { level_number: 5, topic: "Binary Trees, BST Operations, Tree Traversals (DFS/BFS)" },
    { level_number: 6, topic: "Hash Tables, Collision Handling, Heap & Priority Queue" },
    { level_number: 7, topic: "Graph Representations, Dijkstra's & Shortest Path Algorithms" },
    { level_number: 8, topic: "Dynamic Programming: 1D & 2D Memoization and Tabulation" },
    { level_number: 9, topic: "Advanced Graphs (Tarjan's, Bridges, Minimum Spanning Trees)" },
    { level_number: 10, topic: "Segment Trees, Fenwick Trees, and Competitive Problem Solving" }
  ],
  2: [ // Object-Oriented Programming
    { level_number: 1, topic: "Classes, Objects, Constructors, and Access Modifiers" },
    { level_number: 2, topic: "Encapsulation, Data Hiding, Getters and Setters" },
    { level_number: 3, topic: "Inheritance, Super Keyword, Method Overriding" },
    { level_number: 4, topic: "Polymorphism: Compile-Time vs Runtime Dispatch" },
    { level_number: 5, topic: "Abstract Classes, Interfaces, and Multiple Inheritance Models" },
    { level_number: 6, topic: "SOLID Design Principles: Single Responsibility & Open-Closed" },
    { level_number: 7, topic: "Creational & Structural Patterns: Factory, Singleton, Adapter" },
    { level_number: 8, topic: "Behavioral Patterns: Observer, Strategy, Command Pattern" },
    { level_number: 9, topic: "Dependency Injection, Inversion of Control, Unit Testability" },
    { level_number: 10, topic: "Domain-Driven Design, Clean Architecture, and Anti-Patterns" }
  ],
  3: [ // SQL & Databases
    { level_number: 1, topic: "Relational Concepts, Tables, Primary Keys, and Data Types" },
    { level_number: 2, topic: "Basic DML: SELECT, INSERT, UPDATE, DELETE, WHERE Clauses" },
    { level_number: 3, topic: "Joins: INNER, LEFT, RIGHT, FULL OUTER, Self Joins" },
    { level_number: 4, topic: "Aggregation: GROUP BY, HAVING, Aggregate Functions" },
    { level_number: 5, topic: "Subqueries, Common Table Expressions (CTEs), and Views" },
    { level_number: 6, topic: "Window Functions: ROW_NUMBER, RANK, DENSE_RANK, Partition By" },
    { level_number: 7, topic: "Database Normalization (1NF to BCNF) and Integrity Constraints" },
    { level_number: 8, topic: "Indexing Mechanisms: B-Trees, Hash Indexes, Query Execution Plans" },
    { level_number: 9, topic: "ACID Properties, Transaction Isolation Levels, Deadlock Prevention" },
    { level_number: 10, topic: "Query Tuning, Sharding, Read Replicas, and NoSQL Integration" }
  ],
  4: [ // Cloud Fundamentals (AWS/Azure)
    { level_number: 1, topic: "Cloud Computing Models: IaaS, PaaS, SaaS, Public vs Hybrid Cloud" },
    { level_number: 2, topic: "Core Compute Services: AWS EC2 / Azure VMs and Virtual Machines" },
    { level_number: 3, topic: "Object and Block Storage: S3 Buckets, Azure Blob, EBS Volumes" },
    { level_number: 4, topic: "Virtual Networking: VPC, Subnets, Security Groups, NAT Gateways" },
    { level_number: 5, topic: "Identity & Access Management (IAM): Policies, Roles, and MFA" },
    { level_number: 6, topic: "Load Balancing & Auto Scaling Groups for High Availability" },
    { level_number: 7, topic: "Managed Databases: RDS, Aurora, Azure SQL, DynamoDB basics" },
    { level_number: 8, topic: "Serverless Computing: AWS Lambda, API Gateway, CloudWatch Monitoring" },
    { level_number: 9, topic: "Infrastructure as Code: Terraform or CloudFormation Fundamentals" },
    { level_number: 10, topic: "Multi-Region Disaster Recovery, Well-Architected Framework, FinOps" }
  ],
  5: [ // Operating Systems
    { level_number: 1, topic: "OS Architecture: Kernel vs User Space, System Calls" },
    { level_number: 2, topic: "Processes vs Threads, PCB, Context Switching Mechanism" },
    { level_number: 3, topic: "CPU Scheduling Algorithms: FCFS, SJF, Round Robin, Multi-Queue" },
    { level_number: 4, topic: "Inter-Process Communication (IPC): Pipes, Shared Memory, Message Queues" },
    { level_number: 5, topic: "Process Synchronization: Race Conditions, Critical Section, Mutex" },
    { level_number: 6, topic: "Semaphores, Monitors, and Classical Concurrency Problems" },
    { level_number: 7, topic: "Deadlocks: Necessary Conditions, Bankers Algorithm, Detection" },
    { level_number: 8, topic: "Memory Management: Paging, Segmentation, Translation Lookaside Buffer" },
    { level_number: 9, topic: "Virtual Memory: Page Faults, LRU Page Replacement Policies" },
    { level_number: 10, topic: "File Systems Architecture, Disk Scheduling, and I/O Subsystems" }
  ],
  6: [ // Computer Networks
    { level_number: 1, topic: "OSI 7-Layer Reference Model and TCP/IP Protocol Suite" },
    { level_number: 2, topic: "Physical & Data Link Layers: Framing, MAC Addresses, ARP" },
    { level_number: 3, topic: "Network Layer: IPv4/IPv6 Addressing, Subnetting, CIDR Notation" },
    { level_number: 4, topic: "Routing Basics: Static vs Dynamic, Distance Vector & Link State" },
    { level_number: 5, topic: "Transport Layer: UDP vs TCP, Port Numbers, Sockets" },
    { level_number: 6, topic: "TCP Mechanics: Three-Way Handshake, Flow Control (Sliding Window)" },
    { level_number: 7, topic: "TCP Congestion Control: Slow Start, Congestion Avoidance, Fast Recovery" },
    { level_number: 8, topic: "Application Protocols: DNS Hierarchy, HTTP/1.1 vs HTTP/2 vs HTTP/3" },
    { level_number: 9, topic: "Network Security: SSL/TLS Handshake, Symmetric/Asymmetric Encryption" },
    { level_number: 10, topic: "Firewalls, Proxies, VPNs, CDN Architecture, and WebSocket Protocols" }
  ],
  7: [ // Aptitude & Logical Reasoning
    { level_number: 1, topic: "Number Systems, Divisibility Rules, Prime Factorization, LCM/HCF" },
    { level_number: 2, topic: "Percentages, Profit & Loss, Simple and Compound Interest" },
    { level_number: 3, topic: "Ratios, Proportions, Mixtures and Allegations, Averages" },
    { level_number: 4, topic: "Time, Speed & Distance: Trains, Boats & Streams, Races" },
    { level_number: 5, topic: "Time & Work, Pipes & Cisterns, Efficiency Calculations" },
    { level_number: 6, topic: "Permutations, Combinations, and Classical Probability" },
    { level_number: 7, topic: "Data Interpretation: Tables, Bar Charts, Line Graphs, Pie Charts" },
    { level_number: 8, topic: "Logical Deductions: Syllogisms, Blood Relations, Direction Sense" },
    { level_number: 9, topic: "Seating Arrangements: Linear and Circular, Multi-Condition Puzzles" },
    { level_number: 10, topic: "Critical Thinking, Statement-Assumption, Cause & Effect Analysis" }
  ],
  8: [ // Communication & Behavioral
    { level_number: 1, topic: "Active Listening, Clarity of Thought, and Concise Verbal Articulation" },
    { level_number: 2, topic: "Professional Email Etiquette, Technical Documentation Standards" },
    { level_number: 3, topic: "Elevator Pitch: Introducing Yourself and Your Core Strengths" },
    { level_number: 4, topic: "STAR Method: Structuring Behavioral and Experiential Answers" },
    { level_number: 5, topic: "Handling Conflict: Resolution Strategies in Diverse Team Dynamics" },
    { level_number: 6, topic: "Cross-Functional Collaboration: Working with Business & Product Peers" },
    { level_number: 7, topic: "Presentation Skills: Visual Storytelling and Executive Summaries" },
    { level_number: 8, topic: "Receiving & Incorporating Constructive Feedback Without Defensiveness" },
    { level_number: 9, topic: "Negotiation Tactics: Scope, Timelines, and Solution Trade-Offs" },
    { level_number: 10, topic: "Leadership Presence: Mentorship, Strategic Empathy, Enterprise Agility" }
  ],
  9: [ // Web Development Basics
    { level_number: 1, topic: "Semantic HTML5 Elements, Document Structure, Forms and Accessibility" },
    { level_number: 2, topic: "CSS3 Fundamentals: Box Model, Flexbox, CSS Grid Layouts" },
    { level_number: 3, topic: "Responsive Design: Mobile-First Queries, Fluid Typography, Viewports" },
    { level_number: 4, topic: "JavaScript Core: ES6+ Syntax, Scoping, Closures, Array Methods" },
    { level_number: 5, topic: "DOM Manipulation, Event Bubbling, Event Delegation, LocalStorage" },
    { level_number: 6, topic: "Asynchronous JS: Promises, Async/Await, Fetch API, Error Handling" },
    { level_number: 7, topic: "Modern React: Components, JSX, Props, State, and Component Lifecycle" },
    { level_number: 8, topic: "React Hooks: useEffect, useMemo, useCallback, Custom Reusable Hooks" },
    { level_number: 9, topic: "Client-Side Routing, Global State Management, Form Validation" },
    { level_number: 10, topic: "Web Performance: Bundle Splitting, Lazy Loading, Lighthouse Auditing" }
  ],
  10: [ // System Design (Intro)
    { level_number: 1, topic: "Client-Server Architecture, Monolith vs Microservices Trade-offs" },
    { level_number: 2, topic: "Horizontal vs Vertical Scaling, Load Balancer Strategies (Round Robin, IP Hash)" },
    { level_number: 3, topic: "Caching Strategies: Redis/Memcached, Write-Through vs Write-Back" },
    { level_number: 4, topic: "Database Choices: SQL vs NoSQL, Document, Key-Value, Graph Stores" },
    { level_number: 5, topic: "CAP Theorem, Eventual Consistency, PACELC Trade-Offs in Distributed Systems" },
    { level_number: 6, topic: "Message Queues: Asynchronous Processing with Kafka, RabbitMQ, SQS" },
    { level_number: 7, topic: "Rate Limiting & Throttling: Token Bucket, Leaky Bucket Algorithms" },
    { level_number: 8, topic: "Designing a URL Shortener (TinyURL) or Key-Value Cache End-to-End" },
    { level_number: 9, topic: "Designing Notification Systems: WebSockets, Webhooks, Push Services" },
    { level_number: 10, topic: "Designing Large-Scale Pastebin or File Storage Systems with Resiliency" }
  ],
  11: [ // Git & Version Control
    { level_number: 1, topic: "Git Concepts: Working Directory, Staging Area, Local Repository" },
    { level_number: 2, topic: "Essential Commands: git init, add, commit, status, log, diff" },
    { level_number: 3, topic: "Branching Mechanics: git branch, checkout, switch, branch creation" },
    { level_number: 4, topic: "Merging Strategies: Fast-Forward vs Three-Way Merge, Merge Conflicts" },
    { level_number: 5, topic: "Remote Repositories: git clone, fetch, pull, push, remote tracking" },
    { level_number: 6, topic: "Undoing Changes: git reset (soft/hard), revert, checkout, restore" },
    { level_number: 7, topic: "Rebasing vs Merging: Interactive Rebase, Squashing Clean Commits" },
    { level_number: 8, topic: "Stashing, Cherry-Picking, Tagging Releases, and .gitignore Rules" },
    { level_number: 9, topic: "Pull Request Workflows, Code Review Etiquette, Branch Protection Rules" },
    { level_number: 10, topic: "Git Bisect for Bug Hunting, Submodules, Hooks, and CI/CD Automation" }
  ],
  12: [ // Generative AI Basics
    { level_number: 1, topic: "AI Fundamentals: Classical ML vs Deep Learning vs Generative AI" },
    { level_number: 2, topic: "Transformer Architecture Essentials: Self-Attention & Tokens" },
    { level_number: 3, topic: "Prompt Engineering: Zero-Shot, Few-Shot, Chain-of-Thought Patterns" },
    { level_number: 4, topic: "LLM Parameters: Temperature, Top-P, Context Window Constraints" },
    { level_number: 5, topic: "Embeddings, Vector Spaces, and Semantic Search Principles" },
    { level_number: 6, topic: "Vector Databases: ChromaDB, Pinecone, Cosine Similarity Indices" },
    { level_number: 7, topic: "Retrieval-Augmented Generation (RAG): Chunker, Retriever, Generator" },
    { level_number: 8, topic: "Function Calling & Tool Use: Grounding LLMs with Real-World APIs" },
    { level_number: 9, topic: "Evaluation & Guardrails: Hallucination Mitigation, Red Teaming" },
    { level_number: 10, topic: "Autonomous Agents, Multi-Step Orchestration, and Enterprise GenAI" }
  ]
};
