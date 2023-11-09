const Proceso = require("../models/Proceso");
const Etapa = require("../models/Etapa");
const Programa = require("../models/Programa");
const EtapaProceso = require("../models/EtapaProceso");
const ActividadProceso = require("../models/ActividadProceso");
const EvidenciaProceso = require("../models/EvidenciaProceso");
const Evidencia = require("../models/Evidencia");
const Actividad = require("../models/Actividad");
const { google } = require("googleapis");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" }).single("file");

const get_procesos = async (req, res) => {
  const procesos = await Proceso.findAll({
    include: [Etapa, Programa],
    order: [[{ model: Etapa }, "numero", "ASC"]],
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
    const fileMetadata = {
      name: body.programa,
      mimeType: "application/vnd.google-apps.folder",
      parents: ["1xHszoPB0ChmnYhp8mjAQeHRZHcwJ-Ruj"],
    };
    const file = await drive.files.create({
      resource: fileMetadata,
      fields: "id",
    });

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
      const proceso = await Proceso.create({
        programaPrograma: body.programa,
        tipo: "Actualización",
      });
      return res.status(200).send({ proceso: proceso });
    }
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
            model: Evidencia,
            include: [
              {
                model: EvidenciaProceso,
              },
            ],
          },
        ],
      },
      {
        model: Proceso,
      },
    ],
    where: {
      tipo: tipo,
    },
  });

  res.status(200).send({ etapas: etapas });
};

const create_evidencia = async (req, res) => {
  upload(req, res, async (err) => {
    const evidencia_id = req.body?.evidencia;
    const file = req.file;
    const evidencia = await EvidenciaProceso.findOne({
      where: {
        id: evidencia_id,
      },
      attributes: ["id"],
      include: [
        {
          model: ActividadProceso,
          include: [
            {
              model: EtapaProceso,
              include: [
                {
                  model: Proceso,
                  attributes: ["driveId"],
                },
              ],
            },
          ],
        },
      ],
    });

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
        name: file.originalname,
        parents: [evidencia.actividadProceso.etapaProceso.proceso.driveId],
      };

      const media = {
        mimeType: "application/pdf",
        body: fs.createReadStream(file.path),
      };

      try {
        const file_uploaded = await drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: "id",
        });

        evidencia.url = file_uploaded.data.id;
        evidencia.estado = "Completada";
        await evidencia.save();
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
};
