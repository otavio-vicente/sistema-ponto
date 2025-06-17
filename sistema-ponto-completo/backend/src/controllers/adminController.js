const pool = require('../database');
const bcrypt = require('bcrypt');
const gerarPDF = require('../utils/pdfGenerator');

// CADASTRAR FUNCIONÁRIO
exports.cadastrarFuncionario = async (req, res) => {
  const { matricula, nome, senha, tipo } = req.body;
  if (!matricula || !nome || !senha || !tipo) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }
  try {
    const [exists] = await pool.query(
      'SELECT 1 FROM funcionarios WHERE matricula = ?', 
      [matricula]
    );
    if (exists.length) {
      return res.status(400).json({ message: 'Matrícula já cadastrada.' });
    }
    const hash = await bcrypt.hash(senha, 10);
    await pool.query(
      'INSERT INTO funcionarios (matricula, nome, senha, perfil) VALUES (?, ?, ?, ?)',
      [matricula, nome, hash, tipo]
    );
    res.status(201).json({ message: 'Funcionário cadastrado com sucesso!' });
  } catch (err) {
    console.error('Erro cadastrarFuncionario:', err);
    res.status(500).json({ message: 'Erro ao cadastrar funcionário.' });
  }
};

// LISTAR FUNCIONÁRIOS
exports.listarFuncionarios = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, matricula, nome, perfil FROM funcionarios'
    );
    res.json(rows);
  } catch (err) {
    console.error('Erro listarFuncionarios:', err);
    res.status(500).json({ message: 'Erro ao buscar funcionários.' });
  }
};

// REMOVER FUNCIONÁRIO
exports.removerFuncionario = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM funcionarios WHERE id = ?', [id]);
    res.json({ message: 'Funcionário removido com sucesso.' });
  } catch (err) {
    console.error('Erro removerFuncionario:', err);
    res.json({ message: 'O funcionário possui registros.' });
    res.status(500).json({ message: 'Erro ao remover funcionário.' });
  }
};

// GERAR RELATÓRIO EM PDF
exports.gerarRelatorio = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        f.matricula, f.nome, r.data,
        r.entrada_manha,
        r.saida_manha,
        r.entrada_tarde,
        r.saida_tarde
      FROM registros r
      JOIN funcionarios f ON r.funcionario_id = f.id
      WHERE r.data = CURDATE()
      ORDER BY f.matricula
    `);
    gerarPDF(rows, res);
  } catch (err) {
    console.error('Erro gerarRelatorio:', err);
    res.status(500).json({ message: 'Erro ao gerar relatório.' });
  }
};
