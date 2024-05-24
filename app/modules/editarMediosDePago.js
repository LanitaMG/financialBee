import { crearSelect } from "./variables.js";
import { tiposMedioPago, plazoPago, MedioPago, mediosPago } from "./mediosDePago.js";
const mainSection = document.querySelector("#main");


export function editarMedioPago() {
    console.log("estamos editandos");
    const sectionEditarMediosPago = document.createElement("section")
    sectionEditarMediosPago.id = "sectionMediosDePago"
    sectionEditarMediosPago.innerHTML = `

        <section class="m-3 text-center shadow  rounded mx-auto p-5" style="max-width: 768px">
            <h2>Editar Billeteras</h2>
            <div id="list" class="text-center">
                <div class="row bg-dark text-light p-1 ">
                    <div class="col-2 ">Mostrar</div>
                    <div class="col">Billetera</div>
                    <div class="col ">Tipo</div>
                    <div class="col-2 "></div>
                </div>
            </div>
            <div class="m-3 text-end">
                <button class="btn btn-sm btn-warning p-2">
                    Agregar billetera <i class="bi bi-plus-circle"></i>
                </button>
            </div>
            <div class="row w-75 mx-auto">
                <button class="col btn btn-dark m-3 p-2">Guardar</button>
                <button class="col btn btn-dark m-3 p-2">Salir</button>
            </div>
        </section>`
    mainSection.removeChild(mainSection.lastChild)
    mainSection.appendChild(sectionEditarMediosPago)


    mediosPago.forEach((medio, index) => {
        if (!medio.isDeleted) {
            let check = ""
            if (medio.isVisible) {
                check = `
                    <input type="checkbox" id="chb-${index}" class="form-check-input" checked></input>
      `
            } else {
                check = `
                    <input type="checkbox" class="form-check-input"></input>  `
            }

            const fila = document.createElement("div")
            fila.classList += "row p-1 border-bottom"
            fila.innerHTML = `               
                <div class="col-2">${check}</div>
                <div class="col">${medio.nombre}</div>
                <div class="col">${medio.tipo}</div>
                <div class="col-2"><i id="del-${index}" class="bi bi-trash3"></i></div>`

            document.getElementById("list").appendChild(fila)
        }
        document.getElementById(`del-${index}`).addEventListener("click", console.log("hola"))

    });

}