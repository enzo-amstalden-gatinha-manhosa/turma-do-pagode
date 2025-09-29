const express = require('express');
const usuario = express();
import { Usuario as UsuarioModel } from '../models/Usuario';

usuario.use(express.json());


const tutores = [
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

usuario.get('/tutores', (req, res) => {
    res.json(tutores);
})

usuario.post('/usuario', async (req, res) => {
    try{  

        const {
            nome_completo, senha, email, cidade, estado, idade,
            telefone, instagram, facebook, celular, cpf, endereco, bairro, cep
          } = req.body;

        if (!nome_completo || !senha || !email || !cidade || !estado || !idade || !telefone) {
            return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
        }
        
        const tutorExistente = await UsuarioModel.findOne({ where: { email } });
        if (tutorExistente) {
            return res.status(400).json({ erro: "Email preenchido já está sendo utilizado." });
        }
        
        const novoTutor = await UsuarioModel.create({
            nome_completo, senha, email, cidade, estado, idade,
            telefone, celular, cpf, endereco, bairro, cep, instagram, facebook
        });
    } catch (error) {
        return res.status(500).json({error: "Erro ao cadastrar usuário."})
    }
    res.status(201).json(novoTutor);
});
    usuario.patch('/tutores/:id', async (req, res) => {
        try {
            const id = req.params.id;
    
            const tutor = await UsuarioModel.findByPk(id);
            if (!tutor) {
                return res.status(404).json({ error: 'Tutor não encontrado' });
            }
    
            const camposPermitidos = ['email', 'nome_completo', 'cidade', 'estado', 'questionario'];
            let houveAtualizacao = false;
    
            camposPermitidos.forEach(campo => {
                if (req.body[campo] !== undefined) {
                    tutor[campo] = req.body[campo];
                    houveAtualizacao = true;
                }
            });
    
            if (!houveAtualizacao) {
                return res.status(400).json({ error: 'Pelo menos um campo deve ser mandado para atualização.' });
            }
    
            await tutor.save();
            res.json(tutor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao atualizar os dados do tutor." });
        }
});
    

