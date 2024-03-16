const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const PuestoPrograma = sequelize.define(
  "puesto_programa",
  {
    // Atributos del modelo
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
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
