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
    formData.append("file", file, evidenciaId.nombre);
    formData.append("evidencia", evidenciaId.id);
    console.log(formData.get("evidencia"));
    const evidencia = await axios.post(`${url_backend}/evidencia`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    if (evidencia.data.error) {
      toast.error(evidencia.data.error);
      return;
    }
    toast.success("Evidencia subida correctamente");

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
      <div className="w-4/5 h-full bg-white max-w-2xl max-h-[300px] rounded-xl text-center p-3 z-50">
        <p className="text-xl font-bold">Sube {evidenciaId?.nombre}</p>
        <form className="h-full mt-3" onSubmit={onSubmit}>
          <input
            type="file"
            id="input-file-upload"
            className="hidden"
            onChange={handleChange}
            accept=".doc,.docx,.pdf,.jpg,.jpeg,.png"
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className="cursor-pointer"
          >
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onDragOver={handleDrag}
              className={`border-dashed border-2 rounded-lg h-2/3 flex items-center justify-center ${
                dragging || file ? " border-primary " : "  "
              }`}
            >
              <p className={`font-medium ${dragging ? " text-primary " : ""}`}>
                {file?.name ? (
                  <span className="font-bold text-primary"> {file.name}</span>
                ) : (
                  <>
                    {dragging
                      ? "SUELTALO AQUÍ"
                      : "ARRASTRA UN ARCHIVO O DA CLICK"}
                  </>
                )}
              </p>
            </div>
          </label>
          <button
            className={`bg-primary p-2 rounded-lg font-medium text-white w-full mt-3 ${
              !file || loading ? " opacity-50 " : " opacity-100 "
            }`}
            disabled={!file || loading}
            type="submit"
          >
            {loading ? "SUBIENDO EVIDENCIA..." : "SUBIR EVIDENCIA"}
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
