export function authorizeAdmin (req, res, next) {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Acesso negado: apenas administradores podem acessar.' });
  }
  next();
};

