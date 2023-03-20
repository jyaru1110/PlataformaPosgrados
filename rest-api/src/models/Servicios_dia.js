const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Salon = require("./Salon");


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
      allowNull: false,
    },
    programa: {
      type: DataTypes.STRING,
      references: {
        model: "programa",
        key: "programa",
      },
    },
    num_servicios: {
      type: DataTypes.INTEGER
    },
    /*salon: {
      type: DataTypes.STRING,
      references: {
        model: "salon",
        key: "salon",
      },
    },*/
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pendiente",
      validate: {
        customValidator: (value) => {
          const enums = ["Pendiente", "Realizado", "Cancelado"];
          if (!enums.includes(value))
          {
            throw new Error("El estado debe ser Pendiente, Realizado o Cancelado");
          }
        },
      },
    },
  },
  {
    // Opciones del modelo
    tableName: "servicios_dia",
    timestamps: false,
  }
);

Servicios_dia.belongsTo(Salon, {foreignKey: 'salon_id', targetKey: 'salon'});

module.exports = Servicios_dia;
