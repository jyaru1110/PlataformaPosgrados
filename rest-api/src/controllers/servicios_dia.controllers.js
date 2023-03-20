const Servicios_dia = require('../models/Servicios_dia');
const { Op } = require("sequelize");

const get_servicios_fecha = async (req, res) => {
    var fecha = req.params.fecha;
    try {
        const servicios = await Servicios_dia.findAll(
            {
                where:{
                    fecha:fecha
                }
            }
        )
        res.status(200).send({servicio:servicios});
    } catch (error) {
        res.status(500).send({error:error});
    }
}

const get_servicios_isla = async (req, res) => {
    try {
        const servicios = await Servicios_dia.findAll(
            {
                group: ['dia']
            }
        )
        res.status(200).send({servicio:servicios});
    } catch (error) {
        res.status(500).send({error:error});
    }
}


const get_servicios_todos = async (req, res) => {
    const servicios = await Servicios_dia.findAll();
    res.status(200).send({servicio:servicios});
}

const get_proximo_servicio = async (req, res) => {
    try {
        const servicio = await Servicios_dia.findAll(
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
        res.json(servicio);
    } catch (error) {
        res.status(500).send({error:error});
    }

}

module.exports = {
    get_servicios_fecha,
    get_proximo_servicio,
    get_servicios_todos,
    get_servicios_isla
}