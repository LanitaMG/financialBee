// Variables

import { mainSection } from "./v_home.js";


// Limpiar el main antes de cargar una nueva Section
export function limpiarMainSection() {
  const mainHijos = mainSection.children;
  for (let index = 0; index < mainHijos.length; index++) {
    mainHijos[index].remove();

  }
}



// Crea los encabezados y descripciones de cada sección
export function crearEncabezado(seccion) {
  let titulo = ``;
  let parrafo = ``;
  switch (seccion) {
    case "mdp":
      titulo = "Medios de Pago";
      parrafo =
        "Configura los medios de pago que utilizas. Puedes eliminar o esconder de los listados desplegables aquellos que no utilices.";
      break;
    case "cat":
      titulo = "Categorías";
      parrafo =
        "Organiza por categorías todos tus movimientos financieros. De esta forma podrás analizar qué ocurre con tu dinero.";
      break;
    case "agm":
      titulo = "Agregar movimientos";
      parrafo =
        "Por favor ingresa los datos de tus movimientos financieros. Presta atención porque este formulario no está validado.";
      break;
    case "mov":
      titulo = "Ver movimientos";
      parrafo =
        "Aquí están los movimientos financieros que cargaste. En un futuro te prometo que podrás editarlos.";
      break;

    default:
      break;
  }
  const encabezado = `<h2>${titulo}</h2>
                        <p>${parrafo}</p>`;
  return encabezado;
}


// Crea el botón Agregar para las secciones Editar Medios de Pago y Editar Categorías
export function crearAgregarBtn(seccion) {
  let texto = `Agregar `;
  const agregarBtn = `
            <div class="m-3 text-end">
              <button id="agregar${seccion}Btn" class="btn btn-sm btn-warning p-2">
              ${texto} <i class="bi bi-plus-circle"></i>
            </button>
            </div>`;

  return agregarBtn;
}


// Crea los botones Salir y Guardar utilizados en las secciones de edición
export function crearGuardarSalirBtn(seccion) {
  const btns = `
            <div class="row w-75 mx-auto">
                <button id="guardar${seccion}Btn" class="col btn btn-warning m-3 p-2">Guardar</button>
                <button id="salir${seccion}Btn" class="col btn btn-dark m-3 p-2">Salir</button>
            </div>
  `;
  return btns;
}


// Crea las opciones desplegadas en un select a partir de un array
export function crearSelectOption(arr, selOption) {
  let options = ``;
  arr.forEach((elemento) => {
    let sel = ``;
    if (elemento === selOption) {
      sel = `selected`;
    }
    options += `<option value="${elemento}" ${sel}>${elemento}</option>`;
  });
  return options;
}


// Crea los checkbox en los listados editables
export function crearCheckbox(chk) {
  let vis = "";
  if (chk) {
    vis = "checked";
  }
  const check = `<input type="checkbox" class="form-check-input editable" ${vis}></input>  `;
  return check;
}


// Debería habilitar el botón Guardar cuando se efectúa una modificación.
// No se logró aplicar correctamente ante cambios en los input, así que solamente cambia el color con Agregar o Eliminar
export function guardarAlert(seccion) {
  const btnGuardar = document.getElementById(`guardar${seccion}Btn`);
  btnGuardar.classList += "border border-dark"
}