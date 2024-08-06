const { DataTypes } = require('sequelize');
const sequelize = require('../database/databases');

const Actor = sequelize.define('Actor', {
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
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false // Desactiva los campos createdAt y updatedAt
});
module.exports = Actor;
