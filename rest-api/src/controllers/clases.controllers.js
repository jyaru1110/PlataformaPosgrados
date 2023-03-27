const Clase = require('../models/Clase');

const get_clase_todos = async (req, res) => {
    const clases = await Clase.findAll(
        {
            attributes: ['no_clase']
        }
    );
    res.status(200).send({clases:clases});
}

module.exports = {
    get_clase_todos
}