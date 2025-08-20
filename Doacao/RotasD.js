const express = require('express');
const tutor = express();

doacao.use(express.json());

const doacoes = [
    {
        id,
        nome,
        email,
        valor,
        linkPix,
        mensagem
        }
];


// Rota POST - Criar uma nova doação
doacao.post('/doacoes', (req, res) => {
    try {
        const { nome, email, valor, linkPix, mensagem } = req.body;

        // Validação dos campos
        if (!nome || !email || !valor || !linkPix || !mensagem) {
            return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente" });
        }

        if (typeof valor !== 'number' || valor <= 0) {
            return res.status(400).json({ erro: "Valor da doação deve ser um número positivo" });
        }

        // Criar nova doação
        const novaDoacao = { id: doacoes.length + 1, nome, email, valor, linkPix, mensagem };
        doacoes.push(novaDoacao);

        return res.status(201).json(novaDoacao);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao processar a doação" });
    }
});
