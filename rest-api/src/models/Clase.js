const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Clase = sequelize.define('clase', {
    // Atributos del modelo
    no_clase: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    id_curso: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'modulo',
            key: 'id_curso'
        }
    }
}, {
    // Opciones del modelo
    tableName: 'clase',
    timestamps: false
});

module.exports = Clase;
