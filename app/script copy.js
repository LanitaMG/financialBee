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
}

// Billeteras
class Wallet {
  constructor(name, type, active) {
    this.name = name;
    this.type = type;
    this.active = active;
  }
}

class movCategory {
  constructor(name, type, active) {
    this.name = name;
    this.type = type;
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

function createUserWindow() {
  const divContainer = document.createElement("section");
  divContainer.classList += "container shadow p-3 w-50 mt-3";
  divContainer.id = "user-account";
  divContainer.innerHTML = `
      <h2>Vamos a crear tu cuenta</h2>
      <p>Por favor ingresa los siguientes datos:</p>
      <span class="text-danger" id="er-text"></span>
      <form>
        <div class="mb-3">
          <label class="form-label" for="user-name">Usuario:</label>
          <input type="text" name="user-name" id="user-name" class="form-control" aria-describedby="user-help">
          <div class="form-text" id="user-help">Debe contener al menos 3 letras.</div>
        </div>
        <div class="mb-3">
          <label for="user-email" class="form-label">Correo Electrónico:</label>
          <input type="email" name="user-email" id="user-email" class="form-control">
        </div>
        <div class="mb-3">
          <label for="user-password-1" class="form-label">Contraseña</label>
          <input type="password" name="user-password-1" id="user-password-1" class="form-control"
            aria-describedby="userp-help">
          <div class="form-text" id="userp-help">Debe contener al menos 6 letras.</div>
        </div>
        <div class="mb-3">
          <label for="user-password-2" class="form-label">Reingrese la contraseña:</label>
          <input type="password" name="user-password-2" id="user-password-2" class="form-control">
        </div>
        <button class="btn btn-dark" id="btnNewUser">Crear usuario</button>
      </form>
`;

  mainSection.appendChild(divContainer);
}

//function createUser: gestiona la creación del nombre de usuario y contraseña.
function createUser() {
  createUserWindow();
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
      errorMsg += "Correo no válido. ";
      createUserOK = false;
    }

    if (password1.length < 6) {
      errorMsg += "Contraseña no válida. ";
      createUserOK = false;
    }

    if (password1 !== password2) {
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

// Genera una estructura div-title-about-list-add-exit para las secciones de personalización.
function userEditContainer(sectionName) {
  const divContainer = document.createElement("section");
  divContainer.classList +=
    "w-75 shadow p-3 d-flex flex-column text-center container ";
  divContainer.id = sectionName;
  divContainer.innerHTML = `
      <h2 id="title"></h2>  
      <p id="about"></p>
      <div id="list" class="p-3 align-self-center w-75 mx-auto" ></div>
      <div id="addNew"></div>
      <button id="editExit" class="btn btn-dark">Finalizar</button>`;
  mainSection.appendChild(divContainer);
  document
    .getElementById("editExit")
    .addEventListener("click", createUserSetMenu);
}

// Menú: Crea los botones de acceso a las opciones de personalización

function createUserSetMenu() {
  clearMainSection();
  const menuSection = document.createElement("section");
  menuSection.classList += "container shadow p-3 d-flex justify-content-around";
  const menuText = ["Billeteras", "Egresos", "Ingresos"];
  const menuId = ["wallets", "EC", "IC"];
  const menuEvent = [editWallets, editEC, editIC];
  menuText.forEach((element, index) => {
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
  checkList.classList += "p-3 ";
  arr.forEach((element, index) => {
    let check = "";
    if (element.active) {
      check = `
      <input type="checkbox" name="${preId}-${index}" id="${preId}-${index}" class="form-check-input col-2" checked></input>
      `;
    } else {
      check = `
      <input type="checkbox" name="${preId}-${index}" id="${preId}-${index}" class="form-check-input col-2"></input>
      `;
    }

    const listItem = `
      <div class="row border-bottom p-1">
        ${check}
        <span class="px-3 col-5">${element.name}</span>
        <span class="px-3 col-5">${element.type}</span>
      </div>
      `;
    checkList.innerHTML += listItem;
    // document.getElementById(`${preId}-${index}`).checked = element.active;
  });

  const editBtn = document.createElement("button");
  editBtn.id = "editBtn";
  editBtn.textContent = "Guardar modificaciones";
  editBtn.classList += "btn btn-dark m-3";
  checkList.appendChild(editBtn);

  return checkList;
}

// GEnera el div que contienen las opciones para agregar un nuevo item.
function addNewItem(arTypes, label) {
  const addItemDiv = document.createElement("div");
  addItemDiv.classList += "pt-3";
  let selectOptions = "";
  arTypes.forEach((element) => {
    selectOptions += `
    <option value="${element}">${element}</option>
    `;
  });

  addItemDiv.innerHTML = `
    <label for="addItemInput" class="form-label">${label}</label>
    <input type="text" id="addItemInput" class="form-input">
    <select name="addTypeSelect" id="addTypeSelect" class="form-input">
      ${selectOptions}
    </select>
    <button id="addBtn" class="btn btn-dark m-3">Agregar</button>
    `;
  return addItemDiv;
}

// Guarda las modificaciones de la propiedad active en cada billetera.
function updateWallets() {
  const upWallets = JSON.parse(localStorage.getItem("wallets"));
  for (let index = 0; index < upWallets.length; index++) {
    const userChoice = document.getElementById("wallet-" + index);
    upWallets[index].active = userChoice.checked;
  }

  localStorage.setItem("wallets", JSON.stringify(upWallets));
}

// Agrega al array wallets un nuevo objeto. Actualiza el listado.
function addNewWallet() {
  const wallets = JSON.parse(localStorage.getItem("wallets"));
  const walletName = document.getElementById("addItemInput").value;
  const walletType = document.getElementById("addTypeSelect").value;
  const newWallet = new Wallet(walletName, walletType, true);
  wallets.push(newWallet);
  const listDiv = document.getElementById("list");
  listDiv.removeChild(listDiv.lastChild);
  const walletsList = createList(wallets, "wallet");
  document.getElementById("list").appendChild(walletsList);
  const modWallets = document.getElementById("editBtn");
  modWallets.addEventListener("click", updateWallets);
  localStorage.setItem("wallets", JSON.stringify(wallets));
}

// function editWallets: administra la creación y modificacion de billeteras
function editWallets() {
  const wallets = JSON.parse(localStorage.getItem("wallets"));
  clearMainSection();
  userEditContainer("wallets");
  document.getElementById("title").textContent = "Billeteras";
  document.getElementById("about").textContent =
    "Selecciona las billeteras que dispones.";
  const walletsList = createList(wallets, "wallet");
  const walletsAddNew = addNewItem(walletType, "Nueva billetera:", "wallet");
  document.getElementById("list").appendChild(walletsList);
  document.getElementById("addNew").appendChild(walletsAddNew);
  const modWallets = document.getElementById("editBtn");
  modWallets.addEventListener("click", updateWallets);
  const addWallets = document.getElementById("addBtn");
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
  const listDiv = document.getElementById("list");
  listDiv.removeChild(listDiv.lastChild);
  const ecList = createList(expensesCategories, "ec");
  document.getElementById("list").appendChild(ecList);
  const modWallets = document.getElementById("editBtn");
  modWallets.addEventListener("click", updateExpensesCategories);
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

  for (let index = 0; index < expensesCategories.length; index++) {
    const userChoice = document.getElementById("ec-" + index);
    expensesCategories[index].active = userChoice.checked;
  }
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
  clearMainSection();
  userEditContainer("ec");
  document.getElementById("title").textContent = "Egresos";
  document.getElementById("about").textContent =
    "Selecciona las categorías de egreso que te representan.";
  const ecList = createList(expensesCategories, "ec");
  const ecAddNew = addNewItem(categoryType, "Nueva categoría:", "ec");
  document.getElementById("list").appendChild(ecList);
  document.getElementById("addNew").appendChild(ecAddNew);
  const modEC = document.getElementById("editBtn");
  modEC.addEventListener("click", updateExpensesCategories);
  const addEC = document.getElementById("addBtn");
  addEC.addEventListener("click", addNewExpenseCategory);
}

// Agrega al array expensescategories un nuevo objeto. Actualiza el listado.
function addNewIncomeCategory() {
  const incomeCategories = JSON.parse(localStorage.getItem("incomeCategories"));
  const icName = document.getElementById("addItemInput").value;
  const icType = document.getElementById("addTypeSelect").value;
  const newIC = new movCategory(icName, icType, true);
  incomeCategories.push(newIC);
  const listDiv = document.getElementById("list");
  listDiv.removeChild(listDiv.lastChild);
  const icList = createList(incomeCategories, "ic");
  document.getElementById("list").appendChild(icList);
  const modWallets = document.getElementById("editBtn");
  modWallets.addEventListener("click", updateIncomeCategories);
  localStorage.setItem("incomeCategories", JSON.stringify(incomeCategories));
}

// Guarda las modificaciones de la propiedad active en cada categoria.
function updateIncomeCategories() {
  const incomeCategories = JSON.parse(localStorage.getItem("incomeCategories"));
  for (let index = 0; index < incomeCategories.length; index++) {
    const userChoice = document.getElementById("ic-" + index);
    incomeCategories[index].active = userChoice.checked;
  }
  localStorage.setItem("incomeCategories", JSON.stringify(incomeCategories));
}

// function editEC: administra la creación y modificacion de categorias de egresos
function editIC() {
  const incomeCategories = JSON.parse(localStorage.getItem("incomeCategories"));
  clearMainSection();
  userEditContainer("ic");
  document.getElementById("title").textContent = "Ingresos";
  document.getElementById("about").textContent =
    "Selecciona las categorías de Ingresos que te representan.";
  const icList = createList(incomeCategories, "ic");
  const icAddNew = addNewItem(categoryType, "Nueva categoría:", "ic");
  document.getElementById("list").appendChild(icList);
  document.getElementById("addNew").appendChild(icAddNew);
  const modIC = document.getElementById("editBtn");
  modIC.addEventListener("click", updateIncomeCategories);
  const addIC = document.getElementById("addBtn");
  addIC.addEventListener("click", addNewIncomeCategory);
}

// Función principal que controla la secuencia de pasos del tutorial.
function main() {
  const lsUser = JSON.parse(localStorage.getItem("user"));

  if (lsUser === null) {
    initData();
    createUser();
  } else {
    const helloUser = document.getElementById("hello-user");
    helloUser.innerText = "Hola " + lsUser.name;
    const divUserAccount = document.getElementById("user-account");
    createUserSetMenu();
  }
}

main();
