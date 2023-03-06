const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Servicio_dia = sequelize.define('Servicios_dia', {
    // Atributos del modelo
    id_horario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Horario',
            key: 'id_horario'
        }
    },
    no_clase: {
        type: DataTypes.STRING,
        references: {
            model: 'Clase',
            key: 'no_clase'
        }
    },
    dia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
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
    programa: {
        type: DataTypes.STRING,
        references: {
            model: 'Programa',
            key: 'programa'
        }
    },
    salon: {
        type: DataTypes.STRING,
        references: {
            model: 'Salon',
            key: 'salon'
        }
    }
}, {
    // Opciones del modelo
    tableName: 'Servicios_dia'
});

module.exports = Servicio_dia;