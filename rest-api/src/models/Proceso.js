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
    porcentaje: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    estado: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue("porcentaje") >= 99
          ? "Completado"
          : "En proceso";
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
    driveId: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    cantidadEtapas: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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

        proceso.cantidadEtapas = etapas.length;
        await proceso.save();
      },
    },
    timestamps: true,
    tableName: "proceso",
  }
);

module.exports = Proceso;
