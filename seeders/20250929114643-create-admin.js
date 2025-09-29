'use strict';
  
const encryptjs = require('encryptjs');
const secret = "senhalegal";

module.exports = {
  async up (queryInterface, Sequelize) {
    const senhaCript = encryptjs.encrypt("admin", secret, 256);

    await queryInterface.bulkInsert('usuario', [{
      name: 'Administrador',
      email: 'admin@meuapp.com',
      password: senhaCript,
      administrador: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuario', { email: 'admin@meuapp.com' }, {});
  }
};