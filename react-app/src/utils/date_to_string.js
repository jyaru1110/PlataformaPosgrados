export function date_to_dd_month_yyyy (dia) {
    dia = dia.replace(/-/g, '/');
    const date = new Date(dia);
    const fecha_servicio = date.toLocaleString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' });
    return fecha_servicio;
}

export function date_to_dd_mm_yyyy (dia) {
    dia = dia.replace(/-/g, '/');
    const date = new Date(dia);
    const fecha_servicio = date.toLocaleString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' });
    return fecha_servicio;
}

export function date_to_day_dd_mm (dia) {
    const date = new Date(dia);
    let diaString = date.toLocaleString('es-ES', { weekday:'long' ,day: 'numeric', month: 'long'});
    diaString = diaString.charAt(0).toUpperCase() + diaString.slice(1);
    return diaString;
}

export function date_to_day_dd_mm_2 (dia) {
    dia = dia.replace(/-/g, '/');
    const date = new Date(dia);
    let diaString = date.toLocaleString('es-ES', { weekday:'long' ,day: 'numeric', month: 'long'});
    diaString = diaString.charAt(0).toUpperCase() + diaString.slice(1);
    return diaString;
}

export function get_numero_dia(date) {
        date.replace(/-/g, '/');
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

export function get_month_long(date) {
    const dia = new Date(date);
    let diaString = dia.toLocaleString('es-ES', { month:'long' });
    diaString = diaString.charAt(0).toUpperCase() + diaString.slice(1);
    return diaString;
}

export function month_day_year_to_year_month_day(date) {
    date =  date.replace(/-/g, '/');
    const dia = new Date(date);
    var diaString = (dia.getFullYear()) + "-" + (dia.getMonth() + 1) + "-" + dia.getDate();
    return diaString;
}

export function get_month_short(date) {
    const dia = new Date(date);
    let diaString = dia.toLocaleString('es-ES', { month:'short' });
    diaString = diaString.charAt(0).toUpperCase() + diaString.slice(1);
    return diaString.substring(0,3);
}

export function datetype_to_yyyy_mm_dd(date) {
    const diaString = (date.getFullYear()) + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return diaString;
}

export function date_to_dd_monthshort_yyyy(date) {
    date =  date.replace(/-/g, '/');
    const dia = new Date(date);
    const diaString = dia.toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    return diaString;
}