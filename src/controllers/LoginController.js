import encrypt from 'encryptjs';
import { Usuario } from '../models/Usuario';

const secretKey = "senhalegal"; // idealmente usar variável de ambiente

export const Verification = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    // Descriptografar a senha armazenada
    const senhaDescriptografada = encrypt.decrypt(usuario.password, secretKey, 256);

    // Comparar com a senha enviada pelo usuário
    if (senha !== senhaDescriptografada) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno ao tentar fazer login' });
  }
};
