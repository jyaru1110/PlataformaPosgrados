export const getDiasSemana = () => {
    const hoy = Date.now();
    const diasSemana = [];
    var diaString = "";
    var limite = 6;
    for (var i = 0; i < limite; i++)
    {
        const dia = new Date(hoy + i * 24 * 60 * 60 * 1000);
        if(dia.getDay() !== 0)
        {
            diaString = (dia.getMonth() + 1) + "/" +  dia.getDate() + "/" + dia.getFullYear();
            diasSemana.push(diaString);
        }
        else
        {
            limite++;
        }
    }
    return diasSemana;
}