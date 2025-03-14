const express = require("express");
const { isUserAuthenticated } = require("../middlewares/auth");
const router = express.Router();
const Usuario = require("../models/Usuario");
const PuestoPrograma = require("../models/PuestoPrograma");
const PuestoEscuela = require("../models/PuestoEscuela");
const Programa = require("../models/Programa");
const { Op } = require("sequelize");

router.get("/user/auth", isUserAuthenticated, (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send("401");
  }
});

router.put("/user/gestor/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Usuario.update(
      {
        rol: "Gestor",
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send({ user: user });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.put("/user/usuario/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Usuario.update(
      {
        rol: "Usuario",
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send({ user: user });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});


router.get("/user/all/admin", async (req, res) => {
  const { query } = req.query;
  try {
    const users = await Usuario.findAll({
      attributes: [
        "id",
        "titulo",
        "nombre",
        "escuela",
        "email",
        "extension",
        "birthday",
        "telefono",
        "foto",
        "area",
        "id_universidad_panamericana",
        "puesto_area"
      ],
      order: [
        ["area", "DESC"],
        ["escuela", "ASC"],
        ["nombre", "ASC"],
      ],
      include: [
        {
          model: PuestoEscuela,
          required: false,
          attributes: ["puesto"],
        },
        {
          model: PuestoPrograma,
          required: false,
          attributes: ["puesto", "programaPrograma"],
          include: [
            {
              model: Programa,
              required: false,
              attributes: ["codigo"],
            },
          ],
        }
      ],
      where: {
        [Op.or]: [
          { nombre: { [Op.iLike]: `%${query}%` } },
          { escuela: { [Op.iLike]: `%${query}%` } },
          { area: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/user/all", async (req, res) => {
  const { query } = req.query;
  try {
    const users = await Usuario.findAll({
      attributes: [
        "id",
        "titulo",
        "nombre",
        "escuela",
        "email",
        "extension",
        "birthday",
        "telefono",
        "foto",
        "area",
        "id_universidad_panamericana",
        "puesto_area"
      ],
      order: [
        ["area", "DESC"],
        ["escuela", "ASC"],
        ["nombre", "ASC"],
      ],
      include: [
        {
          model: PuestoEscuela,
          required: false,
          attributes: ["puesto"],
        },
        {
          model: PuestoPrograma,
          required: false,
          attributes: ["puesto", "programaPrograma"],
          include: [
            {
              model: Programa,
              required: false,
              attributes: ["codigo"],
            },
          ],
        }
      ],
      where: [
        {[Op.or]: [
          { escuela: null },
          { escuela: { [Op.ne]: 'Educación Continua' } }
        ]},
        {[Op.or]: [
          { nombre: { [Op.iLike]: `%${query}%` } },
          { escuela: { [Op.iLike]: `%${query}%`}, area: null},
          { area: { [Op.iLike]: `%${query}%` } },
        ]},
      ],
    });
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Usuario.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: PuestoPrograma,
          required: false,
          as: "puesto_programas",
        },
        {
          model: PuestoEscuela,
          required: false,
          as: "puesto_escuelas",
        },
      ],
    });
    if (!user) {
      return res.status(404).send({ message: "No se encontró al usuario" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/user/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const user = await Usuario.update(body, {
      where: {
        id: id,
      },
    });
    res.status(200).send({ message: "Usuario actualizado" });
  } catch (error) {
    res.status(500).send({ message: "Error al actualizar el usuario" });
  }
});

router.post("/user", async (req, res) => {
  const body = req.body;
  try {
    const user = await Usuario.create(body);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al crear el usuario" });
  }
});

router.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Usuario.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar el usuario" });
  }
});

router.get("/users/bypuesto", async (req, res) => {
  const puestos_escuela = [
    "Coordinación de Asuntos Estudiantiles",
    "Jefatura Promoción y Admisiones",
    "Dirección de Posgrados"
  ];
  const puestos_programa = [
    "Jefatura Académica",
    "Coordinación Académica",
    "Coordinación de Promoción y Admisiones"
  ];
  const users = [];

  for (const puesto_escuela of puestos_escuela) {
    const temp_users = await PuestoEscuela.findAll({
      include: [
        {
          model: Usuario,
          attributes: [
            "nombre",
            "email",
            "telefono",
            "extension",
            "id",
            "foto",
          ],
        },
      ],
      where: { puesto: puesto_escuela },
      attributes: ["puesto", "escuelaEscuela"],
    });
    users.push(temp_users);
  }

  for (const puesto_programa of puestos_programa) {
    const temp_users = await PuestoPrograma.findAll({
      include: [
        {
          model: Usuario,
          attributes: ["nombre", "email", "telefono", "extension"],
        },
      ],
      where: { puesto: puesto_programa },
      attributes: ["puesto", "programaPrograma"],
    });
    users.push(temp_users);
  }

  res.status(200).send(users);
});

module.exports = router;
