const pool = require('../database');
const moment = require('moment-timezone');
moment.tz.setDefault(process.env.TIMEZONE || 'America/Sao_Paulo');

exports.registrarPonto = async (req, res) => {
  const { tipo, hora } = req.body;
  const userId = req.user.id;
  const hoje = moment().format('YYYY-MM-DD');

  if (!tipo || !hora) {
    return res.status(400).json({ message: 'Tipo e hora são obrigatórios' });
  }

  try {
    // Verifica se já existe registro para o funcionário no dia de hoje
    const [registros] = await pool.query(
      `SELECT ${tipo} FROM registros WHERE funcionario_id = ? AND data = ?`,
      [userId, hoje]
    );

    if (registros.length > 0 && registros[0][tipo]) {
      return res.status(400).json({ message: `Ponto ${tipo} já registrado hoje.` });
    }

    if (registros.length === 0) {
      // Se não existir registro para hoje, insere um novo
      await pool.query(
        `INSERT INTO registros (funcionario_id, data, ${tipo}) VALUES (?, ?, ?)`,
        [userId, hoje, hora]
      );
    } else {
      // Se já existir, atualiza o campo específico
      await pool.query(
        `UPDATE registros SET ${tipo} = ? WHERE funcionario_id = ? AND data = ?`,
        [hora, userId, hoje]
      );
    }

    res.json({ message: 'Ponto registrado com sucesso' });
  } catch (err) {
    console.error('Erro registrarPonto:', err);
    res.status(500).json({ message: 'Erro ao registrar ponto' });
  }
};
