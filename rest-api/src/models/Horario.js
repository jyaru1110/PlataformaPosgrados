const { DataTypes } = require('sequelize');
var sequelize = require('./database/database');

const Horario = sequelize.define('Horario', {
    // Atributos del modelo
    id_horario: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    salon: {
        type: DataTypes.STRING,
        reference: {
            model: 'Salon',
            key: 'salon'
        }
    },
    escuela: {
        type: DataTypes.STRING,
        reference: {
            model: 'Escuela',
            key: 'escuela'
        }
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATE,
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
            model: 'Clase',
            key: 'no_clase'
        }
    },
    dia: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Opciones del modelo
    tableName: 'Horario'
});
