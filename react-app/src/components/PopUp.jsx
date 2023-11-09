import { useEffect, useState } from "react";
import axios from "axios";
import { list } from "postcss";

const url_backend = import.meta.env.VITE_URL_API;

let listener = (message) => {};
let listenerShow = (show) => {};

export default function PopUp({ proceed }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    listener = setMessage;
    listenerShow = setShow;
  }, []);

  useEffect(() => {
    if (message) setShow(true);
  }, [message]);

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
      <div className="w-4/5 h-full bg-white max-w-lg max-h-[150px] rounded-xl text-center p-3 z-50">
        <p className="text-xl font-bold">{message}</p>
        <button className="font-bold text-white bg-primary p-2 rounded-md mt-5" onClick={proceed}>
          SÍ, CONFIRMAR SERVICIOS
        </button>
        <button
          className="font-bold hover:bg-gray-200 ml-2 p-2 rounded-md mt-5"
          onClick={() => setShow(false)}
        >
          CANCELAR
        </button>
      </div>
    </div>
  );
}

export const setMessage = (message) => {
  listener(message);
  listenerShow(true);
};
