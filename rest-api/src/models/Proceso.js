const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");
const EtapaProceso = require("./EtapaProceso");
const Etapa = require("./Etapa");

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
            throw new Error("El tipo debe ser Nuevo o Actualización");
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
    notas: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    rvoe: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    fecha_inicio_sep: {
      type: DataTypes.DATE,
    },
    fecha_aprobacion: {
      type: DataTypes.DATE,
    },
    fecha_proxima_actualizacion: {
      type: DataTypes.DATE,
    },
  },
  {
    hooks: {
      afterCreate: async (proceso, options) => {
        const etapas = await Etapa.findAll({
          where: {
            tipo: proceso.tipo,
          },
        });
        etapas.forEach(async (etapa) => {
          await EtapaProceso.create({
            etapaId: etapa.id,
            procesoId: proceso.id,
            estado: "En proceso",
          });
        });
      },
    },
    timestamps: true,
    tableName: "proceso",
  }
);

module.exports = Proceso;
