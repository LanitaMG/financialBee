import { mainSection, showHome } from "./v_home.js"
import { crearEncabezado, limpiarMainSection, crearGuardarSalirBtn } from "./functions.js";


let dataTable;
let dataTableCreada = false;
let movimientos = []


const opcionesTabla = {
    columnDefs: [{ className: "text-start", targets: [0, 1, 2, 3] },
    { className: "text-end", targets: [4] }],
    pageLength: 10,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún movimiento encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún movimiento encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales",
        search: "Buscar",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previus: "Anterior"
        }
    }

}

const iniciarDataTable = () => {
    if (dataTableCreada) {
        dataTable.destroy();
    }
    dataTable = new DataTable('#listMov', opcionesTabla);
}

export function verMovimientos() {
    limpiarMainSection()
    const sectionVerMov = document.createElement("section");
    const tabla = crearTablaMov()
    sectionVerMov.id = "sectionVerMov";
    sectionVerMov.innerHTML = `
     <section class="m-3 text-center shadow  rounded mx-auto p-5" style="max-width: 1024px">
        ${crearEncabezado("mov")}
        ${crearFiltrosMovimientos()}
        ${tabla}
        ${crearGuardarSalirBtn("mov")}
        </section>`;
    mainSection.appendChild(sectionVerMov);
    iniciarDataTable()
    crearFiltrosMovimientos()
    crearEventListeners()


}



function crearTablaMov() {
    const encabezado = `<thead>
                     <tr>
                         <th>Fecha</th>
                         <th>Categoría</th>
                         <th>Descripción</th>
                         <th>Medio de pago</th>
                         <th>Monto</th>
                         <th>Editar</th>
                     </tr>
                 </thead>`;
    const lista = crearListaMov();
    const tabla = `
            <table id="listMov" class="display compact small hover mt-3" >
            ${encabezado}
            ${lista}
            </table>
  `;
    return tabla;
}

function crearListaMov() {
    let filas = "";
    movimientos = JSON.parse(localStorage.getItem("movimientos"))
    movimientos.forEach((mov, index) => {
        if (!mov.isDeleted) {
            const fila = `
                <tr id="mov-${index}">
                    <td class="px-1">${mov.fecha}</td>
                    <td class="px-1">${mov.categoria}</td>
                    <td class="px-1">${mov.descripcion}</td>
                    <td class="px-1">${mov.medioPago}</td>
                    <td class="px-3">${formatoMoneda(mov.monto)}</td>
                    <td><i class="bi bi-pencil mx-2"></i> <i class="bi bi-trash3 mx-2"></i> </td>
                </tr>`;
            filas += fila;
        }

    });
    const lista = `
  <tbody id="listBody">
  ${filas}
  </tbody>
  `;
    return lista;
}

function formatoMoneda(valor) {
    return valor.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    });
    console.log(valor)
}


function crearFiltrosMovimientos() {
    const tipo = [... new Set(movimientos.map(mov => mov.tipoMovimiento))]
    let tipoBtns = ""
    tipo.forEach(tipo => {
        tipoBtns += `<button type="button" class="btn btn-outline-dark disabled">${tipo}</button>`
    });

    const divTipoBtns = `<div class="p-2">
    <span class="small">Tipo: </span>
    <div class="btn-group btn-group-sm" role="group">
        ${tipoBtns}
    </div>
        </div>
    `
    const categoria = [... new Set(movimientos.map(mov => mov.categoria))]
    let catBtns = ""
    categoria.forEach(cat => {
        catBtns += `<button type="button" class="btn btn-outline-dark disabled">${cat}</button>`
    });
    const divCatBtns = `
    <div class="p-2">
    <span class="small">Categorías: </span>
    <div class="btn-group btn-group-sm" role="group">
        ${catBtns}
    </div>
    </div>`

    const medioPago = [... new Set(movimientos.map(mov => mov.medioPago))]
    let mdpBtns = ""
    medioPago.forEach(medio => {
        mdpBtns += `<button type="button" class="btn btn-outline-dark disabled">${medio}</button>`
    });
    const divMdpBtns = `
        <div class="p-2">
            <span class="small">Medios de pago: </span>
            <div class="btn-group btn-group-sm" role="group">
                ${mdpBtns}
            </div>
        </div>`

    return `<div class="border border-warning rounded m-3">
        <p class="p-2 bg-warning">Filtros para un futuro funcional</p>
        <div id="filtros" class="m-3 text-start" >
        ${divTipoBtns}
        ${divCatBtns}
        ${divMdpBtns}
        </div>
        </div>`
}


function crearEventListeners() {
    document
        .getElementById("salirmovBtn")
        .addEventListener("click", showHome);
}