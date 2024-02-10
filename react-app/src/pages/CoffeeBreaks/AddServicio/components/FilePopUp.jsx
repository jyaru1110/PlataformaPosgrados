import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSVLink } from "react-csv";

const url_backend = import.meta.env.VITE_URL_API;

let listener = (show) => {};

export default function FilePopUp() {
  const [show, setShow] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  toast.onChange((payload) => {
    if (payload.type === "success" && payload.status === "removed") {
      window.location.reload();
    }
  });

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    listener = setShow;
  }, []);

  useEffect(() => {
    setFile(null);
  }, [show]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }
    else {
        toast.error("No se ha seleccionado un archivo");
        setLoading(false);
        return;
    }

    const horarios = await axios
      .post(`${url_backend}/file_upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .catch((e) => {
        toast.error("Error al subir servicios");
      });
    if (horarios) toast.success("Servicios subida correctamente");
    setLoading(false);
  };

  return (
    <div
      className={`h-screen w-screen font-seravek fixed flex items-center justify-center z-10 ${
        show ? "" : " hidden"
      }`}
    >
      <div
        className={`h-full w-full bg-black/[0.14] inset-0 fixed z-40`}
        onClick={() => setShow(false)}
      ></div>
      <div className="w-4/5 bg-white max-w-3xl rounded-xl text-center p-3 z-50">
        <p className="text-lg font-bold">Sube un archivo en formato CSV</p>
        <p className="text-left leading-tight">
          Recuerda que las fechas deben estar en el formato YYYY-MM-DD, la fecha
          en formato HH:MM y los programas completos con correcta ortografía y
          con las primeras letras en mayúscula.
        </p>
        <p className="text-lef mt-2">
          Da clic{" "}
          <span className="text-primary underline cursor-pointer font-bold">
            <CSVLink
              filename="Plantilla para subir coffee breaks"
              data={[
                {
                  programa: "Especialidad en Dirección de Proyectos",
                  no_clase: "1234",
                  salon: "A 01",
                  dia: "Lunes",
                  hora_inicio: "21:00",
                  hora_fin: "22:00",
                  hora_servicio_inicio: "21:30",
                  hora_servicio_fin: "21:45",
                  fecha_inicio: "2024-12-31",
                  fecha_fin: "2025-01-31",
                  num_alumnos: "10",
                },
              ]}
            >
              aquí
            </CSVLink>
          </span>{" "}
          para descargar la plantilla. Puedes cambiar el orden, pero <b>NO</b>{" "}
          el nombre de los encabezados
        </p>
        <form className="h-full mt-3" onSubmit={onSubmit}>
          <input
            type="file"
            id="input-file-upload"
            className="hidden"
            onChange={handleChange}
            value=""
            accept=".csv"
            disabled={loading}
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={`${
              loading ? " opacity-50 " : " opacity-100  cursor-pointer "
            }`}
          >
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onDragOver={handleDrag}
              className={`border-dashed border-2 rounded-lg h-[100px] flex mb-1 flex-col items-center justify-center relative ${
                dragging || file ? " border-primary " : "  "
              }`}
            >
              <p className={`font-medium ${dragging ? " text-primary " : ""}`}>
                {file?.name ? (
                  <span className="font-bold text-primary">{file.name}</span>
                ) : (
                  <>
                    {dragging
                      ? "SUELTALO AQUÍ"
                      : "ARRASTRA UN ARCHIVO O DA CLICK AQUÍ"}
                  </>
                )}
              </p>
              {file?.name ? (
                <button
                  className="text-primary underline"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setFile(null);
                  }}
                >
                  Cancelar
                </button>
              ) : null}
            </div>
          </label>
          <button
            className={`bg-primary p-2 rounded-lg font-medium text-white w-full mt-3 ${
              (!file) || loading ? " opacity-50 " : " opacity-100 "
            }`}
            type="submit"
            disabled={(!file) || loading}
          >
            {loading ? "SUBIENDO SERVICIOS EVIDENCIA..." : "SUBIR SERVICIOS"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export const setShow = (show) => {
  listener(show);
};
