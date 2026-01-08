const SimulationService = require('../services/simulationService');

exports.runSimulation = async (req, res) => {
  try {
    const assets = await SimulationService.getAssets();
    const { paths, riskMetrics } = SimulationService.runMonteCarloSimulation(assets);
    res.json({ paths, riskMetrics });
  } catch (error) {
    console.error(error);
    res.status(500).send('Simulation failed');
  }
};