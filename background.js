chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.openSidebar && sender.tab && sender.tab.id) {
    chrome.sidePanel.open({ tabId: sender.tab.id });
  }
});
