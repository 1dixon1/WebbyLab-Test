const { Sequelize } = require('sequelize');
const path = require('path');
const sqlite3 = require('sqlite3');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../db.sqlite'),
  logging: false,
  dialectOptions: {
    mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
  },
  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
