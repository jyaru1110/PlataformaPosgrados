const Salon = require('../models/Salon');

const get_salones_todos = async (req, res) => {
    const salones = await Salon.findAll(
        {
            attributes: ['salon']
        }
    );
    res.status(200).send({salones:salones});
}

module.exports = {
    get_salones_todos
}