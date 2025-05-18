const calculator = document.querySelector(".calculator");

const input = document.querySelector("input");

const answer = document.querySelector(".answer");

const operations = "+-x÷";

calculator.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const key = e.target;
    const keyValue = e.target.textContent;
    const keyAction = key.dataset.action;
    let inputValue = input.value; // initially empty ("")

    if (!keyAction) {
      inputValue = insertNumber(keyValue, inputValue);
      updateInput(inputValue);
    }
    if (keyAction === "decimal") {
      inputValue = insertDecimal(inputValue);
      updateInput(inputValue);
    }
    if (keyAction === "random") {
      inputValue = insertRandomNumber(inputValue);
      updateInput(inputValue);
    }
    if (keyAction === "clear-all") {
      inputValue = "";
      answer.textContent = "";
      updateInput(inputValue);
    }
    if (keyAction === "clear-entry") {
      inputValue = clearEntry(inputValue);
      updateInput(inputValue);
    }
    if (keyAction === "calculate") {
      calculate(inputValue);
    }

    if (keyAction === "divide") {
      inputValue = divide(inputValue);
      updateInput(inputValue);
    } else if (keyAction === "multiply") {
      inputValue = multiply(inputValue);
      updateInput(inputValue);
    } else if (keyAction === "subtract") {
      inputValue = subtract(inputValue);
      updateInput(inputValue);
    } else if (keyAction === "add") {
      inputValue = add(inputValue);
      updateInput(inputValue);
    }
  }
});

// Insert Number to expression
const insertNumber = (number, inputValue) => inputValue + number;

// Insert Decimal
const insertDecimal = (inputValue) => {
  const prevEntry = getPreviousEntry(inputValue);
  const isEmpty = inputIsEmpty();

  if (prevEntry === ".") return inputValue;

  if (isEmpty) {
    return (inputValue += "0.");
  }

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

  if (inputValue.includes(".")) return inputValue;

  return (inputValue += ".");
};

// Insert random number
const insertRandomNumber = (inputValue) => {
  const randomNumber = Math.floor(Math.random() * 100).toString(); // "4"-1 = 3
  return (inputValue += randomNumber);
};

// Insert ÷
const divide = (inputValue) =>
  inputIsEmpty() ? inputValue : (inputValue += "÷");

// Insert x
const multiply = (inputValue) =>
  inputIsEmpty() ? inputValue : (inputValue += "x");

// Insert -
const subtract = (inputValue) => (inputValue += "-");

// Insert +
const add = (inputValue) => (inputIsEmpty() ? inputValue : (inputValue += "+"));

// Clear entry
const clearEntry = (inputValue) => {
  const prevEntry = getPreviousEntry(inputValue);
  return inputValue.replace(prevEntry, "");
};

// calculate result
const calculate = (inputValue) => {
  const formatInput1 = inputValue.replace("÷", "/"); // JS ÷ = /
  const formatInput2 = formatInput1.replace("x", "*"); // JS x = *

  const result = eval(formatInput2);

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
