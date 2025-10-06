const encrypt = require('encryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario');

const secretKey = "senhalegal"; // idealmente usar variável de ambiente
const jwtSecret = "segredoJWT"; // também usar variável de ambiente

const Verification = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    // Descriptografar a senha armazenada
    const senhaDescriptografada = encrypt.decrypt(usuario.senha, secretKey, 256);

    if (senha !== senhaDescriptografada) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        administrador: usuario.administrador
      },
      jwtSecret,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login bem-sucedido',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome_completo,
        email: usuario.email,
        administrador: usuario.administrador
      }
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno ao tentar fazer login' });
  }
};

module.exports = { Verification };