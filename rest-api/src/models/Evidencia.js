const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const Evidencia = sequelize.define(
  "evidencia",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: "evidencia",
    timestamps: false,
  }
);

module.exports = Evidencia;

