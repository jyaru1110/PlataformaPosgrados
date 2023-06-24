const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Usuario = sequelize.define(
    "usuarios",
    {
        email : {
            type: DataTypes.STRING,
            allowNull: false
        },
        googleId : {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre : {
            type: DataTypes.STRING
        },
        escuela: {
            type: DataTypes.STRING,
            references: {
                model: 'escuela',
                key: 'escuela'
            },
            allowNull: true
        },
    },
);

module.exports = Usuario;