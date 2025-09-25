const { Usuario } = require('../models'); 

async function authMiddleware(req, res, next) {
  try {
    const cpf = req.headers['x-user-cpf']; 

    if (!cpf) {
      return res.status(401).json({ erro: 'Usuário não autenticado: header x-user-cpf ausente' });
    }
    
    const usuario = await Usuario.findOne({ where: { cpf } });

    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    req.user = usuario;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno na autenticação' });
  }
}

module.exports = authMiddleware;