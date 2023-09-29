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
      type: DataTypes.STRING,
      allowNull: true,
    },
    encargado: {
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