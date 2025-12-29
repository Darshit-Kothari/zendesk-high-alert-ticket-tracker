let refreshInterval = 5000;
let zendeskTab = null;

// open tabs
async function findZendeskTab() {
  const tabs = await chrome.tabs.query({
    url: "*://*.zendesk.com/agent/*"
  });

  return tabs.length > 0 ? tabs[0] : null;
}

// Injection for fething the count
async function fetchTicketCount(tabId) {
  try {
    const response = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: getHighAlertCountFromPage
    });

    const result = response?.[0]?.result;
    const count = typeof result === 'number' ? result : 0;

    // Global
    chrome.action.setBadgeText({ text: count.toString() });
    chrome.action.setBadgeBackgroundColor({ color: [255, 255, 200, 255] }); // pale yellow
    return count;
  } catch (e) {
    console.error("Failed to fetch count:", e);
    chrome.action.setBadgeText({ text: "--" });
    return null;
  }
}

// Function to inject into page
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

// Periodically check for count
async function startMonitoring() {
  zendeskTab = await findZendeskTab();

  if (zendeskTab) {
    await fetchTicketCount(zendeskTab.id);
  } else {
    chrome.action.setBadgeText({ text: "!" });
    console.warn("No Zendesk tab found");
  }

  setTimeout(startMonitoring, refreshInterval);
}

// SOC Barracuda Networks Monitorings
startMonitoring();


