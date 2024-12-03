const Proyecto = require("../models/Proyecto")

const get_proyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    return res.status(200).send(proyectos);
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
};

module.exports = {
    get_proyectos
}

