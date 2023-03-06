const Servicios_dia = require('../models/Servicios_dia');

const get_servicios_fecha = async (req, res) => {
    const fecha = req.query.fecha;
    const servicios = await Servicios_dia.findAll();
    res.send(servicios);
}

const get_proximo_servicio = async (req, res) => {
    res.send("get_proximo_servicio");
}

module.exports = {
    get_servicios_fecha,
    get_proximo_servicio
}