const express= require('express');
const admin= express();
const { op}=require('sequelize');
const Animal = require('../models/Animal');
const PedidoAdocao = require('../models/PedidoAdocao');


admin.use(express.json());

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
  
  module.exports = admin;