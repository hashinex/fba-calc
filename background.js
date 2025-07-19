// background.js

// This log should appear immediately when the extension loads or reloads
console.log("AMZCALC Background script loaded.");

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Log every tab update to see if the listener is firing at all
  console.log(`Tab updated. Tab ID: ${tabId}, URL: ${tab.url}, Status: ${changeInfo.status}`);

  // Only proceed if the tab has finished loading and has a URL
  if (changeInfo.status === 'complete' && tab.url) {
    // UPDATED Regular expression to match Amazon product listing pages
    // It now allows for any characters between the domain and "/dp/"
    const amazonListingPattern = /^https?:\/\/(www\.)?amazon\.(com|co\.uk|de|fr|es|it|ca|com\.mx|com\.au)\/.*\/dp\/[a-zA-Z0-9]{10}.*$/;
                                                                // ^^^ Added '.*' here to match any characters (including slashes)

    if (amazonListingPattern.test(tab.url)) {
      console.log(`SUCCESS: Amazon listing page detected: ${tab.url}`);
      try {
        await chrome.sidePanel.setOptions({
          tabId,
          path: 'sidebar.html',
          enabled: true
        });
        console.log("Side panel successfully attempted to open.");
      } catch (error) {
        console.error("ERROR: Failed to open side panel:", error);
      }
    } else {
      console.log(`INFO: Not an Amazon listing page, checking if side panel needs disabling for: ${tab.url}`);
      const sidePanelState = await chrome.sidePanel.getOptions({ tabId });
      if (sidePanelState && sidePanelState.enabled) {
          try {
              await chrome.sidePanel.setOptions({
                  tabId,
                  enabled: false
              });
              console.log("Side panel disabled for non-Amazon page.");
          } catch (error) {
              console.error("ERROR: Failed to disable side panel:", error);
          }
      }
    }
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  console.log("Extension icon clicked.");
  try {
    await chrome.sidePanel.setOptions({
      tabId: tab.id,
      path: 'sidebar.html',
      enabled: true
    });
    console.log("Side panel opened via icon click.");
  } catch (error) {
    console.error("ERROR: Failed to open side panel via icon click:", error);
  }
});