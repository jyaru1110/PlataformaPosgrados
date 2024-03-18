const express = require("express");
const { isUserAuthenticated } = require("../middlewares/auth");
const router = express.Router();
const Usuario = require("../models/Usuario");

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

router.get("/user/all", async (req, res) => {
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
        "id_universidad_panamericana",
      ],
    });
    res.status(200).send(users);
  } catch (error) {
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
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
