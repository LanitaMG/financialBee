function calculateNextMonthDay10(date) {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    // Calculate the next month
    const nextMonth = (currentMonth + 1) % 12;
    console.log((currentMonth + 1));
    const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;

    // Set the date to the 10th day of the next month
    const nextMonthDate = new Date(nextYear, nextMonth, 10);
    return nextMonthDate;
}

let fecha = new Date(Date.parse("2024/06/12"))

console.log(calculateNextMonthDay10(fecha));