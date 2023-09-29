const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const EtapaProceso = sequelize.define(
  "etapaProceso",
  {
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
    porcentaje:{
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    }
  },
  {
    timestamps: true,
    tableName: "etapaProceso",
  }
);
module.exports = EtapaProceso;
