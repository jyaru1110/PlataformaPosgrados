const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Salon = sequelize.define('Salon', {
    // Atributos del modelo
    salon: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    isla: {
        type: DataTypes.STRING
    },
    sede: {
        type: DataTypes.STRING
    },
    capacidad: {
        type: DataTypes.INTEGER
    }
}, {
    // Opciones del modelo
    tableName: 'Salon'
});

module.exports = Salon;