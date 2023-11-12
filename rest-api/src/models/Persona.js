const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Persona = sequelize.define('persona', {
    // Atributos del modelo
    email_persona: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ext: {
        type: DataTypes.STRING,
    },
    birthday: {
        type: DataTypes.STRING,
    }
}, {
    // Opciones del modelo
    tableName: 'persona',
    timestamps: false
});

module.exports = Persona;