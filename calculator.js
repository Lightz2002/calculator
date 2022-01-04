let domResult = document.querySelector(".main-result");
let history = document.querySelector(".history");
let themeGroup = document.querySelector(".theme-group");
let activeThemeBackground = document.querySelector(".active-background");
let operatorButtons = document.querySelectorAll(".operator");
let deletorButtons = document.querySelectorAll(".deletor");
let numberButtons = document.querySelectorAll(".number");
let equalButton = document.querySelector(".equal");
let controls = document.querySelector(".calc-controls");

class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = 0;
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand === 0) return;
    this.currentOperand = this.currentOperand.slice(
      0,
      this.currentOperand.length - 1
    );
  }

  appendNumber(num) {
    if (this.currentOperand === 0 && num === "0") return;

    this.currentOperand =
      this.currentOperand === 0
        ? num.toString()
        : this.currentOperand.toString() + num.toString();
  }

  compute() {
    let computation;

    let prevNum = +this.previousOperand;
    let currNum = +this.currentOperand;
    if (isNaN(prevNum) || isNaN(currNum)) return;
    switch (this.operation) {
      case "+":
        computation = prevNum + currNum;
        break;
      case "-":
        computation = prevNum - currNum;
        break;
      case "*":
        computation = prevNum * currNum;
        break;
      case "/":
        computation = prevNum / currNum;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  formatNumber(num) {
    const floatNum = parseFloat(num);
    if (isNaN(floatNum)) return "";
    return floatNum.toLocaleString();
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.formatNumber(this.currentOperand);

    if (this.operation != null) {
      this.previousOperandText.innerText =
        this.formatNumber(this.previousOperand) + " " + this.operation + " ";
    } else {
      this.previousOperandText.innerText = "";
    }
  }
}

const calculator = new Calculator(history, domResult);

themeGroup.addEventListener("click", function (e) {
  if (!e.target.classList.contains("theme-controls")) return;

  if (e.target.classList.contains("fa-sun")) {
    activeThemeBackground.style.animation = "slideInLeft 0.3s ease forwards";
    document.body.classList.remove("dark");
  }

  if (e.target.classList.contains("fa-moon")) {
    activeThemeBackground.style.animation = "slideInRight 0.3s ease forwards";
    setTimeout(() => {
      document.body.classList.add("dark");
    }, 0);
  }
});

numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    calculator.chooseOperation(button.textContent);
    calculator.updateDisplay();
  });
});

deletorButtons[0].addEventListener("click", function () {
  calculator.clear();
  calculator.updateDisplay();
});

deletorButtons[1].addEventListener("click", function () {
  calculator.delete();
  calculator.updateDisplay();
});

equalButton.addEventListener("click", function (e) {
  calculator.compute();
  calculator.updateDisplay();
});
