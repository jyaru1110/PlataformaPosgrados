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
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    evidenciaId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Opciones del modelo
    hooks: {
      afterUpdate: async (actividadProceso, options) => {
        if (actividadProceso.estado == "Completada") {
          await actividadProceso.etapaProceso.increment("porcentaje", {
            by: 100 / actividadProceso.etapaProceso.cantidadActividades,
          });

          await actividadProceso.etapaProceso.proceso.increment("porcentaje", {
            by:
              (1 / actividadProceso.etapaProceso.proceso.cantidadEtapas) *
              (100 / actividadProceso.etapaProceso.cantidadActividades),
          });
        }
      },
    },
    tableName: "actividadProceso",
    timestamps: true,
  }
);

module.exports = ActividadProceso;
