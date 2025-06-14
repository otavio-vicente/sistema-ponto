const pool = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  console.log('Recebendo login:', req.body);

  const { matricula, senha } = req.body;

  if (!matricula || !senha) {
    return res.status(400).json({ message: 'Matrícula e senha são obrigatórios' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM funcionarios WHERE matricula = ?', [matricula]);
    if (rows.length === 0) return res.status(401).json({ message: 'Usuário não encontrado' });

    const user = rows[0];
    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) return res.status(401).json({ message: 'Senha incorreta' });

    const token = jwt.sign(
      { id: user.id, perfil: user.perfil },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({ token, perfil: user.perfil, nome: user.nome, matricula: user.matricula });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ message: 'Erro interno' });
  }
};
