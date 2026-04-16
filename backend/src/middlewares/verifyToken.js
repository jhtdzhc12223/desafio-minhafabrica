const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const error = new Error('Token não fornecido');
    error.statusCode = 401;
    return next(error);
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    const error = new Error('Token mal formatado');
    error.statusCode = 401;
    return next(error);
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    const error = new Error('Token mal formatado');
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    const error = new Error('Token inválido ou expirado');
    error.statusCode = 401;
    return next(error);
  }
};

module.exports = verifyToken;
