
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
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    let anios = [new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1]
    anios.forEach(anio => {
        meses.forEach((mes, index) => {
            navMesAnio.push(new MesAnio(index, mes, anio))
        });
    });
    return navMesAnio
}

export const navMesAnio = crearNavMesAnio()

export function indiceMesActual() {
    const mesActual = new Date().getMonth()
    const anioActual = new Date().getFullYear()
    const indexMesActual = navMesAnio.findIndex(navMesAnio => navMesAnio.nroMes === mesActual && navMesAnio.anio === anioActual);
    return indexMesActual
}



export function crearSelect(arr) {
    const select = document.createElement('select');
    arr.forEach((elemento) => {
        const opcion = document.createElement('option');
        opcion.value = elemento;
        opcion.textContent = elemento;
        select.appendChild(opcion);
    });
    return select;
}

