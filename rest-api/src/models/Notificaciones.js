const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Notificaciones = sequelize.define(
  "notificaciones",
  {
    // Atributos del modelo
    salon: {
      type: DataTypes.STRING,
      reference: {
        model: "salon",
        key: "salon",
      },
    },
    programa: {
      type: DataTypes.STRING,
      reference: {
        model: "programa",
        key: "programa",
      },
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
    },
    fecha_actual: {
      type: DataTypes.DATEONLY,
    },
    hora_inicio: {
      type: DataTypes.TIME,
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
    no_clase: {
      type: DataTypes.STRING,
      reference: {
        model: "clase",
        key: "no_clase",
      },
    },
    num_alumnos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    num_alumnos_actual: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: "usuarios",
        key: "id",
      },
    },
    id_horario: {
      type: DataTypes.INTEGER,
      reference: {
        model: "horario",
        key: "id_horario",
      },
      onDelete: "CASCADE",
    },
    id_servicio: {
      type: DataTypes.INTEGER,
      reference: {
        model: "servicios_dia",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        customValidator: (value) => {
          const enums = ["Cambio", "Nuevo", "Cancelacion"];
          if (!enums.includes(value)) {
            throw new Error("El tipo debe ser Solicitud o Aviso");
          }
        },
      },
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pendiente",
      validate: {
        customValidator: (value) => {
          const enums = ["Pendiente", "Aceptado", "Rechazado"];
          if (!enums.includes(value)) {
            throw new Error(
              "El estado debe ser Pendiente, Realizado o Cancelado"
            );
          }
        },
      },
    },
  },
  {
    tableName: "notificaciones",
  }
);

module.exports = Notificaciones;
