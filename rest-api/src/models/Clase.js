const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Clase = sequelize.define('clase', {
    // Atributos del modelo
    no_clase: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nombre_modulo: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    // Opciones del modelo
    tableName: 'clase',
    timestamps: false
});

module.exports = Clase;
