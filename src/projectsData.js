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
      "Discovers trending topics, writes publish-ready posts, images and narrated videos, and schedules & publishes across Facebook, Instagram, LinkedIn and YouTube — from a single studio.",
    oneLiner:
      "An AI platform that turns raw signals — trending industry news, a founder’s voice note or a few lines of text — into scheduled multi-platform posts and narrated short videos, end to end.",
    summary:
      "Auto Publisher crawls and scores trending topics, generates platform-specific copy with Google Gemini, creates images with NVIDIA FLUX, and publishes through the Facebook, Instagram, LinkedIn and YouTube APIs — and turns any text, in English, Hindi or Hinglish, into a narrated, captioned MP4 for YouTube, Shorts and Reels, scheduled from the same workflow. Built on Django with a provider-abstraction core, so AI and publishing vendors swap by configuration.",
    thesis: "Vendor-agnostic by design: swap AI and publishing providers through configuration.",
    problem:
      "Consistent multi-platform posting is a chain of brittle, manual steps: find what’s trending, write per-platform copy, make an image, meet each network’s publishing constraints, then schedule it. Any link breaking stops the whole pipeline. Short video adds a second chain on top: a script, a voiceover, captions, licensed visuals, a thumbnail and an upload. Hosted tools charge per minute, Hindi and Hinglish support is weak, and free AI tiers allow only a few requests a day.",
    approach:
      "Two creation engines — Trend Intelligence and a Voice & Text Studio — feed a single Generate → Refine → Approve → Schedule → Publish → Measure lifecycle. AI vendors and social publishers sit behind provider abstractions, so they can be replaced without rewriting the application. The AI video studio owns its own pipeline: text → slides → voice → rendered frames → MP4 → publish. Every outside service there sits behind a cache and a fallback chain, so if an AI, a voice or a picture source fails, the video is still made.",

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
      {
        label: "Text → video pipeline",
        steps: [
          "Text with stars + narration",
          "Slides (≤ 25 words)",
          "Voice (3 engines · cached)",
          "Pillow slide render",
          "MoviePy: pictures · clips · music",
          "MP4 + SRT + thumbnail",
        ],
      },
      {
        label: "Voice fallback chain",
        steps: [
          "Chosen voice (Gemini / OpenRouter)",
          "Same-gender free voice",
          "Google TTS",
          "Silent video + notice",
        ],
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
          "YouTube video & Shorts publishing",
          "Unified inbox: comments & messages with replies",
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
          "Performance dashboard: trend vs previous period, best-time heatmap",
          "Activity & API logs with secret masking",
          "Live /health/perf/ system page",
          "Daemon-thread background workers",
        ],
      },
      {
        group: "AI Video Studio",
        items: [
          "Text becomes slides automatically",
          "Highlighted key words (*stars* or auto-pick)",
          "Narration lines: screen shows a short line, the voice explains more",
          "7 text styles: big text, subtitles, word captions, one word, karaoke, lower third, quote card",
          "12 word animations (typewriter, pop, zoom, drop, blur, wave, marker…)",
          "7 font styles, any colours, colour / box / underline highlights",
          "5 themes incl. “No theme”; slow zoom and pan; video clips as backgrounds",
          "3 formats: 16:9, 9:16 Shorts/Reels, 1:1",
          "Live slide preview",
          "6 ready-made looks + “My presets”",
          "Background music, loudness-matched under the voice",
          "Designed YouTube thumbnail, .srt/.vtt subtitles",
        ],
      },
      {
        group: "Voices (3 engines)",
        items: [
          "300+ free Microsoft neural voices in 140+ languages (edge-tts)",
          "30 expressive Gemini TTS voices that act out tags: [excited], [whisper], [pause 2s], <laugh>",
          "10 HeyGen voices via OpenRouter, in 39 languages (the key is used only for voice)",
          "Samples, and “Hear my first slide”",
          "Language check: the voice matches the text’s language",
          "Per-slide audio cache; a live meter of requests needed and left today",
        ],
      },
      {
        group: "Scripts & Story Studio",
        items: [
          "“Write with AI”: topic + language + length + audience + tone → a script in the app’s format",
          "YouTube scripts from keyword research and news trends",
          "Kids Videos: built-in lessons, kid-safe filter (Simple English Wikipedia only), “made for kids” flag",
          "Original superhero episodes",
          "Movies & Comics: own-words reviews with spoiler control; public-domain comics only",
        ],
      },
      {
        group: "Pictures, Clips & Music",
        items: [
          "Picture search in 17 styles, with watermarked stock previews hidden",
          "“Free to use only” licence mode (Openverse); Wikimedia Commons and Pixabay clips; uploads",
          "Free music search",
          "Licence credits kept for every video",
          "Source pictures deleted after rendering, except the thumbnail’s picture",
        ],
      },
    ],

    highlights: [
      "Provider abstractions let AI vendors and social publishers be swapped through configuration.",
      "Two creation pipelines — trend-driven and voice-driven — merge into one review UX.",
      "Handles Instagram’s container → poll → publish flow and its public-image-URL requirement via Cloudinary.",
      "Background automation runs as in-process background threads — news crawler, auto-publish scheduler and analytics ingest — with retry/backoff, so posts and videos ship without an external task queue.",
      "Fault isolation keeps one failing network or enrichment step from stalling the whole pipeline.",
      "Feature-flagged rollout for staged delivery of new capabilities.",
      "Text is drawn with Pillow as small per-word images, so animations move a few sprites per frame and identical frames are drawn once: no ImageMagick, no GPU, no downloaded AI models.",
      "Gemini voices get one request per slide: batching made the model repeat lines, which we confirmed by transcribing the audio. Pauses are cut out and put back as exact silence.",
      "Every voice clip is cached and daily limits are remembered, so a free AI tier is never spent twice on the same slide. When a voice fails, a free voice of the same gender takes over and the video page says why.",
      "Web downloads are SSRF-safe: the server fetches only addresses its own search signed, http(s) only on ports 80 and 443, public IPs only, checked again after every redirect.",
      "The video studio has 561 automated tests. Every paid or rate-limited API is mocked, so tests never spend real quota.",
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
      {
        title: "Expressive AI voices that don’t repeat themselves",
        body: "Gemini TTS sometimes said a line twice when given a whole script; this was confirmed by transcribing its audio. Fix: one request per slide, silences inserted locally to the exact length, every clip cached, the daily limit remembered, and a same-gender free voice as fallback.",
      },
      {
        title: "Free tiers you can plan with",
        body: "Gemini allows about 10 voice requests a day per model, and OpenRouter’s free models share 50 a day. The Create page shows “This video: N requests · M left today” before rendering. It counts cached clips and asks OpenRouter for the real number left.",
      },
      {
        title: "Rendering text without ImageMagick or a GPU",
        body: "MoviePy’s TextClip breaks on Windows, so every slide is drawn with Pillow from pre-rendered word sprites. The whole studio needs about 270 MB of libraries.",
      },
      {
        title: "Hindi and Hinglish",
        body: "Devanagari fonts for every style, and voices matched to the text’s language. Honest limit: perfect conjunct shaping on Windows needs FriBiDi/raqm, which isn’t enabled yet.",
      },
      {
        title: "Safe, licensed media from the open web",
        body: "SSRF guards, watermark filtering, a free-licence mode, and credits kept even after source pictures are deleted.",
      },
    ],

    metrics: [
      { value: "4", label: "Social platforms" },
      { value: "5", label: "Trend signals" },
      { value: "3", label: "Voice engines" },
      { value: "340+", label: "AI voices" },
      { value: "7 · 12", label: "Text styles · animations" },
      { value: "561", label: "Automated tests" },
    ],

    stack: [
      { group: "Backend", items: ["Python 3.10", "Django 5.2"] },
      {
        group: "AI Video & Voice",
        items: [
          "MoviePy 2.2",
          "Pillow 11",
          "Gemini TTS (30 expressive voices)",
          "Microsoft neural voices (edge-tts)",
          "OpenRouter · HeyGen Voice",
          "NumPy",
          "ffmpeg (imageio-ffmpeg)",
          "gTTS fallback",
        ],
      },
      {
        group: "AI / LLM",
        items: [
          "Google Gemini (Flash + Flash-Lite fallback)",
          "NVIDIA NIM API (OpenAI-compatible)",
          "NVIDIA FLUX.1-dev image generation",
          "OpenAI Whisper (speech-to-text)",
        ],
      },
      {
        group: "Data",
        items: ["PostgreSQL", "psycopg 3", "Django ORM + migrations", "LocMem cache"],
      },
      {
        group: "Frontend",
        items: [
          "Django templates",
          "Vanilla JavaScript",
          "Terra design system (light / dark)",
          "Custom utility-CSS generator (no Node build)",
          "Hand-built SVG charts",
        ],
      },
      {
        group: "Integrations",
        items: [
          "YouTube Data API v3",
          "Meta Graph API v23 (Facebook, Instagram)",
          "LinkedIn API v2",
          "Cloudinary",
          "OpenRouter",
          "Openverse (pictures + music)",
          "Wikimedia Commons",
          "Pixabay",
          "DuckDuckGo search (ddgs)",
          "RSS / Google News",
          "SMTP email",
        ],
      },
      {
        group: "Security",
        items: [
          "Fernet token encryption",
          "Signed one-time approval links",
          "SSRF-safe downloads",
          "Login lockout",
          "Secret redaction in logs",
          "CSRF + owner-only views",
        ],
      },
      {
        group: "Infra & Testing",
        items: [
          "In-process background job threads",
          "Live /health/perf/ endpoint",
          "561 automated tests (mocked APIs)",
          "arabic-reshaper + python-bidi (RTL text)",
        ],
      },
    ],

    interfaces: [
      { view: "Trending Topics", note: "Scored leaderboard" },
      { view: "Create Studio", note: "Trend + voice to post" },
      { view: "Scheduling Calendar", note: "Drag-and-drop" },
      { view: "Connected Channels", note: "OAuth + analytics" },
      { view: "Create Video Studio", note: "Text → narrated MP4, live preview" },
      { view: "Upload & Find Pictures", note: "17 style tabs, free-licence filter" },
      { view: "Voice Card", note: "3 voice types, samples, request meter" },
      { view: "Performance Dashboard", note: "Trend chart, best-time heatmap" },
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
      "Teams connect their WhatsApp Business numbers and receive, assign and reply to customers from one real-time inbox — then get CRM, role-based analytics and conversation intelligence on top. Layered above that sits an optional, human-in-the-loop AI support agent — off by default, behind a single flag — plus an admin copilot for querying the platform’s own data. Built end to end with FastAPI, a 63-table Postgres schema, 180+ REST endpoints and a React/TypeScript frontend.",
    thesis:
      "Every tenant isolated in every query; the AI agent assists a human, never replaces one.",
    problem:
      "WhatsApp is where customers actually talk to businesses — but the Business app is single-device, with no shared team inbox, no CRM, no analytics, and nothing that lets one platform safely serve many companies at once. The hard part isn’t sending a message; it’s turning a raw, at-least-once webhook firehose into a reliable, multi-tenant system where no company can ever see another’s data.",
    approach:
      "It’s built directly on Meta’s official WhatsApp Cloud API, with an idempotent inbound pipeline that dedupes by message id, resolves the tenant from the phone-number id, unifies each customer by their WhatsApp id, and auto-assigns conversations — streaming live updates over WebSockets while offloading media and analysis to background workers. Org-level isolation is enforced in every query and proven by integration tests, with a role-scoped CRM and analytics layer and a Google Gemini conversation-intelligence layer — intent, sentiment, urgency, lead signals and next action — that automatically falls back to a rule-based engine when no key is set or the API is rate-limited, plus an in-app AI support assistant with voice input. Layered on top — and fully optional, off behind a single flag — is an autonomous but human-in-the-loop support agent: pluggable LLMs (Google Gemini by default, Anthropic Claude also supported), retrieval-augmented answers from a per-tenant knowledge base, hard safety guardrails, and scoped tools that stage actions for a human instead of acting unsupervised.",

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
      {
        label: "One agent turn — grounded, then guarded",
        steps: [
          "Inbound message",
          "Automation-rule check",
          "RAG retrieve (hybrid)",
          "LLM + scoped tools",
          "Guardrails (price · do-not-send · URL)",
          "Auto-reply / draft / handoff",
        ],
      },
    ],

    features: [
      {
        group: "Inbox & Messaging",
        items: [
          "Shared team inbox",
          "All 11 message types",
          "Blue-tick read receipts",
          "Media lightbox & GIFs",
          "Forward & search chats",
          "Starred messages",
          "Notes with @mentions",
          "Pinned & shared links",
          "Guided number setup",
        ],
      },
      {
        group: "AI Assistant & Analysis",
        items: [
          "AI support assistant",
          "Voice input",
          "Reads intent & sentiment",
          "Flags urgent chats",
          "Scores leads",
          "Rates reply quality",
          "Suggests the next step",
          "Works even without a key",
        ],
      },
      {
        group: "AI Support Agent",
        items: [
          "Off by default (one flag)",
          "Human-in-the-loop",
          "Admin automation rules",
          "Global kill switch",
          "Live take-over & hand-back",
          "Gemini or Claude, swappable",
          "RAG knowledge base",
          "Asks or hands off, never guesses",
          "17 scoped tools",
        ],
      },
      {
        group: "Agent Safety Guardrails",
        items: [
          "Price guard on every figure",
          "Do-not-send word list",
          "URL allowlist",
          "Honors opt-out",
          "Business-hours & reply caps",
          "Typing debounce",
          "Can’t run SQL or code",
          "Read-only ERP lookups",
        ],
      },
      {
        group: "Admin AI Copilot",
        items: [
          "Ask about your own data",
          "Calls the app’s own API",
          "Role scope & PII masking",
          "Stages actions, never auto-sends",
          "Confirm before anything goes out",
          "Reports real delivery status",
        ],
      },
      {
        group: "Multi-Tenancy & Security",
        items: [
          "Isolated per company",
          "Role-based access",
          "Argon2 passwords",
          "Secure JWT sessions",
          "Encrypted API tokens",
          "Masked phone numbers",
          "Zero-downtime key rotation",
          "One-shot hardening script",
          "Rate limiting",
          "Admin-gated AI",
        ],
      },
      {
        group: "CRM & Analytics",
        items: [
          "One profile per customer",
          "Auto-assigns chats",
          "Tracks response times",
          "Scores agent performance",
          "Detects leads & follow-ups",
          "Role-scoped dashboard",
        ],
      },
      {
        group: "Platform & Reliability",
        items: [
          "Async database layer",
          "Postgres, SQLite fallback",
          "Redis, in-process fallback",
          "Runs without credentials",
          "Meta-review-ready pages",
          "Background workers",
        ],
      },
    ],

    highlights: [
      "Direct integration with Meta’s official WhatsApp Cloud API — 11 message types, media, templates and the full number-registration/OTP onboarding — validated end to end against a live WhatsApp Business Account.",
      "Idempotent inbound pipeline: dedupes by message id, resolves the tenant from the phone-number id, and unifies each customer by their WhatsApp id.",
      "Cross-tenant access is proven impossible by integration tests — org isolation is enforced in every query, not just at the edge.",
      "Conversation intelligence runs on Google Gemini — intent, sentiment, urgency, product, lead signal & probability, quality and next action — with automatic fallback to a rule-based engine when no key is set or the API is rate-limited.",
      "An in-app AI support assistant with voice input — tap to record via the browser’s Web Speech API and it transcribes and sends.",
      "WhatsApp-grade inbox: full-screen media lightbox, in-conversation search & jump, starred messages, GIF picker, internal notes with @-mentions, message forwarding and blue-tick read receipts.",
      "Heavy work — media download and Gemini analysis — is offloaded to background workers, so ingestion never blocks.",
      "A resilient Meta client: exponential-backoff retries on 429/5xx, request-id tracing and Fernet-encrypted tokens at rest.",
      "Ships with a marketing landing page and Privacy / Terms legal pages built to pass Meta App Review.",
      "Cut a hot conversations endpoint from ~15s to ~2.5s (~6×) by collapsing N+1 queries into a single JOIN, plus connection pooling and an in-process access-control cache.",
      "Layered on the inbox: an autonomous, human-in-the-loop AI support agent — a self-contained subsystem (23 tables, 51 routes) that’s fully additive and ships off by default behind a single AGENT_ENABLED flag, so it changes nothing until a team turns it on.",
      "Human-in-the-loop by design: admins set automation rules (per number, category or intent → auto-reply, draft-assist, or hand to a human), with a global kill switch, per-conversation modes and live take-over / hand-back from the inbox — it never runs unsupervised.",
      "Real safety guardrails, not vibes: a price guard rewrites any money figure that didn’t come from a data tool that turn, plus a do-not-send lexicon, URL allowlist, opt-out handling, business-hours and reply caps, and typing debounce — and the agent can’t run SQL or execute code.",
      "Grounded, pluggable answers: retrieval-augmented from a per-tenant knowledge base (pgvector, 768-d) with hybrid keyword + vector retrieval fused by reciprocal-rank and scored for confidence, and LLMs swappable behind one env switch — Gemini by default, Anthropic Claude supported, a fake provider for tests — over 17 scoped tools including a read-only, ownership-checked ERP lookup and an explicit handoff_to_human. When unsure, it asks or hands off instead of hallucinating.",
      "A separate admin AI copilot answers questions about the org’s own data by calling the product’s own permission-checked API in-process (role scoping and PII masking enforced automatically) and can stage-and-confirm real WhatsApp sends — nothing leaves without an explicit admin Confirm.",
      "Enterprise security hardening: zero-downtime encryption-key rotation for stored WhatsApp tokens (MultiFernet), a one-shot hardening script (rotates JWT secrets, provisions a fresh key, disables debug and open registration, turns on rate limiting), plus path-traversal and upload-size guards — and every AI surface is admin-gated.",
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
      {
        title: "Autonomy without letting go",
        body: "An AI that replies to customers on WhatsApp can’t be a black box. It’s additive and off by default, gated behind a single flag; admins choose per-number and per-intent whether it auto-replies, drafts or hands off; a kill switch and live take-over are always one click away; and hard guardrails — a price guard, do-not-send lexicon and URL allowlist — sit below the model, so a bad generation still can’t become a bad message.",
      },
    ],

    metrics: [
      { value: "63", label: "DB tables" },
      { value: "180+", label: "REST endpoints" },
      { value: "150+", label: "Tests passing" },
      { value: "17", label: "AI agent tools" },
      { value: "11", label: "Message types" },
      { value: "~6×", label: "Endpoint speed-up" },
    ],

    stack: [
      { group: "AI", items: ["Google Gemini", "Anthropic Claude", "Function-calling agent", "pgvector RAG", "Rule-based fallback", "Web Speech API"] },
      { group: "Backend", items: ["Python", "FastAPI", "SQLAlchemy 2 (async)", "Alembic", "Celery", "WebSockets"] },
      { group: "Data", items: ["PostgreSQL (Neon)", "pgvector", "SQLite fallback", "Redis"] },
      { group: "Integration", items: ["Meta WhatsApp Cloud API", "Graph API", "Webhooks"] },
      { group: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind", "TanStack Query", "React Router"] },
      { group: "Security", items: ["JWT", "Argon2", "MultiFernet rotation", "RBAC", "Rate limiting", "PII masking"] },
    ],

    interfaces: [
      { view: "Unified Inbox", note: "Real-time team conversations" },
      { view: "Conversation View", note: "Media · search · notes · forward" },
      { view: "AI Assistant", note: "Chat + voice · Gemini analysis" },
      { view: "AI Agent Console", note: "Rules · kill switch · take-over" },
      { view: "Knowledge Base", note: "Docs · products · FAQs (RAG)" },
      { view: "Admin Copilot", note: "Ask data · stage & confirm sends" },
      { view: "CRM & Contacts", note: "Customers unified by WhatsApp id" },
      { view: "Analytics Dashboard", note: "Role-scoped performance & SLA" },
    ],

    links: {},
  },
];

/* Display order for the flagship case studies. Reorder these ids to change the
   sequence; `no` (the "Project 0X" label) is renumbered automatically to match. */
const FLAGSHIP_ORDER = [
  "whatsapp-inbox",
  "auto-publisher",
  "voice-call-analysis",
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
    github: "https://github.com/Amitp0070",
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
    github: "https://github.com/Amitp0070",
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
