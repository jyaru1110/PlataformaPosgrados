const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Modulo = sequelize.define('modulo', {
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
    tableName: 'modulo',
    timestamps: false
});

module.exports = Modulo;