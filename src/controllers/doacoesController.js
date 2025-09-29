const { generateQRCode } = require('../utils/qrcodeGenerator');

const doacoes = [];

async function createDoacao(req, res) {
    try {
        const { nome, email, valor, mensagem } = req.body;

        // Validação dos campos obrigatórios
        if (!nome || !email || !valor || !mensagem) {
            return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente" });
        }

        if (typeof valor !== 'number' || valor <= 0) {
            return res.status(400).json({ erro: "Valor da doação deve ser um número positivo" });
        }

        // String de exemplo para Pix
        const chavePix = "seu-chave-pix@exemplo.com";
        const pixString = `00020126580014BR.GOV.BCB.PIX0136${chavePix}5204000053039865405${valor.toFixed(2)}5802BR5920${nome}6009Cidade62070503***6304ABCD`;

        // Gera QR Code
        const qrCodeBase64 = await generateQRCode(pixString);

        // Criar nova doação
        const novaDoacao = {
            id: doacoes.length + 1,
            nome,
            email,
            valor,
            mensagem,
            linkPix: chavePix,
            qrcode: qrCodeBase64
        };

        doacoes.push(novaDoacao);

        return res.status(201).json(novaDoacao);

    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao processar a doação" });
    }
}

module.exports = { createDoacao };
