const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const Proceso = sequelize.define(
  "proceso",
  {
    tipo_proceso: {
      type: DataTypes.STRING,
      allowNull: false,
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
