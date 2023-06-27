const Notificaciones = require('../models/Notificaciones');
const { Op } = require("sequelize");
const sequelize = require('../database/database');

const get_solicitudes = async (req, res) => {
    const rol =  req.user.dataValues.rol;
    var query = "";
    if(rol == "Gestor"){
        query = "select * from notificaciones;";
    }else{
        query = "select * from notificaciones inner join usuarios on usuarios.id = notificaciones.id_usuario where notificaciones.id_usuario = "+req.user.dataValues.id+";";
    }
    const notificaciones = await sequelize.query(query);
    res.status(200).send({notificaciones:notificaciones[0]});
}

module.exports = {
    get_solicitudes
}