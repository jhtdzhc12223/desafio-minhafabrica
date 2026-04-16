const userRepository = require('../repositories/userRepository');
const { validarEmail } = require('../utils/validators');

class UserService {
  async criarUsuario(dados) {
    const { nome, email, senha, perfil } = dados;

    if (!nome || !email || !senha) {
      const error = new Error('Nome, email e senha são obrigatórios');
      error.statusCode = 400;
      throw error;
    }

    if (!validarEmail(email)) {
      const error = new Error('Email inválido');
      error.statusCode = 400;
      throw error;
    }

    if (senha.length < 6) {
      const error = new Error('Senha deve ter no mínimo 6 caracteres');
      error.statusCode = 400;
      throw error;
    }

    const existente = await userRepository.findByEmail(email);
    if (existente) {
      const error = new Error('Email já cadastrado');
      error.statusCode = 409;
      throw error;
    }

    if (perfil && !['admin', 'user'].includes(perfil)) {
      const error = new Error('Perfil deve ser "admin" ou "user"');
      error.statusCode = 400;
      throw error;
    }

    return await userRepository.create({ nome, email, senha, perfil });
  }

  async listarUsuarios() {
    return await userRepository.findAll();
  }

  async buscarUsuarioPorId(id) {
    const usuario = await userRepository.findById(id);

    if (!usuario) {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return usuario;
  }

  async atualizarUsuario(id, dados) {
    const { email, perfil } = dados;

    if (email && !validarEmail(email)) {
      const error = new Error('Email inválido');
      error.statusCode = 400;
      throw error;
    }

    if (perfil && !['admin', 'user'].includes(perfil)) {
      const error = new Error('Perfil deve ser "admin" ou "user"');
      error.statusCode = 400;
      throw error;
    }

    if (email) {
      const existente = await userRepository.findByEmail(email);

      if (existente && existente._id.toString() !== id) {
        const error = new Error('Email já está em uso');
        error.statusCode = 409;
        throw error;
      }
    }

    const usuarioAtualizado = await userRepository.update(id, dados);

    if (!usuarioAtualizado) {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return usuarioAtualizado;
  }

  async deletarUsuario(id) {
    const deletado = await userRepository.delete(id);

    if (!deletado) {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return deletado;
  }

  async contarUsuarios() {
    return await userRepository.count();
  }
}

module.exports = new UserService();