const jwt = require('jsonwebtoken')
const  Usuario  = require('../models/Usuario')

const jwtSecret = "segredoJWT";

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ erro: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ erro: 'Token inválido' });
    }

    const decoded = jwt.verify(token, jwtSecret);

    const usuario = await Usuario.findByPk(decoded.id);
    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    req.user = usuario;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}

module.exports = authMiddleware;
