export function date_to_dd_month_yyyy (dia) {
    dia = dia.replace(/-/g, '/');
    const date = new Date(dia);
    const fecha_servicio = date.toLocaleString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' });
    return fecha_servicio;
}

export function date_to_day_dd_mm (dia) {
    const date = new Date(dia);
    let diaString = date.toLocaleString('es-ES', { weekday:'long' ,day: 'numeric', month: 'long'});
    diaString = diaString.charAt(0).toUpperCase() + diaString.slice(1);
    return diaString;
}

export function get_numero_dia(date) {
    const dia = new Date(date);
    return dia.getDate();
}

export function get_primera_letra (date) {
    const dia = new Date(date);
    const diaString = dia.toLocaleString('es-ES', { weekday:'long' });
    if(diaString == "miércoles")
    {
        return "X";
    }
    return diaString.charAt(0).toUpperCase();
}