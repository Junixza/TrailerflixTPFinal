const { DataTypes } = require('sequelize');
const sequelize = require('../database/databases');
const Temporada = require('./temporada');

const Capitulo = sequelize.define('Capitulo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temporada_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Temporada,
      key: 'id',
    },
  },
});

module.exports = Capitulo;
