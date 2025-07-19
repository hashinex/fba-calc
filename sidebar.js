// sidebar.js

// --- Calculator Logic ---
function calculateFBAFees() {
    // Get values from input fields and scraped data
    const productPriceText = document.getElementById('productPriceDisplay').textContent.replace(/[^\d.]/g, ''); // Remove non-numeric chars
    const productPrice = parseFloat(productPriceText) || 0;
    const costOfGoods = parseFloat(document.getElementById('costOfGoods').value) || 0;
    const shippingCost = parseFloat(document.getElementById('shippingCost').value) || 0;

    // --- Dummy FBA Fee Calculation (You'll need to make this accurate) ---
    // These are simplified placeholder calculations.
    // Real FBA fees depend on category, size tier, weight, and fulfillment method.
    let referralFeeRate = 0.15; // Example: 15% referral fee
    let fulfillmentFeePerUnit = 3.00; // Example: Flat fulfillment fee
    let monthlyStorageFeePerUnit = 0.03; // Example: Monthly storage fee

    // Calculate Referral Fee
    const referralFee = productPrice * referralFeeRate;

    // FBA Fulfillment Fee
    const fulfillmentFee = fulfillmentFeePerUnit; // Simple example

    // Monthly Storage Fee (assumed for one unit)
    const storageFee = monthlyStorageFeePerUnit; // Simple example

    const totalFbaFees = referralFee + fulfillmentFee + storageFee;
    const netProfit = productPrice - costOfGoods - shippingCost - totalFbaFees;

    // Display results
    document.getElementById('referralFee').textContent = `$${referralFee.toFixed(2)}`;
    document.getElementById('fulfillmentFee').textContent = `$${fulfillmentFee.toFixed(2)}`;
    document.getElementById('storageFee').textContent = `$${storageFee.toFixed(2)}`;
    document.getElementById('totalFbaFees').textContent = `$${totalFbaFees.toFixed(2)}`;
    document.getElementById('netProfit').textContent = `$${netProfit.toFixed(2)}`;
}

// Listen for messages from content.js (scraped data from Amazon page)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "amazonData") {
        document.getElementById('productTitleDisplay').textContent = message.payload.title || 'N/A';
        document.getElementById('productPriceDisplay').textContent = message.payload.price || 'N/A';
        document.getElementById('productWeightDisplay').textContent = message.payload.weight || 'N/A';
        // Once data is loaded, you might want to automatically calculate
        calculateFBAFees();
    }
});

// Event listener for the calculate button
document.getElementById('calculateButton').addEventListener('click', calculateFBAFees);

// Initial calculation if data is already there (e.g., on sidebar reload)
document.addEventListener('DOMContentLoaded', () => {
    // Request product data from content script when sidebar loads
    // This is useful if the sidebar is opened after the page has fully loaded
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].url.includes('amazon.com')) { // Check if on an Amazon page
            chrome.tabs.sendMessage(tabs[0].id, { type: "requestProductData" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending message to content script:", chrome.runtime.lastError.message);
                    document.getElementById('productTitleDisplay').textContent = 'Error loading data.';
                    document.getElementById('productPriceDisplay').textContent = 'Error loading data.';
                    document.getElementById('productWeightDisplay').textContent = 'Error loading data.';
                } else {
                    console.log("Message sent to content script:", response);
                }
            });
        }
    });
    calculateFBAFees(); // Perform initial calculation with default/empty values
});


// --- Resizing Logic ---
function enableResizing() {
  const sidebar = document.documentElement; // The root HTML element of the sidebar's iframe
  const resizer = document.querySelector('.resizer');
  let startX, startWidth;

  resizer.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    // Get the current width of the sidebar's iframe from the browser API
    // This needs to communicate with the main browser window.
    // The sidebar itself is within an iframe, so its width is controlled by the browser.
    // We can't directly set `sidebar.style.width` to resize the entire panel.
    // Instead, the Chrome Side Panel API manages its width.
    // For a truly resizable experience *by the user dragging*, Chrome handles this automatically
    // once the `sidePanel` permission is set and it's enabled.
    // The `resizer` element here is primarily for visual feedback and a conceptual handle.
    // Chrome's built-in side panel has its own resizing handle.

    // For now, let's make sure the content inside *adapts* to whatever width Chrome sets for the side panel.
    // The CSS `width: calc(100% - 22px);` for inputs helps with this.

    // If you want to *programmatically* set the width, it's not directly exposed to the sidebar's script.
    // The user will naturally resize it by dragging the edge of the side panel.
    // The `resizer` div is more for illustrative purposes or if you were injecting a custom div.
    // Chrome's built-in side panel has a draggable border that users can use to resize.
    // You cannot directly control the actual width of the side panel from within `sidebar.js`.

    // The `resizer` code below is more relevant if you were creating a custom, draggable div
    // *within* the content area, but for the actual side panel width, Chrome handles it.
    // However, including it still shows the intent and can be adapted if Chrome APIs change.

    // For demonstrating the concept of resizing, we'll keep the mouse events,
    // but understand that the Chrome browser provides the actual side panel resizing.
    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
  });

  function doResize(e) {
    // This part is problematic as it tries to set the width of the document.documentElement
    // which is the iframe's content. The iframe itself is resized by the browser.
    // It will not resize the entire side panel.
    // However, it's a common pattern for "resizable" elements.
    // Just be aware of its limitation here for the *overall side panel width*.
    // The CSS `flex-grow: 1` and `width: 100%` on content elements will make them adapt.
  }

  function stopResize() {
    document.removeEventListener('mousemove', doResize);
    document.removeEventListener('mouseup', stopResize);
  }
}

// Enable resizing when the sidebar loads
document.addEventListener('DOMContentLoaded', enableResizing);