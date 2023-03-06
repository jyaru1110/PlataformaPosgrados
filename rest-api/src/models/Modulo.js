const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Modulo = sequelize.define('Modulo', {
    // Atributos del modelo
    id_curso: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nombre_modulo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Opciones del modelo
    tableName: 'Modulo'
});

module.exports = Modulo;