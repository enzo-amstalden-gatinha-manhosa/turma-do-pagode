const sequelize = require('../config/database'); 
const UsuarioModel = require('../models/Usuario').default; 
const Usuario = UsuarioModel(sequelize);
const encrypt = require('encryptjs');
const secretKey = "senhalegal";

module.exports = {
  // POST /usuario
  async criar(req, res) {
    try {
      const dados = req.body;

      const camposObrigatorios = [
        "nome_completo", "senha", "email", "cidade", "estado", "idade", "telefone"
      ];

      const faltando = camposObrigatorios.filter(
        campo => !dados[campo] || dados[campo] === ""
      );

      if (faltando.length > 0) {
        return res.status(400).json({
          erro: `Campos obrigatórios ausentes: ${faltando.join(", ")}`
        });
      }

      const UsuarioExistente = await Usuario.findOne({ where: { email: dados.email } });
      if (UsuarioExistente) {
        return res.status(400).json({ erro: "Email preenchido já está sendo utilizado." });
      }

      const senhaCriptografada = encrypt.encrypt(dados.senha, secretKey, 256);

      const novoUsuario = await Usuario.create({
        nome_completo: dados.nome_completo,
        senha: senhaCriptografada,
        email: dados.email,
        cidade: dados.cidade,
        estado: dados.estado,
        idade: dados.idade,
        telefone: dados.telefone,
        celular: dados.celular,
        cpf: dados.cpf,
        endereco: dados.endereco,
        bairro: dados.bairro,
        cep: dados.cep,
        instagram: dados.instagram,
        facebook: dados.facebook,
        administrador: dados.administrador || false
      });

      return res.status(201).json(novoUsuario);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno ao cadastrar usuário." });
    }
  },

  // PATCH /usuario/:id
  async atualizar(req, res) {
    try {
      const id = req.params.id;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const camposPermitidos = [
        'email', 'nome_completo', 'cidade', 'estado', 'idade', 'telefone',
        'celular', 'cpf', 'endereco', 'bairro', 'cep', 'instagram', 'facebook'
      ];

      let houveAtualizacao = false;

      camposPermitidos.forEach(campo => {
        if (req.body[campo] !== undefined) {
          usuario[campo] = req.body[campo];
          houveAtualizacao = true;
        }
      });

      if (!houveAtualizacao) {
        return res.status(400).json({ error: 'Nenhum campo válido enviado para atualização.' });
      }

      await usuario.save();
      res.json({ message: "Usuário atualizado com sucesso.", usuario });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno ao atualizar usuário." });
    }
  },

  // GET /usuario/:id
  async listar(req, res) {
    try {
      const id = req.params.id;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.status(200).json(usuario);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno ao buscar usuário." });
    }
  }
};