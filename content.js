// content.js

const sidebar = document.createElement("div");
sidebar.id = "fba-sidebar";
sidebar.innerHTML = `
  <div class="fba-header">FBA Calculator</div>
  <div class="fba-body">
    <label>Buy Price: <input id="buy" type="number" /></label><br/>
    <label>Sell Price: <input id="sell" type="number" /></label><br/>
    <label>FBA Fee: <input id="fee" type="number" /></label><br/>
    <button id="calc">Calculate</button><br/>
    <div id="result"></div>
  </div>
`;

document.body.appendChild(sidebar);

// Logic
document.getElementById("calc").onclick = function () {
  const buy = parseFloat(document.getElementById("buy").value);
  const sell = parseFloat(document.getElementById("sell").value);
  const fee = parseFloat(document.getElementById("fee").value);
  if (!isNaN(buy) && !isNaN(sell) && !isNaN(fee)) {
    const profit = sell - buy - fee;
    document.getElementById("result").innerText = "Profit: $" + profit.toFixed(2);
  }
};
