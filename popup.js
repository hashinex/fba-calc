function calculate() {
  const cost = parseFloat(document.getElementById('cost').value) || 0;
  const price = parseFloat(document.getElementById('price').value) || 0;
  const fee = parseFloat(document.getElementById('fee').value) || 0;
  const ship = parseFloat(document.getElementById('ship').value) || 0;

  const profit = price - cost - fee - ship;
  const roi = ((profit / cost) * 100).toFixed(2);
  const breakEven = (cost + fee + ship).toFixed(2);

  document.getElementById('profit').innerText = profit.toFixed(2);
  document.getElementById('roi').innerText = isNaN(roi) ? 0 : roi;
  document.getElementById('breakEven').innerText = breakEven;
}
