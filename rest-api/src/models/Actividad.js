const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const Actividad = sequelize.define(
  "actividad",
  {
    numero: {
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    encargado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    evidencia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Opciones del modelo
    tableName: "actividad",
    timestamps: false,
  }
);

module.exports = Actividad;
