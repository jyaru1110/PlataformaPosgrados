const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const Etapa = sequelize.define(
  "etapa",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo_etapa: {
      type: DataTypes.STRING,
      defaultValue: "Base",
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
