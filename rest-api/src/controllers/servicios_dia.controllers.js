const Servicios_dia = require('../models/Servicios_dia');
const { Op } = require("sequelize");
const sequelize = require('../database/database');

const get_servicios_fecha = async (req, res) => {
    const fecha = req.params.fecha;
    try {
        const servicios = await Servicios_dia.findAll(
            {
                where:{
                    fecha:fecha,
                },
                order: [
                    ['hora_inicio', 'ASC'],
                ],
            }
        )
        res.status(200).send({servicio:servicios});
    } catch (error) {
        res.status(500).send({error:error});
    }
}

const get_servicio = async (req, res) => {
    const id = req.params.id;
    try {
        const servicio = await Servicios_dia.findOne(
            {
                where:{
                    id:id
                }
            }
        )
        res.status(200).send({servicio:servicio});
    } catch (error) {
        res.status(500).send({error:error});
    }
}


const get_servicios_isla = async (req, res) => {
    const fecha = req.params.dia;
    try {
        const servicios_dia = await sequelize.query(
            "select sum(servicios_dia.num_servicios) as servicios_totales,salon.isla from servicios_dia left join salon on servicios_dia.salon_id =  salon.salon where servicios_dia.fecha = '"+fecha+"' group by salon.isla"
        )
        res.status(200).send({servicio:servicios_dia});
    } catch (error) {
        res.status(500).send({error:error});
    }
}


const get_suma_servicios_dia_isla = async (req, res) => {
    const fecha_inicio = req.params.fecha_inicio;
    const fecha_fin = req.params.fecha_fin;
    try {
        const servicios_dia = await sequelize.query(
            "select sum(servicios_dia.num_servicios) as servicios_totales,salon.isla from servicios_dia left join salon on servicios_dia.salon_id =  salon.salon where servicios_dia.fecha between '"+fecha_inicio+"' and '"+fecha_fin+"' group by salon.isla",
        )
        res.status(200).send({servicio:servicios_dia});
    } catch (error) {
        res.status(500).send({error:error});
    }
}

const get_servicios_todos = async (req, res) => {
    const servicios = await Servicios_dia.findAll(
        {
            order: [
                ['fecha', 'ASC'],
                ['hora_inicio', 'ASC'],
            ],
        }
    );
    res.status(200).send({servicio:servicios});
}

const get_servicios_pendientes = async (req, res) => {
    const fecha = req.params.fecha;
    const servicios = await Servicios_dia.findAll({
        where:{
            estado: 'Pendiente',
            fecha:fecha
        },

        order: [
            ['hora_inicio', 'ASC'],
        ],
    });
    res.status(200).send({servicio:servicios});
}

const get_proximo_servicio = async (req, res) => {
    const escuela =  req.user.dataValues.escuela;
    const today =  new Date();
    const current_hour = today.getHours() + ":" + today.getMinutes();
    console.log(current_hour);
    try {
        const servicio = await Servicios_dia.findAll(
            {
                limit: 1,
                order: [
                    ['fecha', 'ASC'],
                    ['hora_inicio', 'ASC'],
                ],
                where:{
                    fecha:{
                        [Op.gte]: today
                    },
                    estado: 'Pendiente'
                },
            }
        )
        res.json(servicio);
    } catch (error) {
        res.status(500).send({error:error});
    }

}

const create_servicio = async (req, res) => {
    const {fecha, hora_inicio, hora_fin, num_servicios, salon_id, programa, no_clase, dia} = req.body;
    try {
        const servicio = await Servicios_dia.create({
            fecha:fecha,
            hora_inicio:hora_inicio,
            hora_fin:hora_fin,
            num_servicios:num_servicios,
            salon_id:salon_id,
            programa:programa,
            no_clase:no_clase,
            dia:dia
        });
        res.status(200).send({servicio:servicio});
    } catch (error) {
        res.status(500).send({error:error});
    }
}

const update_servicio = async (req, res) => {
    const {fecha, hora_inicio, hora_fin, num_servicios, salon_id, programa, no_clase, dia, estado} = req.body;
    const id = req.params.id;

    console.log(fecha);
    try {
        const servicio = await Servicios_dia.update({
            fecha:fecha,
            hora_inicio:hora_inicio,
            hora_fin:hora_fin,
            num_servicios:num_servicios,
            salon_id:salon_id,
            programa:programa,
            no_clase:no_clase,
            dia:dia,
            estado:estado
        },{
            where:{
                id:id
            }
        });
        res.status(200).send({servicio:servicio});
    } catch (error) {
        res.status(500).send({error:error});
    }
}

const delete_servicio = async (req, res) => {
    const id = req.params.id;
    try {
        const servicio = await Servicios_dia.destroy({
            where:{
                id:id
            }
        });
        res.status(200).send({servicio:servicio});
    } catch (error) {
        res.status(500).send({error:error});
    }
}

module.exports = {
    get_servicios_fecha,
    get_proximo_servicio,
    get_servicios_todos,
    get_servicios_pendientes,
    get_servicios_isla,
    get_suma_servicios_dia_isla,
    create_servicio,
    update_servicio,
    delete_servicio,
    get_servicio
}