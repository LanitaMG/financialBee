
import { editarMedioPago } from "./v_editarMediosDePago.js";
import { editarCategorias } from "./v_editarCategorias.js";
import { agregarMovimiento } from "./v_agregarMovimiento.js";
import { verMovimientos } from "./v_verMovimientos.js";
import { limpiarMainSection } from "./functions.js";

export const mainSection = document.getElementById("main");

// Home
export function showHome() {
  limpiarMainSection()
  const home = document.createElement("div");
  home.id = "home";
  home.innerHTML = `  
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

}
