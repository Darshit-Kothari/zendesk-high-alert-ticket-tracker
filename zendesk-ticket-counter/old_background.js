// background.js - Service worker (Manifest V3)

let refreshInterval = 3000; // 10 seconds
let currentZendeskTabId = null;

// Helper: Get most recent Zendesk tab
async function getActiveZendeskTab() {
  const tabs = await chrome.tabs.query({
    url: "*://*.zendesk.com/agent/*",
    active: true,
    currentWindow: true
  });

  return tabs[0] || null;
}

// Injects script and fetches count from current Zendesk tab
async function fetchTicketCount(tabId) {
  try {
    const response = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: getHighAlertCountFromPage
    });

    const result = response?.[0]?.result;
    const count = typeof result === 'number' ? result : 0;

    chrome.action.setBadgeText({ text: count.toString(), tabId });
    chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255], tabId }); // Red
    return count;
  } catch (e) {
    console.error("Failed to fetch count:", e);
    chrome.action.setBadgeText({ text: "--", tabId });
    return null;
  }
}

// Function to be injected into page
function getHighAlertCountFromPage() {
  const anchor = Array.from(document.querySelectorAll('a[data-test-id]')).find(a =>
    a.innerText.includes("HIGH Priority Tickets")
  );
  if (!anchor) return null;

  const countElement = anchor.querySelector('[data-test-id="views_views-list_item_count"]');
  if (!countElement) return null;

  const countText = countElement.textContent.trim();
  return parseInt(countText, 10) || 0;
}

// Monitor tab activation
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);

  if (tab.url && tab.url.includes("zendesk.com/agent/")) {
    currentZendeskTabId = tab.id;
    await fetchTicketCount(tab.id);
  } else {
    // Optional: clear badge if leaving Zendesk
    if (currentZendeskTabId) {
      chrome.action.setBadgeText({ text: "", tabId: currentZendeskTabId });
    }
    currentZendeskTabId = null;
  }
});

// Periodically check for count update on current Zendesk tab
async function startMonitoring() {
  if (currentZendeskTabId !== null) {
    await fetchTicketCount(currentZendeskTabId);
  }

  setTimeout(startMonitoring, refreshInterval);
}

// Initial setup
(async () => {
  const tab = await getActiveZendeskTab();
  if (tab) {
    currentZendeskTabId = tab.id;
    await fetchTicketCount(tab.id);
  }

  startMonitoring();
})();

// comment/un-comment the lines using the shortcut ctrl+/.