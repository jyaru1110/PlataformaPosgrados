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

module.exports = {
    get_clase_todos
}