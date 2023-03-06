const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Clase = sequelize.define('Clase', {
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
            model: 'Modulo',
            key: 'id_curso'
        }
    }
}, {
    // Opciones del modelo
    tableName: 'Clase'
});

module.exports = Clase;
