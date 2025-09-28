import bcrypt from 'bcryptjs';
import { Usuario } from '../models/Modelos.js';
export const Verification = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno ao tentar fazer login' });
  }
};
