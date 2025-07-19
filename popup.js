// popup.js
document.getElementById('openSidePanel').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      // Open the side panel for the current active tab
      chrome.sidePanel.setOptions({
        tabId: tabs[0].id,
        path: 'sidebar.html',
        enabled: true
      });
    }
  });
});