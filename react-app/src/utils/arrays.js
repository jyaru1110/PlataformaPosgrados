export const interceptionNotZero = (a, b) => {
    return a.filter((item) => b.includes(item)).length > 0;
}

export const reduceToPuestosArray = (puestos) => {
    return puestos.map((puesto) => puesto.puesto);
}
export const puestosInterceptionNotZero = (a, b) => {
    b = reduceToPuestosArray(b);
    return interceptionNotZero(a, b);
}