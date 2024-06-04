import { mainSection, showHome } from "./v_home.js";
import { tiposMedioPago, MedioPago, mediosPago, actualizarMediosPago } from "./d_mediosDePago.js";
import { limpiarMainSection, crearEncabezado, crearAgregarBtn, crearSelectOption, crearCheckbox, crearGuardarSalirBtn, guardarAlert } from "./functions.js";


let eliminar = [];
let agregar = [];
const seccionMDP = "mdp";
let cambiosRealizados = false


export function editarMedioPago() {
  limpiarMainSection();
  // inicializarMP();
  const encabezado = crearEncabezado(seccionMDP);
  const tabla = crearTablaMDP();
  const agregarBtn = crearAgregarBtn(seccionMDP);
  const guardarSalirBtn = crearGuardarSalirBtn(seccionMDP);
  const sectionEditarMediosPago = document.createElement("section");
  sectionEditarMediosPago.id = "sectionMediosDePago";
  sectionEditarMediosPago.innerHTML = `
  <div class="m-3 text-center shadow  rounded mx-auto p-5" style="max-width: 768px">
  ${encabezado}
  ${tabla}
  ${agregarBtn}
  <p id="mensajeError" class"text-danger"></p>
  ${guardarSalirBtn}
  <p id="mensajeGuardar"></p>
  </div>
  `;
  mainSection.appendChild(sectionEditarMediosPago);
  crearEventListeners();
}

function inicializarMP() {
  cambiosRealizados = false
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
  document
    .addEventListener("DOMContentLoaded", inicializarMP)

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

  document
    .getElementById("salirmdpBtn")
    .addEventListener("click", verificarSalir);

  document
    .getElementById("guardarmdpBtn")
    .addEventListener("click", guardarCambiosMP);

  document
    .addEventListener("input", () => cambiosRealizados = true)
}

function agregarNuevoMedio() {
  const indexNew = agregar.length;
  const fila = document.createElement("tr");
  fila.id = `newMP-${indexNew}`;
  fila.innerHTML = `               
      <td id="newVis-${indexNew}">${crearCheckbox(true)}</td>
      <td id="newNom-${indexNew}"><input class="form-input" placeholder="¿nombre?"></td>
      <td id="newTip-${indexNew}"><select class="form-select form-select-sm">${crearSelectOption(
    tiposMedioPago, "")}</select></td>
      <td><span class="badge bg-warning text-wrap" style="width: rem;">Nuevo</span></td>
      `;
  document.getElementById("listBody").appendChild(fila);
  agregar.push(indexNew);
  document.getElementById("mensajeGuardar").textContent = ""
  guardarAlert(seccionMDP);
  cambiosRealizados = true;

}

function eliminarMedioPago(event) {
  guardarAlert(seccionMDP)
  document.getElementById("mensajeGuardar").textContent = ""
  let index = event.target.id.replace("del-", "");
  eliminar.push(parseInt(index));
  document.getElementById(`mdp-${index}`).style.display = "none";
  cambiosRealizados = true
}

function guardarCambiosMP() {
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
        localStorage.setItem("mediosDePago", JSON.stringify(mediosPago));
        Swal.fire("¡Cambios guardados!").then(() => {
          editarMedioPago();
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
        document.getElementById(`mdp-${index}`).style.display = "table-row";
      });
      editarMedioPago();
    }
  })
}



function verificarModificaciones() {
  // Verificar modificaciones
  let mod = 0
  mediosPago.forEach((medio, index) => {
    if (!medio.isDeleted) {
      const check = document.getElementById(`isVis-${index}`).firstChild;
      const selOpt = document.getElementById(`tip-${index}`).firstChild;
      if (medio.isVisible !== check.checked || medio.tipo !== selOpt.value) {
        mod += 1
      }
    }
  })
  return `<p>Se guardarán las siguentes ediciones: </p>
                          <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between align-items-center border-0">
                              Medios de pago modificados
                              <span class="badge bg-dark rounded-pill">${mod}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center border-0">
                              Medios de pago agregados
                              <span class="badge bg-dark rounded-pill">${agregar.length}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center border-0">
                              Medios de pago eliminados
                              <span class="badge bg-dark rounded-pill">${eliminar.length}</span>
                            </li>
                         </ul> 
                         <p class="small">Los registros eliminados no podrán ser recuperados.</p> `
}





function aplicarModificaciones() {
  // Guardar las modificaciones ingresada en los inputs de medios existentes
  mediosPago.forEach((medio, index) => {
    if (!medio.isDeleted) {
      const check = document.getElementById(`isVis-${index}`).firstChild;
      medio.isVisible = check.checked;
      const selOpt = document.getElementById(`tip-${index}`).firstChild;
      medio.tipo = selOpt.value;
    }
  });

}

function eliminarElementos() {
  // Eliminar medios
  if (eliminar.length > 0) {
    eliminar.forEach((medioIndex) => {
      mediosPago[medioIndex].isDeleted = true;
    });
  }
}

function agregarElementos() {
  // Agregar nuevos medios
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