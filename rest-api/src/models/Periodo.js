const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const Periodo = sequelize.define(
  "periodo",
  {
    // Atributos del modelo
    periodo_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Opciones del modelo
    tableName: "periodo",
    timestamps: false,
  }
);

module.exports = Periodo;
