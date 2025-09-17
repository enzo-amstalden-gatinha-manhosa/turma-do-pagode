const express = require('express');
const adocao = express();

adocao.use(express.json());

const adocoes = [
    {
        id,
        status,
        posicao_fila,
        tutorId,
        animalId
    }
];

adocao.post('/adocoes', (req, res) => {
    try {
        const { tutorId, animalId } = req.body;

        // Validação dos campos
        if (!tutorId || !animalId) {
            return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente" });
        }

        // Validação se tutor e animal existem
        const tutorExiste = true;
        const animalExiste = true;
        if (!tutorExiste) {
            return res.status(404).json({ erro: "Tutor não encontrado" });
        }
        if (!animalExiste) {
            return res.status(404).json({ erro: "Animal não encontrado" });
        }

        // Verificar se já existe um pedido de adoção para o mesmo tutor e animal
        const pedidoExistente = adocoes.find(pedido => pedido.tutorId === tutorId && pedido.animalId === animalId);
        if (pedidoExistente) {
            return res.status(409).json({ erro: "Já existe um pedido de adoção para este tutor e animal" });
        }

        // Criar novo pedido de adoção
        const novoPedido = { id: adocoes.length + 1, status: 'em_analise', posicao_fila: null, tutorId, animalId };
        adocoes.push(novoPedido);

        return res.status(201).json(novoPedido);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao processar o pedido de adoção" });
        
    }
});

module.exports = adocao;