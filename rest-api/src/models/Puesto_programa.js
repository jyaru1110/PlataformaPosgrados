const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Puesto_programa = sequelize.define('puesto_programa', {
    // Atributos del modelo
    programa: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'programa',
            key: 'programa'
        }
    },
    puesto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_persona: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'persona',
            key: 'email_persona'
        }
    }
}, {
    // Opciones del modelo
    tableName: 'puesto_programa',
    timestamps: false
});

module.exports = Puesto_programa;   