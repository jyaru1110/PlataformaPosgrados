const Proceso = require("../models/Proceso");
const Etapa = require("../models/Etapa");
const Programa = require("../models/Programa");
const EtapaProceso = require("../models/EtapaProceso");
const ActividadProceso = require("../models/ActividadProceso");
const Actividad = require("../models/Actividad");
const { google } = require("googleapis");
const fs = require("fs");
const multer = require("multer");
const { Op } = require("sequelize");
const upload = multer({ dest: "public/uploads/" }).single("file");

const driveId_escuelas = {
  Ingeniería: "1kyuSSuDZF8zQ_xXL6wDaA0A7qOkUvYV_",
  Pedagogía: "1CzbDS9aa1CKtHt3Dsc51Va0RM4NaAQTM",
  "Gobierno y Economía": "18N6BNBYAAb1doaomwHBBelY9ZSTJS1IB",
  Filosofía: "1oev-LFaRvs6sXhERzOfNUXVFmXGN2Ed2",
  Empresariales: "11ABL5NXGsrfTCGpZlfOWLUfXxOz2mJ3A",
  Derecho: "1ZjCIKjq6BYLdY8j0fbmCkOfqj8G_zIGm",
  Comunicación: "1NcgWUaPxsApXQemH3yg5M2VV_8yLhBoG",
  "Bellas Artes": "1DTCQqZytC6XAGlutWoQepoqL_wuRUm4Z",
};

const procesos_metrics = async (req, res) => {
  const total = await Proceso.count();
  const nuevos = await Proceso.count({
    where: {
      tipo: "Nuevo",
    },
  });
  const actualizaciones = await Proceso.count({
    where: {
      tipo: "Actualización",
    },
  });
  const completados = await Proceso.count({
    where: {
      porcentaje: { [Op.gte]: 99 },
    },
  });
  res.status(200).send({
    total: total,
    nuevos: nuevos,
    actualizaciones: actualizaciones,
    completados: completados,
  });
};

const update_proceso = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const proceso = await Proceso.update(data, {
      where: {
        id: id,
      },
      returning: true,
    });
    res
      .status(200)
      .send({ message: "Fechas actualizadas correctamente", proceso: proceso });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error al actualizar las fechas" });
  }
};

const get_procesos = async (req, res) => {
  const procesos = await Proceso.findAll({
    include: [Etapa, Programa],
    order: [[{ model: Etapa }, "numero", "ASC"]],
    include: [
      {
        model: EtapaProceso,
        include: [
          {
            model: Etapa,
          },
          {
            model: ActividadProceso,
            include: [
              {
                model: Actividad,
              },
            ],
          },
        ],
      },
      Programa,
    ],
    order: [
      [Programa, "escuela"],
      ["programaPrograma"],
      [EtapaProceso, "etapaId"],
    ],
  });
  res.status(200).send({ procesos: procesos });
};

const create_proceso = async (req, res) => {
  const body = req.body;
  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({
    access_token: req.user.accessToken,
  });

  const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    if (body.tipo_proceso == "nuevo") {
      await Programa.create({
        tipo: body.tipo,
        programa: body.programa,
        grado: body.grado,
        codigo: body.codigo,
        escuela: body.escuela,
        modalidad: body.modalidad,
        duracion: body.duracion,
        tipo_programa: "Nuevo",
      });

      const fileMetadata = {
        name: body.programa || body.programa_origen,
        mimeType: "application/vnd.google-apps.folder",
        parents: [driveId_escuelas[body.escuela]],
      };
      const file = await drive.files.create({
        resource: fileMetadata,
        fields: "id",
      });
      const proceso = await Proceso.create({
        programaPrograma: body.programa,
        tipo: "Nuevo",
        driveId: file.data.id,
      });

      return res.status(200).send({ proceso: proceso });
    }
    if (body.programa_destino == "nuevo") {
      await Programa.create({
        programa_previo: body.programa_origen,
        tipo: body.tipo,
        programa: body.programa,
        grado: body.grado,
        codigo: body.codigo,
        escuela: body.escuela,
        modalidad: body.modalidad,
        duracion: body.duracion,
        tipo_programa: "Actualización",
      });
      const fileMetadata = {
        name: body.programa || body.programa_origen,
        mimeType: "application/vnd.google-apps.folder",
        parents: [driveId_escuelas[body.escuela]],
      };
      const file = await drive.files.create({
        resource: fileMetadata,
        fields: "id",
      });
      const proceso = await Proceso.create({
        programaPrograma: body.programa,
        tipo: "Actualización",
        driveId: file.data.id,
      });
      return res.status(200).send({ proceso: proceso });
    }
    
    const programa_a_actualizar = await Programa.findByPk(body.programa_origen);
    const fileMetadata = {
      name: body.programa || body.programa_origen,
      mimeType: "application/vnd.google-apps.folder",
      parents: [driveId_escuelas[programa_a_actualizar.dataValues.escuela]],
    };
    const file = await drive.files.create({
      resource: fileMetadata,
      fields: "id",
    });
    const proceso = await Proceso.create({
      programaPrograma: body.programa_origen,
      tipo: "Actualización",
      driveId: file.data.id,
    });

    return res.status(200).send({ proceso: proceso });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error al crear el proceso" });
  }
};

const get_etapas_en_proceso = async (req, res) => {
  const { tipo } = req.params;
  const etapas = await Etapa.findAll({
    include: [
      {
        model: Actividad,
        include: [
          {
            model: ActividadProceso,
            order: [["etapaProcesoId", "ASC"]],
            separate: true,
          },
        ],
      },
      {
        model: Proceso,
      },
    ],
    order: [
      [{ model: Actividad }, "numero", "ASC"],
      [{ model: Proceso }, "id", "ASC"],
    ],
    where: {
      tipo: tipo,
    },
  });

  res.status(200).send({ etapas: etapas });
};

const create_evidencia = async (req, res) => {
  upload(req, res, async (err) => {
    if (!req.file && req.body.type == "file") {
      return res.status(500).send({ message: "No se subió ningún archivo" });
    }

    const evidencia_id = req.body?.evidencia;

    const actividad = await ActividadProceso.findOne({
      where: {
        id: evidencia_id,
      },
      attributes: ["id", "estado"],
      include: [
        {
          model: EtapaProceso,
          include: [
            {
              model: Proceso,
              attributes: [
                "driveId",
                "programaPrograma",
                "porcentaje",
                "estado",
                "cantidadEtapas",
                "id",
              ],
            },
          ],
        },
        {
          model: Actividad,
          attributes: ["numero", "nombre", "evidencia"],
        },
      ],
    });

    if (actividad.dataValues.estado == "Completada") {
      return res
        .status(500)
        .send({ message: "La actividad ya está completada" });
    }

    actividad.estado = "Completada";

    if (!req.file && req.body.type == "url") {
      actividad.evidenciaUrl = req.body.url;
      await actividad.save();

      return res.status(200).send({ message: "Link agregado correctamente" });
    }

    if (!req.file && req.body.type == "none") {
      await actividad.save();

      return res
        .status(200)
        .send({ message: "Actividad completada correctamente" });
    }

    const file = req.file;

    if (!err) {
      const oauth2Client = new google.auth.OAuth2();

      oauth2Client.setCredentials({
        access_token: req.user.accessToken,
      });

      const drive = google.drive({
        version: "v3",
        auth: oauth2Client,
      });
      const fileMetadata = {
        name:
          actividad.actividad.dataValues.numero +
          "_" +
          actividad.actividad.dataValues.evidencia +
          "_" +
          actividad.etapaProceso.proceso.programaPrograma,
        parents: [actividad.etapaProceso.proceso.driveId],
      };

      const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      };

      try {
        const file_uploaded = await drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: "id",
        });

        actividad.evidenciaId = file_uploaded.data.id;
        actividad.estado = "Completada";
        await actividad.save();
        //delete file from local storage
        await fs.unlink(file.path, (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.status(200).send({ message: "File uploaded successfully" });
      } catch (err) {
        res.status(500).send({ message: "No se pudo subir el archivo" });
        throw err;
      }
    }
  });
};
module.exports = {
  get_procesos,
  create_proceso,
  get_etapas_en_proceso,
  create_evidencia,
  update_proceso,
  procesos_metrics,
};
