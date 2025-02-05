const { DataTypes } = require('sequelize');
var sequelize = require('../database/database');

const Link = sequelize.define('link', {
    // Atributos del modelo
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}
);
module.exports = Link;