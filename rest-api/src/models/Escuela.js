const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Escuela = sequelize.define('Escuela', {
    // Atributos del modelo
    escuela: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
}, {
    // Opciones del modelo
    tableName: 'Escuela'
});

module.exports = Escuela;