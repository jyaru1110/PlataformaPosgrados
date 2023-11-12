const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Puesto_escuela = sequelize.define('puesto_escuela', {
    // Atributos del modelo
    email_persona: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'persona',
            key: 'email_persona'
        }
    },
    escuela: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'escuela',
            key: 'escuela'
        }
    },
    puesto: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Opciones del modelo
    tableName: 'puesto_escuela',
    timestamps: false
});

module.exports = Puesto_escuela;