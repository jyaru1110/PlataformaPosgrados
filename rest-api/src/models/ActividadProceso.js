const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const ActividadProceso = sequelize.define(
  "actividadProceso",
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
  },
  {
    // Opciones del modelo
    tableName: "actividadProceso",
    timestamps: true,
  }
);

module.exports = ActividadProceso;
