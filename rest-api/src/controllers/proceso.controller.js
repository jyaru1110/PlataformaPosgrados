const Proceso = require("../models/Proceso");
const Etapa = require("../models/Etapa");
const Programa = require("../models/Programa");
const EtapaProceso = require("../models/EtapaProceso");
const ActividadProceso = require("../models/ActividadProceso");
const Actividad = require("../models/Actividad");
const { google } = require("googleapis");
const fs = require("fs");
const multer = require("multer");
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
    /*
    const fileMetadata = {
      name: body.programa || body.programa_origen,
      mimeType: "application/vnd.google-apps.folder",
      parents: ["1xHszoPB0ChmnYhp8mjAQeHRZHcwJ-Ruj"],
    };
    const file = await drive.files.create({
      resource: fileMetadata,
      fields: "id",
    });
*/
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
        //driveId: file.data.id,
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
      //driveId: file.data.id,
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
    if (!req.file && req.body.type == "url") {
      const evidencia_id = req.body?.evidencia;
      const actividad = await ActividadProceso.findOne({
        where: {
          id: evidencia_id,
        },
        attributes: ["id"],
        include: [
          {
            model: EtapaProceso,
            include: [
              {
                model: Proceso,
                attributes: [
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
      actividad.evidenciaUrl = req.body.url;
      actividad.estado = "Completada";
      await actividad.save();
      return res.status(200).send({ message: "Link agregado correctamente" });
    }

    const evidencia_id = req.body?.evidencia;
    const file = req.file;
    const actividad = await ActividadProceso.findOne({
      where: {
        id: evidencia_id,
      },
      attributes: ["id"],
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
};
