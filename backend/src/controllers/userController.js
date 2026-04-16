const userService = require('../services/userService');

class UserController {
  async criar(req, res, next) {
    try {
      const usuario = await userService.criarUsuario(req.body);
      return res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async listar(req, res, next) {
    try {
      const usuarios = await userService.listarUsuarios();
      return res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      const usuario = await userService.buscarUsuarioPorId(req.params.id);
      return res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req, res, next) {
    try {
      const usuario = await userService.atualizarUsuario(req.params.id, req.body);
      return res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async deletar(req, res, next) {
    try {
      await userService.deletarUsuario(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();