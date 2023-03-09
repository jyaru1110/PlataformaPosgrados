const Servicios_dia = require('../models/Servicios_dia');
const { Op } = require("sequelize");
const sequelize = require('../database/database');

const get_servicios_fecha = async (req, res) => {
    var fecha = req.query.fecha;
    const servicios = await Servicios_dia.findAll(
        {
            where:{
                fecha:fecha
            }
        }
    )
    res.send(servicios);
}

const get_proximo_servicio = async (req, res) => {
    const servicios = await Servicios_dia.findAll(
        {
            limit: 1,
            order: [
                ['fecha', 'ASC'],
                ['hora_inicio', 'ASC']
            ],
            where:{
                fecha:{
                    [Op.gt]: Date.now()
                }
            }
        }
    )
    res.send(servicios);
}

module.exports = {
    get_servicios_fecha,
    get_proximo_servicio
}