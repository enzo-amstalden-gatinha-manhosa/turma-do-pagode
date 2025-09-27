
function adminMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ erro: 'Usuário não autenticado' });
  }

  if (!req.user.administrador) {
    return res.status(403).json({ erro: 'Acesso não autorizado' });
  }

  next();
}

module.exports = adminMiddleware;
