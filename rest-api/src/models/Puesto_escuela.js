const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Puesto_escuela = sequelize.define('Puesto_escuela', {
    // Atributos del modelo
    email_persona: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Personas',
            key: 'email_persona'
        }
    },
    escuela: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Escuela',
            key: 'escuela'
        }
    },
    puesto: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Opciones del modelo
    tableName: 'Puesto_escuela'
});

module.exports = Puesto_escuela;