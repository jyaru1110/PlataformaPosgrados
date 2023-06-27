const Servicios_dia = require('../models/Servicios_dia');
const { Op } = require("sequelize");
const sequelize = require('../database/database');

const get_servicios_fecha = async (req, res) => {
    const rol =  req.user.dataValues.rol;
    const fecha = req.params.fecha;
    var query = "";
    if(rol == "Gestor"){
        query = "select * from servicios_dia where fecha = '"+fecha+"' order by hora_inicio asc;";
    }else{
        query = "select * from servicios_dia inner join programa on programa.programa = servicios_dia.programa where programa.escuela = '"+req.user.dataValues.escuela+"' and fecha = '"+fecha+"' order by hora_inicio asc;";
    }
    try {
        const servicios = await sequelize.query(query);
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
    const rol =  req.user.dataValues.rol;
    const fecha = req.params.dia;
    var query = "";
    if(rol == "Gestor"){
        query = "select sum(servicios_dia.num_servicios) as servicios_totales,salon.isla from servicios_dia left join salon on servicios_dia.salon_id =  salon.salon where servicios_dia.fecha = '"+fecha+"' group by salon.isla";
    }else{
        query = "select sum(servicios_dia.num_servicios) as servicios_totales,salon.isla from servicios_dia left join salon on servicios_dia.salon_id =  salon.salon inner join programa on programa.programa = servicios_dia.programa where programa.escuela = '"+req.user.dataValues.escuela+"' and servicios_dia.fecha = '"+fecha+"' group by salon.isla";
    }
    try {
        const servicios_dia = await sequelize.query(query);
        res.status(200).send({servicio:servicios_dia});
    } catch (error) {
        res.status(500).send({error:error});
    }
}


const get_suma_servicios_dia_isla = async (req, res) => {
    const fecha_inicio = req.params.fecha_inicio;
    const fecha_fin = req.params.fecha_fin;
    const rol = req.user.dataValues.rol;
    var query = "";
    if(rol == 'Gestor'){
        query = "select sum(servicios_dia.num_servicios) as servicios_totales,salon.isla from servicios_dia left join salon on servicios_dia.salon_id =  salon.salon where servicios_dia.fecha between '"+fecha_inicio+"' and '"+fecha_fin+"' group by salon.isla";
    }else{
        query = "select sum(servicios_dia.num_servicios) as servicios_totales,salon.isla from servicios_dia left join salon on servicios_dia.salon_id =  salon.salon inner join programa on programa.programa = servicios_dia.programa where servicios_dia.fecha between '"+fecha_inicio+"' and '"+fecha_fin+"' and programa.escuela = '"+req.user.dataValues.escuela+"' group by salon.isla";
    }
    try {
        const servicios_dia = await sequelize.query(query);
        res.status(200).send({servicio:servicios_dia});
    } catch (error) {
        res.status(500).send({error:error});
    }
}

const get_servicios_todos = async (req, res) => {
    const rol = req.user.dataValues.rol;
    var query = "";
    if(rol == 'Gestor'){
        query  = "select * from servicios_dia order by fecha asc,hora_inicio asc";
    }else{
        query  = "select * from servicios_dia inner join programa on programa.programa = servicios_dia.programa where programa.escuela ='"+req.user.dataValues.escuela+"'order by servicios_dia.fecha asc,servicios_dia.hora_inicio asc";
    }
    const servicios = await sequelize.query(query);
    res.status(200).send({servicio:servicios});
}

const get_servicios_pendientes = async (req, res) => {
    const fecha = req.params.fecha;
    const rol = req.user.dataValues.rol;
    var query = "";
    if(rol == 'Gestor'){
        query  = "select * from servicios_dia where estado = 'Pendiente' and fecha = '"+fecha+"' order by hora_inicio asc";
    }else{
        query = "select * from servicios_dia inner join programa on programa.programa = servicios_dia.programa where programa.escuela ='"+req.user.dataValues.escuela+"' and estado = 'Pendiente' and fecha = '"+fecha+"' order by servicios_dia.hora_inicio asc";
    }
    const servicios =  await sequelize.query(query);
    res.status(200).send({servicio:servicios});
}

const get_proximo_servicio = async (req, res) => {
    const today =  new Date();
    const rol =  req.user.dataValues.rol;
    const iso_today = today.toISOString().split('T')[0];
    console.log(rol);
    var query = "";
    if(rol=="Gestor"){
        query = "select * from servicios_dia where fecha >= '"+iso_today+"' and estado = 'Pendiente' order by fecha asc, hora_inicio asc limit 1";
    }
    else{
        query = "select * from servicios_dia inner join programa on programa.programa =  servicios_dia.programa where servicios_dia.fecha >= '"+iso_today+"' and servicios_dia.estado = 'Pendiente' and programa.escuela='"+req.user.dataValues.escuela+"' order by fecha asc, hora_inicio asc limit 1"
    }
    
    try {
        const servicio = await sequelize.query(
            query,
            { type: sequelize.QueryTypes.SELECT }
        );
        res.json(servicio);
    } catch (error) {
        res.status(500).send({error:error});
        console.log(error);
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