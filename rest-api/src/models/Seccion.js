const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Seccion = sequelize.define('seccion', {
    titulo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}
);
module.exports = Seccion;