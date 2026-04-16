const dashboardService = require('../services/dashboardService');

class DashboardController {
  async resumo(req, res, next) {
    try {
      const dados = await dashboardService.getResumo();
      return res.status(200).json(dados);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();