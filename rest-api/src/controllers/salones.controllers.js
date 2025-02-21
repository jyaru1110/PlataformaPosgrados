const Salon = require('../models/Salon');
const { Op } = require('sequelize');

const get_salones_todos = async (req, res) => {
    const banned = ['SF_6-1',"SF_6-2","SF_6-3","SF_6-4","SF_6-5","SF_6-6"];
    var salones = await Salon.findAll(
        {
            attributes: ['salon'],
            order: [
                ['salon', 'ASC']
            ],
            where: {
                salon: {
                    [Op.notIn]: banned
                }
            }
        }
    );
    salones.unshift({salon:'Todos'});
    res.status(200).send({salones:salones});
}

module.exports = {
    get_salones_todos
}