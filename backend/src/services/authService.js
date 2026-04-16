const userRepository = require('../repositories/userRepository');
const generateToken = require('../utils/generateToken');
const { validarEmail } = require('../utils/validators');

class AuthService {
  async login(email, senha) {
    if (!email || !senha) {
      const error = new Error('Email e senha são obrigatórios');
      error.statusCode = 400;
      throw error;
    }

    if (!validarEmail(email)) {
      const error = new Error('Email inválido');
      error.statusCode = 400;
      throw error;
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      const error = new Error('Credenciais inválidas');
      error.statusCode = 401;
      throw error;
    }

    const senhaValida = await user.compararSenha(senha);
    if (!senhaValida) {
      const error = new Error('Credenciais inválidas');
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user._id);

    return {
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        perfil: user.perfil
      }
    };
  }
}

module.exports = new AuthService();