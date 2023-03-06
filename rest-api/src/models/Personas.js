const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Personas = sequelize.define('personas', {
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
        type: DataTypes.INTEGER
    },
    birthday: {
        type: DataTypes.DATEONLY,
    }
}, {
    // Opciones del modelo
    tableName: 'personas',
    timestamps: false
});

module.exports = Personas;