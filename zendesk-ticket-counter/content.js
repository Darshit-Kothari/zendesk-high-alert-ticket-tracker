function getHighAlertCount() {
  try {
    const anchor = Array.from(document.querySelectorAll('a[data-test-id]')).find(a =>
      a.innerText.includes("HIGH Priority Tickets")
    );

    if (!anchor) return null;

    const countElement = anchor.querySelector('[data-test-id="views_views-list_item_count"]');
    if (!countElement) return null;

    const countText = countElement.textContent.trim();
    return parseInt(countText, 10) || 0;
  } catch (e) {
    console.error("Error parsing Zendesk DOM:", e);
    return null;
  }
}

// background counter for listening messages from the SOC open queue
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_COUNT") {
    const count = getHighAlertCount();
    sendResponse({ count: count });
  }
});