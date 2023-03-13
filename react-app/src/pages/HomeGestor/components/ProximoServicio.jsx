import { useEffect,useState } from "react";

export default function ProximoServicio() {
    var [servicio, setServicio] = useState({});
    useEffect (() => {
        //const controller = new AbortController();
        //const signal = controller.signal;
        fetch("http://localhost:3900/get_proximo_servicio", { 
            //signal: signal,
            method: "GET",
        })
        .then((res) =>{
            console.log(res);
            res.json();
        })
        .then((data) => {
            console.log(data);
        })
        /*.catch((err) => {
            console.log("error ",err);
        });
        return () => controller.abort();*/
    }, []);

    return (
      <>
        <div className = "bg-primary m-auto text-white rounded-lg p-4">
        </div>
      </>
    );
  }