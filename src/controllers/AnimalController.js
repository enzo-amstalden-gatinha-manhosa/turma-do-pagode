const express = require('express');
const sequelize = require('../config/database'); // importa a instância
const Animal = require('../models/Animal'); // importa a função do model
const multer = require('multer');
const path = require('path');

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

module.exports = {
  async listar(req, res) {
    try {
      const { especie, porte, castrado, vacinado } = req.query;
      let where = {};
      if (especie) where.especie = especie;
      if (porte) where.porte = porte;
      if (castrado !== undefined) where.castrado = castrado === 'true';
      if (vacinado !== undefined) where.vacinado = vacinado === 'true';

      const animais = await Animal.findAll({ where, order: [['createdAt', 'ASC']] });
      res.status(200).json({ data: animais, total: animais.length });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao buscar animais" });
    }
  },

  async buscarPorId(req, res) {
    try {
      const animal = await Animal.findByPk(req.params.id);
      if (!animal) return res.status(404).json({ erro: "Animal não encontrado" });
      res.status(200).json(animal);
    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao buscar animal" });
    }
  },

  // Aqui aplicamos o multer como middleware antes da lógica de criação
  criar: [
    upload.single('foto'),
    async (req, res) => {
      try {
        console.log("BODY RECEBIDO", req.body);
        const { nome, especie, porte, castrado, vacinado, descricao } = req.body;
        const foto = req.file ? req.file.filename : null;

        if (!nome || !especie || !porte || castrado === undefined || vacinado === undefined || !descricao || !foto) {
          return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
        }
        if (typeof nome !== 'string' || typeof especie !== 'string' || typeof porte !== 'string' || typeof descricao !== 'string') {
          return res.status(400).json({ erro: "Campos nome, especie, porte e descricao devem ser strings." });
        }
        if (typeof castrado !== 'boolean' && castrado !== 'true' && castrado !== 'false') {
          return res.status(400).json({ erro: "Campo castrado deve ser boolean (true/false)." });
        }
        if (typeof vacinado !== 'boolean' && vacinado !== 'true' && vacinado !== 'false') {
          return res.status(400).json({ erro: "Campo vacinado deve ser boolean (true/false)." });
        }

        const novoAnimal = await Animal.create({
          nome,
          especie,
          porte,
          castrado: castrado === true || castrado === 'true',
          vacinado: vacinado === true || vacinado === 'true',
          descricao,
          foto // salva o nome do arquivo no banco
        });

        res.status(201).json(novoAnimal);
      } catch (erro) {
        console.error('Erro ao cadastrar o animal', erro);
        res.status(500).json({ erro: "Erro interno ao cadastrar o animal.", detalhes: erro.message });
      }
    }
  ]
};