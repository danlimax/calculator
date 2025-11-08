const display = document.querySelector("#display");
const history = document.querySelector("#history");
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

function operate(op, a, b) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return b;
  }
}

numbers.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    currentValue += e.target.value;
    display.textContent = currentValue;
  });
});

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (!currentValue) return;

    if (previousValue) {
      previousValue = operate(
        currentOperator,
        parseFloat(previousValue),
        parseFloat(currentValue)
      );
    } else {
      previousValue = currentValue;
    }

    currentOperator = e.target.value;
    history.textContent = `${previousValue} ${currentOperator}`;
    currentValue = "";
    display.textContent = previousValue;
  });
});

equals.addEventListener("click", () => {
  if (!currentOperator || !currentValue) return;

  const result = operate(
    currentOperator,
    parseFloat(previousValue),
    parseFloat(currentValue)
  );

  history.textContent = `${previousValue} ${currentOperator} ${currentValue} =`;
  display.textContent = result;

  currentValue = "";
  previousValue = result;
  currentOperator = null;
});

clear.addEventListener("click", () => {
  currentValue = "";
  previousValue = "";
  currentOperator = null;
  display.textContent = "0";
  history.textContent = "";
});

clean.addEventListener("click", () => {
  currentValue = currentValue.slice(0, -1);
  display.textContent = currentValue || "0";
});
