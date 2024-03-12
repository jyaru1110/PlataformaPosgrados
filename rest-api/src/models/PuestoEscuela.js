const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const PuestoEscuela = sequelize.define('puesto_escuela', {
    // Atributos del modelo
    puesto: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Opciones del modelo
    tableName: 'puesto_escuela',
    timestamps: false
});

module.exports = PuestoEscuela;