const Asset = require('../models/assetModel');
const marketDataService = require('../services/marketDataService');

exports.addAsset = async (req, res) => {
  try {
    const { name, type, ticker, manualPrice, quantity } = req.body;

    // Validate input
    if (!name || !type || !quantity || (!ticker && !manualPrice)) {
      return res.status(400).send('Missing required fields');
    }

    // Fetch ticker price if provided
    let price = manualPrice || (await marketDataService.getTickerPrice(ticker));
    if (!price) {
      return res.status(400).send('Failed to get asset price');
    }

    // Create asset record
    const asset = new Asset({ name, type, ticker, price, quantity });
    await asset.save();

    res.status(201).send(asset);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to add asset');
  }
};