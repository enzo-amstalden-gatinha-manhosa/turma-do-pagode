const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const sequelize = new Sequelize({
  username: 'postgres',
  password: 'TurmaDoPagode1',
  database: 'postgres',
  host: 'db.yypmbdzhacvpbeymfcdn.supabase.co',
  port: 5432,
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;

