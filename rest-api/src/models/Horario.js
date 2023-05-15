const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Horario = sequelize.define('horario', {
    // Atributos del modelo
    id_horario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    salon: {
        type: DataTypes.STRING,
        reference: {
            model: 'salon',
            key: 'salon'
        }
    },
    programa: {
        type: DataTypes.STRING,
        reference: {
            model: 'programa',
            key: 'programa'
        }
    },
    fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    hora_fin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    no_clase: {
        type: DataTypes.STRING,
        reference: {
            model: 'clase',
            key: 'no_clase'
        }
    },
    dia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    num_alumnos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

}, {
    // Opciones del modelo
    tableName: 'horario',
    timestamps: false
});

module.exports = Horario;