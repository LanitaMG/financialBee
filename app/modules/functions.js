// Variables

import { mainSection } from "./variables.js";

export function limpiarMainSection() {
  console.log(mainSection);
  const mainHijos = mainSection.children;
  console.log(mainHijos.length);
  if (mainHijos.length > 0) {
    mainSection.removeChild(mainSection.firstChild);
  }
}

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

    default:
      break;
  }
  const encabezado = `<h2>${titulo}</h2>
                        <p>${parrafo}</p>`;
  return encabezado;
}

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

export function crearGuardarSalirBtn(seccion) {
  const btns = `
            <div class="row w-75 mx-auto">
                <button id="guardar${seccion}Btn" class="col btn btn-dark m-3 p-2">Guardar</button>
                <button id="salir${seccion}Btn" class="col btn btn-dark m-3 p-2">Salir</button>
            </div>
  `;
  return btns;
}

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

export function crearCheckbox(chk) {
  let vis = "";
  if (chk) {
    vis = "checked";
  }
  const check = `<input type="checkbox" class="form-check-input editable" ${vis}></input>  `;
  return check;
}

export function guardarAlert(seccion) {
  const btnGuardar = document.getElementById(`guardar${seccion}Btn`);
  let claseActual = btnGuardar.classList.value;
  btnGuardar.classList.value = claseActual.replace("dark", "warning");
}
