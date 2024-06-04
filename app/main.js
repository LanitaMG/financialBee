import { showHome } from "./modules/v_home.js";
export let movImportados = []


// Home
window.addEventListener("DOMContentLoaded", () => {
    cargarMovimientos()
    Swal.fire({
        title: '¡Bienvenido a Financial Bee!',
        text: 'La app que te ayudará a administrar tu presupuesto personal. En esta demo te mostraremos las configuraciones básicas para que empieces a registrar tus ingresos y gastos.',
        confirmButtonText: 'Empezar'
    })
        .then((willConfirm) => {
            showHome()
        })
});



async function cargarMovimientos() {
    try {
        const response = await fetch('movimientos.json');
        let movimientosJson = await response.json();
        iniciarValores(movimientosJson)

        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }

    } catch (error) {
        console.error('Error al cargar el archivo:', error.message);
    }

}

function iniciarValores(arrJson) {
    localStorage.setItem("movimientos", JSON.stringify(arrJson));
    movImportados = JSON.parse(localStorage.getItem("movimientos")) || ["nadaporaqui"]



}
