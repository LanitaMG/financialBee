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
        "Por favor ingresa los datos de tus movimientos financieros";
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



const BalanceDatos = [
  { "mes": "Enero 2023", "ingresos": 559460, "ingresosFijosP": "75%", "ingresosVariablesP": "25%", "egresos": 621780, "egresosFijosP": "52%", "egresosVariablesP": "48%", },
  { "mes": "Febrero 2023", "ingresos": 543891, "ingresosFijosP": "82%", "ingresosVariablesP": "18%", "egresos": 592045, "egresosFijosP": "53%", "egresosVariablesP": "47%", },
  { "mes": "Marzo 2023", "ingresos": 548137, "ingresosFijosP": "75%", "ingresosVariablesP": "25%", "egresos": 570059, "egresosFijosP": "57%", "egresosVariablesP": "43%", },
  { "mes": "Abril 2023", "ingresos": 626440, "ingresosFijosP": "80%", "ingresosVariablesP": "20%", "egresos": 361216, "egresosFijosP": "88%", "egresosVariablesP": "12%", },
  { "mes": "Mayo 2023", "ingresos": 547607, "ingresosFijosP": "83%", "ingresosVariablesP": "17%", "egresos": 572661, "egresosFijosP": "58%", "egresosVariablesP": "42%", },
  { "mes": "Junio 2023", "ingresos": 539023, "ingresosFijosP": "76%", "ingresosVariablesP": "24%", "egresos": 639513, "egresosFijosP": "53%", "egresosVariablesP": "47%", },
  { "mes": "Julio 2023", "ingresos": 652981, "ingresosFijosP": "78%", "ingresosVariablesP": "22%", "egresos": 372206, "egresosFijosP": "92%", "egresosVariablesP": "8%", },
  { "mes": "Agosto 2023", "ingresos": 617612, "ingresosFijosP": "81%", "ingresosVariablesP": "19%", "egresos": 441831, "egresosFijosP": "78%", "egresosVariablesP": "22%", },
  { "mes": "Septiembre 2023", "ingresos": 595739, "ingresosFijosP": "90%", "ingresosVariablesP": "10%", "egresos": 610613, "egresosFijosP": "52%", "egresosVariablesP": "48%", },
  { "mes": "Octubre 2023", "ingresos": 532557, "ingresosFijosP": "82%", "ingresosVariablesP": "18%", "egresos": 641276, "egresosFijosP": "48%", "egresosVariablesP": "52%", },
  { "mes": "Noviembre 2023", "ingresos": 585176, "ingresosFijosP": "82%", "ingresosVariablesP": "18%", "egresos": 577039, "egresosFijosP": "59%", "egresosVariablesP": "41%", },
  { "mes": "Diciembre 2023", "ingresos": 600373, "ingresosFijosP": "78%", "ingresosVariablesP": "22%", "egresos": 604378, "egresosFijosP": "57%", "egresosVariablesP": "43%", },
  { "mes": "Enero 2024", "ingresos": 655822, "ingresosFijosP": "80%", "ingresosVariablesP": "20%", "egresos": 616406, "egresosFijosP": "51%", "egresosVariablesP": "49%", },
  { "mes": "Febrero 2024", "ingresos": 528652, "ingresosFijosP": "88%", "ingresosVariablesP": "12%", "egresos": 593631, "egresosFijosP": "54%", "egresosVariablesP": "46%", },
  { "mes": "Marzo 2024", "ingresos": 626853, "ingresosFijosP": "82%", "ingresosVariablesP": "18%", "egresos": 363026, "egresosFijosP": "94%", "egresosVariablesP": "6%", },
  { "mes": "Abril 2024", "ingresos": 634349, "ingresosFijosP": "77%", "ingresosVariablesP": "23%", "egresos": 389633, "egresosFijosP": "81%", "egresosVariablesP": "19%", },
  { "mes": "Mayo 2024", "ingresos": 662808, "ingresosFijosP": "82%", "ingresosVariablesP": "18%", "egresos": 380807, "egresosFijosP": "92%", "egresosVariablesP": "8%", },
  { "mes": "Junio 2024", "ingresos": 664709, "ingresosFijosP": "81%", "ingresosVariablesP": "19%", "egresos": 484359, "egresosFijosP": "65%", "egresosVariablesP": "35%", },
  { "mes": "Julio 2024", "ingresos": 589826, "ingresosFijosP": "77%", "ingresosVariablesP": "23%", "egresos": 595049, "egresosFijosP": "54%", "egresosVariablesP": "46%", },
  { "mes": "Agosto 2024", "ingresos": 653511, "ingresosFijosP": "81%", "ingresosVariablesP": "19%", "egresos": 538513, "egresosFijosP": "62%", "egresosVariablesP": "38%", },
  { "mes": "Septiembre 2024", "ingresos": 519604, "ingresosFijosP": "83%", "ingresosVariablesP": "17%", "egresos": 414583, "egresosFijosP": "76%", "egresosVariablesP": "24%", },
  { "mes": "Octubre 2024", "ingresos": 556597, "ingresosFijosP": "77%", "ingresosVariablesP": "23%", "egresos": 440559, "egresosFijosP": "70%", "egresosVariablesP": "30%", },
  { "mes": "Noviembre 2024", "ingresos": 568324, "ingresosFijosP": "83%", "ingresosVariablesP": "17%", "egresos": 655365, "egresosFijosP": "50%", "egresosVariablesP": "50%", },
  { "mes": "Diciembre 2024", "ingresos": 486936, "ingresosFijosP": "83%", "ingresosVariablesP": "17%", "egresos": 358909, "egresosFijosP": "94%", "egresosVariablesP": "6%", }
]