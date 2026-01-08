const { Parser } = require('json2csv');
const SimulationService = require('../services/simulationService');

exports.exportCsv = async (req, res) => {
  try {
    const simulationData = await SimulationService.fetchSimulationData();

    const fields = ['ExpectedValue', 'VaR95', 'CVaR95', 'ProbabilityOfLoss'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(simulationData);

    res.header('Content-Type', 'text/csv');
    res.attachment('simulation_results.csv');
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to export CSV');
  }
};