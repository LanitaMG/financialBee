import { mainSection, showHome } from "./v_home.js"
import { crearSelectOption, crearEncabezado, limpiarMainSection, crearGuardarSalirBtn } from "./functions.js";
import { categorias } from "./d_categorias.js";
import { tiposDeMovimiento, Movimiento } from "./d_movimientos.js";
import { mediosPago } from "./d_mediosDePago.js";

const seccionAgr = 'agm'
let tipoMovSeleccionado = tiposDeMovimiento[0];
let movAgregados = [];

export function agregarMovimiento() {
    limpiarMainSection()
    const filtrosBtns = crearFiltros()
    const encabezado = crearEncabezado(seccionAgr)
    const form = crearFomulario()
    const btns = crearGuardarSalirBtn(seccionAgr)
    const sectionAgregarMovimiento = document.createElement("section");
    const movAgregadosDetalle = mostrarMovAgregados();
    sectionAgregarMovimiento.id = "sectionCategoria";
    sectionAgregarMovimiento.innerHTML = `
     <section class="m-3 text-center shadow  rounded mx-auto p-5" style="max-width: 768px">
        ${encabezado}
        ${filtrosBtns}
        ${form}
        ${btns}
        <p id="mensajeError" class="text-danger"></p>
        ${movAgregadosDetalle}
        `;
    mainSection.insertBefore(sectionAgregarMovimiento, mainSection.children[1])
    crearEventListeners()


}


function crearFomulario() {
    const selectCategorias = crearSelectOption(categorias.filter(categoria => categoria.tipoMovimiento == tipoMovSeleccionado).map(categoria => categoria.nombre), "")
    const selectMediosPago = crearSelectOption(mediosPago.map(medio => medio.nombre), "")
    const fechaActual = new Date();
    const fechaInput = fechaActual.toISOString().substring(0, 10);

    let form = `
<form id="agrMovForm" class="w-75 m-auto mt-3 text-start" >
        
            <div class="input-group mb-3">
                <label class="input-group-text" for="fechaMov">Fecha</label>
                <input type="date" id="fechaMov" class="form-control"  value="${fechaInput}" required>
            </div>
            <div class="input-group mb-3">
                <label class="input-group-text" for="selCategoria">Categoría</label>
                <select id="selCategoria" class="form-select" >
                    ${selectCategorias}
                </select>
            </div>
            <div class="input-group mb-3">
                <label class="input-group-text" for="descripcion">Descripción</label>
                <input type="text" class="form-control" id="descripcion" required>

            </div>
        
            <div class="input-group mb-3">
                <label class="input-group-text" for="monto">Monto</label>
                <input type="number" id="monto" class="form-control" required>


            </div>
            <div class="input-group mb-3">
                <label class="input-group-text" for="selMedioPago">Medio de pago</label>
                <select id="selMedioPago" class="form-select">
                ${selectMediosPago}
                </select>
            </div>
            <div class="input-group mb-3">
                <label class="input-group-text" for="comentarios">Comentarios</label>
                <input type="text" class="form-control" id="comentarios">
            </div>
                   
            </form>
            `
    return form
}


function crearFiltros() {
    let filtros = "";
    let chk = "checked"
    tiposDeMovimiento.forEach((tipoMov) => {
        const filtro = `
          <input type="radio" name="cat" class="btn-check" id="${tipoMov}" autocomplete="off" ${chk}>
          <label class="btn btn-outline-warning " for="${tipoMov}">${tipoMov}</label>
          `;
        filtros += filtro;
        chk = ""
    });
    const divFiltros = `<div id="filtrosMenu" class="btn-group" role="group">
          ${filtros}
          </div>`;
    return divFiltros;
}

function crearEventListeners() {
    document
        .getElementById("guardaragmBtn")
        .addEventListener("click", guardarMovimiento);

    document
        .getElementById("saliragmBtn")
        .addEventListener("click", showHome);
    document
        .getElementById("filtrosMenu")
        .addEventListener("click", cambioTipoMov);

}


function cambioTipoMov(event) {
    tipoMovSeleccionado = event.target.id
    const selectCategorias = crearSelectOption(categorias.filter(categoria => categoria.tipoMovimiento == tipoMovSeleccionado).map(categoria => categoria.nombre), "")
    document.getElementById("selCategoria").innerHTML = selectCategorias
}

function guardarMovimiento() {
    try {
        const fechaMov = document.getElementById("fechaMov").value;
        const categoria = document.getElementById("selCategoria").value;
        const descripcion = document.getElementById("descripcion").value;
        const montoTotal = document.getElementById("monto").value;
        const medioPago = document.getElementById("selMedioPago").value;
        const comentarios = document.getElementById("comentarios").value;

        const validarFormulario = (descripcion.trim().length > 0 && parseInt(monto) > 0) > 0 ? true : false;

        if (validarFormulario) {
            let nuevoMovimiento = new Movimiento(tipoMovSeleccionado, fechaMov, categoria, descripcion, montoTotal, medioPago, comentarios, false)
            let movimientos = JSON.parse(localStorage.getItem("movimientos"))
            movimientos.push(nuevoMovimiento)


            localStorage.setItem("movimientos", JSON.stringify(movimientos));
            movAgregados.push(`${descripcion} - $${montoTotal}`)
            agregarMovimiento()
        }
        else {
            document.getElementById("mensajeError").textContent = "Descripción y monto son campos requeridos"

        }

    } catch (error) {
        document.getElementById("mensajeError").textContent = "Por favor, revise los datos ingresados. Descripción y monto son campos requeridos"
        console.log(error);
    }
}

function mostrarMovAgregados() {
    let movAgr = ""
    if (movAgregados.length > 0) {
        movAgregados.forEach(mov => {
            movAgr += `<p class="m-0">${mov}</p>`
        });
    }
    return `Movimientos: ${movAgregados.length}
            ${movAgr}`
}

