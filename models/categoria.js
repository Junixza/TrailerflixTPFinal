const { DataTypes } = require('sequelize');
const sequelize = require('../database/databases');

const Categoria = sequelize.define('Categoria', {
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
}, {
  timestamps: false // Desactiva los campos createdAt y updatedAt
});

module.exports = Categoria;
