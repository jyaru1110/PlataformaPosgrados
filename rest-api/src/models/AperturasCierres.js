const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const AperturasCierres = sequelize.define(
  "aperturas_cierres",
  {
    // Atributos del modelo
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    term: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meta_inscripciones: {
      type: DataTypes.INTEGER,
    },
    num_inscripciones: {
      type: DataTypes.INTEGER,
    },
  },
  {
    // Opciones del modelo
    tableName: "aperturas_cierres",
    timestamps: false,
  }
);

module.exports = AperturasCierres;
