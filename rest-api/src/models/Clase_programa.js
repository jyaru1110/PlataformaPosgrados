const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Clase_programa = sequelize.define('clase_programa', {
    // Atributos del modelo
    programa: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'programa',
            key: 'programa'
        }
    },
    no_clase: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'clase',
            key: 'no_clase'
        }
    },
    num_alunos: {
        type: DataTypes.INTEGER
    }
}, {
    // Opciones del modelo
    tableName: 'clase_programa',
    timestamps: false
});

module.exports = Clase_programa;