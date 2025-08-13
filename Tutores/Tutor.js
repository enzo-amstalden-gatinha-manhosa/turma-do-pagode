const express = require('express');
const tutor = express();

tutor.use(express.json());


let tutores = [
    {
        id,
        nome_completo,
        senha,
        email,
        cidade,
        estado,
        idade,
        telefone,
        instagram,
        facebook
        }
];

// Rota GET - Listar todas as terfas
tutor.get('/tarefas', (req, res) => {
    res.json(tarefas);
})

//Rota POST - Criar uma nova tarefa
tutor.post('/tutores', (req, res) => {
    const novoTutor = {nome_completo: req.body.nome_completo, senha: req.body.senha, email: req.body.email, cidade: req.body.cidade, };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

//Rota PUT - Atualizar uma tarefa existente
tutor.patch('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = tarefa.find((t) => t.id == id);
    if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

    tarefa.nome = req.body.nome;
    res.json(tarefa);
});
