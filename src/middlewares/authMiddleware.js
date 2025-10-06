import jwt from 'jsonwebtoken';
import sequelize from '../config/database.js';
import UsuarioModel from '../models/Usuario.js';

const Usuario = UsuarioModel(sequelize);
const jwtSecret = "senhalegal";

async function authMiddleware(req, res, next) {
  const authHeader = req.get('Authorization');
  if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido.' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ erro: 'Formato de token inválido.' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const usuario = await Usuario.findByPk(decoded.id);
    if (!usuario) return res.status(401).json({ erro: 'Usuário não encontrado.' });

    req.user = usuario;
    next();
  } catch (err) {
    console.error('Erro no token:', err);
    const msg = err.name === 'TokenExpiredError' ? 'Token expirado. Faça login novamente.' : 'Token inválido.';
    res.status(401).json({ erro: msg });
  }
}

export default authMiddleware;
