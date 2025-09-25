const express = require('express');
const app = express();
const authMiddleware = require('../Venturus/src/middlewares/authMiddleware');
const adminMiddleware = require('../Venturus/src/middlewares/adminMiddleware');

app.use(express.json());


app.get('/', (req, res) => {
  res.json({ msg: 'Bem-vindo! Essa rota é pública.' });
});


app.get('/perfil', authMiddleware, (req, res) => {
  res.json({ msg: `Olá, ${req.user.nome}, seu CPF é ${req.user.cpf}` });
});


app.get('/admin/animais', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ msg: 'Lista de animais (apenas admins podem ver)' });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));