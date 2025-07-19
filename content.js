// content.js
// This script runs on Amazon pages to scrape data and communicate with the sidebar.

// Function to send a message to the sidebar with scraped data
function sendDataToSidebar(data) {
  chrome.runtime.sendMessage({ type: "amazonData", payload: data });
}

// Function to scrape product title and other potential data
function scrapeAmazonProductData() {
  const data = {};

  // Scrape Product Title
  const productTitleElement = document.getElementById('productTitle');
  if (productTitleElement) {
    data.title = productTitleElement.textContent.trim();
  }

  // You can add more scraping logic here for other details your calculator needs
  // For example, to get the price (this might vary depending on Amazon's HTML structure):
  const priceElement = document.querySelector('.a-price .a-offscreen');
  if (priceElement) {
    data.price = priceElement.textContent.trim();
  } else {
    // Fallback for different price elements or structures
    const priceElementOther = document.querySelector('#priceblock_ourprice, #sns-base-price, #corePriceDisplay_feature_div .a-price-whole');
    if (priceElementOther) {
      data.price = priceElementOther.textContent.trim();
    }
  }

  // Example: Scrape estimated weight (this is often tricky and might require more advanced selectors or parsing)
  // Look for dimensions/weight in product details, often within tables or list items
  const productDetailsTable = document.getElementById('productDetails_techSpec_section_1');
  if (productDetailsTable) {
      const weightRow = [...productDetailsTable.querySelectorAll('tr')].find(row => row.textContent.includes('Item Weight') || row.textContent.includes('Shipping Weight'));
      if (weightRow) {
          data.weight = weightRow.querySelector('.a-size-base.prodDetAttrValue').textContent.trim();
      }
  }


  sendDataToSidebar(data);
}


// Run scraping when the document is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scrapeAmazonProductData);
} else {
    scrapeAmazonProductData();
}

// You can also set up a listener for messages from the sidebar if the sidebar needs
// to request more specific data from the page after it's loaded.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "requestProductData") {
    scrapeAmazonProductData(); // Rescrape and send data
    sendResponse({ status: "data_sent" });
  }
});