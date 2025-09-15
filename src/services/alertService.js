function checkAlertCondition(data, ticker) {
  if (!data) return null;

  const { latestPrice, ma60 } = data;
  if (latestPrice > ma60) {
    return `${ticker} 주가가 60일선(${ma60.toFixed(2)})을 상향 돌파했습니다! 현재가: ${latestPrice.toFixed(2)}`;
  } else if (latestPrice < ma60) {
    return `${ticker} 주가가 60일선(${ma60.toFixed(2)})을 하향 돌파했습니다! 현재가: ${latestPrice.toFixed(2)}`;
  }
  return null;
}

module.exports = { checkAlertCondition };