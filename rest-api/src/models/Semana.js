const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Semana = sequelize.define('semana', {
    // Atributos del modelo
    inicio_semana: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fin_semana: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}
);
module.exports = Semana;