import { mean, std } from "mathjs";

export const runMonteCarlo = (initialValue, mu, sigma, years, paths = 10000) => {
  let results = [];
  const dt = 1 / 252;

  for (let i = 0; i < paths; i++) {
    let price = initialValue;
    for (let t = 0; t < years * 252; t++) {
      const z = Math.random() * Math.sqrt(2) - 1;
      price *= Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * z);
    }
    results.push(price);
  }

  results.sort((a,b) => a - b);
  const expectedValue = mean(results);
  const bestCase = results[Math.floor(results.length * 0.95)];
  const worstCase = results[Math.floor(results.length * 0.05)];
  const probabilityOfLoss = results.filter(r => r < initialValue).length / results.length;

  const losses = results.map(v=> initialValue - v);
  const VaR95 = losses[Math.floor(losses.length * 0.95)];
  const CVaR95 = mean(losses.filter(l=> l > VaR95));

  return { expectedValue, bestCase, worstCase, probabilityOfLoss, VaR95, CVaR95, distribution: results };
};
