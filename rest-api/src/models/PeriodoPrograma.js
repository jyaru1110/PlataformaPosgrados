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
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    // Opciones del modelo
    tableName: "periodo_programa",
    timestamps: true,
  }
);

module.exports = PeriodoPrograma;
