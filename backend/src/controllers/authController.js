const authService = require('../services/authService');

class AuthController {
  async login(req, res, next) {
    try {
      const { email, senha } = req.body;

      const result = await authService.login(email, senha);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();