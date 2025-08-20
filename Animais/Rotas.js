const express = require('express');
const animal= express();

animal.use(express.json());

let animais = [
    {
        id,
        nome,
        especie,
        porte,
        castrado,
        vacinado,
        adotado,
        descricao,
        foto
    }
];

animal.get('/animais', (req, res) => {
    try{res.json(animais);}
    catch (erro) {
        res.status(500).json({erro: "Erro ao buscar animais"});
    }
});

animal.get('/animais/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const animal = animais.find(a => a.id === id);
        
        if (!animal) {
            return res.status(404).json({erro: "Animal não encontrado"});
        }
        
        res.json(animal);
    } catch (erro) {
        res.status(500).json({erro: "Erro interno do servidor ao buscar animal"});
    }
});

animal.post('/animais', (req, res) => {
    try {
        const novoAnimal = {nome: req.body.nome, especie: req.body.especie, porte: req.body.porte, castrado: req.body.castrado, vacinado: req.body.vacinado, adotado: req.body.adotado, descricao: req.body.descricao, foto: req.body.foto};
        if(nome && especie && porte && castrado && vacinado && adotado && descricao) {
            animais.push(novoAnimal);
        } else {
            return res.status(400).json({erro: "Todos os campos obrigatórios devem ser preenchidos corretamente"});
        }
            
        res.status(201).json(novoAnimal);
    } catch (erro) {
        res.status(500).json({erro: "Erro interno ao cadastrar o animal."});
    }
});

