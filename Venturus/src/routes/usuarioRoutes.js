const express = require('express');
const usuario = express();
import { Usuario as UsuarioModel } from '../models/Usuario';

usuario.use(express.json());


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
        celular,
        cpf,
        endereco,
        bairro,
        cep,
        instagram,
        facebook
        }
];

// Rota GET - Listar todas as terfas
usuario.get('/tutores', (req, res) => {
    res.json(tutores);
})

//Rota POST - Criar uma nova tarefa
usuario.post('/tutores', async (req, res) => {
    const novoTutor = {
        nome_completo, senha, email, cidade, estado, idade,
        telefone, celular, cpf, endereco, bairro, cep, instagram, facebook
    } = req.body;
    
        const resultado = await UsuarioModel.create({
            nome_completo, senha, email, cidade, estado, idade,
            telefone, celular, cpf, endereco, bairro, cep, instagram, facebook
        });

        console.log(resultado);

    if( !nome_completo || !senha || !email || !cidade || !estado || !idade || !telefone) {
        return tutores.push(novoTutor);
    } else {
        return res.status(400).json({erro: "Todos os campos obrigatórios devem ser preenchidos corretamente"});
    }
        
    res.status(201).json(novoTutor);
});

//Rota PUT - Atualizar uma tarefa existente
usuario.patch('/tutores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tutor = tutor.find((t) => t.id == id);
    if (!tutor) return res.status(404).json({ error: 'Tutor não encontrada' });

    tutor.nome = req.body.nome;
    res.json(tutor);
});
