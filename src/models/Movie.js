const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Movie = sequelize.define('Movie', {
  title: DataTypes.STRING,
  year: DataTypes.INTEGER,
  format: DataTypes.ENUM('VHS', 'DVD', 'Blu-Ray')
});

module.exports = Movie;