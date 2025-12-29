import axios from "axios";

export const fetchMarketPrice = async (ticker) => {
  try {
    // Yahoo Finance (no API key)
    const yahoo = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`);
    const price = yahoo.data.chart.result[0].meta.regularMarketPrice;

    if (price) return price;

    // Fallback → Finnhub (if provided key)
    if(process.env.FINNHUB_API_KEY){
      const finnhub = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.FINNHUB_API_KEY}`);
      return finnhub.data.c;
    }

    throw new Error("API data unavailable");
  } catch (err) {
    throw new Error("❌ Market Data Fetch Failed: " + err.message);
  }
};
