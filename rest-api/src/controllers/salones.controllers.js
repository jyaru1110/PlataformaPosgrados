const Salon = require('../models/Salon');

const get_salones_todos = async (req, res) => {
    var salones = await Salon.findAll(
        {
            attributes: ['salon']
        }
    );
    salones.unshift({salon:'Todos'});
    res.status(200).send({salones:salones});
}

module.exports = {
    get_salones_todos
}