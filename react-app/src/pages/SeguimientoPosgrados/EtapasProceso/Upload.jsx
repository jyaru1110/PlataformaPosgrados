import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url_backend = import.meta.env.VITE_URL_API;

let listener = (evidenciaId) => {};

export default function Upload() {
  const [evidenciaId, setEvidenciaId] = useState(null);
  const [show, setShow] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
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
    listener = setEvidenciaId;
  }, []);

  useEffect(() => {
    if (evidenciaId) setShow(true);
  }, [evidenciaId]);

  useEffect(() => {
    setFile(null);
  }, [show]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    if (file) {
      formData.append("type", "file");
      formData.append("file", file);
    } else if (url) {
      formData.append("type", "url");
      formData.append("url", url);
    } else {
      formData.append("type", "none");
    }

    formData.append("evidencia", evidenciaId.id);
    const evidencia = await axios
      .post(`${url_backend}/evidencia`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .catch((e) => {
        toast.error("Error al subir evidencia");
      });
    if (evidencia) toast.success("Evidencia subida correctamente");
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
      <div className="w-4/5 h-full bg-white max-w-2xl max-h-[350px] rounded-xl text-center p-3 z-50">
        <p className="text-base font-bold">Sube {evidenciaId?.nombre}</p>
        <form className="h-full mt-3" onSubmit={onSubmit}>
          <input
            type="file"
            id="input-file-upload"
            className="hidden"
            onChange={handleChange}
            value=""
            accept=".doc,.docx,.pdf,.jpg,.jpeg,.png,.xlsx,.xls,.ppt,.pptx"
            disabled={loading || url}
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={`${
              loading || url ? " opacity-50 " : " opacity-100  cursor-pointer "
            }`}
          >
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onDragOver={handleDrag}
              className={`border-dashed border-2 rounded-lg h-2/5 flex mb-1 flex-col items-center justify-center relative ${
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
          Ó
          <input
            type="text"
            className="w-full p-1 mt-1 border-2 rounded-lg"
            placeholder="INSERTA LINK AL DOCUMENTO"
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading || file}
          ></input>
          <button
            className={`bg-primary p-2 rounded-lg font-medium text-white w-full mt-3 ${
              (!file && !url) || loading ? " opacity-50 " : " opacity-100 "
            }`}
            type="submit"
            disabled={(!file && !url) || loading}
          >
            {loading ? "SUBIENDO EVIDENCIA..." : "SUBIR EVIDENCIA"}
          </button>
          <button
            className={`p-2 rounded-lg  w-full mt-1  ${
              file || url || loading || loading
                ? " opacity-50 "
                : " opacity-100 hover:bg-gray-200"
            }`}
            type="submit"
            disabled={file || url || loading}
          >
            {loading ? "SUBIENDO..." : "SUBIR SIN DOCUMENTO"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export const setEvidenciaId = (evidenciaId) => {
  listener(evidenciaId);
};
