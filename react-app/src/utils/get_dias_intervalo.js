export const get_dias_intervalos = (fecha_inicio,fecha_fin) => {
    fecha_fin = fecha_fin.replace(/-/g, "/");
    fecha_inicio = fecha_inicio.replace(/-/g, "/");
    var fecha_inicio = new Date(fecha_inicio);
    var fecha_fin = new Date(fecha_fin);
    var dias = [];
    while(fecha_inicio <= fecha_fin)
    {
        if(fecha_inicio.getDay() != 0 )
        {
            const diaString =  (fecha_inicio.getMonth() + 1) + "/" +  fecha_inicio.getDate() + "/" + fecha_inicio.getFullYear();
            dias.push(diaString);
        }
        fecha_inicio.setDate(fecha_inicio.getDate() + 1);
    }
    return dias;
}