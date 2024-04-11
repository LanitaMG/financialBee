

const tipoMovimiento = ["Ingreso", "Egreso"]
const expensesCategories = ["Alquiler", "Expensas", "Supermercado", "Gimnasio", 'Indumentaria', 'Mascotas', 'Salidas', 'Hogar', 'Impuestos']
const incomeCategories = ['Sueldo', 'Intereses MP', 'Intereses PPay', 'Inversiones', 'Otros']
let wallets = ['Efectivo', 'Mercado Pago', 'Personal Pay', 'Débito Visa Santander', 'Crédito Visa Santander']
let user

function formatString(str) {
    str = str.trim()
    if (str.length > 0) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}


function createUser() {
    let createUserSuccess = false

    // Creación del nombre de usuario
    user = formatString(prompt("Primero crearemos tus credenciales de ingreso. Por favor ingresa un nombre de usuario (mínimo 3 caracteres):"))
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

function setWallets(user) {
    let text = user + ", vamos a configurar tus billeteras.\n"
    text += "Las billeteras son los medios de pago y cobro que utilizas habitualmente\n"
    text += "Te mostramos las billeteras predefinidas por la aplicación: \n\n"
    wallets.forEach(wallet => {
        text += " - " + wallet + "\n"
    });
    text += "\nA continuación podrá eliminar y agregar billeteras para que Bee se adapte a tu estilo de vida financiera"
    alert(text)
    let keepWallets = []
    wallets.forEach(wallet => {
        let keepWallet = confirm("¿Desea conservar la billetera " + wallet+"?\nAceptar para conservar - Cancelar para eliminar") 
        if (keepWallet) {
            keepWallets.push(wallet)
        }
    })
    wallets = keepWallets
    text = "¡Muy bien "+ user + "! Estas son las billeteras que dicidiste conservar.\n"
    wallets.forEach(wallet => {
        text += " - " + wallet + "\n"
    });
    text += "\nA continuación podrás agregar otras billeteras"
    alert(text)
    let newWallet = prompt("Por favor ingrese el nombre de la billetera que desea agregar. \nSi no desea agregar otra billetera presione Cancelar") 
    while (newWallet !== null) {
        wallets.push(formatString(newWallet))
        newWallet = prompt("Por favor ingrese el nombre de la billetera que desea agregar. \nSi no desea agregar otra billetera presione Cancelar") 
    }
    wallets.sort()
    text = '¡Excelente trabajo' + user +'!\n'
    text += 'Estas son tus billeteras:\n'
    wallets.forEach(wallet => {
        text += " - " + wallet + "\n"
    });
    alert(text)
    }    

function setIncomeCategories() {
    let text = user + ", es momento de personalizar las categorías de tus ingresos.\n"
    text += "Te mostramos las categorías predefinidas por la aplicación: \n\n"
    incomeCategories.forEach(category => {
        text += " - " + category + "\n"
    });
    text += "\nA continuación podrá eliminar y agregar las categorías de tus ingresos"
    alert(text)
    let keepCategories = []
    incomeCategories.forEach(category => {
        let keepCategory = confirm("¿Desea conservar la categoría " + category +"?\nAceptar para conservar - Cancelar para eliminar") 
        if (keepCategory) {
            keepCategories.push(category)
        }
    })
    incomeCategories = keepCategories
    text = "¡Muy bien "+ user + "! Estas son las categorías de ingresos que dicidiste conservar.\n"
    incomeCategories.forEach(category => {
        text += " - " + category + "\n"
    });
    text += "\nA continuación podrás agregar otras categorías"
    alert(text)
    let newCategory = prompt("Por favor ingrese el nombre de la categoría que desea agregar. \nSi no desea agregar otra categoría presione Cancelar") 
    while (newCategory !== null) {
        incomeCategories.push(formatString(newCategory))
        newCategory = prompt("Por favor ingrese el nombre de la categoría que desea agregar. \nSi no desea agregar otra categoría presione Cancelar") 
    }
    incomeCategories.sort()
    text = '¡Excelente trabajo' + user +'!\n'
    text += 'Estas categorías reflejan tus ingresos:\n'
    incomeCategories.forEach(category => {
        text += " - " + category + "\n"
    });
    alert(text)

}

function main() {
    let msg = "¡Bienvenido a Financial Bee!\n\n"
    msg += "Te invitamos a recorrer este pequeño tutorial que te ayudará a configurar la aplicación para que se ajuste a tus características financieras."
    alert(msg)
    if (createUser()) {
        setWallets(user)
        setIncomeCategories()

    }
    
    

    
}

main ()