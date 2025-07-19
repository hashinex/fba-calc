<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>FBA Calculator</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      width: 300px;
      padding: 15px;
    }
    input {
      width: 100%;
      margin-bottom: 10px;
      padding: 5px;
    }
    .result {
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <h2>FBA Profit Calculator</h2>
  <input type="text" id="bsr" placeholder="BSR (optional)">
  <input type="number" id="price" placeholder="Selling Price">
  <input type="number" id="cost" placeholder="Cost Price">
  <button id="calculate">Calculate</button>

  <div class="result">
    <p>Profit: <span id="profit">$0.00</span></p>
    <p>ROI: <span id="roi">0%</span></p>
    <p>Break Even: <span id="breakeven">$0.00</span></p>
  </div>

  <script src="popup.js"></script>
</body>
</html>
