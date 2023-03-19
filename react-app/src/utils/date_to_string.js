export function date_to_dd_month_yyyy (date) {
    date = new Date(date);
    const fecha_servicio = date.toLocaleString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' });
    return fecha_servicio;
}

export function date_to_day_dd_mm (date) {
    let diaString = date.toLocaleString('es-ES', { weekday:'long' ,day: 'numeric', month: 'long'});
    diaString = diaString.charAt(0).toUpperCase() + diaString.slice(1)
    return diaString;
}