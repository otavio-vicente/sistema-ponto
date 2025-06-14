module.exports = (role) => (req, res, next) => {
  if (req.user.perfil !== role) return res.status(403).json({ message: 'Acesso negado' });
  next();
};
