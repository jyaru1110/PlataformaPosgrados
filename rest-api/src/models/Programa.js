const { DataTypes } = require('sequelize');
var sequelize = require('./database/database');

const Programa = sequelize.define('Programa', {
    // Atributos del modelo
    programa: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    grado: {
        type: DataTypes.STRING
    },
    tipo: {
        type: DataTypes.STRING
    },
    codigo: {
        type: DataTypes.STRING
    },
    cuenta: {
        type: DataTypes.STRING
    },
    escuela: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Escuela',
            key: 'escuela'
        }
    },
}, {
    // Opciones del modelo
    tableName: 'Programa'
});
