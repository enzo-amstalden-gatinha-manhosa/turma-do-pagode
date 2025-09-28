'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Administrador',
      email: 'admin@meuapp.com',
      password: bcrypt.hashSync('SenhaForte123', 10),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'admin@meuapp.com' }, {});
  }
};
