const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Escuela = sequelize.define('escuela', {
    // Atributos del modelo
    escuela: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
}, {
    // Opciones del modelo
    tableName: 'escuela',
    timestamps: false
});

module.exports = Escuela;