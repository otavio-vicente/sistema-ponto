const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

const bcrypt = require('bcrypt');

(async () => {
  const hash = await bcrypt.hash('123', 10);
  // console.log(hash);
})();


// 1) Habilita CORS para APIs (se ainda precisar de cross-origins para chamadas AJAX internas)
app.use(cors());

// 2) Parse JSON
app.use(express.json());

// 3) Rotas da API
const authRoutes  = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pontoRoutes = require('./routes/pontoRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ponto', pontoRoutes);

// 4) Servir o frontend estático
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// Para qualquer rota não-API, devolve o index.html (para lidar com refresh em páginas “SPA” ou caminhos relativos)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// 5) Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
