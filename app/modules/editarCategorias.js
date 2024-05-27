import { mainSection } from "./variables.js";
import {
  categorias,
  Categoria,
  tiposDeCategoria,
  tiposDeMovimiento,
  actualizarCategorias,
} from "./categorias.js";

import {
  limpiarMainSection,
  crearEncabezado,
  crearAgregarBtn,
  crearSelectOption,
  crearCheckbox,
  crearGuardarSalirBtn,
  guardarAlert,
} from "./functions.js";

import { showHome } from "./home.js";

let eliminar = [];
let agregar = [];
let tipoMovSeleccionado = tiposDeMovimiento[0];
const seccionCat = "cat";

export function editarCategorias() {
  limpiarMainSection();
  inicializarCategorias();
  const encabezado = crearEncabezado(seccionCat);
  const filtrosBtns = crearFiltros();
  const tabla = crearTablaCat(tiposDeMovimiento[0]);

  const agregarBtn = crearAgregarBtn(seccionCat);
  const guardarSalirBtn = crearGuardarSalirBtn(seccionCat);
  const sectionEditarCategorias = document.createElement("section");
  sectionEditarCategorias.id = "sectionCategoria";
  sectionEditarCategorias.innerHTML = `
     <section class="m-3 text-center shadow  rounded mx-auto p-5" style="max-width: 768px">
        ${encabezado}
        ${filtrosBtns}
        ${tabla}
        ${agregarBtn}
        ${guardarSalirBtn}
     </section>
     `;
  mainSection.appendChild(sectionEditarCategorias);
  crearEventListeners();
}

function inicializarCategorias() {
  eliminar = [];
  agregar = [];
  if (localStorage.getItem("categorias")) {
    actualizarCategorias();
  } else {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }
}

function crearFiltros() {
  let filtros = "";
  tiposDeMovimiento.forEach((tipoMovimiento) => {
    const filtro = `
          <input type="radio" name="cat" class="btn-check" id="${tipoMovimiento}" autocomplete="off">
          <label class="btn btn-outline-warning" for="${tipoMovimiento}">${tipoMovimiento}</label>
          
          `;
    filtros += filtro;
  });
  const divFiltros = `<div id="filtrosMenu" class="btn-group" role="group">
          ${filtros}
          </div>`;
  return divFiltros;
}

function crearTablaCat(tipoMovimiento) {
  const encabezado = `<thead>
                     <tr>
                         <th>Mostrar</th>
                         <th>Categoría</th>
                         <th>Tipo</th>
                         <th>Eliminar</th>
                     </tr>
                 </thead>`;
  const lista = crearListaCat(tipoMovimiento);
  const tabla = `
            <table id="list" class="table text-center">
            ${encabezado}
            ${lista}
            </table>
  `;
  return tabla;
}

function crearListaCat(tipoMovimiento) {
  let filas = "";
  categorias.forEach((categoria, index) => {
    if (!categoria.isDeleted) {
      const check = crearCheckbox(categoria.isVisible);
      const selectTipo = crearSelectOption(
        tiposDeCategoria,
        categoria.tipoCategoria
      );
      let ocultar = "";
      if (categoria.tipoMovimiento !== tipoMovimiento) {
        ocultar = "class = d-none";
      }

      const fila = `
                <tr id="cat-${index}" ${ocultar}>
                    <td id="isVis-${index}">${check}</td>
                    <td id="nom-${index}">${categoria.nombre}</td>
                    <td id="tip-${index}"><select class="form-select form-select-sm editable">${selectTipo}</select></td>
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
  categorias.forEach((element, index) => {
    if (!element.isDeleted) {
      if (document.getElementById(`del-${index}`)) {
        document
          .getElementById(`del-${index}`)
          .addEventListener("click", eliminarCategoria);
      }
    }
  });

  document
    .getElementById("agregarcatBtn")
    .addEventListener("click", agregarNuevaCategoria);
  document.getElementById("salircatBtn").addEventListener("click", showHome);

  document
    .getElementById("guardarcatBtn")
    .addEventListener("click", guardarCambiosCat);

  document
    .getElementById("filtrosMenu")
    .addEventListener("click", aplicarFiltros);

  //   const camposEditables = document.getElementsByClassName("editable");
  //   for (let index = 0; index < camposEditables.length; index++) {
  //     camposEditables[index].addEventListener("input", guardarAlert(seccionCat));
  //   }
}

function eliminarCategoria(event) {
  console.log("eliminar categoria ok");
  let index = event.target.id.replace("del-", "");
  eliminar.push(parseInt(index));
  document.getElementById(`cat-${index}`).style.display = "none";
  guardarAlert(seccionCat);
}

function agregarNuevaCategoria() {
  console.log("agregar nueva categoria ok");
  const indexNew = agregar.length;
  const fila = document.createElement("tr");
  fila.id = `newCat-${indexNew}`;
  fila.innerHTML = `               
                    <td id="newVis-${indexNew}">${crearCheckbox(true)}</td>
                    <td id="newNom-${indexNew}"><input class="form-input editable"></td>
                    <td id="newTip-${indexNew}">
                        <select class="form-select form-select-sm editable">${crearSelectOption(
                          tiposDeCategoria,
                          ""
                        )}</select></td>
                    <td>nuevo</td>`;
  document.getElementById("listBody").appendChild(fila);
  agregar.push(indexNew);
  guardarAlert(seccionCat);
}

function aplicarFiltros(event) {
  tipoMovSeleccionado = event.target.id;
  const encabezado = `<thead>
                     <tr>
                         <th>Mostrar</th>
                         <th>Categoría</th>
                         <th>Tipo</th>
                         <th>Eliminar</th>
                     </tr>
                 </thead>`;
  const lista = crearListaCat(tipoMovSeleccionado);
  document.getElementById("list").innerHTML = `${encabezado} ${lista} `;
  crearEventListeners();
}

function guardarCambiosCat() {
  categorias.forEach((categoria, index) => {
    if (!categoria.isDeleted) {
      const check = document.getElementById(`isVis-${index}`).firstChild;
      categoria.isVisible = check.checked;
      const selOpt = document.getElementById(`tip-${index}`).firstChild;
      categoria.tipoCategoria = selOpt.value;
    }
  });

  if (eliminar.length > 0) {
    eliminar.forEach((catIndex) => {
      console.log(catIndex);
      categorias[catIndex].isDeleted = true;
    });
  }
  if (agregar.length > 0) {
    console.table(agregar);
    agregar.forEach((nuevoIndex) => {
      const isVisibleCh = document.getElementById(
        `newVis-${nuevoIndex}`
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
      const tipoCategoria = tipoSel.value;
      const tipoMovimiento = tipoMovSeleccionado;

      const nuevaCat = new Categoria(
        nombre,
        tipoMovimiento,
        tipoCategoria,
        isVisible,
        false
      );
      categorias.push(nuevaCat);

      console.log(nuevaCat);
      console.log(categorias);
    });
  }
  localStorage.setItem("categorias", JSON.stringify(categorias));
  editarCategorias();
}
