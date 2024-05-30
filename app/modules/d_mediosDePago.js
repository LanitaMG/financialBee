export let tiposMedioPago = [
  "Efectivo",
  "Tarjeta de crédito",
  "Tarjeta de débito",
  "Cuenta bancaria",
  "Billetera digital",
  "Tarjeta prepaga",
  "Criptomonedas",
];

export class MedioPago {
  constructor(id, nombre, tipo, isVisible, isDeleted) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.isVisible = isVisible;
    this.isDeleted = isDeleted;
  }

}

export let mediosPago = [];
mediosPago.push(new MedioPago(0, "Efectivo", "Efectivo", true, false));
mediosPago.push(
  new MedioPago(1, "Mercado Pago", "Billetera digital", true, false)
);
mediosPago.push(new MedioPago(2, "Tarjeta Naranja", "Efectivo", true, false));
mediosPago.push(
  new MedioPago(3, "Visa Santander Deb", "Tarjeta de débito", true, false)
);
mediosPago.push(
  new MedioPago(4, "Visa BBVA Francés Deb", "Tarjeta de débito", true, false)
);
mediosPago.push(
  new MedioPago(5, "Visa Santander Cred", "Tarjeta de crédito", false, false)
);
mediosPago.push(
  new MedioPago(6, "Amex Santander Cred", "Tarjeta de crédito", true, false)
);

export const actualizarMediosPago = () => {
  mediosPago = JSON.parse(localStorage.getItem("mediosDePago"));
};
