export const mainSection = document.getElementById("main");

export class MesAnio {
  constructor(nroMes, mes, anio) {
    this.nroMes = nroMes;
    this.anio = anio;
    this.mes = mes;
    this.mesAnio = `${mes} ${anio}`;
  }
}

function crearNavMesAnio() {
  let navMesAnio = [];
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  let anios = [
    new Date().getFullYear() - 1,
    new Date().getFullYear(),
    new Date().getFullYear() + 1,
  ];
  anios.forEach((anio) => {
    meses.forEach((mes, index) => {
      navMesAnio.push(new MesAnio((index + 1), mes, anio));
    });
  });
  return navMesAnio;
}

export const navMesAnio = crearNavMesAnio();

export function indiceMesActual() {
  const mesActual = new Date().getMonth();
  const anioActual = new Date().getFullYear();
  const indexMesActual = navMesAnio.findIndex(
    (navMesAnio) =>
      navMesAnio.nroMes === (mesActual + 1) && navMesAnio.anio === anioActual
  );
  return indexMesActual;
}

