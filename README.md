# Amit Pathak — Portfolio

A React + Vite single-page portfolio, with a **passive, frontend-only visitor-tracking feature** that reports every visit to **Telegram** (instant ping) and a **Google Sheet** (searchable log) — no backend of your own, no new npm libraries.

---

## Table of contents
1. [Quick start](#quick-start)
2. [Commands (every one)](#commands-every-one)
3. [Libraries (every one)](#libraries-every-one)
4. [Visitor tracking — what it does](#visitor-tracking--what-it-does)
5. [Setup — where each key goes](#setup--where-each-key-goes)
   - [A. Telegram bot](#a-telegram-bot)
   - [B. Google Sheet](#b-google-sheet)
   - [C. Local `.env`](#c-local-env)
   - [D. Vercel (production keys)](#d-vercel-production-keys)
6. [Testing it works](#testing-it-works)
7. [How it works (files)](#how-it-works-files)
8. [Privacy & limitations](#privacy--limitations)

---

## Quick start

```bash
# 1. install dependencies
npm install

# 2. create your local env file from the template, then fill in keys
cp .env.example .env        # macOS / Linux / Git Bash
# copy .env.example .env    # Windows CMD / PowerShell

# 3. run the dev server
npm run dev
```

> Tracking is **disabled in dev by default** so your own local visits don't pollute the data. To test it locally set `VITE_TRACK_IN_DEV=true` and `VITE_TRACK_DEBUG=true` in `.env`.

---

## Commands (every one)

| Command | What it does |
|---|---|
| `npm install` | Installs **all** dependencies listed below. Run once after cloning. |
| `npm run dev` | Starts the Vite dev server with hot reload (default http://localhost:5173). |
| `npm run build` | Produces the optimized production build in `dist/`. |
| `npm run preview` | Serves the built `dist/` locally to preview the production bundle. |
| `npm run lint` | Runs ESLint over the project. |
| `cp .env.example .env` | Creates your local secrets file from the template (see above for Windows). |

Deploy to Vercel (optional CLI route):

```bash
npm i -g vercel     # install the Vercel CLI once
vercel              # first deploy (links the project)
vercel --prod       # deploy to production
```

> You can also deploy with zero CLI by importing the repo at **vercel.com → New Project**.

---

## Libraries (every one)

**The tracking feature itself adds ZERO new libraries** — it uses only native browser APIs (`fetch`, `navigator.sendBeacon`, `IntersectionObserver`, `crypto.subtle`, `localStorage`, `canvas`/`WebGL`). Nothing to install for it.

These are the project's existing dependencies (all installed by `npm install`):

### Runtime dependencies
| Library | Purpose |
|---|---|
| `react` | UI framework |
| `react-dom` | React DOM renderer |
| `react-router-dom` | Routing |
| `framer-motion` | Animations |
| `lenis` | Smooth scrolling |
| `lucide-react` | Icon set |
| `react-icons` | Additional icons |
| `@mui/material` | UI components |
| `@emotion/react` | Styling engine (MUI peer) |
| `@emotion/styled` | Styling engine (MUI peer) |
| `@emailjs/browser` | Contact-form email sending |
| `react-github-calendar` | GitHub contributions graph |
| `react-slick` | Carousel/slider |
| `slick-carousel` | Carousel styles (react-slick peer) |
| `dotenv` | Env loading helper |

### Dev dependencies
| Library | Purpose |
|---|---|
| `vite` | Build tool / dev server |
| `@vitejs/plugin-react` | React support for Vite |
| `tailwindcss` | CSS framework |
| `postcss` | CSS processing |
| `autoprefixer` | CSS vendor prefixes |
| `eslint` | Linter |
| `@eslint/js` | ESLint core config |
| `eslint-plugin-react` | React lint rules |
| `eslint-plugin-react-hooks` | Hooks lint rules |
| `eslint-plugin-react-refresh` | Fast-refresh lint rules |
| `globals` | ESLint global definitions |
| `@types/react` | React type defs |
| `@types/react-dom` | React DOM type defs |

### External services (no install, just keys/URLs)
| Service | Role | Key needed |
|---|---|---|
| **Telegram Bot API** | Instant visit pings | Bot token + chat ID |
| **Google Apps Script** (Sheet) | Searchable visit log | Web-app `/exec` URL |
| **ipwho.is** | Geo-IP (city/country/network) | None (free, no key) |

---

## Visitor tracking — what it does

One shared URL. Every visit sends **one Telegram message and one Google Sheet row** containing:

- **New vs returning** — recognised by a device fingerprint + stored id (survives most data-clears; same device/browser).
- **Location** — city, region, country, and the **network/company** (e.g. an ISP like "Jio", or a company name when the visitor is on a work network).
- **Device** — mobile/desktop, OS, browser, timezone, language.
- **Engagement** — which sections they read (in order), link clicks, scroll depth, time on page, and an **interest score** (🔥 Hot / 🙂 Warm / ❄️ Cold).
- **Source** — referrer (if the browser provides it) and any `?...` query on the URL.
- **Visitor id + fingerprint** so repeat visits group together.

Example Telegram ping:

```
🔥 Hot · 🔁 Returning (#3)
📍 Bangalore, India · Google LLC
💻 Desktop · Windows · Chrome
🕒 Asia/Kolkata · lang en-IN
↪️ From: https://www.linkedin.com/
📖 Read: hero › projects › experience › contact
🖱️ Clicks: GitHub, Live Demo
📊 Scroll 96% · ⏱️ 142s · score 88
🆔 a1b2c3d4 · fp 9f2c7e1a0b4d
```

It runs **after first paint**, is **non-blocking**, and is **~5 KB of dependency-free JS**.

---

## Setup — where each key goes

You need **three values**: a Telegram bot token, a Telegram chat id, and a Google Sheet web-app URL.

### A. Telegram bot
1. Open Telegram, search **@BotFather**, send `/newbot`.
2. Give it a name and username → BotFather replies with a **token** like `123456789:AAE...`.
   → this is **`VITE_TELEGRAM_BOT_TOKEN`**.
3. Search **@userinfobot**, send any message → it replies with your numeric **Id**.
   → this is **`VITE_TELEGRAM_CHAT_ID`**.
4. Open a chat with your new bot and press **Start** once (so it is allowed to message you).

### B. Google Sheet
1. Create a blank Google Sheet.
2. **Extensions → Apps Script**. Delete the sample code, and paste the contents of
   [`google-apps-script/Code.gs`](google-apps-script/Code.gs).
3. **Deploy → New deployment → Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, authorise when prompted, and copy the **Web app URL** (ends in `/exec`).
   → this is **`VITE_SHEET_WEBAPP_URL`**.

   (Opening that URL in a browser should show "Portfolio tracker is live.")

### C. Local `.env`
Copy the template and paste your three values:

```bash
cp .env.example .env
```

Then edit `.env`:

```ini
VITE_TELEGRAM_BOT_TOKEN=123456789:AAE-your-real-token
VITE_TELEGRAM_CHAT_ID=123456789
VITE_SHEET_WEBAPP_URL=https://script.google.com/macros/s/AKfy.../exec

# optional
# VITE_GEO_API_URL=https://ipwho.is/
# VITE_TRACK_IN_DEV=true      # enable tracking during `npm run dev`
# VITE_TRACK_DEBUG=true       # console logs + window.__vtFlush()
```

> `.env` is already in `.gitignore` — never commit it. Use `.env.example` (no secrets) as the shared template.

### D. Vercel (production keys)
`.env` is **not** uploaded to Vercel. Add the same keys in the dashboard:

**Vercel → your project → Settings → Environment Variables**, add each for the **Production** (and Preview) environment:

| Name | Value |
|---|---|
| `VITE_TELEGRAM_BOT_TOKEN` | your bot token |
| `VITE_TELEGRAM_CHAT_ID` | your chat id |
| `VITE_SHEET_WEBAPP_URL` | your `/exec` URL |

Then **redeploy** so the new build picks them up.

> ⚠️ Because this is a frontend-only setup, these `VITE_` values are **compiled into the public JavaScript** — anyone can read them in page source. The bot can only message *you*, and the Sheet script can only *append* rows, so the blast radius is small. If the token is ever abused, regenerate it in @BotFather and update the env var. A backend proxy is the only way to truly hide them.

---

## Testing it works

1. In `.env` set `VITE_TRACK_IN_DEV=true` and `VITE_TRACK_DEBUG=true`, then `npm run dev`.
2. Open the site, watch the browser console for `[tracker] initialised ...`.
3. In the console run `window.__vtFlush()` to send immediately (or just switch tabs / close it — it flushes on exit, and auto-flushes after 45s).
4. Check your **Telegram** chat for the ping and your **Google Sheet** "Visits" tab for a new row.
5. When done, set `VITE_TRACK_IN_DEV=false` (or remove it) so local visits stop being logged.

In production, open your live Vercel URL and the ping/row should arrive within a few seconds of leaving or switching away from the tab.

---

## How it works (files)

| File | Role |
|---|---|
| [`src/tracking/visitorTracker.js`](src/tracking/visitorTracker.js) | The whole feature: identity, fingerprint, geo lookup, engagement, and sending to Telegram + Sheet. |
| [`src/main.jsx`](src/main.jsx) | Calls `initVisitorTracking()` after first paint (via `requestIdleCallback`). |
| [`.env.example`](.env.example) | Template for the three keys (copy to `.env`). |
| [`google-apps-script/Code.gs`](google-apps-script/Code.gs) | Paste into the Sheet's Apps Script; receives the JSON and appends a row. |

**Flow:** browser → geo-IP lookup (`ipwho.is`) + local fingerprint → on exit/idle, one record is sent via `navigator.sendBeacon` to the Telegram API and the Apps Script URL.

---

## Privacy & limitations

- **No real names.** A shared, anonymous URL cannot reveal a visitor's name — only location, device and network. Names only appear if the visitor contacts you themselves.
- **Undercount.** Browsers with ad/tracker blockers won't send anything, so you see *most* visits, not all.
- **Location is approximate.** Country is usually right; city can be off, especially on mobile data or VPN. "Company" only appears when the visitor is on a work network.
- **Keys are public** in a frontend-only setup (see the Vercel note above).
- **Personal data.** Location/IP-derived info is personal data under laws like GDPR — add a short line to your site such as *"This site collects anonymous visit analytics."*
