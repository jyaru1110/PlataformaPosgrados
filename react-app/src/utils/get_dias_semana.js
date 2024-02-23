export const getDiasSemana = () => {
  const hoy = Date.now();
  const diasSemana = [];
  var diaString = "";
  var limite = 6;
  for (var i = 0; i < limite; i++) {
    const dia = new Date(hoy + i * 24 * 60 * 60 * 1000);
    if (dia.getDay() !== 0) {
      diaString =
        dia.getMonth() + 1 + "/" + dia.getDate() + "/" + dia.getFullYear();
      diasSemana.push(diaString);
    } else {
      limite++;
    }
  }
  return diasSemana;
};

export const getSemanaPasada = () => {
  const hoy = new Date();
  const numero_dia = hoy.getDay();
  const lunes_pasado = new Date(
    hoy - (7 + numero_dia - 1) * 24 * 60 * 60 * 1000
  );
  const sabado_pasado = new Date(
    hoy - (7 + numero_dia - 6) * 24 * 60 * 60 * 1000
  );
  return {lunes:lunes_pasado.toISOString().split("T")[0], sabado:sabado_pasado.toISOString().split("T")[0]};
};
