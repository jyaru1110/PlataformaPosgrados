const Servicios_dia = require('../models/Servicios_dia');
const { Op } = require("sequelize");
const sequelize = require('../database/database');

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
        const servicios_dia = await sequelize.query(
            "select sum(servicios_dia.num_servicios) as servicios_totales,servicios_dia.fecha,salon.isla from servicios_dia inner join salon on servicios_dia.salon_id =  salon.salon group by servicios_dia.fecha, salon.isla"
        )
        res.status(200).send({servicio:servicios_dia}, {suma:suma_servicios});
    } catch (error) {
        res.status(500).send({error:error});
    }
}


const get_suma_servicios_dia_isla = async (req, res) => {
    const fecha_inicio = req.params.fecha_inicio;
    const fecha_fin = req.params.fecha_fin;
    try {
        const servicios_dia = await sequelize.query(
            "select sum(servicios_dia.num_servicios) as servicios_totales,salon.isla from servicios_dia inner join salon on servicios_dia.salon_id =  salon.salon group by salon.isla where servicios_dia.fecha between :'"+fecha_inicio+" and :'"+fecha_fin+"'",
        )
        res.status(200).send({servicio:servicios_dia});
    } catch (error) {
        res.status(500).send({error:error});
    }
}

const get_servicios_todos = async (req, res) => {
    const servicios = await Servicios_dia.findAll();
    res.status(200).send({servicio:servicios});
}

const get_proximo_servicio = async (req, res) => {
    const today =  new Date();
    const current_hour = today.getHours() + ":" + today.getMinutes();
    console.log(current_hour);
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
                        [Op.gte]: today
                    }
                },
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
    get_servicios_isla,
    get_suma_servicios_dia_isla
}