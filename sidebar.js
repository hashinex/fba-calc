function calculate() {
  const cost = parseFloat(document.getElementById('cost').value);
  const selling = parseFloat(document.getElementById('selling').value);
  const feePercent = parseFloat(document.getElementById('fee').value);

  if (isNaN(cost) || isNaN(selling) || isNaN(feePercent)) return;

  const feeAmount = (feePercent / 100) * selling;
  const profit = selling - cost - feeAmount;
  const roi = (profit / cost) * 100;
  const breakEven = cost / (1 - (feePercent / 100));

  document.getElementById('profit').value = profit.toFixed(2);
  document.getElementById('roi').value = roi.toFixed(2);
  document.getElementById('breakEven').value = breakEven.toFixed(2);
}
