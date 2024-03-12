const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const PuestoPrograma = sequelize.define(
  "puesto_programa",
  {
    // Atributos del modelo
    puesto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Opciones del modelo
    tableName: "puesto_programa",
    timestamps: false,
  }
);

module.exports = PuestoPrograma;
