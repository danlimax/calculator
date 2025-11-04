const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#equals");
const clear = document.querySelector("#clear");
const clean = document.querySelector("#clean");

let currentValue = "";
let previousValue = "";
let currentOperator = null;

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return b !== 0 ? a / b : "Erro";
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return num2;
  }
}

numbers.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    currentValue += e.target.value;
    display.value = currentValue;
  });
});

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (currentValue === "") return;
    if (previousValue !== "") {
      previousValue = operate(
        currentOperator,
        parseFloat(previousValue),
        parseFloat(currentValue)
      );
    } else {
      previousValue = currentValue;
    }
    currentOperator = e.target.value;
    currentValue = "";
    display.value = previousValue;
  });
});

equals.addEventListener("click", () => {
  if (currentOperator && previousValue !== "" && currentValue !== "") {
    previousValue = operate(
      currentOperator,
      parseFloat(previousValue),
      parseFloat(currentValue)
    );
    display.value = previousValue;
    currentOperator = null;
    currentValue = "";
  }
});

clear.addEventListener("click", () => {
  currentValue = "";
  previousValue = "";
  currentOperator = null;
  display.value = "";
});

clean.addEventListener("click", () => {
  currentValue = currentValue.slice(0, -1);

  display.value = currentValue;
});
