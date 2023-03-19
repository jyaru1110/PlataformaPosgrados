export const getDiasSemana = () => {
    const hoy = Date.now();
    const diasSemana = [];
    var diaString = "";
    for (let i = 0; i < 6; i++) {
        const dia = new Date(hoy + i * 24 * 60 * 60 * 1000);
        if(dia.getDay() !== 0)
        {
            diaString =  (dia.getMonth() + 1) + "/" +  dia.getDate() + "/" + dia.getFullYear();
            diasSemana.push(diaString);
        }
    }
    return diasSemana;
}