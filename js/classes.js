
let PaymentMethodTypes = ["Efectivo", "Tarjeta de crédito", "Tarjeta de débito", "Cuenta bancaria", "Billetera digital", "Tarjeta prepaga", "Criptomonedas"]


class PaymentMethod {
    constructor(name, type, show, deleted) {
        this.id = id;
        this.name = name; // Name of the payment method (e.g., "Credit Card", "Cash", "Cryptocurrency")
        this.type = type; // Type of payment method (e.g., "Credit", "Debit", "Mobile Wallet")
        this.isVisible = isVisible;; // Boolean indicating whether the payment method should be displayed
        this.isDeleted = isDeleted; // Boolean indicating whether the payment method is deleted
    }

    calculateNextMonthDay10(date) {
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();

        // Calculate the next month
        const nextMonth = (currentMonth + 1) % 12;
        const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;

        // Set the date to the 10th day of the next month
        const nextMonthDate = new Date(nextYear, nextMonth, 10);
        return nextMonthDate;
    }
}


class MovementCategory {
    constructor(name, movementType, isVisible, isDeleted) {
        this.name = name;
        this.movementType = movementType;
        this.isVisible = isVisible;
        this.isDeleted = isDeleted;
    }
}

