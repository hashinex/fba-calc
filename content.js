function injectSidebar() {
  if (document.getElementById('amzcalc-sidebar-container')) return;

  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL("sidebar.html");
  iframe.id = "amzcalc-sidebar-container";
  Object.assign(iframe.style, {
    position: "fixed",
    top: "0",
    right: "0",
    width: "360px",
    height: "100%",
    border: "none",
    zIndex: "999999",
    boxShadow: "0 0 12px rgba(0, 0, 0, 0.4)",
    transition: "transform 0.3s ease-in-out",
    transform: "translateX(0%)",
    backgroundColor: "white"
  });

  document.body.appendChild(iframe);

  // Optional: Add minimize button
  const toggleBtn = document.createElement('div');
  toggleBtn.id = 'amzcalc-toggle-btn';
  toggleBtn.textContent = '×';
  Object.assign(toggleBtn.style, {
    position: 'fixed',
    top: '10px',
    right: '370px',
    width: '28px',
    height: '28px',
    backgroundColor: '#111',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: '28px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: '1000000'
  });

  toggleBtn.addEventListener('click', () => {
    iframe.remove();
    toggleBtn.remove();
  });

  document.body.appendChild(toggleBtn);
}

window.addEventListener('load', injectSidebar);
const observer = new MutationObserver(injectSidebar);
observer.observe(document.body, { childList: true, subtree: true });
