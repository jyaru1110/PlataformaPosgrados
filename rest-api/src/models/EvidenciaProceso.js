const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const EvidenciaProceso = sequelize.define(
  "evidenciaProceso",
  {
    estado: {
      type: DataTypes.STRING,
      defaultValue: "En proceso",
      validate: {
        customValidator: (value) => {
          const enums = ["En proceso", "Completada", "Cancelada"];
          if (!enums.includes(value)) {
            throw new Error(
              "El tipo debe ser En proceso, Completada o Cancelada"
            );
          }
        },
      },
    },
    url: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  },
  {
    // Opciones del modelo
    tableName: "evidenciaProceso",
    timestamps: true,
  }
);

module.exports = EvidenciaProceso;
