
//Variables globales

let expensesCategories = ["Alquiler", "Expensas", "Supermercado", "Gimnasio", 'Indumentaria', 'Mascotas', 'Salidas', 'Hogar', 'Impuestos']
let incomeCategories = ['Sueldo', 'Intereses MP', 'Intereses PPay', 'Inversiones', 'Otros']
let wallets = ['Efectivo', 'Mercado Pago', 'Personal Pay', 'Débito Visa Santander', 'Crédito Visa Santander']
let user



// Funciones

/* Función formatString: Formatea el texto ingresado por el usuario, eliminando espacios y capitalizando la letra inicial
 Función flecha - Condicional If */
const formatString = (str)  => {
    str = str.trim()
    if (str.length > 0) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

/* Función createUser: Guía al usuario en la creación de nombre de usuario (mínimo 3 caracteres) y de una contraseña (mínimo 6 caracteres).
El usuario tiene 3 oportunidades para crear exitosamente el nombre y la contraseña.
Función declarativa - Condicional If-Else - Bucle While
*/
function createUser() {
    let createUserSuccess = false

    // Creación del nombre de usuario
    user = formatString(prompt("Primero crearemos tus credenciales de ingreso.\nPor favor ingresa un nombre de usuario (mínimo 3 caracteres):"))
    let attempts = 1

    while (user.length < 3 && attempts < 3) {
        user = formatString(prompt("El usuario debe tener mínimo 3 caracteres. Por favor ingresa un nombre más largo:"))
        attempts++
    }

    if (attempts < 3) {
        alert("¡Bienvenido "+ user + "!\nAhora crearemos tu contraseña")
        
        
        // Creación de la contraseña
        let password = prompt("Por favor ingresa una contraseña (mínimo 6 caracteres):").trim()
        attempts = 1
        while (password.length < 6 && attempts < 3) {
            password = prompt("La contraseña debe tener mínimo 6 caracteres. Por favor ingresa una contraseña más larga:").trim()
            attempts++;
        }
        if (attempts < 3) {
            //Solicita ingresar nuevamente la contraseña y compara con la creada en el paso anterior.
            let password2 = prompt("Vamos a verificar tu credencial.\nIngresa nuevamente tu contraseña:").trim()
            attempts = 1
            
            while (password !== password2 && attempts < 3) {
                password2  = prompt("La verificación no tuvo éxito.\nIngresa nuevamente tu contraseña:").trim()
                attempts++
            }
            if (attempts < 3) {
                alert("¡Felicitaciones " + user + "!\n Tu cuenta ha sido creada con éxito. ")
                createUserSuccess = true
            } else {
                alert("Parece que hoy no estás inspirado. Vuelve a iniciar la aplicación para intentar nuevamente.")
            }
        }
        else {
            alert("Parece que hoy no estás inspirado. Vuelve a iniciar la aplicación para intentar nuevamente.")
        }
    }
    else {
        alert("Parece que hoy no estás inspirado. Vuelve a iniciar la aplicación para intentar nuevamente.")
    }
    return createUserSuccess
}

/* Función setWallets: permite personalizar el listado de billeteras.
Muestra las billeteras predefinidas, luego pregunta una por una cual se desea conservar y finalmente permite agregar nuevas
Función declarativa - Condicional If-Else - Bucles forEach y while
*/
function setWallets() {
    let msg = user + ", vamos a configurar tus billeteras.\n"
    msg += "Las billeteras son los medios de pago y cobro que utilizas habitualmente\n"
    msg += "Te mostramos las billeteras predefinidas por la aplicación: \n\n"
    wallets.forEach(wallet => {
        msg += " - " + wallet + "\n"
    });
    msg += "\nA continuación podrá eliminar y agregar billeteras para que Bee se adapte a tu estilo de vida financiera"
    alert(msg)
    let keepWallets = []
    wallets.forEach(wallet => {
        let keepWallet = confirm("¿Desea conservar la billetera " + wallet+"?\nAceptar para conservar - Cancelar para eliminar") 
        if (keepWallet) {
            keepWallets.push(wallet)
        }
    })
    wallets = keepWallets
    msg = "¡Muy bien "+ user + "! Estas son las billeteras que dicidiste conservar.\n"
    wallets.forEach(wallet => {
        msg += " - " + wallet + "\n"
    });
    msg += "\nA continuación podrás agregar otras billeteras"
    alert(msg)
    let newWallet = prompt("Por favor ingrese el nombre de la billetera que desea agregar. \nSi no desea agregar otra billetera presione Cancelar") 
    while (newWallet !== null) {
        newWallet = formatString(newWallet)
        if (newWallet.length > 0) {
            wallets.push(newWallet)
        } 
        
            
        newWallet = prompt("Por favor ingrese el nombre de la billetera que desea agregar. \nSi no desea agregar otra billetera presione Cancelar") 
    }
    wallets.sort()
    msg = '¡Excelente trabajo ' + user +'!\n'
    msg += 'Estas son tus billeteras:\n'
    wallets.forEach(wallet => {
        msg += " - " + wallet + "\n"
    });
    alert(msg)
    }    



/* Función setIncomeCategories: permite personalizar las categorías asociadas a los ingresos que percibe el usuario.
Función declarativa - Bucles for y for-each- Condicional if-else
*/
function setIncomeCategories() {
    let msg = user + ", es momento de personalizar las categorías de tus ingresos.\n"
    msg += "Te mostramos las categorías predefinidas por la aplicación: \n\n"
    incomeCategories.forEach(category => {
        msg += " - " + category + "\n"
    });
    msg += "\nA continuación podrás eliminar y agregar las categorías de tus ingresos."
    alert(msg)
    let keepCategories = []

    for (let index = 0; index < incomeCategories.length; index++) {
        let keepCategory = confirm("¿Desea conservar la categoría " + incomeCategories[index] +"?\n\nAceptar para conservar - Cancelar para eliminar") 
        if (keepCategory) {
            keepCategories.push(incomeCategories[index])
        }
    }
    incomeCategories = keepCategories
    msg = "¡Muy bien "+ user + "! Estas son las categorías de ingresos que dicidiste conservar.\n"
    incomeCategories.forEach(category => {
        msg += " - " + category + "\n"
    });
    msg += "\nA continuación podrás agregar nuevas categorías"
    alert(msg)
    let newCategory = prompt("Por favor ingrese el nombre de la categoría que desea agregar. \nSi no desea agregar otra categoría presione Cancelar") 
    while (newCategory !== null) {
        newCategory = formatString(newCategory)
        if (newCategory.length > 0) {
            incomeCategories.push(newCategory)
        }
        newCategory = prompt("Por favor ingrese el nombre de la categoría que desea agregar. \nSi no desea agregar otra categoría presione Cancelar") 
    }
    incomeCategories.sort()
    msg = '¡Excelente trabajo ' + user +'!\n'
    msg += 'Estas categorías reflejan tus ingresos:\n'
    incomeCategories.forEach(category => {
        msg += " - " + category + "\n"
    });
    alert(msg)

}

/* Función setIncomeCategories: permite personalizar las categorías asociadas a los ingresos que percibe el usuario.
Función declarativa - Bucles for y for-each- Condicional if-else
*/
function setExpensesCategories() {
    let msg = user + ", es momento de personalizar las categorías de tus gastos.\n"
    msg += "Te mostramos las categorías predefinidas por la aplicación: \n\n"
    expensesCategories.forEach(category => {
        msg += " - " + category + "\n"
    });
    msg += "\nA continuación podrá eliminar y agregar las categorías de tus egresos."
    alert(msg)
    let keepCategories = []

    for (let index = 0; index < expensesCategories.length; index++) {
        let keepCategory = confirm("¿Desea conservar la categoría " + expensesCategories[index] +"?\n\nAceptar para conservar - Cancelar para eliminar") 
        if (keepCategory) {
            keepCategories.push(expensesCategories[index])
        }
    }
    expensesCategories = keepCategories
    msg = "¡Muy bien "+ user + "! Estas son las categorías de gastos que dicidiste conservar.\n"
    expensesCategories.forEach(category => {
        msg += " - " + category + "\n"
    });
    msg += "\nA continuación podrás agregar nuevas categorías"
    alert(msg)
    let newCategory = prompt("Por favor ingrese el nombre de la categoría que desea agregar. \nSi no desea agregar otra categoría presione Cancelar") 
    while (newCategory !== null) {
        newCategory = formatString(newCategory)
        if (newCategory.length > 0) {
            incomeCategories.push(newCategory)
        }
        newCategory = prompt("Por favor ingrese el nombre de la categoría que desea agregar. \nSi no desea agregar otra categoría presione Cancelar") 
    }
    expensesCategories.sort()
    msg = '¡Excelente trabajo ' + user +'!\n'
    msg += 'Estas categorías reflejan tus ingresos:\n'
    expensesCategories.forEach(category => {
        msg += " - " + category + "\n"
    });
    alert(msg)

}



function main() {
    let msg = "¡Bienvenido a Financial Bee!\n\n"
    msg += "Te invitamos a recorrer este pequeño tutorial que te ayudará a configurar la aplicación para que se ajuste a tus características financieras."
    alert(msg)
    if (createUser()) {
        setWallets()
        setIncomeCategories()
        setExpensesCategories()
        msg = "¡Misión cumplida " + user + "!\n\n"
        msg += "La aplicación ya se encuentra personalizada.\n"
        msg += "En la próxima preentrega podrás registrar los movimientos financieros que realizas diariamente.\n"
        alert(msg)
    }

    

    
}

main ()