const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const CostosPrograma = sequelize.define('costos_programa', {
    // Atributos del modelo
    year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    num_mensualidades: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    monto_mensual: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    costo_examen_admision: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    costo_inscripcion: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    // Opciones del modelo
    tableName: 'costos_programa',
    timestamps: false
});

module.exports = CostosPrograma;
