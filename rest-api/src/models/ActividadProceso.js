const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");
const EvidenciaProceso = require("./EvidenciaProceso");
const Evidencia = require("./Evidencia");

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
    porcentaje: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cantidadEvidencias: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    // Opciones del modelo
    hooks: {
      afterCreate: async (actividadProceso, options) => {
        const evidencias = await Evidencia.findAll({
          where: {
            actividadId: actividadProceso.actividadId,
          },
        });

        actividadProceso.cantidadEvidencias = evidencias.length;
        await actividadProceso.save();

        evidencias.forEach(async (evidencia) => {
          await EvidenciaProceso.create({
            evidenciumId: evidencia.id,
            actividadProcesoId: actividadProceso.id,
          });
        });
      },
    },
    tableName: "actividadProceso",
    timestamps: true,
  }
);

module.exports = ActividadProceso;
