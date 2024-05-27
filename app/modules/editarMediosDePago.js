import { mainSection } from "./variables.js";
import {
  tiposMedioPago,
  plazoPago,
  MedioPago,
  mediosPago,
  actualizarMediosPago,
} from "./mediosDePago.js";

import {
  limpiarMainSection,
  crearEncabezado,
  crearAgregarBtn,
  crearSelectOption,
  crearCheckbox,
  crearGuardarSalirBtn,
} from "./functions.js";

import { showHome } from "./home.js";

let eliminar = [];
let agregar = [];
const seccionMDP = "mdp";

export function editarMedioPago() {
  limpiarMainSection();
  inicializarMP();
  const encabezado = crearEncabezado(seccionMDP);
  const tabla = crearTablaMDP();
  const agregarBtn = crearAgregarBtn(seccionMDP);
  const guardarSalirBtn = crearGuardarSalirBtn(seccionMDP);

  const sectionEditarMediosPago = document.createElement("section");
  sectionEditarMediosPago.id = "sectionMediosDePago";
  sectionEditarMediosPago.innerHTML = `
  <section class="m-3 text-center shadow  rounded mx-auto p-5" style="max-width: 768px">
  ${encabezado}
  ${tabla}
  ${agregarBtn}
  ${guardarSalirBtn}
  </section>
  `;
  mainSection.appendChild(sectionEditarMediosPago);
  crearEventListeners();
}

function inicializarMP() {
  eliminar = [];
  agregar = [];
  if (localStorage.getItem("mediosDePago")) {
    actualizarMediosPago();
  } else {
    localStorage.setItem("mediosDePago", JSON.stringify(mediosPago));
  }
}

function crearTablaMDP() {
  const encabezado = `<thead>
                     <tr>
                         <th>Mostrar</th>
                         <th>Billetera</th>
                         <th>Tipo</th>
                         <th>Eliminar</th>
                     </tr>
                 </thead>`;
  const lista = crearListaMDP();
  const tabla = `
            <table id="list" class="table text-center">
            ${encabezado}
            ${lista}
            </table>
  `;
  return tabla;
}

function crearListaMDP() {
  let filas = "";
  mediosPago.forEach((medio, index) => {
    if (!medio.isDeleted) {
      const check = crearCheckbox(medio.isVisible);
      const selectTipo = crearSelectOption(tiposMedioPago, medio.tipo);
      const fila = `
                <tr id="mdp-${index}">
                    <td id="isVis-${index}">${check}</td>
                    <td id="nom-${index}">${medio.nombre}</td>
                    <td id="tip-${index}"><select class="form-select form-select-sm">${selectTipo}</select></td>
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

function crearEventListeners() {
  mediosPago.forEach((element, index) => {
    if (!element.isDeleted) {
      document
        .getElementById(`del-${index}`)
        .addEventListener("click", eliminarMedioPago);
    }
  });
  document
    .getElementById("agregarmdpBtn")
    .addEventListener("click", agregarNuevoMedio);
  document.getElementById("salirMPBtn").addEventListener("click", showHome);
  document
    .getElementById("guardarMPBtn")
    .addEventListener("click", guardarCambiosMP);
}

function agregarNuevoMedio() {
  const indexNew = agregar.length;
  const fila = document.createElement("tr");
  fila.id = `newMP-${indexNew}`;
  fila.innerHTML = `               
                    <td id="newVis-${indexNew}">${crearCheckbox(true)}</td>
                    <td id="newNom-${indexNew}"><input class="form-input"></td>
                    <td id="newTip-${indexNew}"><select class="form-select form-select-sm">${crearSelectOption(
    tiposMedioPago,
    ""
  )}</select></td>
                    <td></td>`;
  document.getElementById("listBody").appendChild(fila);
  agregar.push(indexNew);
}

function eliminarMedioPago(event) {
  let index = event.target.id.replace("del-", "");
  eliminar.push(parseInt(index));
  document.getElementById(`mdp-${index}`).style.display = "none";
}

function guardarCambiosMP() {
  mediosPago.forEach((medio, index) => {
    if (!medio.isDeleted) {
      const check = document.getElementById(`isVis-${index}`).firstChild;
      medio.isVisible = check.checked;
      const selOpt = document.getElementById(`tip-${index}`).firstChild;
      medio.tipo = selOpt.value;
    }
  });

  if (eliminar.length > 0) {
    eliminar.forEach((medioIndex) => {
      console.log(medioIndex);
      mediosPago[medioIndex].isDeleted = true;
    });
  }
  if (agregar.length > 0) {
    agregar.forEach((nuevoIndex) => {
      const id = nuevoIndex;
      const isVisibleCh = document.getElementById(
        `isVis-${nuevoIndex}`
      ).firstChild;
      const isVisible = isVisibleCh.checked;
      const nombreInp = document.getElementById(
        `newNom-${nuevoIndex}`
      ).firstChild;
      let nombre = nombreInp.value.trim();
      if (nombre.length > 0) {
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      } else nombre = "sin nombre";
      const tipoSel = document.getElementById(
        `newTip-${nuevoIndex}`
      ).firstChild;
      const tipo = tipoSel.value;

      const nuevoMP = new MedioPago(id, nombre, tipo, isVisible, false);
      mediosPago.push(nuevoMP);
    });
  }
  localStorage.setItem("mediosDePago", JSON.stringify(mediosPago));
  editarMedioPago();
}
