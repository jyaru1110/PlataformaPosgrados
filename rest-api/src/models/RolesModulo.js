const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const RolesModulo = sequelize.define('RolesModulo', {
    // Atributos del modelo
    id_curso: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Modulo',
            key: 'id_curso'
        }
    },
    email_persona: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Personas',
            key: 'email_persona'
        }
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Opciones del modelo
    tableName: 'RolesModulo'
});

module.exports = RolesModulo;