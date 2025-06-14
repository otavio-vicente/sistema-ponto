const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o header Authorization está presente e formatado corretamente
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido ou mal formatado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Atribui os dados do usuário decodificado no token à requisição
    req.user = {
      id: decoded.id,
      perfil: decoded.perfil,
      nome: decoded.nome,
      matricula: decoded.matricula
    };

    next(); // Continua para a próxima middleware ou rota
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
