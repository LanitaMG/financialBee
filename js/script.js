//Variables globales

let expensesCategories = ["Alquiler", "Expensas", "Supermercado", "Gimnasio"];
let incomeCategories = ["Sueldo", "Intereses MP", "Otros"];
let wallets = ["Efectivo", "Mercado Pago", "Crédito Visa Santander"];
let user = "";

const welcome = `
¡Bienvenido a Financial Bee!\n
Bienvenido a la aplicación que te permitirá organizar de forma rápida y práctica todos tus movimientos financieros.\n
Este tutorial te guiará para que puedas:
* Crear tu nombre de usuario y contraseña
* Cargar billeteras electrónicas, bancarias o pseudo-billeteras.
* Ajustar las categorías de ingresos y egresos a tu manera
`;

// Funciones

// Función exit: mensaje de despedida de la aplicación
function exit(result) {
  console.log("Cierre ", result);
  let msg = "";
  if (result === "Success") {
    msg = `
    ¡Excelente trabajo ${user}!
    Nos vemos en la próxima preentrega para empezar a cargar movimientos

    Financial Bee
    `;
  } else {
    msg = `
    ¡Nos vemos en la próxima!
    
    Financial Bee
    `;
  }
  alert(msg);
}

// function userAnswerTest: recibe la respuesta ingresada por el usuario en un prompt y verifica que contenga un valor y que cumpla con la cantidad mínima de caracteres solicitados.
function userAnswerTest(userAnswer, chs) {
  testResult = false;
  if (userAnswer !== undefined && userAnswer !== null && userAnswer !== "") {
    userAnswer = userAnswer.trim();
    if (userAnswer.length >= chs) {
      testResult = true;
    }
  }
  console.log("userAnswerTest: ", testResult);
  return testResult;
}

// function userAnswerPrompts: administra la interacción con el usuario cuando se solicita el ingreso de un dato por prompt.
// Gestiona los mensajes inicial y de aviso de error/reintento. Verifica validez del dato y cantidad de intentos.
function userAnswerPrompts(msg1, msg2, chs, iter) {
  let userAnswer = prompt(msg1);
  let it = 1;
  if (userAnswerTest(userAnswer, chs)) {
    userAnswer = userAnswer.trim();
    console.log("it ",it,userAnswer);
  } else {
    while (!userAnswerTest(userAnswer, chs) && it < iter) {
      userAnswer = prompt(msg2);
      console.log("it ", it, userAnswer);
      it++;
    }
    if (it < iter) {
      userAnswer = userAnswer.trim();
    } else {
      userAnswer = null;
    }
  }
  console.log("user: ", userAnswer);
  return userAnswer;
}

//function createUser: gestiona la creación del nombre de usuario y contraseña.
function createUser() {
  let createUserSuccess = false;
  const msg = `
El primer paso es crear tu usuario y contraseña.
Cancelar para salir
`;
  const userChoice = confirm(msg);
  if (userChoice) {
    const msg1 = "Por favor introduce un nombre de usuario:";
    const msg2 = `El nombre debe poseer al menos 3 letras.
    Por favor introduce tu nombre de usuario:
    `;
    const iter = 3;
    const chs = 3;
    user = userAnswerPrompts(msg1, msg2, chs, iter);
    if (user == null) {
      exit("noSuccess");
    } else {
      user = user.charAt(0).toUpperCase() + user.slice(1).toLowerCase();
      createUserSuccess = true;
    }
  } else {
    exit("noSuccess");
  }
  console.log("user final: ", user);
  console.log("createUserSuccess: ", createUserSuccess);
  return createUserSuccess;
}

// function createPassword: gestiona la creación de una contraseña y la validación de la reiteración de contraseña.
function createPassword() {
  let createPasswordSuccess = false;
  const msg = `
  ${user}, vamos a proteger tu cuenta con una contraseña.
  Debe contener al menos 6 caracteres.
  
  Cancelar para salir"
  `;
  const userChoice = confirm(msg);
  if (userChoice) {
    const msg1 = `Por favor introduce una contraseña:`;
    const msg2 = `La contraseña debe poseer al menos 6 caracteres.
    Por favor introduce una nueva contraseña:";
    `;
    const iter = 3;
    const chs = 6;
    let password = userAnswerPrompts(msg1, msg2, chs, iter);
    if (password == null) {
      exit("noSuccess");
    } else {
      /* Validación de contraseña*/
      let password2 = prompt("Por favor, escribe nuevamente la contraseña:");
      console.log(password, " == ", password2);
      if (password == password2) {
        createPasswordSuccess = true;
      } else {
        password2 = prompt(
          "Los valores no coinciden. Por favor escribe nuevamente la contraseña:"
        );
        if (password == password2) {
          createPasswordSuccess = true;
        } else {
          exit("noSuccess");
        }
      }
    }
  }
  return createPasswordSuccess;
}

// function editArrays: gestiona la edición de los arrays con opciones personalizables

function editArrays(arr, msgInfo, topic) {
  // Mensaje inicial
  let msg = msgInfo;
  msg += `Los siguientes elementos ya se encuentran en la app:
  `;
  arr.forEach((elem) => {
    msg += " - " + elem + "\n";
  });
  msg += `
  A continuación podrás eliminar y agregar elementos para que Bee se adapte a tu estilo de vida financiera
  \n
  Cancelar para omitir este paso
  `;
  if (confirm(msg)) {
    //Listar ELEMENTOS predefinidas para conservar o eliminar
    let elementsSelection = [];
    arr.forEach((element) => {
      msg = `
    Estás editando: ${topic} 
    Deseas conservar: ${element}?
    Aceptar para conservar - Cancelar para eliminar
    `;
      let userChoice = confirm(msg);
      if (userChoice) {
        elementsSelection.push(element);
      }
    });

    // Mostrar elementos conservados
    msg = `
  Estás editando: ${topic}
  Estos son los elementos seleccionados:
  `;
    elementsSelection.forEach((elem) => {
      msg += ` - ${elem}\n`;
    });
    msg += "\nA continuación podrás agregar elementos.";
    alert(msg);

    //Agregar nuevos elementos
    const msg1 = `
  Estás editando: ${topic}
  Por favor ingrese el nombre del nuevo elemento.
  Si no desea agregar otro elemento presione Cancelar `;
    const msg2 = `
  Estás editando: ${topic}
  El nombre debe poseer al menos 3 letras.
  Por favor introduce nuevamente un nombre para el elemento:`;
    const iter = 2;
    const chs = 3;
    let newElement = userAnswerPrompts(msg1, msg2, chs, iter);
    while (newElement !== null) {
      newElement =
        newElement.charAt(0).toUpperCase() + newElement.slice(1).toLowerCase();
      newElement = userAnswerPrompts(msg1, msg2, chs, iter);
    }
    if (newElement == null) {
      // Mostrar elementos conservados
      msg = `
  ${topic}
  Estos son los elementos que tendrás disponible:
  `;
      elementsSelection.forEach((elem) => {
        msg += ` - ${elem}\n`;
      });
      msg += `\nRecuerda que siempre podrás volver a editar esta sección.`;
      alert(msg);
    }
    return elementsSelection;
  } else {
    return arr;
  }
}

// function editWallets: lanza la función editArrays con los parámetros para Billeteras
function editWallets() {
  let msgInfo = `
  ${user}, vamos a configurar tus billeteras.
  Las billeteras son los medios de pago y cobro que utilizas habitualmente
  Estas son las preconfiguradas en la app:
  `;
  wallets = editArrays(wallets, msgInfo, "BILLETERAS");
}

// function editIncomeCategories: lanza la función editArrays con los parámetros para Categorías de Ingresos
function editIncomeCategories() {
  let msgInfo = `
  ${user}, vamos a asignarle categorías a tus ingresos.
  Define todas las categorías que necesites para reflejar el origen de tus ingresos.
  Estas son las categorías ya disponibles en la app:
  `;
  incomeCategories = editArrays(
    incomeCategories,
    msgInfo,
    "CATEGORÍAS DE INGRESO"
  );
}

// function editExpensesCategories: lanza la función editArrays con los parámetros para Categorías de Egresos
function editExpensesCategories() {
  let msgInfo = `
  ${user} ¿Sabes en qué gastas tu dinero?
  Identificar las categorías que generan mayor egreso es crucial para tu economía. Crea todas las categorías necesarias para futuros análisis.
  Estas son las categorías ya disponibles en la app:
  `;
  expensesCategories = editArrays(
    expensesCategories,
    msgInfo,
    "CATEGORÍAS DE EGRESOS"
  );
}

function main() {
  alert(welcome);
  if (createUser()) {
    if (createPassword()) {
      const msg = `
      ¡Tu usuario ha sido creado con éxito!

      ${user} te invitamos a ajustar los parámetros de la aplicación para que se adapten a tu vida financiera.
      
      ¿Desea continuar con la personalización de la aplicación?"
      `;
      let userChoice = confirm(
      );
      if (userChoice) {
        editWallets();
        editIncomeCategories();
        editExpensesCategories();
        exit("Success");
      } 
      else exit("Success");
    }
  }
}

main();
