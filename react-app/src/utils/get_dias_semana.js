export const getDiasSemana = () => {
    const hoy = Date.now();
    const diasSemana = [];
    for (let i = 0; i < 6; i++) {
        const dia = new Date(hoy + i * 24 * 60 * 60 * 1000);
        if(dia.getDay() !== 0)
            diasSemana.push(dia);
    }
    return diasSemana;
}