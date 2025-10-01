const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  username: 'postgres',
  password: 'TurmaDoPagode1',
  database: 'postgres',
  host: 'db.xpewwnsmtjvkbcywghsd.supabase.co',
  port: 5432,
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

module.exports = sequelize;
