const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }

  console.log(calculator);
}

function inputDecimal(dot) {
  if (calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

const performCalculation = {
  "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
  "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
  "=": (firstOperand, secondOperand) => secondOperand
};

function handleOperator(nextOperator) {
  const { displayValue, firstOperand, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  if (firstOperand === null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function updateValue() {
  const screen = document.querySelector(".calc-screen");
  screen.value = calculator.displayValue;
}

updateValue();

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

const button = document.querySelector(".calc");

button.addEventListener("click", event => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }
  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateValue();
    return;
  }
  if (target.classList.contains("decimal")) {
    inputDigit(target.value);
    updateValue();
    return;
  }
  if (target.classList.contains("clearInput")) {
    resetCalculator();
    updateValue();
    return;
  }
  inputDigit(target.value);
  updateValue();
});
