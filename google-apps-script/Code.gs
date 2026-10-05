/**
 * Google Apps Script — visit logger for the portfolio tracker.
 *
 * SETUP (one time):
 *  1. Create a blank Google Sheet.
 *  2. Extensions -> Apps Script. Delete the sample, paste THIS file.
 *  3. Deploy -> New deployment -> type "Web app".
 *       - Description: portfolio tracker
 *       - Execute as:  Me
 *       - Who has access: Anyone
 *     Click Deploy, authorise, and copy the Web app URL (ends in /exec).
 *  4. Put that URL in your portfolio .env as VITE_SHEET_WEBAPP_URL.
 *
 * The site sends JSON via navigator.sendBeacon (fire-and-forget), so
 * the response is ignored — this script only needs to append a row.
 */

var HEADERS = [
  "Time",
  "Visitor ID",
  "Status",
  "Visit #",
  "City",
  "Region",
  "Country",
  "Network / Org",
  "Timezone",
  "Device",
  "OS",
  "Browser",
  "Language",
  "Referrer",
  "Query (?...)",
  "Sections read",
  "Clicks",
  "Scroll %",
  "Duration (s)",
  "Score",
  "Tier",
  "Fingerprint",
  "User Agent",
  "Page",
];

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Visits") || ss.insertSheet("Visits");

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var d = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      d.visitorId || "",
      d.status || "",
      d.visitCount || "",
      d.city || "",
      d.region || "",
      d.country || "",
      d.org || "",
      d.timezone || d.geoTz || "",
      d.device || "",
      d.os || "",
      d.browser || "",
      d.language || "",
      d.referrer || "direct",
      d.query || "",
      (d.sections || []).join(" > "),
      (d.clicks || []).join(", "),
      d.scrollDepth != null ? d.scrollDepth : "",
      d.durationSec != null ? d.durationSec : "",
      d.score != null ? d.score : "",
      d.tier || "",
      d.fingerprint || "",
      d.userAgent || "",
      d.page || "",
    ]);

    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error: " + err);
  }
}

// Lets you open the /exec URL in a browser to confirm it is deployed.
function doGet() {
  return ContentService.createTextOutput("Portfolio tracker is live.");
}
