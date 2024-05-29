export const tiposDeCategoria = ["Fijo", "Variable"];

export class Categoria {
  constructor(nombre, tipoMovimiento, tipoCategoria, isVisible, isDeleted) {
    this.nombre = nombre;
    this.tipoMovimiento = tipoMovimiento;
    this.tipoCategoria = tipoCategoria;
    this.isVisible = isVisible;
    this.isDeleted = isDeleted;
  }
}

export let categorias = [];
categorias.push(new Categoria("Alquiler", "Egreso", "Fijo", true, false));
categorias.push(new Categoria("Expensas", "Egreso", "Fijo", true, false));
categorias.push(new Categoria("Gimnasio", "Egreso", "Fijo", true, false));
categorias.push(
  new Categoria("Indumentaria", "Egreso", "Variable", true, false)
);
categorias.push(
  new Categoria("Supermercado", "Egreso", "Variable", true, false)
);
categorias.push(
  new Categoria("Entretenimiento", "Egreso", "Variable", true, false)
);
categorias.push(new Categoria("Sueldo", "Ingreso", "Fijo", true, false));
categorias.push(new Categoria("Reintegro", "Ingreso", "Variable", true, false));

export const actualizarCategorias = () => {
  categorias = JSON.parse(localStorage.getItem("categorias"));
};
