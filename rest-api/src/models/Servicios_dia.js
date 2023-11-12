const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Servicios_dia = sequelize.define(
  "servicios_dia",
  {
    // Atributos del modelo
    id_horario: {
      type: DataTypes.INTEGER,
      references: {
        model: "horario",
        key: "id_horario",
      },
      onDelete: "CASCADE",
    },
    no_clase: {
      type: DataTypes.STRING,
      references: {
        model: "clase",
        key: "no_clase",
      },
    },
    dia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hora_fin: {
      type: DataTypes.TIME,
    },
    hora_servicio_inicio: {
      type: DataTypes.TIME,
    },
    hora_servicio_fin: {
      type: DataTypes.TIME,
    },
    programa: {
      type: DataTypes.STRING,
      references: {
        model: "programa",
        key: "programa",
      },
    },
    num_servicios: {
      type: DataTypes.INTEGER,
    },
    salon_id: {
      type: DataTypes.STRING,
      references: {
        model: "salon",
        key: "salon",
      },
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pendiente",
      validate: {
        customValidator: (value) => {
          const enums = ["Pendiente", "Realizado", "Cancelado", "Confirmado"];
          if (!enums.includes(value)) {
            throw new Error(
              "El estado debe ser Pendiente, Realizado o Cancelado"
            );
          }
        },
      },
    },
    estado_coordinador: {
      type: DataTypes.STRING,
      defaultValue: "Sin revisión",
      validate: {
        customValidator: (value) => {
          const enums = ["Sin revisión", "Aprobado", "En revisión"];
          if (!enums.includes(value)) {
            throw new Error(
              "El estado debe ser Sin revisión, Aprobado o En revisión"
            );
          }
        },
      },
    },
    aprobadoPor: {
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
  },
  {
    // Opciones del modelo
    tableName: "servicios_dia",
    timestamps: false,
  }
);
module.exports = Servicios_dia;
