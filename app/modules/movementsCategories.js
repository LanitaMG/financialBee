export const categoryTypes = ["Fijo", "Variable"];
export const movementTypes = ["Ingreso", "Egreso"];
class MovementCategory {
    constructor(name, movementType, categoryType, isVisible, isDeleted) {
        this.name = name;
        this.movementType = movementType;
        this.categoryType = categoryType
        this.isVisible = isVisible;
        this.isDeleted = isDeleted;
    }
}

export let movementsCategories = []
movementsCategories.push(new MovementCategory("Alquiler", "Egreso", "Fijo", true, false));
movementsCategories.push(new MovementCategory("Expensas", "Egreso", "Fijo", true, false))
movementsCategories.push(new MovementCategory("Gimnasio", "Egreso", "Fijo", true, false))
movementsCategories.push(new MovementCategory("Indumentaria", "Egreso", "Variable", true, false))
movementsCategories.push(new MovementCategory("Supermercado", "Egreso", "Variable", true, false))
movementsCategories.push(new MovementCategory("Entretenimiento", "Egreso", "Variable", true, false))
movementsCategories.push(new MovementCategory("Sueldo", "Ingreso", "Fijo", true, false));
movementsCategories.push(new MovementCategory("Reintegro", "Ingreso", "Variable", true, false))


