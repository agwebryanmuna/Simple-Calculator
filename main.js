const calculator = document.querySelector(".calculator");

const input = document.querySelector("input");

const answer = document.querySelector(".answer");

const operations = "+-x÷";

// Main function.
calculator.addEventListener("click", (e) => {
  // Check what tag the user clicked on
  if (e.target.tagName === "BUTTON") {
    const key = e.target;
    const keyValue = e.target.textContent;
    const keyAction = key.dataset.action;
    let inputValue = input.value; // initially empty ("")

    // Checks the keyActions and does a corresponding action
    insertKey(keyAction, keyValue, inputValue);

    if (keyAction === "clear-all") {
      inputValue = "";
      answer.textContent = "";
      updateInput(inputValue);
    }

    if (keyAction === "calculate") {
      calculate(inputValue);
    }
  }
});

// Insert Number to expression
const insertNumber = (number, inputValue) => inputValue + number;

// Insert Decimal
const insertDecimal = (inputValue) => {
  // Main problem: User could input 3.33.33....3

  const prevEntry = getPreviousEntry(inputValue);
  const isEmpty = inputIsEmpty();

  if (prevEntry === ".") return inputValue;

  if (isEmpty) {
    return (inputValue += "0.");
  }

  // if inputValue has operations but already has a decimal point after 1+2.33
  if (inputValue.includes(operations)) {
    let temp = "";
    for (let i = inputValue.length - 1; i >= 0; i--) {
      if (operations.includes(i)) break;
      temp += i;
    }

    if (temp.includes(".")) return inputValue;

    if (operations.includes(prevEntry)) {
      return (inputValue += "0.");
    } else {
      return (inputValue += ".");
    }
  }

  // If there are no operations in the inputValue yet
  if (inputValue.includes(".")) return inputValue;

  return (inputValue += ".");
};

// Insert random number
const insertRandomNumber = (inputValue) => {
  const randomNumber = Math.floor(Math.random() * 100).toString(); // "4"-1 = 3
  return (inputValue += randomNumber);
};

// Insert ÷
const divide = (keyValue, inputValue) =>
  inputIsEmpty() ? inputValue : (inputValue += keyValue);

// Insert x
const multiply = (keyValue, inputValue) =>
  inputIsEmpty() ? inputValue : (inputValue += keyValue);

// Insert -
const subtract = (keyValue, inputValue) => (inputValue += keyValue);

// Insert +
const add = (keyValue, inputValue) =>
  inputIsEmpty() ? inputValue : (inputValue += keyValue);

// Insert any key
const insertKey = (keyAction, keyValue, inputValue) => {
  if (!keyAction) {
    inputValue = insertNumber(keyValue, inputValue);
  }

  if (keyAction === "decimal") {
    inputValue = insertDecimal(inputValue);
  }

  if (keyAction === "random") {
    inputValue = insertRandomNumber(inputValue);
  }

  if (keyAction === "clear-entry") {
    inputValue = clearEntry(inputValue);
  }

  if (keyAction === "divide") {
    inputValue = divide(keyValue, inputValue);
  } else if (keyAction === "multiply") {
    inputValue = multiply(keyValue, inputValue);
  } else if (keyAction === "subtract") {
    inputValue = subtract(keyValue, inputValue);
  } else if (keyAction === "add") {
    inputValue = add(keyValue, inputValue);
  }

  updateInput(inputValue);
};

// Clear entry
const clearEntry = (inputValue) => {
  const prevEntry = getPreviousEntry(inputValue);
  return inputValue.replace(prevEntry, "");
};

// calculate result
const calculate = (inputValue) => {
  const lastChar = getPreviousEntry(inputValue);

  if (operations.includes(lastChar)) return;

  const formatInput1 = inputValue.replace("÷", "/"); // JS ÷ = /
  const formatInput2 = formatInput1.replace("x", "*"); // JS x = *

  const result = parseFloat(eval(formatInput2)).toFixed(2);

  answer.textContent = result;
};

// Update input value
const updateInput = (inputValue) => {
  input.value = inputValue;
};

// Get previous entry
const getPreviousEntry = (inputValue) => inputValue[inputValue.length - 1];

// check if input is empty
const inputIsEmpty = () => input.value === "";
