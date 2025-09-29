const express = require('express');
const app = express();
const authMiddleware = require('./src/middlewares/authMiddleware');
const adminMiddleware = require('./src/middlewares/adminMiddleware');
const animalRoutes = require('./src/routes/animalRoutes');
const doacoesRoutes = require('./src/routes/doacoesRoutes'); 
const sequelize = require('./src/config/database');

// Testar conexão com o banco de dados
sequelize.authenticate()
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
app.get('/admin/animais', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ msg: 'Lista de animais (apenas admins podem ver)' });
});

// Rotas principais
app.use('/animais', animalRoutes);
app.use(doacoesRoutes); // rota de doações integrada

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
