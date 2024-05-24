// Importar navegación de meses
import { MesAnio, navMesAnio, indiceMesActual } from "./variables.js";
import { editarMedioPago } from "./editarMediosDePago.js";
const mainSection = document.querySelector("#main");

// Home
export function showHome() {
  console.table(navMesAnio)
  const mesActual = navMesAnio[indiceMesActual()].mesAnio;
  const mesAnterior = navMesAnio[indiceMesActual() - 1].mes;
  const mesSiguiente = navMesAnio[indiceMesActual() + 1].mes;


  const home = document.createElement("div");
  home.id = "home";
  home.innerHTML = `  <div id="home">

      <section class="m-3 mx-auto" style="max-width: 720px">
        <div class="p-4 rounded shadow">
          <div id="navMes" class="row mb-2 p-2 border-top border-bottom bg-dark rounded">
          <div class="col text-start text-decoration-none text-light">
          <i id="irMesAnterior" class="navMes bi bi-arrow-left-circle"></i>
            <span id ="mesAnterior" >
              ${mesAnterior}</span>
        </div>
            <span id ="mesActual" class="col text-center text-decoration-none text-light">${mesActual}</span>
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
                  <h5 class="card-title fs-2 lh-lg">$ 950.000</h5>
                  <div>
                    <div class="progress">
                      <div class="progress-bar bg-secondary" role="progressbar" aria-label="Fijo" style="width: 45%"
                        aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                      <div class="progress-bar bg-dark" role="progressbar" aria-label="Variable" style="width: 55%"
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
                  <h5 class="card-title fs-2 lh-lg">$ 950.000</h5>
                  <div>
                    <div class="progress">
                      <div class="progress-bar bg-secondary" role="progressbar" aria-label="Fijo" style="width: 45%"
                        aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                      <div class="progress-bar bg-dark" role="progressbar" aria-label="Variable" style="width: 55%"
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

      <section>
        <div class="text-center m-4">
          <button id="addMovBtn" class="btn btn-warning mx-auto m-5 px-5 py-3">
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
            <button id="edCategories" class="col btn btn-white border rounded m-3 p-3">
              <i class="bi bi-tags"></i>
                Editar Categorías
            </button>
          </div>
      </section>
    </div>
    </div>`

  mainSection.appendChild(home);
  document.getElementById("navMes").addEventListener("click", cambiarMes)
  document.getElementById("edMedioPago").addEventListener("click", editarMedioPago)


}


export function cambiarMes(event) {
  const idMesActual = navMesAnio.findIndex(navMesAnio => navMesAnio.mesAnio === document.getElementById("mesActual").innerText)
  if (event.target.id == "irMesAnterior") {
    switch (idMesActual) {
      case 1:
        document.getElementById("mesActual").innerText = navMesAnio[idMesActual - 1].mesAnio;
        document.getElementById("mesSiguiente").innerText = navMesAnio[idMesActual].mes;
        document.getElementById("mesAnterior").innerText = "";
        break;
      case 0:
        break;
      default:
        document.getElementById("mesActual").innerText = navMesAnio[idMesActual - 1].mesAnio;
        document.getElementById("mesSiguiente").innerText = navMesAnio[idMesActual].mes;
        document.getElementById("mesAnterior").innerText = navMesAnio[idMesActual - 2].mes;
        break;
    }
  }
  if (event.target.id == "irMesSiguiente") {
    switch (idMesActual) {
      case 34:
        document.getElementById("mesActual").innerText = navMesAnio[idMesActual + 1].mesAnio;
        document.getElementById("mesAnterior").innerText = navMesAnio[idMesActual].mes;
        document.getElementById("mesSiguiente").innerText = "";
        break;

      case 35:
        break;

      default:
        document.getElementById("mesActual").innerText = navMesAnio[idMesActual + 1].mesAnio;
        document.getElementById("mesAnterior").innerText = navMesAnio[idMesActual].mes;
        document.getElementById("mesSiguiente").innerText = navMesAnio[idMesActual + 2].mes;
        break;
    }
  }
}


function selectOptions(arr) {
  const select = document.createElement('select');
  arr.forEach((elemento) => {
    const opcion = document.createElement('option');
    opcion.value = elemento; // El valor de la opción será igual al elemento
    opcion.textContent = elemento; // El texto visible de la opción también será igual al elemento
    select.appendChild(opcion); // Agrega la opción al select
  });
  return select;
}
