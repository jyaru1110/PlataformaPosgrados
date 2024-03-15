const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Usuario = sequelize.define(
  "usuarios",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    googleId: {
      type: DataTypes.STRING,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    escuela: {
      type: DataTypes.STRING,
      references: {
        model: "escuela",
        key: "escuela",
      },
      allowNull: true,
    },
    rol: {
      type: DataTypes.STRING,
    },
    accessToken: {
      type: DataTypes.STRING,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.STRING,
    },
    id_universidad_panamericana: {
      type: DataTypes.STRING,
    },
    extension: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.STRING,
    },
    titulo: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = Usuario;
