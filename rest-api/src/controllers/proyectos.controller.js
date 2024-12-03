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

const create_proyecto = async (req,res) => {
    const body = req.body;
    try{
        await Proyecto.create(body)
        return res.status(200).send()
    }
    catch(e){
        console.log(e);
        return res.status(500).send({message:e.parent.detail})
    }
}

module.exports = {
    get_proyectos,
    create_proyecto
}

