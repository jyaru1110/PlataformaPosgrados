const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const Etapa = sequelize.define(
  "etapa",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING,
      validate: {
        customValidator: (value) => {
          const enums = ["Nuevo", "Actualización"];
          if (!enums.includes(value)) {
            throw new Error("El tipo debe ser Nuevo o Actualización");
          }
        },
      },
    },
  },
  {
    // Opciones del modelo
    tableName: "etapa",
    timestamps: false,
  }
);

module.exports = Etapa;
