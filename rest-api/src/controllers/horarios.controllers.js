const Horario = require('../models/Horario');

const get_horarios_todos = async (req, res) => {
    const horarios = await Horario.findAll();
    res.status(200).send({horario:horarios});
}

module.exports = {
    get_horarios_todos
}