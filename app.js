'use strict';

const express = require('express');
const app = express();
const authMiddleware = require('./src/middlewares/authMiddleware');
const adminMiddleware = require('./src/middlewares/adminMiddleware');
const animalRoutes = require('./src/routes/animalRoutes');
const doacoesRoutes = require('./src/routes/doacoesRoutes'); // havia nos dois blocos
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const adocaoRoutes = require('./src/routes/adocaoRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const questionarioRoutes = require('./src/routes/questionarioRoutes');
const sequelize = require('./src/config/database');
const loginRoutes = require('./src/routes/loginRoutes')
const path = require('path');

// Servir arquivos estáticos (imagens)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Testar conexão com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    return sequelize.sync();
  })
  .then(() => console.log('Banco de dados sincronizado.'))
  .catch(err => console.error('Não foi possível conectar ao banco de dados:', err));

// Habilitar JSON
app.use(express.json());

// Rotas públicas
app.get('/', (req, res) => {
  res.json({ msg: 'Bem-vindo! Essa rota é pública.' });
});

// Rotas com autenticação
app.get('/perfil', authMiddleware, (req, res) => {
  res.json({ msg: `Olá, ${req.user.nome}, seu CPF é ${req.user.cpf}` });
});

// Rotas administrativas


// Rotas principais
app.use('/animais', animalRoutes);
app.use('/adocao', adocaoRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/doacoes', doacoesRoutes);
app.use('/admin', authMiddleware, adminMiddleware, adminRoutes);
app.use('/questionario', questionarioRoutes); // Nova rota para questionários
app.use('/', loginRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
