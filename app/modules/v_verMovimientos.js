import { mainSection, showHome } from "./v_home.js"
import { crearSelectOption, crearEncabezado, limpiarMainSection, crearGuardarSalirBtn } from "./functions.js";
import { categorias } from "./d_categorias.js";
import { tiposDeMovimiento, Movimiento } from "./d_movimientos.js";
import { mediosPago } from "./d_mediosDePago.js";


export function verMovimientos() {
    limpiarMainSection()
    // const filtrosBtns = crearFiltros()
    const encabezado = crearEncabezado("mov")
    const tabla = crearTablaMov()
    const btns = crearGuardarSalirBtn("mov")
    const sectionVerMov = document.createElement("section");
    sectionVerMov.id = "sectionVerMov";
    sectionVerMov.innerHTML = `
     <section class="m-3 text-center shadow  rounded mx-auto p-5" style="max-width: 768px">
        ${encabezado}
        
        ${tabla}
        ${btns}
        </section>
        `;
    mainSection.insertBefore(sectionVerMov, mainSection.children[1])

}


function crearTablaMov() {
    const encabezado = `<thead>
                     <tr>
                         <th>Fecha</th>
                         <th>Categoría</th>
                         <th>Descripción</th>
                         <th>Monto</th>
                         <th>Medio de pago</th>
                         <th>eliminar</th>

                     </tr>
                 </thead>`;
    const lista = crearListaMov();
    const tabla = `
            <table id="listMov" class="table text-center">
            ${encabezado}
            ${lista}
            </table>
  `;
    return tabla;
}

function crearListaMov() {
    let filas = "";
    const movimientos = JSON.parse(localStorage.getItem("movimientos"))
    movimientos.forEach((mov, index) => {
        if (!mov.isDeleted) {
            const fila = `
                <tr id="mov-${index}">
                    <td>${mov.fecha}</td>
                    <td>${mov.categoria}</td>
                    <td>${mov.descripcion}</td>
                    <td>${mov.monto}</td>
                    <td>${mov.medioPago}</td>
                    <td id="eli-${index}"><i id="del-${index}" class="bi bi-trash3"></i></td>
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