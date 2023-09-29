const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const Proceso = sequelize.define(
  "proceso",
  {
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        customValidator: (value) => {
          const enums = ["Nuevo", "Actualización"];
          if (!enums.includes(value)) {
            throw new Error(
              "El tipo debe ser Nuevo o Actualización"
            );
          }
        },
      },
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: "En proceso",
      validate: {
        customValidator: (value) => {
          const enums = ["En proceso", "Completado", "Cancelado"];
          if (!enums.includes(value)) {
            throw new Error(
              "El tipo debe ser En proceso, Completado o Cancelado"
            );
          }
        },
      },
    },
  },
  {
    timestamps: true,
    tableName: "proceso",
  }
);

module.exports = Proceso;
