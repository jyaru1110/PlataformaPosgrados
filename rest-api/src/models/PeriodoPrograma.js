const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const PeriodoPrograma = sequelize.define(
  "periodo_programa",
  {
    // Atributos del modelo
    meta_inscripciones: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    num_inscripciones: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Opciones del modelo
    tableName: "periodo_programa",
    timestamps: false,
  }
);

module.exports = PeriodoPrograma;
