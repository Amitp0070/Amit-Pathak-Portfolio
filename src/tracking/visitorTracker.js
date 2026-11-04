const SHEET_URL = import.meta.env.VITE_SHEET_WEBAPP_URL;

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const IPWHO_URL = "https://ipwho.is/";

const DEBUG = import.meta.env.VITE_TRACK_DEBUG === "true";

const TRACK_IN_DEV = import.meta.env.VITE_TRACK_IN_DEV === "true";

const log = (...args) => {
  if (DEBUG) {
    console.log("[tracker]", ...args);
  }
};

const errorLog = (...args) => {
  console.error("[tracker]", ...args);
};

/* -------------------------------------------------------
   VISITOR ID
------------------------------------------------------- */

function getVisitorId() {
  const KEY = "portfolio_visitor_id";

  let visitorId = localStorage.getItem(KEY);

  if (!visitorId) {
    visitorId =
      Math.random().toString(16).substring(2, 10) +
      Date.now().toString(16).substring(0, 4);

    localStorage.setItem(KEY, visitorId);
  }

  return visitorId;
}

/* -------------------------------------------------------
   VISIT COUNT
------------------------------------------------------- */

function getVisitCount() {
  const KEY = "portfolio_visit_count";

  let count = Number(localStorage.getItem(KEY) || "0");

  count += 1;

  localStorage.setItem(KEY, String(count));

  return count;
}

/* -------------------------------------------------------
   FINGERPRINT
------------------------------------------------------- */

async function createFingerprint() {
  const raw = [
    navigator.userAgent,
    navigator.language,
    navigator.platform,
    screen.width,
    screen.height,
    screen.colorDepth,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ].join("|");

  try {
    const encoded = new TextEncoder().encode(raw);

    const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .substring(0, 12);
  } catch {
    return Math.random().toString(16).substring(2, 14);
  }
}

/* -------------------------------------------------------
   DEVICE
------------------------------------------------------- */

function getDevice() {
  const width = window.innerWidth;

  if (width <= 768) {
    return "Mobile";
  }

  if (width <= 1024) {
    return "Tablet";
  }

  return "Desktop";
}

/* -------------------------------------------------------
   OS
------------------------------------------------------- */

function getOS() {
  const ua = navigator.userAgent;

  if (/Windows NT/i.test(ua)) return "Windows";
  if (/Mac OS X/i.test(ua)) return "macOS";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Linux/i.test(ua)) return "Linux";

  return "Unknown";
}

/* -------------------------------------------------------
   BROWSER
------------------------------------------------------- */

function getBrowser() {
  const ua = navigator.userAgent;

  if (/Edg/i.test(ua)) return "Edge";
  if (/Chrome/i.test(ua)) return "Chrome";
  if (/Firefox/i.test(ua)) return "Firefox";
  if (/Safari/i.test(ua)) return "Safari";
  if (/Opera|OPR/i.test(ua)) return "Opera";

  return "Unknown";
}

/* -------------------------------------------------------
   IPWHOIS
------------------------------------------------------- */

async function getIPWhoisData() {
  try {
    log("requesting IPWHOIS...");

    const response = await fetch(IPWHO_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`IPWHOIS HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "IPWHOIS failed");
    }

    log("IPWHO RESULT:", data);

    return data;
  } catch (error) {
    errorLog("IPWHOIS error:", error);

    return {
      ip: "",
      city: "",
      region: "",
      country: "",
      country_code: "",
      latitude: "",
      longitude: "",
      connection: {
        org: "",
        isp: "",
        asn: "",
      },
      timezone: {
        id: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
  }
}

/* -------------------------------------------------------
   QUERY
------------------------------------------------------- */

function getQueryString() {
  return window.location.search || "";
}

/* -------------------------------------------------------
   TELEGRAM MESSAGE
------------------------------------------------------- */

function createTelegramMessage(data) {
  return `
🚀 NEW PORTFOLIO VISITOR

👤 Visitor
ID: ${data.visitorId}
Status: ${data.status}
Visit #: ${data.visitCount}

🌍 Location
IP: ${data.ip}
City: ${data.city}
Region: ${data.region}
Country: ${data.country}
Country Code: ${data.countryCode}

📍 Coordinates
Latitude: ${data.latitude}
Longitude: ${data.longitude}

🏢 Network
Org: ${data.org}
ISP: ${data.isp}
ASN: ${data.asn}

💻 Device
Device: ${data.device}
OS: ${data.os}
Browser: ${data.browser}

🌐 Browser
Language: ${data.language}
Timezone: ${data.timezone}

📄 Page
${data.page}

🔗 Referrer
${data.referrer}

🆔 Fingerprint
${data.fingerprint}

⏱ Visit Count
${data.visitCount}
`.trim();
}

/* -------------------------------------------------------
   TELEGRAM
------------------------------------------------------- */

async function sendTelegram(data) {
  if (!TELEGRAM_BOT_TOKEN) {
    log("Telegram token missing");
    return;
  }

  if (!TELEGRAM_CHAT_ID) {
    log("Telegram chat ID missing");
    return;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const body = {
    chat_id: TELEGRAM_CHAT_ID,
    text: createTelegramMessage(data),
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!result.ok) {
      errorLog("Telegram error:", result);
      return;
    }

    log("telegram sent successfully");
  } catch (error) {
    errorLog("Telegram request failed:", error);
  }
}

/* -------------------------------------------------------
   GOOGLE SHEET
------------------------------------------------------- */

async function sendToSheet(data) {
  if (!SHEET_URL) {
    errorLog("VITE_SHEET_WEBAPP_URL is missing");
    return;
  }

  try {
    log("sending payload to sheet:", data);

    /*
     * IMPORTANT:
     * Do NOT use application/json here.
     * Google Apps Script + sendBeacon works better
     * with text/plain.
     */

    const body = JSON.stringify(data);

    if (navigator.sendBeacon && typeof Blob !== "undefined") {
      const blob = new Blob([body], {
        type: "text/plain;charset=utf-8",
      });

      const sent = navigator.sendBeacon(SHEET_URL, blob);

      if (sent) {
        log("sheet sent using sendBeacon");
        return;
      }

      log("sendBeacon failed, using fetch fallback");
    }

    const response = await fetch(SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body,
      keepalive: true,
    });

    const result = await response.text();

    log("sheet response:", result);
  } catch (error) {
    errorLog("Google Sheet error:", error);
  }
}

/* -------------------------------------------------------
   CREATE PAYLOAD
------------------------------------------------------- */

function createPayload(ipData) {
  const connection = ipData.connection || {};

  const timezone = ipData.timezone || {};

  const visitorId = getVisitorId();

  const visitCount = getVisitCount();

  const previousVisit = localStorage.getItem("portfolio_has_visited");

  const status = previousVisit ? "RETURNING" : "NEW";

  localStorage.setItem("portfolio_has_visited", "true");

  return {
    timestamp: new Date().toISOString(),

    visitorId,

    status,

    visitCount,

    /* IPWHOIS */

    ip: ipData.ip || "",

    city: ipData.city || "",

    region: ipData.region || "",

    country: ipData.country || "",

    countryCode: ipData.country_code || "",

    latitude: ipData.latitude ?? "",

    longitude: ipData.longitude ?? "",

    org: connection.org || "",

    isp: connection.isp || "",

    asn: connection.asn || "",

    timezone: timezone.id || Intl.DateTimeFormat().resolvedOptions().timeZone,

    /* Browser */

    device: getDevice(),

    os: getOS(),

    browser: getBrowser(),

    language: navigator.language || "",

    userAgent: navigator.userAgent || "",

    /* Page */

    page: window.location.href,

    referrer: document.referrer || "direct",

    query: getQueryString(),

    /* Tracking */

    sections: [],

    clicks: [],

    scrollDepth: 0,

    durationSec: 0,

    score: 0,

    tier: "Cold",

    fingerprint: window.__visitorFingerprint || "",
  };
}

/* -------------------------------------------------------
   MAIN TRACKING
------------------------------------------------------- */

export async function initVisitorTracking() {
  if (import.meta.env.DEV && !TRACK_IN_DEV) {
    log("development tracking disabled");

    return;
  }

  log("starting visitor tracking");

  try {
    /* Fingerprint */

    const fingerprint = await createFingerprint();

    window.__visitorFingerprint = fingerprint;

    /* IP information */

    const ipData = await getIPWhoisData();

    /* Payload */

    const payload = createPayload(ipData);

    log("visitor information collected:", {
      visitor: {
        id: payload.visitorId,
        count: payload.visitCount,
        status: payload.status,
      },

      env: {
        device: payload.device,
        os: payload.os,
        browser: payload.browser,
        language: payload.language,
        timezone: payload.timezone,
      },

      geo: {
        ip: payload.ip,
        city: payload.city,
        region: payload.region,
        country: payload.country,
        countryCode: payload.countryCode,
        latitude: payload.latitude,
        longitude: payload.longitude,
        org: payload.org,
        isp: payload.isp,
        asn: payload.asn,
      },

      fingerprint: payload.fingerprint,
    });

    /* Send to Telegram */

    await sendTelegram(payload);

    /* Send to Google Sheet */

    await sendToSheet(payload);

    log("sent:", payload);

    log("initial visit sent");

    /* Debug helper */

    window.__vtFlush = () => {
      sendTelegram(payload);
      sendToSheet(payload);
    };

    log("debug helper available: window.__vtFlush()");

    log("visitor tracking initialised");
  } catch (error) {
    errorLog("visitor tracking failed:", error);
  }
}
