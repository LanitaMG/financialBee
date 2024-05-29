// import { movImportados } from "../main.js";
export const tiposDeMovimiento = ["Egreso", "Ingreso"];

export class Movimiento {
    constructor(tipoMovimiento, fecha, categoria, descripcion, monto, medioPago, totalCuotas, nroCuota, fechaPago, comentarios, isDeleted) {
        this.tipoMovimiento = tipoMovimiento;
        this.fecha = fecha;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.monto = monto;
        this.medioPago = medioPago;
        this.comentarios = comentarios;
        this.isDeleted = isDeleted;
    }
}

