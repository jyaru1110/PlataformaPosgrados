export function date_to_dd_month_yyyy (date) {
    date = new Date(date);
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long'});
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}