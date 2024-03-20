const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const MetasPrograma = sequelize.define('metas_programa', {
    // Atributos del modelo
    year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    meta:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    inscritos: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    // Opciones del modelo
    tableName: 'metas_programa',
    timestamps: false
});

module.exports = MetasPrograma;
