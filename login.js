import data from "./data.js";


const d = document;
const form = d.getElementById("login-form");


// Functions
// Validar la cuenta existente
const validateAccount = (arr, username) => {
  return arr.find(acc => acc.username === username);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = form.username.value || "";
  const passcode = form.passcode.value || "";
  let validAccount;
  
  if(username) validAccount = validateAccount(data, username);
  // console.log(validAccount)


  if(validAccount){
    if(validAccount.passcode !== passcode) console.log("passcode incorrect");

    if(validAccount,username === username && validAccount.passcode === passcode) {
      console.log("entrar al sistema")
    }
  }
  else {
    console.log("Account does not exist");
  }
})
