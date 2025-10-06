const PedidoAdocao = require('../models/PedidoAdocao');
const Tutor = require('../models/Usuario');
const Animal = require('../models/Animal');
const { Op } = require('sequelize');

const postAdocao = async (req, res) => {
  const { tutorId, animalId } = req.body;

  // Validação básica - 400 Bad Request
  if (!tutorId || !animalId) {
    return res.status(400).json({ erro: 'Campos tutorId e animalId são obrigatórios' });
  }

  try {
    // Verifica se o tutor ou animal existe - 404 Not Found
    const tutor = await Tutor.findByPk(tutorId);
    const animal = await Animal.findByPk(animalId);
    if (!tutor || !animal) {
      return res.status(404).json({ erro: 'Tutor ou animal não encontrado' });
    }

    // Verifica se existe um pedido ativo para o tutor e animal - 409 Conflict
    const pedidoExistente = await PedidoAdocao.findOne({
      where: {
        tutorId,
        animalId,
        status: {
          [Op.notIn]: ['finalizado', 'cancelado']
        }
      }
    });

    if (pedidoExistente) {
      return res.status(409).json({ erro: 'Este tutor já tem um pedido de adoção para este animal' });
    }

    // Cria novo pedido
    const novoPedido = await PedidoAdocao.create({
      tutorId,
      animalId,
      posicao_fila: 1,
      status: 'em_analise'
    });

    return res.status(201).json(novoPedido);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao registrar o pedido de adoção' });
  }
};

module.exports = { postAdocao };