const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");
const ActividadProceso = require("./ActividadProceso");
const Actividad = require("./Actividad");

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

    cantidadActividades: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    hooks: {
      afterCreate: async (etapaProceso, options) => {
        const actividades = await Actividad.findAll({
          where: {
            etapaId: etapaProceso.etapaId,
          },
        });

        etapaProceso.cantidadActividades = actividades.length;
        await etapaProceso.save();

        actividades.forEach(async (actividad) => {
          await ActividadProceso.create({
            actividadId: actividad.id,
            etapaProcesoId: etapaProceso.id,
          });
        });
      },
    },
    timestamps: true,
    tableName: "etapaProceso",
  }
);
module.exports = EtapaProceso;
