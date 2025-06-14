const express = require('express');
const router  = express.Router();
const ponto   = require('../controllers/pontoController');
const auth    = require('../middleware/authenticate');
const permit  = require('../middleware/authorize');

router.post('/registrar', auth, permit('funcionario'), ponto.registrarPonto);

module.exports = router;
