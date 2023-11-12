const Clase = require('../models/Clase');

const get_clase_todos = async (req, res) => {
    var clases = await Clase.findAll(
        {
            attributes: ['no_clase']
        }
    );
    clases.unshift({no_clase:'Todos'});
    res.status(200).send({clases:clases});
}

const create_clase = async (req, res) => {
    const { no_clase } = req.body;
    console.log(req.body);
    try {
        const newClase = await Clase.create({
            no_clase:no_clase
        });
        if (newClase) {
            return res.status(200).send({ data: newClase });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al crear la clase', data: {} });
    }
}

module.exports = {
    get_clase_todos,
    create_clase
}