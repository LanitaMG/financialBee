//Variables globales
const mainSection = document.getElementById("main");

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

  setType(type) {
    this.type = type;
  }
  setStatus(active) {
    this.active = active;
  }
}

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

  setStatus(active) {
    this.active = active;
  }
}

// Funciones
// Inicializar local storage
function initData() {
  let wallets = [];
  wallets.push(new Wallet("Efectivo", "Efectivo", true));
  wallets.push(new Wallet("Mercado Pago", "Virtual", true));
  wallets.push(new Wallet("Personal Pay", "Virtual", false));
  wallets.push(new Wallet("Tarjeta Naranja", "Virtual", false));
  wallets.push(new Wallet("Ualá", "Bancaria", true));
  wallets.push(new Wallet("BBVA Francés", "Tarjeta de Débito", true));

  localStorage.setItem("wallets", JSON.stringify(wallets));

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

  localStorage.setItem("incomeCategories", JSON.stringify(incomeCategories));
  localStorage.setItem(
    "expensesCategories",
    JSON.stringify(expensesCategories)
  );
}

// Genera una estructura div-title-about-list-add-exit para las secciones de personalización.
function userEditContainer(sectionName) {
  const divContainer = document.createElement("section");
  divContainer.classList += "container shadow p-3";
  divContainer.id = sectionName + "divContainer";

  const title = document.createElement("h2");
  title.id = sectionName + "Title";

  const about = document.createElement("p");
  about.id = sectionName + "About";

  const listDiv = document.createElement("div");
  listDiv.classList += "p-3";
  listDiv.id = sectionName + "List";

  const addNewElement = document.createElement("div");
  addNewElement.id = sectionName + "AddNew";

  const exitBtn = document.createElement("button");
  exitBtn.name = "editExit";
  exitBtn.addEventListener("click", createUserSetMenu);
  exitBtn.classList += "btn btn-dark mt-3 p-3 w-50 mx-auto";
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
    let createUserOK = true;
    let errorMsg = "";
    let name = document.getElementById("user-name").value;
    let email = document.getElementById("user-email").value;
    let password1 = document.getElementById("user-password-1").value;
    let password2 = document.getElementById("user-password-2").value;

    if (name.length < 3) {
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
      let user = new User(name, password1, email);
      const helloUser = document.getElementById("hello-user");
      helloUser.innerText = "Hola " + user.name;
      localStorage.setItem("user", JSON.stringify(user));
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

// Crea el listado de elementos con su correspondiente check
function createList(arr, preId) {
  const checkList = document.createElement("div");
  checkList.id = preId + "CheckList";
  checkList.classList += "row p-3";
  arr.forEach((element, index) => {
    const checkbox = document.createElement("input");
    checkbox.id = preId + "-" + index;
    checkbox.type = "checkbox";
    checkbox.checked = element.active;
    // checkbox.role = "switch";
    checkbox.classList += "form-check-input col-2";

    const labelName = document.createElement("label");
    labelName.textContent = element.name;
    labelName.classList += "form-check-label col-4";

    const labelType = document.createElement("label");
    labelType.textContent = element.type;
    labelType.classList += "form-label col-4 ";

    const listItem = document.createElement("div");
    listItem.classList += "row";
    listItem.appendChild(checkbox);
    listItem.appendChild(labelName);
    listItem.appendChild(labelType);
    checkList.appendChild(listItem);
  });

  const editBtn = document.createElement("button");
  editBtn.id = preId + "EditBtn";
  editBtn.textContent = "Guardar modificaciones";
  editBtn.classList += "btn btn-dark m-3 w-50 mx-auto";
  checkList.appendChild(editBtn);

  return checkList;
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
  addItemTypeSelect.id = "addTypeSelect";
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

// Guarda las modificaciones de la propiedad active en cada billetera.
function updateWallets() {
  const upWallets = JSON.parse(localStorage.getItem("wallets"));
  console.table(upWallets);
  for (let index = 0; index < upWallets.length; index++) {
    const userChoice = document.getElementById("wallet-" + index);
    upWallets[index].active = userChoice.checked;
  }
  console.table(upWallets);
  localStorage.setItem("wallets", JSON.stringify(upWallets));
}

// Agrega al array wallets un nuevo objeto. Actualiza el listado.
function addNewWallet() {
  const wallets = JSON.parse(localStorage.getItem("wallets"));
  const walletName = document.getElementById("addItemInput").value;
  const walletType = document.getElementById("addTypeSelect").value;
  const newWallet = new Wallet(walletName, walletType, true);
  wallets.push(newWallet);
  const listDiv = document.getElementById("walletsList");
  listDiv.removeChild(listDiv.lastChild);
  const walletsList = createList(wallets, "wallets");
  document.getElementById("walletsList").appendChild(walletsList);
  localStorage.setItem("wallets", JSON.stringify(wallets));
}

// function editWallets: administra la creación y modificacion de billeteras
function editWallets() {
  const wallets = JSON.parse(localStorage.getItem("wallets"));
  console.table(wallets);
  console.log("Edición de Billeteras");
  clearMainSection();
  userEditContainer("wallets");
  document.getElementById("walletsTitle").textContent = "Billeteras";
  document.getElementById("walletsAbout").textContent =
    "Selecciona las billeteras que dispones.";
  const walletsList = createList(wallets, "wallet");
  const walletsAddNew = addNewItem(walletType, "Nueva billetera:", "wallet");
  document.getElementById("walletsList").appendChild(walletsList);
  document.getElementById("walletsAddNew").appendChild(walletsAddNew);
  const modWallets = document.getElementById("walletEditBtn");
  modWallets.addEventListener("click", updateWallets);
  const addWallets = document.getElementById("walletaddBtn");
  addWallets.addEventListener("click", addNewWallet);
}

// Agrega al array expensescategories un nuevo objeto. Actualiza el listado.
function addNewExpenseCategory() {
  const expensesCategories = JSON.parse(
    localStorage.getItem("expensesCategories")
  );
  const ecName = document.getElementById("addItemInput").value;
  const ecType = document.getElementById("addTypeSelect").value;
  const newEC = new movCategory(ecName, ecType, true);
  expensesCategories.push(newEC);
  const listDiv = document.getElementById("ecList");
  listDiv.removeChild(listDiv.lastChild);
  const ecList = createList(expensesCategories, "ec");
  document.getElementById("ecList").appendChild(ecList);
  localStorage.setItem(
    "expensesCategories",
    JSON.stringify(expensesCategories)
  );
}

// Guarda las modificaciones de la propiedad active en cada categoria.
function updateExpensesCategories() {
  const expensesCategories = JSON.parse(
    localStorage.getItem("expensesCategories")
  );

  console.table(expensesCategories);
  for (let index = 0; index < expensesCategories.length; index++) {
    const userChoice = document.getElementById("ec-" + index);
    expensesCategories[index].active = userChoice.checked;
    console.log(userChoice, userChoice.checked);
  }
  console.table(expensesCategories);
  localStorage.setItem(
    "expensesCategories",
    JSON.stringify(expensesCategories)
  );
}

// function editEC: administra la creación y modificacion de categorias de egresos
function editEC() {
  const expensesCategories = JSON.parse(
    localStorage.getItem("expensesCategories")
  );

  console.log("Edición de Categorías de egreso");
  clearMainSection();
  userEditContainer("ec");
  document.getElementById("ecTitle").textContent = "Egresos";
  document.getElementById("ecAbout").textContent =
    "Selecciona las categorías de egreso que te representan.";
  const ecList = createList(expensesCategories, "ec");
  const ecAddNew = addNewItem(categoryType, "Nueva categoría:", "ec");
  document.getElementById("ecList").appendChild(ecList);
  document.getElementById("ecAddNew").appendChild(ecAddNew);
  const modEC = document.getElementById("ecEditBtn");
  modEC.addEventListener("click", updateExpensesCategories);
  const addEC = document.getElementById("ecaddBtn");
  addEC.addEventListener("click", addNewExpenseCategory);
}

// Agrega al array expensescategories un nuevo objeto. Actualiza el listado.
function addNewIncomeCategory() {
  const incomeCategories = JSON.parse(localStorage.getItem("incomeCategories"));
  const icName = document.getElementById("addItemInput").value;
  const icType = document.getElementById("addTypeSelect").value;
  const newIC = new movCategory(icName, icType, true);
  incomeCategories.push(newIC);
  const listDiv = document.getElementById("icList");
  listDiv.removeChild(listDiv.lastChild);
  const icList = createList(incomeCategories, "ic");
  document.getElementById("icList").appendChild(icList);
  localStorage.setItem("incomeCategories", JSON.stringify(incomeCategories));
}

// Guarda las modificaciones de la propiedad active en cada categoria.
function updateIncomeCategories() {
  const incomeCategories = JSON.parse(localStorage.getItem("incomeCategories"));

  console.table(incomeCategories);
  for (let index = 0; index < incomeCategories.length; index++) {
    const userChoice = document.getElementById("ic-" + index);
    incomeCategories[index].active = userChoice.checked;
    console.log(userChoice, userChoice.checked);
  }
  console.table(incomeCategories);
  localStorage.setItem("incomeCategories", JSON.stringify(incomeCategories));
}

// function editEC: administra la creación y modificacion de categorias de egresos
function editIC() {
  const incomeCategories = JSON.parse(localStorage.getItem("incomeCategories"));
  console.log("Edición de Categorías de ingreso");
  clearMainSection();
  userEditContainer("ic");
  document.getElementById("icTitle").textContent = "Ingresos";
  document.getElementById("icAbout").textContent =
    "Selecciona las categorías de Ingresos que te representan.";
  const icList = createList(incomeCategories, "ic");
  const icAddNew = addNewItem(categoryType, "Nueva categoría:", "ic");
  document.getElementById("icList").appendChild(icList);
  document.getElementById("icAddNew").appendChild(icAddNew);
  const modIC = document.getElementById("icEditBtn");
  modIC.addEventListener("click", updateIncomeCategories);
  const addIC = document.getElementById("icaddBtn");
  addIC.addEventListener("click", addNewIncomeCategory);
}

// Función principal que controla la secuencia de pasos del tutorial.
function main() {
  initData();
  const lsUser = JSON.parse(localStorage.getItem("user"));
  console.log(lsUser);
  if (lsUser === null) {
    createUser();
  } else {
    const helloUser = document.getElementById("hello-user");
    helloUser.innerText = "Hola " + lsUser.name;
    const divUserAccount = document.getElementById("user-account");
    divUserAccount.remove();
    createUserSetMenu();
  }
}

main();
