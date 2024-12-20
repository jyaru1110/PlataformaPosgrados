const FechaProyecto = require("../models/FechaProyecto");
const Proyecto = require("../models/Proyecto");
const { Op } = require("sequelize");
const multer = require("multer");
const upload = multer({ dest: "public/images/" }).single("file");

const get_proyectos = async (req, res) => {
  const {query}= req.query;
  try {
    const proyectos = await Proyecto.findAll({
      where: {
        [Op.or]: [
          {
            nombre: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            descripcion: {
              [Op.iLike]: `%${query}%`,
            },
          },
        ],
      },
    });
    return res.status(200).send(proyectos);
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
};

const create_proyecto = async (req, res) => {
  const body = req.body;
  try {
    const nuevoProyecto = await Proyecto.create(body);
    return res.status(200).send({ id: nuevoProyecto.id });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: e.parent.detail });
  }
};

const get_proyecto = async (req, res) => {
  const { id } = req.params;
  try {
    const proyecto = await Proyecto.findOne({
      where: {
        id: id,
      },
      include: {
        model: FechaProyecto,
        attributes: ["fecha", "titulo", "id"],
      },
    });
    if (!proyecto) {
      return res.status(404).send({ message: "Proyecto no encontrado" });
    }
    return res.status(200).send(proyecto);
  } catch (e) {
    console.log(e.parent.message);
    return res.status(500).send({ message: e.parent.message });
  }
};

const update_proyecto = async (req,res) => {
  upload(req, res, async (err) => {
    const file = req.file; 
    console.log(file);
    const { id } = req.params;
    const body = req.body;
    body.foto = file ? file.filename : "";
    try {
      await Proyecto.update(body, {
        where: {
          id: id,
        },
      });
  
      await FechaProyecto.bulkCreate(body.newFechas);
  
      Object.keys(body.changesFechas).forEach(async (key) => {
        await FechaProyecto.update(body.changesFechas[key], {
          where: {
            id: key,
          },
        });
      });
      return res.status(200).send();
    } catch (e) {
      console.log(e);
      return res.status(500).send({ message: e.parent.detail });
    }
  })
};

const delete_proyecto = async (req, res) => {
  const { id } = req.params;
  try {
    await Proyecto.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).send();
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: e.parent.detail });
  }
};

module.exports = {
  get_proyectos,
  create_proyecto,
  get_proyecto,
  delete_proyecto,
  update_proyecto,
};
