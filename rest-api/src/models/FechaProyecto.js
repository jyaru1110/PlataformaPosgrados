const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');


const FechaProyecto = sequelize.define('fecha_proyecto', {
    titulo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

module.exports = FechaProyecto;