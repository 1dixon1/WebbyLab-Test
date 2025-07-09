const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Actor = sequelize.define('Actor', {
  fullName: DataTypes.STRING
});

module.exports = Actor;