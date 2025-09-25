import PedidoAdocao from '../models/PedidoAdocao.js';
import Tutor from '../models/Tutor.js';
import Animal from '../models/Animal.js';

export const postAdocao = async (req, res) => {
  const { tutorId, animalId } = req.body;

  // Validação básica
  if (!tutorId || !animalId) {
    return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos' });
  }

  try {
    // Verifica se o tutor existe
    const tutor = await Tutor.findByPk(tutorId);
    if (!tutor) {
      return res.status(404).json({ erro: 'Tutor não encontrado' });
    }

    // Verifica se o animal existe
    const animal = await Animal.findByPk(animalId);
    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' });
    }

    // Verifica se já existe um pedido para esse animal
    const pedidoExistente = await PedidoAdocao.findOne({ where: { animalId } });
    if (pedidoExistente) {
      return res.status(400).json({ erro: 'Animal já está em processo de adoção' });
    }

    // Cria novo pedido
    const novoPedido = await PedidoAdocao.create({
      tutorId,
      animalId,
      posicao_fila: 1,
      status: '_em_analise'
    });

    return res.status(201).json(novoPedido);
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao processar o pedido de adoção' });
  }
};
