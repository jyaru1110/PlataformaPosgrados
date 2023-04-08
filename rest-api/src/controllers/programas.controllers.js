const Programa = require('../models/Programa');

const get_programas_escuela = async (req, res) => {
    const {escuela} = req.params;
    const programas = await Programa.findAll({
        where: {
            escuela: escuela
        }
    });
    res.status(200).send({programas:programas});
}

const get_programas_todos = async (req, res) => {
    const programas = await Programa.findAll();
    res.status(200).send({programas:programas});
}

module.exports = {
    get_programas_escuela,
    get_programas_todos
}