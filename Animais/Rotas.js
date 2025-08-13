const express = require('express');
const Animal = require('./Animal');

const router = express.Router();

router.use(express.json());
router.post('/animais', async (req, res) => {
    try {
        const {id, nome, especie, porte, castrado, vacinado, adotado, descricao, foto} = req.body;
        const Animal= await Animal.create({
            id,
            nome,
            especie,
            porte,
            castrado,
            vacinado,
            adotado,
            descricao,
            foto
        });
        res.status(201).json(Animal);
    } catch (error) {
        res.status(500).json({ error: 'Erro interno ao cadastrar o animal.' });
    }});