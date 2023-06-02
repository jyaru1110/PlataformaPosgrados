const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Usuario = sequelize.define(
    "usuario",
    {
        // Atributos del modelo
        email : {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        googleId : {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre : {
            type: DataTypes.STRING
        }
    },
);

module.exports = Usuario;