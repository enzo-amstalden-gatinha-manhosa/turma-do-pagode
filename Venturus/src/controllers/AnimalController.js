const express = require('express');
const Animal = require('../models/Animal');


module.exports = {
  async listar(req, res) {
    try {
      const { especie, porte, castrado, vacinado } = req.query;
      let where = {};
      if (especie) where.especie = especie;
      if (porte) where.porte = porte;
      if (castrado !== undefined) where.castrado = castrado === 'true';
      if (vacinado !== undefined) where.vacinado = vacinado === 'true';

      const animais = await Animal.findAll({ where, order: [['created_at', 'ASC']] });
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

  async criar(req, res) {
    try {
        console.log("BODY RECEBIDO", req.body);
      const { nome, especie, porte, castrado, vacinado, descricao, foto } = req.body;
      if (!nome || !especie || !porte || castrado === undefined || vacinado === undefined || !descricao || !foto) {
        return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
      }

      const novoAnimal = await Animal.create({
        nome,
        especie,
        porte,
        castrado,
        vacinado,
        descricao,
        foto: Buffer.from(foto, 'base64')
      });

      res.status(201).json(novoAnimal);
    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao cadastrar o animal." });
    }
  }
};