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
const dashboard = document.querySelector(".dashboard");
const inputName = document.querySelector(".inputName");
const inputAmnt = document.querySelector(".inputAmnt");
const checkoutBtn = document.querySelector(".checkoutBtn");
const expandMoreBtn = document.querySelector(".expandMoreBtn");
const expandLessBtn = document.querySelector(".expandLessBtn");
let dashboardExpander = document.querySelector(".dashboardExpander");
let topBar = document.querySelector(".topBar");
const list = document.querySelector(".list");
const balanceAmnt = document.querySelector(".balanceAmnt");
const plannedBalanceAmnt = document.querySelector(".plannedBalanceAmnt");
const debtsAmnt = document.querySelector(".debtsAmnt");
const expensesAmnt = document.querySelector(".expensesAmnt");
const setInput = document.querySelector(".setInput");
let debts = 0.00;


// HOLDERS
let plannedBalanceHolder = 0.0;
let plannedExpensesHolder = 0.0;
let plannedDebtsHolder = 0.0;
let category = ""
let dashboardExpanded = false;
let body = document.querySelector("body");
const fromDb = undefined;
let listArray =  [];


let listArray_deserialized = JSON.parse(localStorage.getItem("listArraySaved"));
let plannedBalanceHolder_deserialized = JSON.parse(localStorage.getItem("plannedBalanceHolder"));
let balance_saver_unserialized = JSON.parse(localStorage.getItem("balance_saver"));




if(balance_saver_unserialized > 0) {
  balanceAmnt.innerHTML = balance_saver_unserialized;
   plannedBalanceHolder = plannedBalanceHolder_deserialized;
    //  balanceAmnt.innerHTML -
    //   parseFloat(plannedExpensesHolder);
   plannedBalanceAmnt.innerHTML = plannedBalanceHolder.toFixed(2);
};

const listCreatorExpense_storage = (expenseName, expenseValue, ID, paidCheck) => {
  
  let checkoutClick = false;
  let left = true;
  let right = true;
  let newTile = document.createElement("div");
  newTile.classList.add("tile");
  list.appendChild(newTile);
  newTile.innerHTML = `<div class="name expense">${expenseName}</div><div class="amount expense">${expenseValue}</div> <div class="tilePLN expense">PLN</div>`;
  let tileControlsWraper = document.createElement("div");
  tileControlsWraper.classList.add("tileControlsWraper");
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
  deleteButtonIcon.classList.add("btnIcon", "material-symbols-rounded");
  deleteButtonIcon.innerHTML = `delete`;
  deleteButton.appendChild(deleteButtonIcon);

  deleteButton.addEventListener("click", () => {
    if (paidCheck == true) {
      modifyExpenses(deleteButton, false, true);
    } else {
      modifyExpenses(deleteButton);
     if(listArray_deserialized.length > 1){
      listArray_deserialized.splice(ID, 1);
      listArray_deserialized.forEach((object) => {
        let index_nr = listArray_deserialized.indexOf(object);
        object.ID = index_nr;
        console.log(listArray_deserialized);
      });
    }
      if(listArray_deserialized.length == 1){
        listArray_deserialized= [];
      };
      let listArray_serialized = JSON.stringify(listArray_deserialized);
      localStorage.setItem("listArraySaved", listArray_serialized);
    }
  });
  let checkoutBtn = document.createElement("div");
  checkoutBtn.classList.add("checkoutBtn");
  let checkoutBtnIcon = document.createElement("span");
  checkoutBtnIcon.classList.add(
    "btnIcon",
    "adjustCheckIcon",
    "material-symbols-rounded"
  );
  checkoutBtnIcon.innerHTML = `payments`;
  checkoutBtn.appendChild(checkoutBtnIcon);
  let tileWraper = document.createElement("div");
  tileWraper.classList.add("tileWraper");
  tileControlsWraper.appendChild(editButton);
  tileControlsWraper.appendChild(deleteButton);
  tileControlsWraper.appendChild(checkoutBtn);
  document.querySelector(".list").appendChild(tileWraper);
  tileWraper.appendChild(newTile);
  tileWraper.appendChild(tileControlsWraper);
  newTile.style.backgroundColor = "var(--tile)";
  let leftTouchpad = document.createElement("div");
  leftTouchpad.classList.add("leftTouchpad");
  let rightTouchpad = document.createElement("div");
  rightTouchpad.classList.add("rightTouchpad");
  newTile.appendChild(leftTouchpad);
  newTile.appendChild(rightTouchpad);

  rightTouchpad.addEventListener("click", () => {
    // MOVE TILE LEFT
    if (left == true) {
      newTile.classList.add("left");
      rightTouchpad.style.width = "300px";
      leftTouchpad.style.width = "0px";
      left = false;
      return;
    }
    // MOVE TILE RIGHT
    if (left == false) {
      newTile.classList.remove("left");
      leftTouchpad.style.width = "120px";
      rightTouchpad.style.width = "120px";
      left = true;
      return;
    }
  });
    // checkout test
  if (paidCheck == true){
  let tempParent = checkoutBtn.parentElement;
  let parentDiv = tempParent.parentElement;
  let newExpense = parseFloat(parentDiv.querySelector(".amount").innerText);
  let sumExpense = parseFloat(expensesAmnt.innerText) + newExpense;
  expensesAmnt.innerText = sumExpense.toFixed(2);
  const totalBalance = parseFloat(balanceAmnt.innerText) - newExpense;
  balanceAmnt.innerText = totalBalance.toFixed(2);
  parentDiv.style.opacity = "50%";
  
  // paidCheck = true;
  // checkoutClick = true;
  // left = true;
  
  };

  checkoutBtn.addEventListener("click", () => {
    if (checkoutClick == false) {
      let tempParent = checkoutBtn.parentElement;
      let parentDiv = tempParent.parentElement;
      let newExpense = parseFloat(parentDiv.querySelector(".amount").innerText);
      let sumExpense = parseFloat(expensesAmnt.innerText) + newExpense;
      expensesAmnt.innerText = sumExpense.toFixed(2);
      const totalBalance = parseFloat(balanceAmnt.innerText) - newExpense;
      balanceAmnt.innerText = totalBalance.toFixed(2);
      parentDiv.style.opacity = "50%";
      newTile.classList.remove("left");
      leftTouchpad.style.width = "120px";
      rightTouchpad.style.width = "120px";
      paidCheck = true;
      checkoutClick = true;
      left = true;
      console.log(expenseName, expenseValue, ID, paidCheck);
      // let listArray_deserialized_local= JSON.parse(localStorage.getItem("listArraySaved"));
      console.log(listArray);
      let thisObj = listArray[ID];
      console.log(thisObj);
      thisObj.paidChecker = paidCheck;
      // thisObj.paidChecker = paidCheck;

      let listArray_serialized_local = JSON.stringify(listArray);
      console.log(listArray_serialized_local);
      localStorage.setItem("listArraySaved", listArray_serialized_local);
      return;
    }
    if (checkoutClick == true) {
      let tempParent = checkoutBtn.parentElement;
      let parentDiv = tempParent.parentElement;
      let newExpense = parseFloat(parentDiv.querySelector(".amount").innerText);
      let sumExpense = parseFloat(expensesAmnt.innerText) - newExpense;
      expensesAmnt.innerText = sumExpense.toFixed(2);
      const totalBalance = parseFloat(balanceAmnt.innerText) + newExpense;
      balanceAmnt.innerText = totalBalance.toFixed(2);
      parentDiv.style.opacity = "100%";
      newTile.classList.remove("left");
    leftTouchpad.style.width = "120px";
      rightTouchpad.style.width = "120px";
      paidCheck = false;
      checkoutClick = false;
      left = true;
      return;
    }
  });
  leftTouchpad.addEventListener("click", () => {
    // MOVE TILE RIGHT
    if (right == true) {
      newTile.classList.add("right");
      tileControlsWraper.classList.add("active");
      rightTouchpad.style.width = "0px";
      leftTouchpad.style.width = "300px";
      right = false;
      return;
    }
    // MOVE TILE LEFT
    if (right == false) {
      tileControlsWraper.classList.remove("left");
      newTile.classList.remove("right");
      leftTouchpad.style.width = "120px";
      rightTouchpad.style.width = "120px";
      right = true;
      return;
    }
  });
//   let paidChecker = paidCheck;
// let obj = { ID, expenseName, expenseValue, paidChecker };

};


if (listArray_deserialized != null) {
  listArray = listArray_deserialized;
  console.log(listArray);
  listArray.forEach((index) => {
    let newXdId = index.ID;
    let newExpense = index.expenseValue;
    plannedExpensesHolder = plannedExpensesHolder + newExpense;
  plannedBalanceHolder = plannedBalanceHolder - newExpense;
  plannedBalanceAmnt.innerText = plannedBalanceHolder.toFixed(2);
  listCreatorExpense_storage(index.expenseName, index.expenseValue, newXdId, index.paidChecker);
  });
}

dashboard.addEventListener ("click", () => {
  if (dashboardExpanded == false){
    dashboardExpander.classList.add("active");
    list.classList.add("down");
    dashboardExpanded = true;
    return;
  };
  if (dashboardExpanded == true){
    dashboardExpander.classList.remove("active");
    list.classList.remove("down");
    dashboardExpanded = false;
    return;
  };
});

function showInput() {
	inputs.classList.remove("hidden");
	addBtn.classList.add("hidden");
	setBtn.classList.add("hidden");
	mainScreen.classList.add("hidden");
  topBar.classList.add("hidden");
  let inputsTouchpad = document.createElement("div");
  inputsTouchpad.classList.add("inputsTouchpad");
  setTimeout(function () {
    body.appendChild(inputsTouchpad);
  },300)
  inputsTouchpad.addEventListener("click", () => {
    inputToMainScreen();
    inputsTouchpad.remove();
  });
};

function showSettings() {
	settings.classList.remove("hidden");
	addBtn.classList.add("hidden");
	setBtn.classList.add("hidden");
	mainScreen.classList.add("hidden");
  let settingsTouchpad = document.createElement("div");
  settingsTouchpad.classList.add("settingsTouchpad");
  setTimeout(function () {
    body.appendChild(settingsTouchpad);
  },300)
  settingsTouchpad.addEventListener("click", () => {
    setToMainScreen();
    settingsTouchpad.remove();
  });
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
  topBar.classList.remove("hidden");
}
function setBalance(){
  if (setInput.value == "" || setInput.value < 0) {
    setInput.classList.add("error");
    setTimeout(function () {
      setInput.classList.remove("error");
      return;
    },300);
  return;
  } 
  else {
    balance = parseFloat(setInput.value);
    settings.classList.add("hidden");
    addBtn.classList.remove("hidden");
    setBtn.classList.remove("hidden");
    mainScreen.classList.remove("hidden");
    balanceAmnt.innerHTML = 
      (balance - parseFloat(expensesAmnt.innerText + debtsAmnt.innerText)).toFixed(2);
    plannedBalanceHolder = balance - parseFloat(plannedExpensesHolder + plannedDebtsHolder);
    plannedBalanceAmnt.innerHTML = plannedBalanceHolder.toFixed(2);
    let balance_saver_serialized = JSON.stringify(balanceAmnt.innerHTML);
    localStorage.setItem("balance_saver", balance_saver_serialized);
  
  }
}

const modifyExpenses = (element, edit = false, isPaid = false) => {
  let currentBalance = balanceAmnt.innerText;
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
    balanceAmnt.innerText = (parseFloat(currentBalance) + parseFloat(parentAmount)).toFixed(2);
    plannedBalanceHolder = plannedBalanceHolder + parseFloat(parentAmount);
    plannedBalanceAmnt.innerText = plannedBalanceHolder.toFixed(2);
    plannedExpensesHolder = plannedExpensesHolder - parseFloat(parentAmount);
    expensesAmnt.innerText = parseFloat(plannedExpensesHolder.toFixed(2));
    parentDiv.remove();
  }else{
    plannedBalanceHolder = parseFloat(plannedBalanceHolder) + parseFloat(parentAmount);
    plannedBalanceAmnt.innerText = plannedBalanceHolder.toFixed(2);
    plannedExpensesHolder = plannedExpensesHolder - parseFloat(parentAmount);
    expensesAmnt.innerText = parseFloat(plannedExpensesHolder.toFixed(2));
    parentDiv.remove();
  }
};

const listCreatorExpense = (expenseName, expenseValue, ID, paidCheck) => {
  let paidChecker = false;
  let checkoutClick = false;
  let left = true;
  let right = true;
  let newTile = document.createElement("div");
   let obj = { ID, expenseName, expenseValue, paidChecker };
   listArray.push(obj);
   let newID = listArray.indexOf(obj);
   obj.ID = newID;
   listArray[newID].ID = newID;
   let listArray_serialized = JSON.stringify(listArray);
   localStorage.setItem("listArraySaved", listArray_serialized);

  newTile.classList.add("tile");
  list.appendChild(newTile);
  newTile.innerHTML = `<div class="name expense">${expenseName}</div><div class="amount expense">${expenseValue}</div> <div class="tilePLN expense">PLN</div>`;
  let tileControlsWraper = document.createElement("div");
  tileControlsWraper.classList.add("tileControlsWraper");
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
  deleteButtonIcon.classList.add("btnIcon", "material-symbols-rounded");
  deleteButtonIcon.innerHTML = `delete`;
  deleteButton.appendChild(deleteButtonIcon);
  deleteButton.addEventListener("click", () => {
    if (paidCheck == true) {
      modifyExpenses(deleteButton, false, true);
    } else {
      modifyExpenses(deleteButton);
      console.log(obj.ID);
      listArray.splice(obj.ID, 1);
      let listArray_serialized = JSON.stringify(listArray_deserialized);
      localStorage.setItem("listArraySaved", listArray_serialized);
    }
  });
  let checkoutBtn = document.createElement("div");
  checkoutBtn.classList.add("checkoutBtn");
  let checkoutBtnIcon = document.createElement("span");
  checkoutBtnIcon.classList.add(
    "btnIcon",
    "adjustCheckIcon",
    "material-symbols-rounded"
  );
  checkoutBtnIcon.innerHTML = `payments`;
  checkoutBtn.appendChild(checkoutBtnIcon);
  let tileWraper = document.createElement("div");
  tileWraper.classList.add("tileWraper");
  tileControlsWraper.appendChild(editButton);
  tileControlsWraper.appendChild(deleteButton);
  tileControlsWraper.appendChild(checkoutBtn);
  document.querySelector(".list").appendChild(tileWraper);
  tileWraper.appendChild(newTile);
  tileWraper.appendChild(tileControlsWraper);
  newTile.style.backgroundColor = "var(--tile)";
  let leftTouchpad = document.createElement("div");
  leftTouchpad.classList.add("leftTouchpad");
  let rightTouchpad = document.createElement("div");
  rightTouchpad.classList.add("rightTouchpad");
  newTile.appendChild(leftTouchpad);
  newTile.appendChild(rightTouchpad);

  rightTouchpad.addEventListener("click", () => {
    // MOVE TILE LEFT
    if (left == true) {
      newTile.classList.add("left");
      rightTouchpad.style.width = "300px";
      leftTouchpad.style.width = "0px";
      left = false;
      return;
    }
    // MOVE TILE RIGHT
    if (left == false) {
      newTile.classList.remove("left");
      leftTouchpad.style.width = "120px";
      rightTouchpad.style.width = "120px";
      left = true;
      return;
    }
  });
  checkoutBtn.addEventListener("click", () => {
    if (checkoutClick == false) {
      let tempParent = checkoutBtn.parentElement;
      let parentDiv = tempParent.parentElement;
      let newExpense = parseFloat(parentDiv.querySelector(".amount").innerText);
      let sumExpense = parseFloat(expensesAmnt.innerText) + newExpense;
      expensesAmnt.innerText = sumExpense.toFixed(2);
      const totalBalance = parseFloat(balanceAmnt.innerText) - newExpense;
      balanceAmnt.innerText = totalBalance.toFixed(2);
      localStorage.setItem(
        "balance_saver",
        JSON.stringify(totalBalance.innerHTML)
      );
      parentDiv.style.opacity = "50%";
      newTile.classList.remove("left");
      leftTouchpad.style.width = "120px";
      rightTouchpad.style.width = "120px";
      paidCheck = true;
      checkoutClick = true;
      left = true;

      // let listArray_deserialized = JSON.parse(
      //   localStorage.getItem("listArraySaved")
      // );
      let thisObj = listArray[ID];
      thisObj.paidChecker = paidCheck;
       let listArray_serialized = JSON.stringify(listArray);
       localStorage.setItem("listArraySaved", listArray_serialized);


      return;
    }
    if (checkoutClick == true) {
      let tempParent = checkoutBtn.parentElement;
      let parentDiv = tempParent.parentElement;
      let newExpense = parseFloat(parentDiv.querySelector(".amount").innerText);
      let sumExpense = parseFloat(expensesAmnt.innerText) - newExpense;
      expensesAmnt.innerText = sumExpense.toFixed(2);
      const totalBalance = parseFloat(balanceAmnt.innerText) + newExpense;
      balanceAmnt.innerText = totalBalance.toFixed(2);
      parentDiv.style.opacity = "100%";
      newTile.classList.remove("left");
      leftTouchpad.style.width = "120px";
      rightTouchpad.style.width = "120px";
      paidCheck = false;
      checkoutClick = false;
      left = true;
      return;
    }
  });
  leftTouchpad.addEventListener("click", () => {
    // MOVE TILE RIGHT
    if (right == true) {
      newTile.classList.add("right");
      tileControlsWraper.classList.add("active");
      rightTouchpad.style.width = "0px";
      leftTouchpad.style.width = "300px";
      right = false;
      return;
    }
    // MOVE TILE LEFT
    if (right == false) {
      tileControlsWraper.classList.remove("left");
      newTile.classList.remove("right");
      leftTouchpad.style.width = "120px";
      rightTouchpad.style.width = "120px";
      right = true;
      return;
    }
  });

 
};



const modifyDebts = (element, edit = false, isPaid = false) => {
  let currentBalance = balanceAmnt.innerText;
  let tempParent = element.parentElement;
  let parentDiv = tempParent.parentElement;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    showInput();
    let parentText = parentDiv.querySelector(".name").innerText;
    inputName.value = parentText;
    inputAmnt.value = parentAmount;
  };
  if (isPaid == true) {
    balanceAmnt.innerText = (parseFloat(currentBalance) + parseFloat(parentAmount)).toFixed(2);
    plannedBalanceHolder = plannedBalanceHolder + parseFloat(parentAmount);
    plannedBalanceAmnt.innerText = plannedBalanceHolder.toFixed(2);
    plannedDebtsHolder = plannedDebtsHolder - parseFloat(parentAmount);
    debtsAmnt.innerText = plannedDebtsHolder.toFixed(2);
    parentDiv.remove();
  } else {
    
    plannedBalanceHolder = parseFloat(plannedBalanceHolder) + parseFloat(parentAmount);
    plannedBalanceAmnt.innerText = plannedBalanceHolder.toFixed(2);
    plannedDebtsHolder = plannedDebtsHolder - parseFloat(parentAmount);
    debtsAmnt.innerText = plannedDebtsHolder.toFixed(2);
    parentDiv.remove();
  }
};

const listCreatorDebt = (expenseName, expenseValue) => {
  let checkoutClick = false;
  let left = true;
  let right = true;
  let paidCheck = false;
  let newTile = document.createElement("div");
  newTile.classList.add("tile");
  list.appendChild(newTile);
  newTile.innerHTML = `<div class="name debt">${expenseName}</div><div class="amount debt">${expenseValue}</div> <div class="tilePLN debt">PLN</div>`;
  let tileControlsWraper = document.createElement("div");
  tileControlsWraper.classList.add("tileControlsWraper");
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
  let tileWraper = document.createElement("div");
  tileWraper.classList.add("tileWraper");
  tileControlsWraper.appendChild(editButton);
  tileControlsWraper.appendChild(deleteButton);
  tileControlsWraper.appendChild(checkoutBtn);
  document.querySelector(".list").appendChild(tileWraper);
  tileWraper.appendChild(newTile);
  tileWraper.appendChild(tileControlsWraper);
  newTile.style.backgroundColor = "var(--debtsTile)";
  let leftTouchpad = document.createElement("div");
  leftTouchpad.classList.add("leftTouchpad");
  let rightTouchpad = document.createElement("div");
  rightTouchpad.classList.add("rightTouchpad");
  newTile.appendChild(leftTouchpad);
  newTile.appendChild(rightTouchpad);

  rightTouchpad.addEventListener("click", () => {
    // MOVE TILE LEFT
    if (left == true) {
      newTile.classList.add("left");
      rightTouchpad.style.width = "300px";
      leftTouchpad.style.width = "0px";
      left = false;
      return;
    }
    // MOVE TILE RIGHT
    if (left == false) {
      newTile.classList.remove("left");
      leftTouchpad.style.width = "120px";
      rightTouchpad.style.width = "120px";
      left = true;
      return;
    }
  });
  checkoutBtn.addEventListener("click", () => {
    if (checkoutClick == false) {
      let tempParent = checkoutBtn.parentElement;
      let parentDiv = tempParent.parentElement;
      let newDebt = parseFloat(parentDiv.querySelector(".amount").innerText);
      let sumDebt = parseFloat(debtsAmnt.innerText) + newDebt;
      debtsAmnt.innerText = sumDebt.toFixed(2);
      const totalBalance = parseFloat(balanceAmnt.innerText) - newDebt;
      balanceAmnt.innerText = totalBalance.toFixed(2);
      parentDiv.style.opacity = "50%";
      newTile.classList.remove("left");
      leftTouchpad.style.width = "120px";
      rightTouchpad.style.width = "120px";
      paidCheck = true;
      checkoutClick = true;
      left = true;
      return;
    }
    if (checkoutClick == true) {
      let tempParent = checkoutBtn.parentElement;
      let parentDiv = tempParent.parentElement;
      let newDebt = parseFloat(parentDiv.querySelector(".amount").innerText);
      let sumDebt = parseFloat(debtsAmnt.innerText) - newDebt;
      debtsAmnt.innerText = sumDebt.toFixed(2);
      const totalBalance = parseFloat(balanceAmnt.innerText) + newDebt;
      balanceAmnt.innerText = totalBalance.toFixed(2);
      parentDiv.style.opacity = "100%";
      newTile.classList.remove("left");
      leftTouchpad.style.width = "120px";
      rightTouchpad.style.width = "120px";
      paidCheck = false;
      checkoutClick = false;
      left = true;
      return;
    }
  });
  leftTouchpad.addEventListener("click", () => {
    // MOVE TILE RIGHT
    if (right == true) {
      newTile.classList.add("right");
      tileControlsWraper.classList.add("active");
      rightTouchpad.style.width = "0px";
      leftTouchpad.style.width = "300px";
      right = false;
      return;
    }
    // MOVE TILE LEFT
    if (right == false) {
      tileControlsWraper.classList.remove("left");
      newTile.classList.remove("right");
      leftTouchpad.style.width = "120px";
      rightTouchpad.style.width = "120px";
      right = true;
      return;
    }
  });
};

expenseBtn.addEventListener("click", () => {
  category = "expense";
  let newExpense = parseFloat(inputAmnt.value);
  if (inputName.value == "" || inputAmnt.value == "") {
    inputName.classList.add("error");
    inputAmnt.classList.add("error");
    setTimeout(function () {
      inputName.classList.remove("error");
      inputAmnt.classList.remove("error");
      return;
    }, 300);
  } else {
    let inputsTouchpad = document.querySelector(".inputsTouchpad");
    inputsTouchpad.remove();
    inputToMainScreen();
    plannedExpensesHolder = plannedExpensesHolder + newExpense;
    // expensesAmnt.innerText = plannedExpensesHolder.toFixed(2);
    plannedBalanceHolder = plannedBalanceHolder - newExpense;
    plannedBalanceAmnt.innerText = plannedBalanceHolder.toFixed(2);
    let xdID = 0;
    let paidCheck = false;
    listCreatorExpense (
      inputName.value, 
      parseFloat(inputAmnt.value).toFixed(2),
      xdID,
      paidCheck
    );
    inputName.value = "";
    inputAmnt.value = "";
  }
});

debtBtn.addEventListener ("click", () => {
  category = "debt";
  let newDebt = parseFloat(inputAmnt.value);
  if (inputName.value == "" || inputAmnt.value == "") {
    inputName.classList.add("error");
    inputAmnt.classList.add("error");
    setTimeout(function () {
      inputName.classList.remove("error");
      inputAmnt.classList.remove("error");
      return;
    }, 300);
  } else {
    let inputsTouchpad = document.querySelector(".inputsTouchpad");
    inputsTouchpad.remove();
    inputToMainScreen();
    plannedDebtsHolder = plannedDebtsHolder + newDebt;
    // debtsAmnt.innerText = plannedDebtsHolder.toFixed(2);
    plannedBalanceHolder = plannedBalanceHolder - plannedDebtsHolder;
    plannedBalanceAmnt.innerText = plannedBalanceHolder.toFixed(2);
    listCreatorDebt (
      inputName.value,
      parseFloat(inputAmnt.value).toFixed(2)
    );
    inputName.value = "";
    inputAmnt.value = "";
  }
});

inputName.addEventListener("click", () => {
  window.scrollTo(0, document.body.scrollHeight);
});
inputAmnt.addEventListener("click", () => {
  window.scrollTo(0, document.body.scrollHeight);
});
addBtn.addEventListener ("click", showInput);
setBtn.addEventListener ("click", showSettings);
SetConfirmBtn.addEventListener ("click", setBalance);

let listArray_serialized_final = JSON.stringify(listArray);
let balance_final = JSON.stringify(balanceAmnt.innerHTML);
localStorage.setItem("balance_saver", balance_final);
localStorage.setItem("listArraySaved", listArray_serialized_final);