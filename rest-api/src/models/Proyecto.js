const { DataTypes } = require("sequelize");
var sequelize = require("../database/database");

const Proyecto = sequelize.define("proyecto", {
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  foto: {
    type: DataTypes.STRING,
  },
  caracteristicas: {
    type: DataTypes.TEXT,
  },
  categoria:{
    type: DataTypes.TEXT,
  },
  pinned:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

module.exports = Proyecto
