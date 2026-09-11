/* ============================================================
   Flagship case-study data — kept separate from presentation.
   Copy is written to match the actual implementation of each
   system. No invented users, revenue, traffic, or benchmarks;
   only defensible engineering-scale numbers are exposed.
   ============================================================ */

const _FLAGSHIPS = [
  /* ---------------------------------------------------------- */
  {
    id: "twin-os",
    no: "01",
    name: "Twin OS",
    subtitle: "Personal AI Digital Twin",
    domain: "AI Operating System",
    color: "#7c3aed",
    tagline:
      "Not a chatbot — a Personal AI Operating System that understands you, does real work, and keeps you in control.",
    oneLiner:
      "A full-stack Personal AI Operating System: an AI “digital twin” that learns an owner’s knowledge, memory and writing voice, then autonomously performs real tasks inside a configurable safety and human-approval framework.",
    summary:
      "Twin OS remembers an owner’s decisions and preferences, knows their relationships, writes in their voice, and takes real actions on their behalf — scheduling meetings, drafting and sending email, managing tasks — through a governed agent runtime rather than a free-running LLM.",
    thesis: "The LLM only suggests; the application decides, checks, and executes.",
    problem:
      "Personal AI is stuck between two failure modes: a passive chatbot that only talks, or an over-eager agent you can’t trust with real actions. The hard problem isn’t generating a good answer — it’s letting a language model take irreversible actions (send an email, book a meeting) without handing it unchecked authority.",
    approach:
      "Every AI-proposed action is treated as a proposal, never a command. It is validated against a schema, scored by a risk engine, checked against a configurable autonomy policy, and — when sensitive — held in a human approval queue that previews the exact data before anything executes. Every step is written to a full audit trail.",

    // the signature diagram — a proposal becoming a safe action
    architecture: {
      title: "How a proposed action becomes a safe action",
      caption:
        "The LLM never touches a tool directly. The application owns permissions, risk and execution.",
      steps: [
        { label: "LLM", sub: "proposes" },
        { label: "Structured Plan" },
        { label: "Schema Validation", sub: "Pydantic" },
        { label: "Risk Engine", sub: "scores impact" },
        { label: "Autonomy Policy", sub: "supervised · balanced · autonomous" },
        { label: "Human Approval", sub: "if sensitive" },
        { label: "Idempotency", sub: "no double-execution" },
        { label: "Tool Execution" },
        { label: "Audit Trail", sub: "fully recorded", terminal: true },
      ],
    },
    // secondary flow — the agent loop
    pipelines: [
      {
        label: "Agent reasoning loop",
        steps: [
          "Understand",
          "Retrieve Context",
          "Plan",
          "Decide",
          "Act / Approve",
          "Respond",
          "Learn",
        ],
      },
    ],

    features: [
      {
        group: "Agent & Reasoning",
        items: [
          "Persisted agent state machine",
          "14-tool plugin registry",
          "Pydantic-validated tool arguments",
          "Guided planning-repair retry",
          "Traceable agent runs",
          "Graceful respond-only degradation",
        ],
      },
      {
        group: "Memory & RAG",
        items: [
          "8 typed memory kinds",
          "Importance / confidence scoring",
          "Similarity-based deduplication",
          "Hybrid vector + keyword retrieval",
          "Document ingestion + per-source permissions",
          "Owner-editable learning loop",
        ],
      },
      {
        group: "Safety & Governance",
        items: [
          "Risk engine",
          "Supervised / Balanced / Autonomous modes",
          "Human approval queue",
          "Exact-data preview before sensitive actions",
          "Idempotency keys",
          "Full audit trail",
        ],
      },
      {
        group: "Platform",
        items: [
          "Owner/admin + employee roles",
          "SSE chat streaming",
          "WebSocket activity feed",
          "Voice input / output + avatar",
          "Live guest sessions",
          "Away Mode + daily digest",
        ],
      },
    ],

    highlights: [
      "The LLM never acts directly — it emits a plan the application must approve.",
      "Structured plans are schema-validated before any execution path opens.",
      "The application, not the model, owns permissions and risk decisions.",
      "Every agent run is fully traceable end to end.",
      "Portable vector search that degrades from pgvector to a JSON fallback.",
      "Automatic fallback to offline infrastructure and mock providers.",
      "Real-time streaming of agent activity over SSE + WebSocket.",
    ],

    challenges: [
      {
        title: "Making an LLM safe to let act",
        body: "The interview-worthy problem: turning free-form model output into governed action. Solved by inverting authority — the model proposes a structured plan, and a schema → risk → autonomy → approval pipeline decides whether, and how, it runs.",
      },
      {
        title: "Portable, degradable retrieval",
        body: "Vector search runs on pgvector when available and falls back to a JSON/SQLite path, so the same memory layer works from a laptop to a full Postgres deployment without code changes.",
      },
      {
        title: "Provider independence",
        body: "Claude, OpenAI/NVIDIA and Gemini sit behind one interface with an offline mock, so a missing key or outage degrades gracefully instead of breaking the twin.",
      },
    ],

    metrics: [
      { value: "14", label: "Agent tools" },
      { value: "8", label: "Memory types" },
      { value: "3+", label: "LLM providers" },
      { value: "100%", label: "Actions audited" },
    ],

    stack: [
      { group: "AI / LLM", items: ["Claude", "OpenAI / NVIDIA", "Gemini", "RAG", "Embeddings", "faster-whisper"] },
      { group: "Backend", items: ["Python", "FastAPI", "SQLAlchemy 2", "Alembic", "Pydantic", "structlog"] },
      { group: "Frontend", items: ["React 18", "TypeScript", "Vite", "Tailwind", "TanStack Query", "Zustand"] },
      { group: "Data", items: ["PostgreSQL", "pgvector", "SQLite / JSON fallback"] },
      { group: "Realtime", items: ["SSE streaming", "WebSocket"] },
      { group: "Security", items: ["JWT + rotating refresh", "reuse detection", "bcrypt", "Fernet encryption", "RBAC", "HMAC webhooks"] },
    ],

    interfaces: [
      { view: "AI Chat", note: "Live thinking trace" },
      { view: "Approval Card", note: "Exact-data preview" },
      { view: "Memory Explorer", note: "Owner-editable" },
      { view: "Run Trace", note: "Step-by-step agent activity" },
    ],

    links: {},
  },

  /* ---------------------------------------------------------- */
  {
    id: "voice-call-analysis",
    no: "02",
    name: "AI Voice Call Analysis",
    subtitle: "Historical Intelligence Platform",
    domain: "AI Analytics",
    color: "#0d9488",
    tagline:
      "Turns raw call recordings into scored, structured coaching feedback — and remembers every call to measure real improvement.",
    oneLiner:
      "An AI platform that transcribes sales & support calls, scores agent performance with an LLM, and tracks whether agents actually improve over time — backed by a RAG memory of every past call.",
    summary:
      "An admin-facing platform that ingests a recording or transcript, transcribes it, analyses it against a configurable reviewer persona, and produces structured feedback — then compares it against the agent’s own history to separate real improvement from noise.",
    thesis: "Database truth → deterministic comparison → LLM narrative.",
    problem:
      "Call QA is manual, subjective, and judged one call at a time. Even with AI scoring, you still can’t answer the question that matters: is this agent actually getting better? Judging each call in isolation loses the trend.",
    approach:
      "The platform keeps long-term behavioural memory. Each call yields eight 0–10 scores plus strengths, weaknesses, mistakes, missed opportunities, an action plan and detected behavioural patterns. Concepts are tracked as NEW → REPEATED → RESOLVED, and current performance is compared against prior calls using structured facts, vector search and recent history.",

    architecture: {
      title: "Why the comparison can be trusted",
      caption:
        "History is computed deterministically from the database first. The LLM only writes the human-readable explanation — it never invents the comparison.",
      steps: [
        { label: "Database truth", sub: "structured facts" },
        { label: "Deterministic diff", sub: "computed, not guessed" },
        { label: "LLM narrative", sub: "explains the diff", terminal: true },
      ],
      contrast: {
        label: "The anti-pattern this avoids",
        steps: ["LLM", "invents a comparison"],
      },
    },
    pipelines: [
      {
        label: "6-stage async pipeline (API → Redis / ARQ)",
        steps: [
          "Transcribe",
          "Analyze",
          "Extract behavioral facts",
          "Generate embeddings",
          "Retrieve history",
          "Compare",
        ],
      },
      {
        label: "Behavioral concept lifecycle",
        steps: ["NEW", "REPEATED", "RESOLVED"],
      },
    ],

    features: [
      {
        group: "Ingestion & Scoring",
        items: [
          "Audio upload + transcript input",
          "ElevenLabs speech-to-text",
          "LLM scoring across 8 dimensions",
          "Strengths / weaknesses / mistakes",
          "Missed opportunities + action plan",
        ],
      },
      {
        group: "Historical Intelligence",
        items: [
          "Long-term behavioral memory",
          "Hybrid RAG (facts + vector + recency)",
          "pgvector similarity search",
          "Deterministic diff engine",
          "Performance trends over time",
        ],
      },
      {
        group: "Platform & Reliability",
        items: [
          "Shared-secret ERP API + streamed ingestion",
          "Daily usage metering",
          "Essential-vs-optional stage isolation",
          "Retry with exponential backoff",
          "Idempotent background jobs",
        ],
      },
    ],

    highlights: [
      "Historical comparison is derived from database truth, not model imagination.",
      "Hybrid RAG combines structured behavioral facts, semantic retrieval and recent-call context.",
      "Behavioral concepts are normalized so the same problem is detected despite different wording.",
      "A deterministic diff engine separates real improvement from AI-generated noise.",
      "Uploads stay responsive while multi-minute AI processing runs on background workers.",
      "Relational and vector data are queried together to build each verdict.",
      "A failed enrichment stage never discards a finished analysis — essential stages (transcribe, analyze) are isolated from optional ones (facts, embeddings, history).",
      "Provider-agnostic AI layer — transcription, LLM and embeddings are swappable by config across three AI providers.",
    ],

    challenges: [
      {
        title: "Responsive uploads over slow AI",
        body: "AI analysis takes minutes, so the request path returns immediately and hands work to Redis/ARQ background workers with retry, exponential backoff and idempotent jobs.",
      },
      {
        title: "Behavioral concept normalization",
        body: "Agents make the “same” mistake described five different ways. Concepts are normalized so repeats are detected across wording, enabling the NEW → REPEATED → RESOLVED lifecycle.",
      },
      {
        title: "Signal vs noise in ‘improvement’",
        body: "Because the diff is computed from stored facts before the LLM narrates it, trend claims are grounded in data rather than a model’s fluent guess.",
      },
    ],

    metrics: [
      { value: "~15", label: "Feature modules" },
      { value: "126", label: "Backend files" },
      { value: "~99", label: "Frontend files" },
      { value: "11", label: "DB tables" },
      { value: "34", label: "Test suites" },
      { value: "6", label: "Pipeline stages" },
      { value: "3", label: "AI providers" },
      { value: "1536", label: "Embedding dims" },
    ],

    stack: [
      { group: "AI / LLM", items: ["ElevenLabs STT", "Google Gemini", "NVIDIA LLMs", "text-embedding-3 (1536-dim)", "Hybrid RAG"] },
      { group: "Backend", items: ["Python 3.12", "FastAPI", "Pydantic v2", "SQLAlchemy 2", "asyncpg", "Alembic"] },
      { group: "Frontend", items: ["React", "TypeScript", "Vite", "TanStack Query", "React Router", "Tailwind", "Zustand"] },
      { group: "Data", items: ["PostgreSQL", "pgvector"] },
      { group: "Infrastructure", items: ["Redis", "ARQ workers", "Docker Compose"] },
      { group: "Tooling", items: ["Ruff", "Pytest"] },
    ],

    interfaces: [
      { view: "Call Upload", note: "Audio or transcript" },
      { view: "Analysis Result", note: "8 scored dimensions" },
      { view: "Historical Comparison", note: "vs prior calls" },
      { view: "Behavioral Trends", note: "NEW / REPEATED / RESOLVED" },
    ],

    links: {},
  },

  /* ---------------------------------------------------------- */
  {
    id: "auto-publisher",
    no: "03",
    name: "Auto Publisher",
    subtitle: "AI Social Automation & Trend Intelligence",
    domain: "AI Automation",
    color: "#db2777",
    tagline:
      "Discovers trending topics, generates publish-ready content and images, and schedules & publishes across Facebook, Instagram and LinkedIn — from a single studio.",
    oneLiner:
      "An AI platform that turns raw signals — trending industry news or a founder’s voice note — into scheduled, multi-platform social posts, end to end.",
    summary:
      "Auto Publisher crawls and scores trending topics, generates platform-specific copy with Google Gemini, creates matching images with NVIDIA FLUX, and publishes through the Facebook, Instagram and LinkedIn APIs — with two distinct creation engines feeding one review-and-schedule workflow.",
    thesis: "Vendor-agnostic by design: swap AI and publishing providers through configuration.",
    problem:
      "Consistent multi-platform posting is a chain of brittle, manual steps: find what’s trending, write per-platform copy, make an image, meet each network’s publishing constraints, then schedule it. Any link breaking stops the whole pipeline.",
    approach:
      "Two creation engines — Trend Intelligence and a Voice & Text Studio — feed a single Generate → Refine → Approve → Schedule → Publish → Measure lifecycle. AI vendors and social publishers sit behind provider abstractions, so they can be replaced without rewriting the application.",

    architecture: {
      title: "Provider abstraction",
      caption:
        "get_content_generator() · get_publisher() · get_provider() — AI vendors and publishing targets are resolved by config, not hard-wired.",
      steps: [
        { label: "Request" },
        { label: "get_provider()", sub: "resolve by config" },
        { label: "Content / Publisher", sub: "swappable vendor" },
        { label: "Execute", sub: "no app rewrite", terminal: true },
      ],
    },
    pipelines: [
      {
        label: "Trend Intelligence engine",
        steps: [
          "News sources",
          "Crawler",
          "Deduplication",
          "Multi-signal scoring",
          "Trending leaderboard",
          "AI content generation",
        ],
      },
      {
        label: "Voice & Text studio",
        steps: [
          "Voice recording",
          "Whisper transcription",
          "AI expansion",
          "Platform-specific content",
          "Image generation",
        ],
      },
      {
        label: "Publishing lifecycle",
        steps: ["Generate", "Refine", "Approve", "Schedule", "Publish", "Measure"],
      },
      {
        label: "Instagram publishing (Graph API)",
        steps: ["Create media container", "Poll status", "Publish"],
      },
    ],

    scoring: {
      label: "Trend scoring — a weighted, multi-signal model",
      signals: ["Frequency", "Recency", "Relevance", "Keyword density", "Source authority"],
    },

    features: [
      {
        group: "Discover & Create",
        items: [
          "AI trend crawling",
          "Multi-signal topic scoring",
          "Google Gemini content generation",
          "NVIDIA FLUX image generation",
          "Local Whisper transcription",
        ],
      },
      {
        group: "Publish & Connect",
        items: [
          "Facebook / Instagram / LinkedIn publishing",
          "OAuth connections + manual credentials",
          "Cloudinary media management",
          "Public-URL handling for Instagram",
          "WebSocket crawl feed",
        ],
      },
      {
        group: "Review & Operate",
        items: [
          "Email + in-app approval",
          "Focus-mode review",
          "Drag-and-drop scheduling",
          "Automatic publishing (images; video/PDF preview)",
          "Feature-gated Meta/LinkedIn analytics",
          "Daemon-thread background workers",
        ],
      },
    ],

    highlights: [
      "Provider abstractions let AI vendors and social publishers be swapped through configuration.",
      "Two creation pipelines — trend-driven and voice-driven — merge into one review UX.",
      "Handles Instagram’s container → poll → publish flow and its public-image-URL requirement via Cloudinary.",
      "Background automation runs as lifespan-managed daemon threads — news crawler, auto-publish scheduler and analytics ingest — with retry/backoff; Celery + Redis are scaffolded for horizontal scale, not the active runtime.",
      "Fault isolation keeps one failing network or enrichment step from stalling the whole pipeline.",
      "Feature-flagged rollout for staged delivery of new capabilities.",
    ],

    challenges: [
      {
        title: "Vendor-agnostic AI architecture",
        body: "Content generation, publishing and provider resolution are abstracted (get_content_generator / get_publisher / get_provider) so vendors change by config, not code.",
      },
      {
        title: "Instagram publishing constraints",
        body: "Instagram requires a create-container → poll-status → publish dance and a publicly reachable image URL — solved with Cloudinary-hosted media and status polling.",
      },
      {
        title: "Two pipelines, one UX",
        body: "Trend-driven and voice-driven creation are very different flows; both are normalized into the same Generate → Refine → Approve → Schedule → Publish → Measure lifecycle.",
      },
    ],

    metrics: [
      { value: "~39K", label: "Lines of code" },
      { value: "129", label: "REST endpoints" },
      { value: "26", label: "DB tables" },
      { value: "3", label: "Social platforms" },
      { value: "5", label: "Trend signals" },
      { value: "2", label: "Creation engines" },
    ],

    stack: [
      { group: "AI / LLM", items: ["Google Gemini", "NVIDIA FLUX", "NVIDIA NIM", "Whisper / faster-whisper"] },
      { group: "Backend", items: ["Python", "FastAPI", "Uvicorn", "Pydantic", "SQLAlchemy", "Alembic"] },
      { group: "Frontend", items: ["React 18", "TypeScript", "Vite", "Tailwind", "React Router", "Axios"] },
      { group: "Infrastructure", items: ["Daemon-thread workers", "WebSockets", "BeautifulSoup", "feedparser", "Celery + Redis (scaffolded)"] },
      { group: "Integrations", items: ["Meta Graph API", "LinkedIn UGC API", "Cloudinary"] },
      { group: "Security", items: ["JWT", "bcrypt / Passlib"] },
    ],

    interfaces: [
      { view: "Trending Topics", note: "Scored leaderboard" },
      { view: "Create Studio", note: "Trend + voice to post" },
      { view: "Scheduling Calendar", note: "Drag-and-drop" },
      { view: "Connected Channels", note: "OAuth + analytics" },
    ],

    links: {},
  },

  /* ---------------------------------------------------------- */
  {
    id: "whatsapp-inbox",
    no: "04",
    name: "WhatsApp Unified Inbox",
    subtitle: "Customer Intelligence Platform",
    domain: "Multi-Tenant SaaS",
    color: "#16a34a",
    tagline:
      "A multi-tenant SaaS that unifies WhatsApp business messaging into a shared team inbox — with CRM, role-based analytics and conversation intelligence on top.",
    oneLiner:
      "A production-grade, multi-tenant SaaS that turns WhatsApp into a shared support-and-sales workspace: one real-time team inbox, with CRM, role-scoped analytics and automated conversation intelligence layered on top, integrated directly with Meta’s official WhatsApp Cloud API.",
    summary:
      "Teams connect their WhatsApp Business numbers and receive, assign and reply to customers from one real-time inbox — then get CRM, role-based analytics and conversation intelligence on top. Built end to end with FastAPI, a 39-table Postgres schema, 120+ REST endpoints and a React/TypeScript frontend.",
    thesis:
      "Every tenant isolated in every query; every inbound webhook idempotent by design.",
    problem:
      "WhatsApp is where customers actually talk to businesses — but the Business app is single-device, with no shared team inbox, no CRM, no analytics, and nothing that lets one platform safely serve many companies at once. The hard part isn’t sending a message; it’s turning a raw, at-least-once webhook firehose into a reliable, multi-tenant system where no company can ever see another’s data.",
    approach:
      "It’s built directly on Meta’s official WhatsApp Cloud API, with an idempotent inbound pipeline that dedupes by message id, resolves the tenant from the phone-number id, unifies each customer by their WhatsApp id, and auto-assigns conversations — streaming live updates over WebSockets while offloading media and analysis to background workers. Org-level isolation is enforced in every query and proven by integration tests, with a role-scoped CRM and analytics layer and a rule-based conversation-intelligence module built as a provider-swappable seam for a future LLM.",

    // the signature diagram — an at-least-once webhook becoming a safe update
    architecture: {
      title: "How an inbound webhook becomes a safe, isolated update",
      caption:
        "At-least-once deliveries in; deduped, tenant-scoped and real-time out — heavy work offloaded so ingestion never blocks.",
      steps: [
        { label: "Meta Webhook", sub: "at-least-once" },
        { label: "Dedupe", sub: "by message id" },
        { label: "Resolve Tenant", sub: "from phone-number id" },
        { label: "Unify Customer", sub: "by WhatsApp id" },
        { label: "Upsert Conversation" },
        { label: "Auto-Assign", sub: "least-loaded round-robin" },
        { label: "WebSocket Broadcast", sub: "live inbox" },
        { label: "Background Workers", sub: "media + analysis", terminal: true },
      ],
    },
    pipelines: [
      {
        label: "Resilient outbound (Meta Cloud API)",
        steps: [
          "Send",
          "Retry on 429 / 5xx",
          "Exponential backoff",
          "Request-id trace",
          "Typed result",
        ],
      },
      {
        label: "Every query is tenant-scoped",
        steps: [
          "Authenticated principal",
          "Org isolation",
          "Role scope (assigned-only for agents)",
          "Masked PII",
          "Scoped query",
        ],
      },
    ],

    features: [
      {
        group: "Inbox & Messaging",
        items: [
          "Shared real-time team inbox",
          "11 WhatsApp message types",
          "Media, templates & reactions",
          "Number registration + OTP onboarding",
          "Message-status state machine",
          "WebSocket live updates",
        ],
      },
      {
        group: "Multi-Tenancy & Security",
        items: [
          "Org-level data isolation",
          "3-tier RBAC (Admin / Manager / Agent)",
          "Argon2 password hashing",
          "JWT access / refresh / reset",
          "Fernet-encrypted API tokens",
          "Server-side PII masking",
        ],
      },
      {
        group: "CRM & Intelligence",
        items: [
          "Customer unification by WhatsApp id",
          "Least-loaded round-robin assignment",
          "Response-time / SLA engine",
          "Explainable performance scoring",
          "Lead & follow-up detection",
          "Rule-based sentiment / intent signals",
        ],
      },
      {
        group: "Platform & Reliability",
        items: [
          "Async SQLAlchemy 2 + Alembic",
          "Neon Postgres + SQLite fallback",
          "Redis with in-process fallback",
          "Simulate-mode local dev",
          "Same-origin SPA + API",
          "Background media / analysis workers",
        ],
      },
    ],

    highlights: [
      "Direct integration with Meta’s official WhatsApp Cloud API — 11 message types, media, templates and the full number-registration/OTP onboarding — validated end to end against a live WhatsApp Business Account.",
      "Idempotent inbound pipeline: dedupes by message id, resolves the tenant from the phone-number id, and unifies each customer by their WhatsApp id.",
      "Cross-tenant access is proven impossible by integration tests — org isolation is enforced in every query, not just at the edge.",
      "Heavy work — media download and conversation analysis — is offloaded to background workers, so ingestion never blocks.",
      "A resilient Meta client: exponential-backoff retries on 429/5xx, request-id tracing and Fernet-encrypted tokens at rest.",
      "Conversation intelligence is rule-based today, but built as a provider-swappable seam so a future LLM can drop in without touching callers.",
      "Cut a hot conversations endpoint from ~15s to ~2.5s (~6×) by collapsing N+1 queries into a single JOIN, plus connection pooling and an in-process access-control cache.",
    ],

    challenges: [
      {
        title: "At-least-once, exactly-once effect",
        body: "Meta can deliver the same webhook more than once. The pipeline dedupes by WhatsApp message id and upserts contacts and conversations, so retries and duplicates converge to the same state instead of double-posting.",
      },
      {
        title: "Proving tenant isolation",
        body: "One platform serving many companies has to make cross-tenant reads impossible. Org scoping is threaded into every query through a single access layer, then locked down with integration tests that assert one org can never see another’s data.",
      },
      {
        title: "A 15-second endpoint, six times faster",
        body: "The conversations list was doing N+1 queries — one per conversation for its contact, number and assignees. Collapsing it into a single JOIN, adding connection pooling and an in-process access-control cache took it from ~15s to ~2.5s (~6×).",
      },
    ],

    metrics: [
      { value: "~24K", label: "Lines of code" },
      { value: "39", label: "DB tables" },
      { value: "120+", label: "REST endpoints" },
      { value: "22", label: "Domain modules" },
      { value: "11", label: "Message types" },
      { value: "~6×", label: "Endpoint speed-up" },
    ],

    stack: [
      { group: "Backend", items: ["Python", "FastAPI", "SQLAlchemy 2 (async)", "Alembic", "Celery", "WebSockets"] },
      { group: "Data", items: ["PostgreSQL (Neon)", "SQLite fallback", "Redis"] },
      { group: "Integration", items: ["Meta WhatsApp Cloud API", "Graph API", "Webhooks"] },
      { group: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind", "TanStack Query", "React Router"] },
      { group: "Security", items: ["JWT", "Argon2", "Fernet encryption", "RBAC", "PII masking"] },
    ],

    interfaces: [
      { view: "Unified Inbox", note: "Real-time team conversations" },
      { view: "Conversation View", note: "Send · media · templates · status" },
      { view: "CRM & Contacts", note: "Customers unified by WhatsApp id" },
      { view: "Analytics Dashboard", note: "Role-scoped performance & SLA" },
    ],

    links: {},
  },
];

/* Display order for the flagship case studies. Reorder these ids to change the
   sequence; `no` (the "Project 0X" label) is renumbered automatically to match. */
const FLAGSHIP_ORDER = [
  "auto-publisher",
  "voice-call-analysis",
  "whatsapp-inbox",
  "twin-os",
];
export const FLAGSHIPS = FLAGSHIP_ORDER.map((id, i) => ({
  ..._FLAGSHIPS.find((p) => p.id === id),
  no: String(i + 1).padStart(2, "0"),
}));

/* Supporting work — honest smaller builds, shown as a compact grid. */
export const MORE = [
  {
    title: "Hariss International ERP",
    subtitle: "Laravel Backend Management System",
    type: "ERP SaaS",
    color: "#2563eb",
    highlights: [
      "Secure RESTful APIs with central exception handling",
      "Auth via Laravel Passport & Sanctum",
      "Role-based access control (Spatie)",
    ],
    tags: ["PHP", "Laravel", "REST", "MySQL", "PostgreSQL"],
    // github: "",
  },
  {
    title: "CookingStories",
    subtitle: "Recipe Sharing Platform",
    type: "Full Stack",
    color: "#0d9488",
    highlights: [
      "Recipe management & CRUD",
      "Responsive UI (Bootstrap + Tailwind)",
      "Django backend & DB management",
    ],
    tags: ["Python", "Django", "SQLite", "Tailwind"],
    github: "https://github.com/Amitp0070/CookingStories",
    demo: "https://youtu.be/B5EJnMGmEx0",
  },
  {
    title: "Online Resume Builder",
    subtitle: "Full-stack Resume Builder",
    type: "Full Stack",
    color: "#2563eb",
    highlights: [
      "Dynamic resume creation & management",
      "Responsive interfaces with Bootstrap",
      "Django backend, DB & form handling",
    ],
    tags: ["Python", "Django", "SQLite", "JavaScript"],
    github: "https://github.com/Amitp0070/Online_Resume_Builder-main",
  },
  {
    title: "Bakery Management System",
    subtitle: "Django Bakery Web App",
    type: "Personal",
    color: "#0d9488",
    highlights: [
      "Product management & CRUD",
      "Responsive pages with Bootstrap",
      "Django + SQLite backend logic",
    ],
    tags: ["Python", "Django", "SQLite", "Bootstrap"],
    github: "https://github.com/Amitp0070/BakeryProject-main",
    demo: "https://youtu.be/N0gyAlpiF_8",
  },
  {
    title: "Car Marketplace",
    subtitle: "React Frontend Marketplace",
    type: "Frontend",
    color: "#2563eb",
    highlights: [
      "Responsive car-listing interface in React",
      "Reusable UI components & layouts",
      "Modern responsive design",
    ],
    tags: ["React", "JavaScript", "CSS"],
    github: "https://github.com/Amitp0070/car-marketplace",
    demo: "https://youtu.be/7WKX1LNfKHg",
  },
  {
    title: "Finance Tracker",
    subtitle: "Full-stack Finance Manager",
    type: "Full Stack",
    color: "#0d9488",
    highlights: [
      "Income & expense tracking",
      "Real-time UI interactions with HTMX",
      "Django + SQLite backend & data",
    ],
    tags: ["Python", "Django", "HTMX", "SQLite"],
    github: "https://github.com/Amitp0070/Django---HTMX-App",
    demo: "https://youtu.be/nJYE9YM-UmU",
  },
];
