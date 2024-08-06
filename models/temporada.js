const { DataTypes } = require('sequelize');
const sequelize = require('../database/databases');
const PeliculaSerie = require('./pelicula_serie');

const Temporada = sequelize.define('Temporada', {
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
  serie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PeliculaSerie,
      key: 'id',
    },
  },
}, {
  timestamps: false // Desactiva los campos createdAt y updatedAt
});
module.exports = Temporada;
