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
      allowNull: false,
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false,
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
    dia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    num_alumnos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    id_persona : {
        type: DataTypes.STRING,
        reference: {
            model: 'persona',
            key: 'id'
        }
    },
  },
  {
    tableName: "notificaciones",
  }
);

module.exports = Notificaciones;