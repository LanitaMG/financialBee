
import { editarMedioPago } from "./v_editarMediosDePago.js";
import { editarCategorias } from "./v_editarCategorias.js";
import { agregarMovimiento } from "./v_agregarMovimiento.js";
import { verMovimientos } from "./v_verMovimientos.js";
import { limpiarMainSection, balanceDatos, formatoMoneda } from "./functions.js";

export const mainSection = document.getElementById("main");
let indiceBalance = indiceMesActual()
// Home
export function showHome() {
  limpiarMainSection()
  const home = document.createElement("div");
  home.id = "home";
  home.innerHTML = `  
        <section id="sectionBalance" class="m-3 mx-auto" style="max-width: 720px">
        ${crearBalanceMovimientos(indiceBalance)}
        </section>
        <section>
          <div class="text-center m-3">
            <button id="agregarMovBtn" class="btn btn-warning mx-auto m-5 px-5 py-3">
              Agregar movimientos
            <i class="bi bi-pencil-square"></i></button>
          </div>
        </section>
        <section>
            <div class="text-center m-3">
              <button id="verMovBtn" class="btn btn-warning mx-auto m-5 px-5 py-3">
                  Ver movimientos
                  <i class="bi bi-search"></i></button>
            </div>
        </section>
        <section>
            <div class="m-3 text-center shadow  rounded mx-auto " style="max-width: 720px">
              <h3 class="p-2">Personalización</h3>
              <div class="row p-3">
                <button id="edMedioPago" class="col btn btn-white border rounded m-3 p-3">
                  <i class="bi bi-wallet2"></i>
                    Editar Medios de Pago
                </button>
                <button id="edCategorias" class="col btn btn-white border rounded m-3 p-3">
                  <i class="bi bi-tags"></i>
                    Editar Categorías
                </button>
              </div>
          </section>
    `;

  mainSection.appendChild(home);

  document
    .getElementById("edMedioPago")
    .addEventListener("click", editarMedioPago);
  document
    .getElementById("edCategorias")
    .addEventListener("click", editarCategorias);
  document
    .getElementById("agregarMovBtn")
    .addEventListener("click", agregarMovimiento);
  document
    .getElementById("verMovBtn")
    .addEventListener("click", verMovimientos);
  document
    .getElementById("volverHome")
    .addEventListener("click", showHome);

  document.getElementById("navMes")
    .addEventListener("click", actualizarBalance)
}

// Esta función debería recorrer el array de movimientos y generar dinámicamente los totales. En este momento funciona contra un array Demo.
function crearBalanceMovimientos(indice) {
  const mesActual = balanceDatos[indice].mes
  const mesAnterior = indice > 0 ? balanceDatos[indice - 1].mes : ""
  const mesSiguiente = indice < balanceDatos.length - 1 ? balanceDatos[indice + 1].mes : ""
  const totalIngresos = formatoMoneda(balanceDatos[indice].ingresos)
  const totalEgresos = formatoMoneda(balanceDatos[indice].egresos)
  const ingresoFijoRatio = balanceDatos[indice].ingresosFijosP
  const ingresoVariableRatio = balanceDatos[indice].ingresosVariableP
  const egresoFijoRatio = balanceDatos[indice].egresosFijosP
  const egresoVariableRatio = balanceDatos[indice].egresosVariableP

  const balance = `
  <section class="m-3 mx-auto" style="max-width: 720px">
  <div class="p-4 rounded shadow">
      <div id="navMes" class="row mb-2 p-2 border-top border-bottom bg-dark rounded">
        <div class="col text-start text-decoration-none text-light">
        <i id="irMesAnterior" class="navMes bi bi-arrow-left-circle"></i>
          <span id="mesAnterior" >
          ${mesAnterior}</span>
          </div>
        <span id="mesActual" class="col text-center text-decoration-none text-light">${mesActual}</span>
        <div class="col text-end text-decoration-none text-light">
        <span id="mesSiguiente">${mesSiguiente}</span>
        <i id="irMesSiguiente" class="navMes bi bi-arrow-right-circle"></i>
        </div>
        </div>

        <div class="row g-5">
        <div class="col">
          <div class="card text-center">
            <div class="card-header bg-success text-light">
              Ingresos
            </div>
            <div class="card-body">
            <h5 id="totalIngresos" class="card-title fs-2 lh-lg">${totalIngresos}</h5>
            <div>
              <div id="ingresoProgress" class="progress">
                 <div id="ingresoFijo" class="progress-bar bg-secondary" role="progressbar" aria-label="Fijo" style="width: ${ingresoFijoRatio}"
                  aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                 <div id="ingresoVariable" class="progress-bar bg-dark" role="progressbar" aria-label="Variable" style="width: ${ingresoVariableRatio}"
                  aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            <div class="row">
            <span class="px-5 text-start col form-text">Fijo</span>
            <span class="px-5 text-end col form-text">Variable</span>
            </div>
            </div>
            </div>
            </div>
            </div>

            <div class="col">
            <div class="card text-center">
            <div class="card-header bg-danger text-light">
            Egresos
            </div>
            <div class="card-body">
            <h5 id="totalEgresos" class="card-title fs-2 lh-lg">${totalEgresos}</h5>
            <div>
            <div id="egresoProgress" class="progress">
            <div id="egresoFijo" class="progress-bar bg-secondary" role="progressbar" aria-label="Fijo" style="width: ${egresoFijoRatio}"
            aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
            <div id="egresoVariable" class="progress-bar bg-dark" role="progressbar" aria-label="Variable" style="width: ${egresoVariableRatio}"
            aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="row">
            <span class="px-5 text-start col form-text">Fijo</span>
            <span class="px-5 text-end col form-text">Variable</span>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </section>
            `
  return balance
}

function indiceMesActual() {
  const mes = new Date().getMonth();
  const anio = new Date().getFullYear();
  return balanceDatos.findIndex(mesDatos => mesDatos.nroMes === mes && mesDatos.anio === anio);
}

function actualizarBalance(event) {
  const direccion = event.target.id
  switch (direccion) {
    case "irMesAnterior":
      indiceBalance -= 1

      break;
    case "irMesSiguiente":
      indiceBalance += 1
      break;
    default:
      break;
  }
  if (indiceBalance >= 0 && indiceBalance < balanceDatos.length) {
    document.getElementById("sectionBalance").innerHTML = crearBalanceMovimientos(indiceBalance)
    document.getElementById("navMes")
      .addEventListener("click", actualizarBalance)

  }
}