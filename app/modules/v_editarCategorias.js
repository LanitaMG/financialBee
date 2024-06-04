import { mainSection, showHome } from "./v_home.js";
import { categorias, Categoria, tiposDeCategoria, actualizarCategorias } from "./d_categorias.js";
import { tiposDeMovimiento } from "./d_movimientos.js";
import {
  limpiarMainSection, crearEncabezado, crearAgregarBtn, crearSelectOption, crearCheckbox, crearGuardarSalirBtn,
  guardarAlert,
} from "./functions.js";

let eliminar = [];
let agregar = [];
let tipoMovSeleccionado = tiposDeMovimiento[0];
const seccionCat = "cat";
let cambiosRealizados = false

export function editarCategorias() {
  limpiarMainSection();
  // inicializarCategorias();
  const encabezado = crearEncabezado(seccionCat);
  const filtrosBtns = crearFiltrosTipoMov();
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
        <p id="mensajeError" class"text-danger"></p>
        ${guardarSalirBtn}
        <p id="mensajeGuardar"></p>
     </section>
     `;
  mainSection.appendChild(sectionEditarCategorias);
  crearEventListeners();
}

function inicializarCategorias() {
  eliminar = [];
  agregar = [];
  cambiosRealizados = false
  if (localStorage.getItem("categorias")) {
    actualizarCategorias();
  } else {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }
  console.log(cambiosRealizados);
}

function crearFiltrosTipoMov() {
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
        ocultar = `class = "d-none"`;
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
  document.addEventListener("DOMContentLoaded", inicializarCategorias())
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

  document
    .getElementById("salircatBtn")
    .addEventListener("click", verificarSalir);

  document
    .getElementById("guardarcatBtn")
    .addEventListener("click", guardarCambiosCat);

  document
    .getElementById("filtrosMenu")
    .addEventListener("click", cambiarTipoMov);

  document.addEventListener("input", () => cambiosRealizados = true)
}

function eliminarCategoria(event) {

  let index = event.target.id.replace("del-", "");
  eliminar.push(parseInt(index));
  document.getElementById(`cat-${index}`).style.display = "none";
  guardarAlert(seccionCat);
  document.getElementById("mensajeGuardar").textContent = ""
  cambiosRealizados = true
}

function agregarNuevaCategoria() {
  const indexNew = agregar.length;
  const fila = document.createElement("tr");
  fila.id = `newCat-${indexNew}`;
  fila.innerHTML = `               
                    <td id="newVis-${indexNew}">${crearCheckbox(true)}</td>
                    <td id="newNom-${indexNew}"><input class="form-input editable" placeholder="¿nombre?"></td>
                    <td id="newTip-${indexNew}">
                        <select class="form-select form-select-sm editable">${crearSelectOption(
    tiposDeCategoria,
    ""
  )}</select></td>
                    <td>nuevo</td>`;
  document.getElementById("listBody").appendChild(fila);
  agregar.push(indexNew);
  guardarAlert(seccionCat);
  document.getElementById("mensajeGuardar").textContent = ""
  cambiosRealizados = true
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


function cambiarTipoMov(event) {
  if (cambiosRealizados) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se perderán los cambios realizados. ¿Desea continuar?",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Continuar`,
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        aplicarFiltros(event)
        cambiosRealizados = false
      }
    })
  }
  else {
    aplicarFiltros(event)
    cambiosRealizados = false
  }
}

function guardarCambiosCat() {
  const mensajeGuardar = verificarModificaciones()
  Swal.fire({
    title: "¿Estás seguro?",
    html: `${mensajeGuardar}`,
    icon: "warning",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: `Guardar`,
    denyButtonText: `Cancelar`
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        aplicarModificaciones()
        agregarElementos()
        eliminarElementos()
        localStorage.setItem("categorias", JSON.stringify(categorias));
        Swal.fire("¡Cambios guardados!").then(() => {
          editarCategorias();
          cambiosRealizados = false

        })
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Algo salió mal",
          text: "Por favor revisa los datos ingresados",
          icon: "error",
          confirmButtonText: "Aceptar",
        })
      }
    }
    else {
      eliminar.forEach(index => {
        document.getElementById(`cat-${index}`).style.display = "table-row";
      });
      editarCategorias();
    }
  })
}

function verificarModificaciones() {
  // Verificar modificaciones
  let mod = 0
  categorias.forEach((categoria, index) => {
    if (!categoria.isDeleted) {
      const check = document.getElementById(`isVis-${index}`).firstChild;
      const selOpt = document.getElementById(`tip-${index}`).firstChild;
      if (categoria.isVisible !== check.checked || categoria.tipoCategoria !== selOpt.value) {
        mod += 1

      }
    }
  })
  return `<p>Se guardarán las siguentes ediciones: </p>
                          <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between align-items-center border-0">
                              Categorías modificadas
                              <span class="badge bg-dark rounded-pill">${mod}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center border-0">
                              Categorías agregadas
                              <span class="badge bg-dark rounded-pill">${agregar.length}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center border-0">
                              Categorías eliminadas
                              <span class="badge bg-dark rounded-pill">${eliminar.length}</span>
                            </li>
                         </ul> 
                         <p class="small">Los registros eliminados no podrán ser recuperados.</p> `


}

function aplicarModificaciones() {
  // Guardar modificaciones en los inputs de las categorías existentes
  categorias.forEach((categoria, index) => {
    if (!categoria.isDeleted) {
      const check = document.getElementById(`isVis-${index}`).firstChild;
      if (categoria.isVisible !== check.checked) {
        categoria.isVisible = check.checked
      };
      const selOpt = document.getElementById(`tip-${index}`).firstChild;
      if (categoria.tipoCategoria !== selOpt.value) {
        categoria.tipoCategoria = selOpt.value;
      }
    }
  })
}

function agregarElementos() {
  // Agregar nuevas categorías
  if (agregar.length > 0) {
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
    });
  }

}


function eliminarElementos() {
  if (eliminar.length > 0) {
    eliminar.forEach((catIndex) => {
      categorias[catIndex].isDeleted = true;
    });
  }
}


function verificarSalir() {
  if (cambiosRealizados) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se perderán los cambios realizados. ¿Desea continuar?",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Continuar`,
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        showHome()
      }
    })
  }
  else {
    showHome()
  }
}
