if (!document.getElementById('fbaSidebar')) {
  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL("popup.html");
  iframe.id = 'fbaSidebar';
  iframe.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 350px;
    height: 100vh;
    border: none;
    z-index: 100000;
  `;
  document.body.appendChild(iframe);
} else {
  const existing = document.getElementById('fbaSidebar');
  existing.remove();
}
