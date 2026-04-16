const userService = require('./userService');
const productService = require('./productService');

class DashboardService {
  async getResumo() {
    const totalUsuarios = await userService.contarUsuarios();
    const totalProdutos = await productService.contarProdutos();

    return {
      totalUsuarios,
      totalProdutos
    };
  }
}

module.exports = new DashboardService();