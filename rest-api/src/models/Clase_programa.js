const { DataTypes } = require('sequelize');
var sequelize = require('./database/database');

const Clase_programa = sequelize.define('Clase_programa', {
    // Atributos del modelo
    programa: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Programa',
            key: 'programa'
        }
    },
    no_clase: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Clase',
            key: 'no_clase'
        }
    },
    num_alunos: {
        type: DataTypes.INTEGER
    }
}, {
    // Opciones del modelo
    tableName: 'Clase_programa'
});
