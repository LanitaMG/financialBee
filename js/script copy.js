//Variables globales
const mainSection = document.getElementById("main");

// let expensesCategories = ["Alquiler", "Expensas", "Supermercado", "Gimnasio"];
// let incomeCategories = ["Sueldo", "Intereses MP", "Otros"];
const walletType = [
  "Efectivo",
  "Bancaria",
  "Virtual",
  "Tarjeta de Crédito",
  "Tarjeta de Débito",
  "Otra",
];
const categoryType = ["Fijo", "Variable"];

// Clases

// Usuario
class User {
  constructor(name, password, email) {
    this.name = name;
    this.password = password;
    this.email = email;
  }

  // Método que devuelve el nombre de usuario
  getUserName() {
    return this.name;
  }
}
let user = new User("Default", "", "hola@mail.com");

// Billeteras
class Wallet {
  constructor(name, type, active) {
    this.name = name;
    this.type = type;
    this.active = active;
  }

  getName() {
    return this.name;
  }
  getType() {
    return this.type;
  }
  getStatus() {
    return this.active;
  }

  changeType(type) {
    this.type = type;
  }
  changeStatus(active) {
    this.active = active;
  }
}

let wallets = [];
wallets.push(new Wallet("Efectivo", "Efectivo", true));
wallets.push(new Wallet("Mercado Pago", "Virtual", true));
wallets.push(new Wallet("Personal Pay", "Virtual", false));
wallets.push(new Wallet("Tarjeta Naranja", "Virtual", false));
wallets.push(new Wallet("Ualá", "Bancaria", true));
wallets.push(new Wallet("BBVA Francés", "Tarjeta de Débito", true));

class movCategory {
  constructor(name, type, active) {
    this.name = name;
    this.type = type;
    this.active = active;
  }

  getName() {
    return this.name;
  }
  getType() {
    return this.type;
  }

  getStatus() {
    return this.active;
  }

  changeStatus(active) {
    this.active = active;
  }
}

let expensesCategories = [];
let incomeCategories = [];

incomeCategories.push(new movCategory("Sueldo", "Fijo", true));
incomeCategories.push(new movCategory("Intereses", "Fijo", true));
incomeCategories.push(new movCategory("Monotributo", "Variable", true));
incomeCategories.push(new movCategory("Reintegro", "Variable", true));
expensesCategories.push(new movCategory("Alquiler", "Fijo", true));
expensesCategories.push(new movCategory("Supermercado", "Fijo", true));
expensesCategories.push(new movCategory("Indumentaria", "Fijo", true));
expensesCategories.push(new movCategory("Gimnasio", "Variable", true));
expensesCategories.push(new movCategory("Salidas", "Variable", true));

// Funciones

// Genera una estructura div-title-about-list-add-exit para las secciones de personalización.
function userEditContainer(sectionName) {
  const divContainer = document.createElement("section");
  divContainer.classList += "container shadow p-3";
  divContainer.id = sectionName + "divContainer";

  const title = document.createElement("h2");
  title.id = sectionName + "Title";
  title.textContent = "Default";

  const about = document.createElement("p");
  about.id = sectionName + "About";
  about.textContent = "Esto es sobre algo:";

  const listDiv = document.createElement("div");
  listDiv.id = sectionName + "List";

  const addNewElement = document.createElement("div");
  addNewElement.id = sectionName + "AddNew";

  const exitBtn = document.createElement("button");
  exitBtn.name = "editExit";
  exitBtn.addEventListener("click", createUserSetMenu);
  exitBtn.classList += "btn btn-dark";
  exitBtn.textContent = "Finalizar";

  divContainer.appendChild(title);
  divContainer.appendChild(about);
  divContainer.appendChild(listDiv);
  divContainer.appendChild(addNewElement);
  divContainer.appendChild(exitBtn);

  mainSection.appendChild(divContainer);
}

//function createUser: gestiona la creación del nombre de usuario y contraseña.
function createUser() {
  let createUserOK = false;
  const boton = document.getElementById("btnNewUser");
  boton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e);
    console.log("estas en createUser");
    let createUserOK = true;

    let errorMsg = "";
    let name = document.getElementById("user-name").value;
    let email = document.getElementById("user-email").value;
    let password1 = document.getElementById("user-password-1").value;
    let password2 = document.getElementById("user-password-2").value;

    if (name.length < 3) {
      console.log("corto");
      errorMsg += "Usuario no válido. ";
      createUserOK = false;
    }

    const emailTest = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return regex.test(email);
    };

    if (!emailTest(email)) {
      console.log("email");
      errorMsg += "Correo no válido. ";
      createUserOK = false;
    }

    if (password1.length < 6) {
      console.log("contraseña corta");
      errorMsg += "Contraseña no válida. ";
      createUserOK = false;
    }

    if (password1 !== password2) {
      console.log("contraseñas no coinciden");
      errorMsg += "Las contraseñas no coinciden. ";
      createUserOK = false;
    }

    if (createUserOK) {
      user = new User(name, password1, email);
      const helloUser = document.getElementById("hello-user");
      helloUser.innerText = "Hola " + user.getUserName();
      const divUserAccount = document.getElementById("user-account");
      divUserAccount.remove();
      createUserSetMenu();
    } else {
      const erText = document.getElementById("er-text");
      erText.textContent = errorMsg;
    }
  });
  return createUserOK;
}

// Menú Configuraciones

function createUserSetMenu() {
  console.log("funcion Createusersetmenu");
  clearMainSection();
  const menuSection = document.createElement("section");
  menuSection.classList += "container shadow p-3 d-flex justify-content-around";
  const menuText = ["Billeteras", "Egresos", "Ingresos"];
  const menuId = ["wallets", "EC", "IC"];
  const menuEvent = [editWallets, editEC, editIC];
  menuText.forEach((element, index) => {
    console.log(element, index);
    const menuBtn = document.createElement("button");
    menuBtn.classList += "btn btn-dark w-25";
    menuBtn.textContent = element;
    menuBtn.id = menuId[index] + "MenuBtn";
    menuSection.appendChild(menuBtn);
    menuBtn.addEventListener("click", menuEvent[index]);
  });
  mainSection.appendChild(menuSection);
  return;
}

function clearMainSection() {
  if (mainSection.childNodes.length > 3) {
    mainSection.removeChild(mainSection.lastChild);
  }
}

// function editWallets: administra la creación y modificacion de billeteras
function editWallets() {
  console.log("Edición de Billeteras");
  clearMainSection();
  userEditContainer("wallets");
  document.getElementById("walletsTitle").textContent = "Billeteras";
  document.getElementById("walletsAbout").textContent =
    "Selecciona las billeteras que dispones.";
  const walletsList = createList(wallets, "wallets");
  const walletsAddNew = addNewItem(walletType, "Nueva billetera:", "wallet");
  document.getElementById("walletsList").appendChild(walletsList);
  document.getElementById("walletsAddNew").appendChild(walletsAddNew);
}

// Crea el listado de Billeteras con su correspondiente check
function createWalletsList() {
  const walletsCheckList = document.createElement("div");
  walletsCheckList.id = "walletsCheckList";
  walletsCheckList.classList += "form-check";
  wallets.forEach((wallet, index) => {
    const checkbox = document.createElement("input");
    checkbox.id = `wallet-${index}`;
    checkbox.type = "checkbox";
    checkbox.checked = wallet.getWalletStatus();
    // checkbox.role = "switch";
    checkbox.classList += "form-check-input col-1";

    const labelName = document.createElement("label");
    labelName.textContent = wallet.getWalletName();
    labelName.classList += "form-check-label col-4";

    const labelType = document.createElement("label");
    labelType.textContent = wallet.getWalletType();
    labelType.classList += "form-label col-4";

    const walletItem = document.createElement("div");
    walletItem.classList += "row";
    walletItem.appendChild(checkbox);
    walletItem.appendChild(labelName);
    walletItem.appendChild(labelType);
    walletsCheckList.appendChild(walletItem);
  });

  const editWalletBtn = document.createElement("button");
  editWalletBtn.id = "editWalletBtn";
  editWalletBtn.textContent = "Guardar modificaciones";
  editWalletBtn.classList += "btn btn-dark m-3";
  editWalletBtn.addEventListener("click", updateWallets);
  walletsCheckList.appendChild(editWalletBtn);

  return walletsCheckList;
}

// Guarda las modificaciones de la propiedad active en cada billetera.
function updateWallets() {
  console.table(wallets);
  for (let index = 0; index < wallets.length; index++) {
    const walletUserChoice = document.getElementById("wallet-" + index);
    wallets[index].changeWalletStatus(walletUserChoice.checked);
  }
  console.table(wallets);
}

// GEnera el div que contienen las opciones para agregar un nuevo item.
function addNewItem(arTypes, label, preId) {
  const addItemDiv = document.createElement("div");
  addItemDiv.classList += "pt-3";
  const addItemLabel = document.createElement("label");
  addItemLabel.textContent = label;
  addItemLabel.classList += "form-label m-3";
  const addItemInput = document.createElement("input");
  addItemInput.id = "addItemInput";
  addItemInput.type = "text";
  addItemInput.classList += "form-input m-3";
  const addItemTypeSelect = document.createElement("select");
  addItemTypeSelect.id = preId + "addTypeSelect";
  addItemTypeSelect.classList += "form-input m-3";
  arTypes.forEach((element) => {
    const typeOption = document.createElement("option");
    typeOption.text = element;
    typeOption.value = element;
    addItemTypeSelect.appendChild(typeOption);
  });
  const addItemBtn = document.createElement("button");
  addItemBtn.id = preId + "addBtn";
  addItemBtn.textContent = "Agregar";
  addItemBtn.classList += "btn btn-dark m-3";

  addItemDiv.appendChild(addItemLabel);
  addItemDiv.appendChild(addItemInput);
  addItemDiv.appendChild(addItemTypeSelect);
  addItemDiv.appendChild(addItemBtn);

  return addItemDiv;
}

// Actualiza el array Items con la nueva billetera agregada. Actualiza el listado de billeteras en pantalla.
function addNewWallet() {
  const walletName = document.getElementById("addItemInput").value;
  const walletType = document.getElementById("addItemTypeSelect").value;
  const newWallet = new Wallet(walletName, walletType, true);
  wallets.push(newWallet);
  console.log(walletName, walletType);
  console.table(wallets);
  document.getElementById("walletsList").remove;
  const walletsList = createList(wallets, "wallets");
  document.getElementById("walletsList").appendChild(walletsList);
}

// Crea el listado de Categorías de egreso con su correspondiente check
function createList(arr, preId) {
  const checkList = document.createElement("div");
  checkList.id = preId + "CheckList";
  checkList.classList += "form-check";
  arr.forEach((element, index) => {
    const checkbox = document.createElement("input");
    checkbox.id = preId + "-" + index;
    checkbox.type = "checkbox";
    checkbox.checked = element.getStatus;
    // checkbox.role = "switch";
    checkbox.classList += "form-check-input col-1";

    const labelName = document.createElement("label");
    labelName.textContent = element.getName();
    labelName.classList += "form-check-label col-4";

    const labelType = document.createElement("label");
    labelType.textContent = element.getType();
    labelType.classList += "form-label col-4";

    const listItem = document.createElement("div");
    listItem.classList += "row";
    listItem.appendChild(checkbox);
    listItem.appendChild(labelName);
    listItem.appendChild(labelType);
    checkList.appendChild(listItem);
  });

  const editBtn = document.createElement("button");
  editBtn.id = "editWalletBtn";
  editBtn.textContent = "Guardar modificaciones";
  editBtn.classList += "btn btn-dark m-3";
  // editEcBtn.addEventListener("click", updateExpensesCategory);
  checkList.appendChild(editBtn);

  return checkList;
}

function editEC() {
  console.log("Edición de EC");
  clearMainSection();
  userEditContainer("ec");
  document.getElementById("ecTitle").textContent = "Egresos";
  document.getElementById("ecAbout").textContent =
    "Selecciona las categorías de egresos que te representan";
  const ecList = createList(expensesCategories, "ec");
  const ecAddNew = addNewItem(categoryType, "Nueva categoría:", "ec");
  document.getElementById("ecList").appendChild(ecList);
  document.getElementById("ecAddNew").appendChild(ecAddNew);
  document.getElementById("ecAddBtn").addEventListener("click", addEC);
}

function editIC() {
  console.log("acá se edita IC");
}
// Función principal que controla la secuencia de pasos del tutorial.
function main() {
  createUser();
}

main();
