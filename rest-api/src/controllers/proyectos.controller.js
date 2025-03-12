const FechaProyecto = require("../models/FechaProyecto");
const Proyecto = require("../models/Proyecto");
const Seccion = require("../models/Seccion");
const Link = require("../models/Link");

const { Op } = require("sequelize");
const multer = require("multer");
const ProyectosPinneados = require("../models/ProyectosPinneados");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

const get_proyectos = async (req, res) => {
  const { query } = req.query;
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
        nombre: {
          [Op.not]:"promocion",
        }
      },
      order: [["pinned", "DESC"]],
    });
    return res.status(200).send(proyectos);
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
};

const create_proyecto = async (req, res) => {
  const body = req.body;
  const categoria = req.query?.categoria;

  if (categoria){
    body.categoria = categoria;
  }

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
      include: [
        {
          model: FechaProyecto,
          attributes: ["fecha", "titulo", "id"],
        },
        {
          model: Seccion,
          attributes: ["titulo", "id"],
          include: [
            {
              model: Link,
              attributes: ["descripcion", "url", "id"],
            },
          ],
        },
        {
          model: ProyectosPinneados,
          attributes: ["id"],
          where: {
            usuarioId: req.user.dataValues.id,
          },
          required: false,
        }
      ],
    });
    if (!proyecto) {
      return res.status(404).send({ message: "Proyecto no encontrado" });
    }
    return res.status(200).send(proyecto);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: e.parent.message });
  }
};

const upload_photo = async (req, res) => {
  upload(req, res, async (err) => {
    const file = req.file;
    const { id } = req.params;

    if (!file) {
      return res.status(400).send({ message: "No se ha subido una imagen" });
    }

    try {
      await Proyecto.update({foto:file.filename}, {
        where: {
          id: id,
        },
      });
      return res.status(200).send({ message: "Foto subida correctamente" });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ message: e });
    }
  });
};

const update_proyecto = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const newFechas = body.newFechas;
    const changesFechas = body.changesFechas;
    const newSecciones = body.newSecciones;
    const changesEnlaces = body.changesEnlaces;
    const changesSecciones = body.changesSecciones;
    delete body.newSecciones;
    delete body.changesFechas;
    delete body.newFechas;

    await Proyecto.update(body, {
      where: {
        id: id,
      },
    });

    await FechaProyecto.bulkCreate(newFechas);

    Object.keys(changesFechas).forEach(async (key) => {
      await FechaProyecto.update(changesFechas[key], {
        where: {
          id: key,
        },
      });
    });

    await Seccion.bulkCreate(newSecciones, {
      include: ["links"],
    });


    Object.keys(changesSecciones).forEach(async (key) => {
      await Seccion.update(changesSecciones[key], {
        where: {
          id: key,
        },
      });
    });

    Object.keys(changesEnlaces).forEach(async (key) => {
      await Link.update(changesEnlaces[key], {
        where: {
          id: key,
        },
      });
    });

    return res.status(200).send();
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: e});
  }
};

const delete_link = async (req, res) => {
  const { id } = req.params;
  try {
    await Link.destroy({
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

const delete_seccion = async (req, res) => {
  const { id } = req.params;
  try {
    await Seccion.destroy({
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

const get_proyectos_promocion = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll({
      where: {
        categoria: "promocion",
        nombre:{
          [Op.not]:"promocion",
        }
      },
    });
    return res.status(200).send(proyectos);
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
}

const get_secciones_promocion = async (req, res) => {
  try
  {
    const secciones = await Seccion.findAll({
      where: {
        proyectoId: 14,
      },
      include: [
        {
          model: Link,
          attributes: ["descripcion", "url", "id"],
        },
        {
          model: Proyecto,
          attributes: [],
        }
      ],
    });

    return res.status(200).send(secciones);
  }
  catch(e){
    console.log(e);
    return res.status(500);
  }
}

const pin_proyecto = async (req,res) => {
  const { id } = req.params;
  var action = ""
  var id_proyecto_pinneado = null;
  try {
    const pin = await ProyectosPinneados.findOne({
      where: {
        usuarioId: req.user.dataValues.id,
        proyectoId: id,
      },
    });

    if (pin) {
      action = "delete";
      id_proyecto_pinneado = pin.id;
      const deleted = await ProyectosPinneados.destroy({
        where: {
          usuarioId: req.user.dataValues.id,
          proyectoId: id,
        },
      });
    } else {
      action = "create";
      const created =

      await ProyectosPinneados.create({
        usuarioId: req.user.dataValues.id,
        proyectoId: id,
      });

      id_proyecto_pinneado = created.id;
    }

    return res.status(200).send({action,id_proyecto_pinneado});
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
}

module.exports = {
  get_proyectos,
  create_proyecto,
  get_proyecto,
  delete_proyecto,
  update_proyecto,
  upload_photo,
  delete_link,
  delete_seccion,
  get_proyectos_promocion,
  get_secciones_promocion,
  pin_proyecto
};
