const Horario = require('../models/Horario');
const Servicios_dia = require('../models/Servicios_dia');
const sequelize = require('../database/database');

const get_horarios_todos = async (req, res) => {
    const rol =  req.user.dataValues.rol;
    var query = "";
    if(rol == "Gestor"){
        query = "select * from horario;";
    }else{
        query = "select * from horario inner join programa on programa.programa = horario.programa where programa.escuela = '"+req.user.dataValues.escuela+"';";
    }
    const horarios = await sequelize.query(query);
    res.status(200).send({horarios:horarios});
}

const get_horario = async (req, res) => {
    const {id} = req.params;
    const horario = await Horario.findAll({
        where: {id_horario:id}
    });
    res.status(200).send({horario:horario});
}

const delete_horario = async (req, res) => {
    const {id} = req.params;
    const servicios_dia = await Servicios_dia.destroy({
        where: {id_horario:id}
    });
    const horario = await Horario.destroy({
        where: {id_horario:id}
    });
    res.status(200).send({horario:horario});
}

const create_horario = async (req, res) => {
    const {hora_inicio, hora_fin, dia, salon, fecha_inicio, fecha_fin, no_clase, programa} = req.body;
    const horario = await Horario.create({
        hora_inicio:hora_inicio,
        hora_fin:hora_fin,
        dia:dia,
        salon:salon,
        fecha_inicio:fecha_inicio,
        fecha_fin:fecha_fin,
        no_clase:no_clase,
        programa:programa,
    });
    res.status(200).send({horario:horario});
}

const update_horario = async (req, res) => {
    const {id} = req.params;
    const {hora_inicio, hora_fin, dia, salon, fecha_inicio, fecha_fin, no_clase, programa} = req.body;
    const horario = await Horario.update({
        hora_inicio:hora_inicio,
        hora_fin:hora_fin,
        dia:dia,
        salon:salon,
        fecha_inicio:fecha_inicio,
        fecha_fin:fecha_fin,
        no_clase:no_clase,
        programa:programa,
    },{
        where: {id_horario:id}
    });
    res.status(200).send({horario:horario});
}

module.exports = {
    get_horarios_todos,
    get_horario,
    delete_horario,
    create_horario,
    update_horario
}