const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const RolesModulo = sequelize.define('rolesmodulo', {
    // Atributos del modelo
    id_curso: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'modulo',
            key: 'id_curso'
        }
    },
    email_persona: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'persona',
            key: 'email_persona'
        }
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Opciones del modelo
    tableName: 'rolesmodulo',
    timestamps: false
});

module.exports = RolesModulo;