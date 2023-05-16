const Horario = require('../models/Horario');
const Servicios_dia = require('../models/Servicios_dia');

const get_horarios_todos = async (req, res) => {
    const horarios = await Horario.findAll();
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
    const {hora_inicio, hora_fin, dia, salon, fecha_inicio, fecha_fin, no_clase, escuela} = req.body;
    const horario = await Horario.update({
        hora_inicio:hora_inicio,
        hora_fin:hora_fin,
        dia:dia,
        salon:salon,
        fecha_inicio:fecha_inicio,
        fecha_fin:fecha_fin,
        no_clase:no_clase,
        escuela:escuela,
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