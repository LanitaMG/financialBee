// Importar navegación de meses
import { mainSection, navMesAnio, indiceMesActual } from "./variables.js";
import { editarMedioPago } from "./v_editarMediosDePago.js";
import { editarCategorias } from "./v_editarCategorias.js";
import { agregarMovimiento } from "./v_agregarMovimiento.js";
import { tiposDeMovimiento } from "./d_movimientos.js";
import { movImportados } from "../main.js";
import { categorias } from "./d_categorias.js";
import { limpiarMainSection } from "./functions.js";

// access DOM
const v_mesActual = document.getElementById("mesActual")
const v_mesAnterior = document.getElementById("mesAnterior")
const v_mesSiguiente = document.getElementById("mesSiguiente")
const v_totalEgresos = document.getElementById("totalEgresos")
const v_egresoProgress = document.getElementById("egresoProgress")
const v_totalIngresos = document.getElementById("totalIngresos")
const v_ingresoProgress = document.getElementById("ingresoProgress")


let totalEgresos, egresoFijoRatio, egresosVariableRatio
let totalIngresos, ingresoFijoRatio, ingresosVariableRatio
let mesActual = navMesAnio[indiceMesActual()].mesAnio;
let mesAnterior = navMesAnio[indiceMesActual() - 1].mes;
let mesSiguiente = navMesAnio[indiceMesActual() + 1].mes;

// Home
export function showHome() {

  const balance = crearBalanceMovimientos();

  const home = document.createElement("div");
  home.id = "home";
  home.innerHTML = `  <div id="home">
  ${balance}
      <section>
        <div class="text-center m-4">
          <button id="agregarMovBtn" class="btn btn-warning mx-auto m-5 px-5 py-3">
              Agregar movimientos
              <i class="bi bi-pencil-square"></i></button>
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
    </div>
    </div>`;

  mainSection.appendChild(home);
  document.getElementById("navMes").addEventListener("click", cambiarMes);
  document
    .getElementById("edMedioPago")
    .addEventListener("click", editarMedioPago);
  document
    .getElementById("edCategorias")
    .addEventListener("click", editarCategorias);
  document
    .getElementById("agregarMovBtn")
    .addEventListener("click", agregarMovimiento);
  calcularTotalesMensuales()
}


function crearBalanceMovimientos() {

  // calcular egresos
  const ingresos = calcularMontos("Ingreso")
  totalIngresos = ingresos[0]
  ingresoFijoRatio = ingresos[1]
  ingresosVariableRatio = ingresos[2]

  // calcular egresos
  const egresos = calcularMontos("Egreso")
  totalEgresos = egresos[0]
  egresoFijoRatio = egresos[1]
  egresosVariableRatio = egresos[2]

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
            <h5 id="totalIngresos" class="card-title fs-2 lh-lg">$ ${totalIngresos}</h5>
            <div>
              <div id="ingresoProgress" class="progress">
                 <div id="ingresoFijo" class="progress-bar bg-secondary" role="progressbar" aria-label="Fijo" style="width: ${ingresoFijoRatio}"
                  aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                 <div id="ingresoVariable" class="progress-bar bg-dark" role="progressbar" aria-label="Variable" style="width: ${ingresosVariableRatio}"
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
            <h5 id="totalEgresos" class="card-title fs-2 lh-lg">$ ${totalEgresos}</h5>
            <div>
            <div id="egresoProgress" class="progress">
            <div id="egresoFijo" class="progress-bar bg-secondary" role="progressbar" aria-label="Fijo" style="width: ${egresoFijoRatio}"
            aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
            <div id="egresoVariable" class="progress-bar bg-dark" role="progressbar" aria-label="Variable" style="width: ${egresosVariableRatio}"
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

// let totalEgresos, egresoFijoRatio, egresosVariableRatio
// let totalIgresos, ingresoFijoRatio, ingresosVariableRatio


function calcularTotalesMensuales() {
  console.log("totales mensuales");


};

function buscarCategoriaPorNombre(nombreBuscado) {
  const categoriaEncontrada = categorias.find(cat => cat.nombre === nombreBuscado);
  return categoriaEncontrada.tipoCategoria ? categoriaEncontrada.tipoCategoria : "No se encontró la categoría";
}

function calcularMontos(tipo) {
  let total = 0
  let fijo = 0
  let variable = 0

  let movimientosSel = movImportados.filter(mov => mov.tipoMovimiento == tipo)
  console.log("movSel", movimientosSel);
  movimientosSel.forEach(mov => {
    const [anio, mes, dia] = mov.fecha.split('-')
    if (parseInt(mes) == navMesAnio[indiceMesActual()].nroMes && parseInt(anio) == navMesAnio[indiceMesActual()].anio) {
      total += mov.monto
      if (buscarCategoriaPorNombre(mov.categoria) == "Fijo") {
        fijo += mov.monto
      } else {
        variable += mov.monto
      }
    }
  })

  const fijoRatio = Math.round((fijo / total) * 100)
  const variableRatio = Math.round((variable / total) * 100)

  return [total, `${fijoRatio}%`, `${variableRatio}%`]
}

export function cambiarMes(event) {
  // access DOM
  const v_mesActual = document.getElementById("mesActual")
  const v_mesAnterior = document.getElementById("mesAnterior")
  const v_mesSiguiente = document.getElementById("mesSiguiente")
  const v_totalEgresos = document.getElementById("totalEgresos")
  const v_egresoProgress = document.getElementById("egresoProgress")
  const v_totalIngresos = document.getElementById("totalIngresos")
  const v_ingresoProgress = document.getElementById("ingresoProgress")


  let idMesActual = navMesAnio.findIndex((navMesAnio) => navMesAnio.mesAnio === v_mesActual.innerText
  );

  if (event.target.id == "irMesAnterior") {
    switch (idMesActual) {
      case 1:
        v_mesActual.innerText = navMesAnio[idMesActual - 1].mesAnio;
        v_mesSiguiente.innerText = navMesAnio[idMesActual].mes;
        v_mesAnterior.innerText = "";
        idMesActual -= 1
        break;

      case 0:
        break;

      default:
        v_mesActual.innerText = navMesAnio[idMesActual - 1].mesAnio;
        v_mesSiguiente.innerText = navMesAnio[idMesActual].mes;
        v_mesAnterior.innerText = navMesAnio[idMesActual - 2].mes;
        idMesActual -= 1

        break;
    }
  }
  if (event.target.id == "irMesSiguiente") {
    switch (idMesActual) {
      case 34:
        v_mesActual.innerText = navMesAnio[idMesActual + 1].mesAnio;
        v_mesAnterior.innerText = navMesAnio[idMesActual].mes;
        v_mesSiguiente.innerText = "";
        idMesActual += 1

        break;

      case 35:
        break;

      default:
        v_mesActual.innerText = navMesAnio[idMesActual + 1].mesAnio;
        v_mesAnterior.innerText = navMesAnio[idMesActual].mes;
        v_mesSiguiente.innerText = navMesAnio[idMesActual + 2].mes;
        idMesActual += 1

        break;
    }
    console.log("mes actual", idMesActual);
  }


  const n_ingresos = calcularMontos("Ingreso")
  console.log(n_ingresos);
  v_totalIngresos.innerHTML = n_ingresos[0]
  v_ingresoProgress.innerHTML = `
      < div id = "ingresoFijo" class="progress-bar bg-secondary" role = "progressbar" aria - label="Fijo" style = "width: ${n_ingresos[1]}"
  aria - valuenow="45" aria - valuemin="0" aria - valuemax="100" ></div >
  <div id="ingresoVariable" class="progress-bar bg-dark" role="progressbar" aria-label="Variable" style="width: ${n_ingresos[2]}"
  aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
  `
  const n_egresos = calcularMontos("Egreso")

  v_totalEgresos.innerHTML = n_egresos[0]
  v_egresoProgress.innerHTML = `
      < div id = "ingresoFijo" class="progress-bar bg-secondary" role = "progressbar" aria - label="Fijo" style = "width: ${n_egresos[1]}"
  aria - valuenow="45" aria - valuemin="0" aria - valuemax="100" ></div >
  <div id="ingresoVariable" class="progress-bar bg-dark" role="progressbar" aria-label="Variable" style="width: ${n_egresos[2]}"
  aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
  `

}


