const express= require('express');
const admin= express();
const { op}=require('sequelize');
const Animal = require('../models/Animal');
const PedidoAdocao = require('../models/PedidoAdocao');
const adminMiddleware = require('../middlewares/adminMiddleware');

admin.use(express.json());
admin.use('/admin', adminMiddleware);

admin.get('/admin/animais', async (req, res) => {
    try {
      const { especie, porte, castrado, vacinado, adotado } = req.query;
  
      const filtros = {};
      if (especie) filtros.especie = especie;
      if (porte) filtros.porte = porte;
      if (castrado !== undefined) filtros.castrado = castrado === 'true';
      if (vacinado !== undefined) filtros.vacinado = vacinado === 'true';
      if (adotado !== undefined) filtros.adotado = adotado === 'true';
     
      const animais = await Animal.findAll({
        where: filtros,
        include: [
          {
            model: PedidoAdocao,
            as: 'pedidosAdocao'
          }
        ],
        order: [['created_at', 'DESC']]
      });
  
      res.status(200).json({
        data: animais,
        total: animais.length
      });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao buscar animais' });
    }
  });
  
  admin.patch('/admin/animais/:id', async (req, res)=>{
    try{
      const {id} = req.params;
      const dadosAtualizados= req.body;

      if (!dadosAtualizados || Object.keys(dadosAtualizados).length ===0){
        return res.status(400).json({
          erro: 'Nenhum campo foi fornecido para atualização'
        });
      }
      const animal = await Animal.findByPk(id); // Não é PK, e sim Pk

      if(!animal){
        return res.status(404).json({erro: 'Animal não encontrado'});
      }

      await animal.update("Dados atualizados com sucesso", dadosAtualizados);

      return res.status(200).json({
        id: animal.id,
        nome: animal.nome,
        castrado: animal.castrado,
        vacinado: animal.vacinado,
        adotado: animal.adotado,
        descricao: animal.descricao,
        updated_at: animal.updatedAt.toISOString()
      });
    }catch(erro){
      console.error(erro);
      return res.status(500).json({erro: 'Erro ao atualizar o animal'});
    };
  })
  admin.delete('/admin/animais/:id', async (req, res)=>{
    try{
      const {id} = req.params;
      const animal = await Animal.findByPk(id);
      if(!animal){
        return res.status(404).json({erro: 'Animal não encontrado'});
      }
      await animal.destroy();
      return res.status(204).json({msg: 'Animal deletado com sucesso'});
    }catch(erro){
      console.error(erro);
      return res.status(500).json({erro: 'Erro ao deletar o animal'});
    }
  });
  module.exports = admin;