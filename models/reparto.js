const { DataTypes } = require('sequelize');
const sequelize = require('../database/databases');
const Actor = require('./actor');
const PeliculaSerie = require('./pelicula_serie');

const Reparto = sequelize.define('Reparto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  actor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Actor,
      key: 'id',
    },
  },
  pelicula_serie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PeliculaSerie,
      key: 'id',
    },
  },
});

module.exports = Reparto;
