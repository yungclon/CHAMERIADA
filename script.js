const expenseBtn = document.querySelector(".expenseCat");
const savingBtn = document.querySelector(".savingCat");
const debtBtn = document.querySelector(".debtCat")
const SetConfirmBtn = document.querySelector(".SetConfirmBtn");
const SetCancelBtn = document.querySelector(".SetCancelBtn");
const addBtn = document.querySelector(".addBtn");
const setBtn = document.querySelector(".setBtn")
const inputs = document.querySelector(".inputs");
const settings = document.querySelector(".settings");
const mainScreen = document.querySelector(".wraper");
const inputName = document.querySelector(".inputName");
const inputAmnt = document.querySelector(".inputAmnt");
const checkoutBtn = document.querySelector(".checkoutBtn");
const expandMoreBtn = document.querySelector(".expandMoreBtn");
const expandLessBtn = document.querySelector(".expandLessBtn");


const list = document.querySelector(".list");
const balanceAmnt = document.querySelector(".balanceAmnt");
const plannedBalanceAmnt = document.querySelector(".plannedBalanceAmnt");
const debtsAmnt = document.querySelector(".debtsAmnt");
const expensesAmnt = document.querySelector(".expensesAmnt");
const setInput = document.querySelector(".setInput");

// let plannedExpenses = 0;
// let balance = 0.00;
let debts = 0.00;
let category = ""
// let expenses = 0;
inputName.addEventListener ("click", () => { window.scrollTo(0, document.body.scrollHeight);});
inputAmnt.addEventListener ("click", () => { window.scrollTo(0, document.body.scrollHeight);});


// NAVIGATION
expandLessBtn.addEventListener ("click", () => {
  
  let sectionToHide = document.querySelector(".sectionToHide");
  sectionToHide.classList.add("hiddenVisually");
    setTimeout(function () {
   
      let sectionToHide = document.querySelector(".sectionToHide");
      sectionToHide.classList.remove("expanded");
      sectionToHide.classList.add("blockDisplay");
      let dashboard = document.querySelector(".dashboard");
      dashboard.classList.remove("expanded");
      // expandLessBtn.classList.add("hidden");
      // expandMoreBtn.classList.remove("hidden");
  },100);
  let expandLessBtn = document.querySelector(".expandLessBtn");
  let expandMoreBtn = document.querySelector(".expandMoreBtn");
  expandLessBtn.style.display = "none";
  expandMoreBtn.style.display = "flex";
});

expandMoreBtn.addEventListener ("click", () => {
  let dashboard = document.querySelector(".dashboard");
  dashboard.classList.add("expanded");
  let sectionToHide = document.querySelector(".sectionToHide");
  sectionToHide.classList.remove("blockDisplay");
  let expandMoreBtn = document.querySelector(".expandMoreBtn");
  expandMoreBtn.style.display = "none";
    setTimeout(function () {
    let sectionToHide = document.querySelector(".sectionToHide");
    sectionToHide.classList.remove("hiddenVisually");
      
      sectionToHide.classList.add("expanded");
      // expandMoreBtn.classList.add("hidden");
      // expandLessBtn.classList.remove("hidden");
      let expandLessBtn = document.querySelector(".expandLessBtn");
    expandLessBtn.style.display = "flex";
    },100);
  
 
});
function showInput() {
	inputs.classList.remove("hidden");
	addBtn.classList.add("hidden");
	setBtn.classList.add("hidden");
	mainScreen.classList.add("hidden");
 
};

function showSettings() {
	settings.classList.remove("hidden");
	addBtn.classList.add("hidden");
	setBtn.classList.add("hidden");
	mainScreen.classList.add("hidden");

}
function setToMainScreen() {
	settings.classList.add("hidden");
	addBtn.classList.remove("hidden");
	setBtn.classList.remove("hidden");
	mainScreen.classList.remove("hidden");
}
function inputToMainScreen() {
	inputs.classList.add("hidden");
	addBtn.classList.remove("hidden");
	setBtn.classList.remove("hidden");
	mainScreen.classList.remove("hidden");
}
function setBalance(){
	// NAVIGATION
	settings.classList.add("hidden");
	addBtn.classList.remove("hidden");
	setBtn.classList.remove("hidden");
	mainScreen.classList.remove("hidden");
	// LOGIC
	balance = parseInt(setInput.value);
	balanceAmnt.innerHTML = balance - expensesAmnt.innerText;
  plannedBalanceAmnt.innerHTML = balance - expensesAmnt.innerText;

}

const modifyExpenses = (element, edit = false, isPaid = false) => {
  let currentBalance = balanceAmnt.innerText;
  let currentPlannedBalance= plannedBalanceAmnt.innerText;
  let currentExpense = expensesAmnt.innerText;
  let tempParent  = element.parentElement;
  let parentDiv = tempParent.parentElement;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
	showInput();
    let parentText = parentDiv.querySelector(".name").innerText;
    inputName.value = parentText;
    inputAmnt.value = parentAmount;
  };
  if (isPaid) {
    balanceAmnt.innerText = parseFloat(currentBalance) + parseFloat(parentAmount);
    plannedBalanceAmnt.innerText = parseFloat(currentPlannedBalance) + parseFloat(parentAmount);
    expensesAmnt.innerText = parseFloat(currentExpense) - parseFloat(parentAmount);
    parentDiv.remove();
  }
  else{
  plannedBalanceAmnt.innerText = parseFloat(currentPlannedBalance) + parseFloat(parentAmount);
  parentDiv.remove();
  }
};

const modifyDebts = (element, edit = false, isPaid = false) => {
  let currentBalance = balanceAmnt.innerText;
  let currentPlannedBalance= plannedBalanceAmnt.innerText;
  let currentDebt = debtsAmnt.innerText;
  let tempParent  = element.parentElement;
  let parentDiv = tempParent.parentElement;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
	showInput();
    let parentText = parentDiv.querySelector(".name").innerText;
    inputName.value = parentText;
    inputAmnt.value = parentAmount;
  };
  if (isPaid) {
  
    
    balanceAmnt.innerText = parseFloat(currentBalance) + parseFloat(parentAmount);
    plannedBalanceAmnt.innerText = parseFloat(currentPlannedBalance) + parseFloat(parentAmount);
    debtsAmnt.innerText = parseFloat(debtsAmnt.innerText) - parseFloat(parentAmount);
    
    parentDiv.remove();
  }
  else{
  plannedBalanceAmnt.innerText = parseFloat(currentPlannedBalance) + parseFloat(parentAmount);
  parentDiv.remove();
  }
};

const listCreatorExpense = (expenseName, expenseValue) => {
  let paidCheck = false;
  let newTile = document.createElement("div");
  newTile.classList.add("tile");
  list.appendChild(newTile);
  let clicked = false;
  newTile.addEventListener("click", () => {
    if (clicked == false){
      newTile.classList.add("active");
      newTile.style.marginBottom= "70px";
      clicked = true;
      console.log(clicked);
      return;
    }
    if (clicked == true){
      newTile.classList.remove("active");
      newTile.style.marginBottom= "20px";
      clicked = false;
      console.log(clicked);
      return;
    }
  });
  newTile.innerHTML = `<div class="name expense">${expenseName}</div><div class="amount expense">${expenseValue}</div> <div class="tilePLN expense">PLN</div>`;
  let tileControlsWraper = document.createElement("div");
  tileControlsWraper.classList.add("tileControlsWraper")
  newTile.appendChild(tileControlsWraper);
  let editButton = document.createElement("div");
  editButton.classList.add("editBtn");
  let editButtonIcon = document.createElement("span");
  editButtonIcon.innerHTML = `<span class="btnIcon adjustEditIcon material-symbols-rounded">edit_square</span>`;
  editButton.appendChild(editButtonIcon);

  editButton.addEventListener("click", () => {
    modifyExpenses(editButton, true);
  });
  let deleteButton = document.createElement("div");
  deleteButton.classList.add("delBtn");
  let deleteButtonIcon = document.createElement("span");
  deleteButtonIcon.classList.add("btnIcon", "material-symbols-rounded")
  deleteButtonIcon.innerHTML = `delete`;
  deleteButton.appendChild(deleteButtonIcon);
  deleteButton.addEventListener("click", () => {
    if (paidCheck == true){
      modifyExpenses(deleteButton,false,true);
    } else {
      modifyExpenses(deleteButton);
      }
  });

  let checkoutBtn = document.createElement("div");
  checkoutBtn.classList.add("checkoutBtn");
  let checkoutBtnIcon = document.createElement("span");
  checkoutBtnIcon.classList.add("btnIcon", "adjustCheckIcon", "material-symbols-rounded")
  checkoutBtnIcon.innerHTML =  `payments`;
  checkoutBtn.appendChild(checkoutBtnIcon);

  checkoutBtn.addEventListener("click", () =>{
    let tempParent  = checkoutBtn.parentElement;
    let parentDiv = tempParent.parentElement;
    let newExpense = parseFloat(parentDiv.querySelector(".amount").innerText);
    parentDiv.style.background = "#346159";
    tempParent.style.opacity = "50%";
    //Total expense (existing + new)
    let sumExpense = parseFloat(expensesAmnt.innerText) + newExpense;
    expensesAmnt.innerText = sumExpense;
    //Total balance(budget - total expense)
    const totalBalance = parseFloat(balanceAmnt.innerText) - newExpense;
    balanceAmnt.innerText = totalBalance;
    paidCheck = true;
    
  });
  tileControlsWraper.appendChild(editButton);
  tileControlsWraper.appendChild(deleteButton);
  tileControlsWraper.appendChild(checkoutBtn);
  document.querySelector(".list").appendChild(newTile);
	newTile.style.backgroundColor = "var(--tile)";
  };

expenseBtn.addEventListener ("click", () => {
  category = "expense";
  inputToMainScreen();
  let newExpense = parseFloat(inputAmnt.value);
  
  //Total expense (existing + new)
  let sumExpense = parseFloat(expensesAmnt.innerText) + newExpense;
  const planedBalance = parseFloat(plannedBalanceAmnt.innerText) - sumExpense;
  plannedBalanceAmnt.innerText = planedBalance;

  listCreatorExpense(inputName.value, inputAmnt.value);
  
  //Empty inputs
  inputName.value = "";
  inputAmnt.value = "";
  
});

const listCreatorDebt = (expenseName, expenseValue) => {
  let paidCheck = false;
  let newTile = document.createElement("div");
  newTile.classList.add("tile");
  list.appendChild(newTile);
  let clicked = false;
  newTile.addEventListener("click", () => {
    if (clicked == false){
      newTile.classList.add("active");
      newTile.style.marginBottom= "70px";
      clicked = true;
      console.log(clicked);
      return;
    }
    if (clicked == true){
      newTile.classList.remove("active");
      newTile.style.marginBottom= "20px";
      clicked = false;
      console.log(clicked);
      return;
    }
  });
  newTile.innerHTML = `<div class="name debt">${expenseName}</div><div class="amount debt">${expenseValue}</div> <div class="tilePLN debt">PLN</div>`;
  let tileControlsWraper = document.createElement("div");
  tileControlsWraper.classList.add("tileControlsWraper")
  newTile.appendChild(tileControlsWraper);
  let editButton = document.createElement("div");
  editButton.classList.add("editBtn");
  let editButtonIcon = document.createElement("span");
  editButtonIcon.innerHTML = `<span class="btnIcon adjustEditIcon material-symbols-rounded">edit_square</span>`;
  editButton.appendChild(editButtonIcon);

  editButton.addEventListener("click", () => {
    modifyDebts(editButton, true);
  });
  let deleteButton = document.createElement("div");
  deleteButton.classList.add("delBtn");
  let deleteButtonIcon = document.createElement("span");
  deleteButtonIcon.classList.add("btnIcon", "material-symbols-rounded")
  deleteButtonIcon.innerHTML = `delete`;
  deleteButton.appendChild(deleteButtonIcon);
  deleteButton.addEventListener("click", () => {
    if (paidCheck == true){
      modifyDebts(deleteButton,false,true);
    } else {
      modifyDebts(deleteButton);
      }
  });

  let checkoutBtn = document.createElement("div");
  checkoutBtn.classList.add("checkoutBtn");
  let checkoutBtnIcon = document.createElement("span");
  checkoutBtnIcon.classList.add("btnIcon", "adjustCheckIcon", "material-symbols-rounded")
  checkoutBtnIcon.innerHTML =  `payments`;
  checkoutBtn.appendChild(checkoutBtnIcon);

  checkoutBtn.addEventListener("click", () =>{
    let tempParent  = checkoutBtn.parentElement;
    let parentDiv = tempParent.parentElement;
    let newDebt = parseFloat(parentDiv.querySelector(".amount").innerText);
    parentDiv.style.background = "#7d281f";
    tempParent.style.opacity = "50%";
    //Total expense (existing + new)
    let sumDebt = parseFloat(debtsAmnt.innerText) + newDebt;
    debtsAmnt.innerText = sumDebt;
    //Total balance(budget - total expense)
    const totalBalance = parseFloat(balanceAmnt.innerText) - newDebt;
    balanceAmnt.innerText = totalBalance;
    paidCheck = true;
    
  });
  tileControlsWraper.appendChild(editButton);
  tileControlsWraper.appendChild(deleteButton);
  tileControlsWraper.appendChild(checkoutBtn);
  document.querySelector(".list").appendChild(newTile);
  newTile.style.backgroundColor = "var(--debtsTile)";
  
 

};

debtBtn.addEventListener ("click", () => {
category = "debt";
inputToMainScreen();
let newDebt = parseFloat(inputAmnt.value);

  //Total debt (existing + new)
  let sumDebt = parseFloat(debtsAmnt.innerText) + newDebt;
  const planedBalance = parseFloat(plannedBalanceAmnt.innerText) - sumDebt;
  plannedBalanceAmnt.innerText = planedBalance;

  listCreatorDebt(inputName.value, inputAmnt.value);
  
  //Empty inputs
  inputName.value = "";
  inputAmnt.value = "";

});





addBtn.addEventListener ("click", showInput);
setBtn.addEventListener ("click", showSettings);
SetConfirmBtn.addEventListener ("click", setBalance);
SetCancelBtn.addEventListener ("click", setToMainScreen);


// savingBtn.addEventListener ("click", inputToMainScreen);
