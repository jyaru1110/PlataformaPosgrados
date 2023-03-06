const { DataTypes } = require('sequelize');
var sequelize = require('./database/database');

const Puesto_programa = sequelize.define('Puesto_programa', {
    // Atributos del modelo
    programa: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Programa',
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
            model: 'Personas',
            key: 'email_persona'
        }
    }
}, {
    // Opciones del modelo
    tableName: 'Puesto_programa'
});
