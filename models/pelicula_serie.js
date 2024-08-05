const { DataTypes } = require('sequelize');
const sequelize = require('../database/databases');
const Categoria = require('./categoria');
const Genero = require('./genero');

const PeliculaSerie = sequelize.define('PeliculaSerie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categoria,
      key: 'id',
    },
  },
  genero_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Genero,
      key: 'id',
    },
  },
  tags: {
    type: DataTypes.STRING,
  },
  resumen: {
    type: DataTypes.TEXT,
  },
  duracion: {
    type: DataTypes.STRING,
  },
  temporadas: {
    type: DataTypes.INTEGER,
  },
  trailer: {
    type: DataTypes.STRING,
  },
});

module.exports = PeliculaSerie;
