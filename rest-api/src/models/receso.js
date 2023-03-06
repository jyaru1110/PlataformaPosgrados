const { DataTypes } = require('sequelize');
var sequelize = require('./database/database');

const receso = sequelize.define('receso', {
    // Atributos del modelo
    id_receso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    hora_fin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    dia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    escuela: {
        type: DataTypes.STRING,
        reference: {
            model: 'Escuela',
            key: 'escuela'
        }
    }
}, {
    // Opciones del modelo
    tableName: 'receso'
});
