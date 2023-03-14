import { useEffect,useState } from "react";

export default function ProximoServicio() {
    var [servicio, setServicio] = useState([]);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetch('http://localhost:3900/api/proximo_servicio', {signal: signal})
        .then(response => response.json())
        .then(data => {
            setServicio(data);    
            console.log("data ",data);
        })
        .catch((err) => {
            console.log("error ",err);
        });
        return () => controller.abort();
    }, []);

    return (
      <>
        <div className = "bg-primary m-auto text-white rounded-lg p-4">
            {servicio[0]==undefined ? <h1 className = "font-poppins">No hay servicios</h1> : 
            (
                <div>
                    <h1 className = "font-poppins">{servicio[0].salon}</h1>
                    <h1 className = "font-poppins">{servicio[0].hora_inicio} -{servicio[0].hora_fin}</h1>
                    <h1 className = "font-poppins">{servicio[0].num_servicios}</h1>
                </div>
            )

            }
            
        </div>
      </>
    );
  }