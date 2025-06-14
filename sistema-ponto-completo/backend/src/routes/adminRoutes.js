const express = require('express');
const router  = express.Router();
const admin   = require('../controllers/adminController');
const auth    = require('../middleware/authenticate');
const permit  = require('../middleware/authorize');

router.post   ('/cadastrar',   auth, permit('admin'), admin.cadastrarFuncionario);
router.get    ('/funcionarios',auth, permit('admin'), admin.listarFuncionarios);
router.delete ('/funcionarios/:id', auth, permit('admin'), admin.removerFuncionario);
router.get    ('/relatorio',   auth, permit('admin'), admin.gerarRelatorio);

module.exports = router;
