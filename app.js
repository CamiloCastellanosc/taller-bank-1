const accounts = [
  {
    "numberAccount": "00112341",
    "passcode": "123451",
    "owner": "Lucía Romero",
    "balance": 500
  },
  {
    "numberAccount": "00112342",
    "passcode": "123452",
    "owner": "Pedro Pérez",
    "balance": 300
  },
  {
    "numberAccount": "00112343",
    "passcode": "123453",
    "owner": "Luis Muñoz",
    "balance": 200
  },
  {
    "numberAccount": "00112344",
    "passcode": "123454",
    "owner": "Amaranto Perea",
    "balance": 800
  }
]

// Variables 
const date = new Date();
console.log(date.toLocaleDateString())
console.log(date.toLocaleTimeString())

const d = document;
const sectionAccounts = d.getElementById("section-accounts"); // seleciono sección
const sectionMain = d.getElementById("section-main");
const template = d.getElementById("template-accounts").content;
const fragment = d.createDocumentFragment();

let validAccount;
let typeTransaction;

// Functions
// Validar la cuenta existente
const validateAccount = (arr, numberAccount) => {
  return arr.find(acc => acc.numberAccount === numberAccount);
}

// Validar passcode o clave
const validatePasscode = (acc, passcode) => {
  return acc.passcode === passcode;
}

// Insertar dinero
const insertCash = (acc, amount) => {
  if(acc) {
    if(acc.balance + amount > 990) return;

    acc.balance += amount;
    return true;
  }
}

// Retirar dinero
const withdrawCash = (acc, amount) => {
  if(acc) {
    if(acc.balance - amount < 10) return;

    acc.balance -= amount;
    return true;
  }
}

const makeTransaction = (acc, type, passcode, amount) => {
  const validPasscode = validatePasscode(acc, passcode);

  if(validPasscode) {
    if(type === "insert") {
      const validTransaction = insertCash(acc, amount);
      if(validTransaction === true) console.log("Transferencia exitosa!")
      else console.log("Monto inválido")
    }

    if(type === "withdraw") {
      const validTransaction = withdrawCash(acc, amount);
      if(validTransaction === true) console.log("Transferencia exitosa!")
      else console.log("Saldo insuficiente")
    }
  } else {
    console.log("Clave Incorrecta")
  }
}

accounts.forEach((acc) => {
 template.querySelector("a").textContent = acc.numberAccount;
 let clone = d.importNode(template, true);
 fragment.appendChild(clone);
})

sectionAccounts.appendChild(fragment);

d.addEventListener("click", e => {

  if(e.target.matches(".link-account")) {
    e.preventDefault();
    const numberAccount = e.target.textContent;
    validAccount = validateAccount(accounts, numberAccount);
    console.log(validAccount)

    if(validAccount) {
      sectionAccounts.classList.add("d-none");
      sectionMain.querySelector("#owner-account").textContent = validAccount.owner;
      sectionMain.classList.remove("d-none");
    }
  }

  // Realizar transacción
  if(e.target.matches("#insert-cash")) {
    typeTransaction = "insert";
    d.querySelector(".modal-title").textContent = "Ingresar Dinero"
  }

  if(e.target.matches("#withdraw-cash")) {
    typeTransaction = "withdraw";
    d.querySelector(".modal-title").textContent = "Retirar Dinero"
  }

  if(e.target.matches("#btn-transaction")) {
    const passcode = d.getElementById("passcode").value;
    let amount = Number(d.getElementById("amount").value);

    console.log("Antes " + validAccount.balance)
    makeTransaction(validAccount, typeTransaction, passcode, amount)
    console.log("Después " + validAccount.balance)
    console.log(validAccount)
  }

  if(e.target.matches("#detail-account")) console.log(validAccount)

  if(e.target.matches("#logout")) {
    sectionMain.classList.add("d-none");
    sectionAccounts.classList.remove("d-none");
  }
})

