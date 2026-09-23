import "./style.css";

document.querySelector("#app").innerHTML = `
  <div class="calculator">
    <h1>🧮 Calculator</h1>

    <input id="display" value="0" readonly>

    <div class="keys">
      <button onclick="clearAll()">AC</button>
      <button onclick="deleteLast()">DEL</button>
      <button onclick="percentage()">%</button>
      <button onclick="chooseOperator('/')">÷</button>

      <button onclick="number('7')">7</button>
      <button onclick="number('8')">8</button>
      <button onclick="number('9')">9</button>
      <button onclick="chooseOperator('*')">×</button>

      <button onclick="number('4')">4</button>
      <button onclick="number('5')">5</button>
      <button onclick="number('6')">6</button>
      <button onclick="chooseOperator('-')">−</button>

      <button onclick="number('1')">1</button>
      <button onclick="number('2')">2</button>
      <button onclick="number('3')">3</button>
      <button onclick="chooseOperator('+')">+</button>

      <button onclick="number('0')" class="zero">0</button>
      <button onclick="number('.')">.</button>
      <button onclick="calculate()">=</button>
    </div>

    <button class="history-btn" onclick="showHistory()">
      📋 History
    </button>

    <div id="history"></div>
  </div>
`;

let current = "0";
let firstNumber = null;
let operator = null;
let history = [];

const display = document.getElementById("display");

function update() {
  display.value = current;
}

window.number = function(value) {
  if (current === "0" && value !== ".") {
    current = value;
  } else {
    current += value;
  }
  update();
};

window.chooseOperator = function(op) {
  firstNumber = Number(current);
  operator = op;
  current = "0";
};

window.calculate = function() {
  if (firstNumber === null || operator === null) return;

  const secondNumber = Number(current);
  let result;

  if (operator === "+") {
    result = firstNumber + secondNumber;
  } else if (operator === "-") {
    result = firstNumber - secondNumber;
  } else if (operator === "*") {
    result = firstNumber * secondNumber;
  } else if (operator === "/") {
    result = secondNumber === 0 ? "Error" : firstNumber / secondNumber;
  }

  history.push(`${firstNumber} ${operator} ${secondNumber} = ${result}`);

  current = String(result);
  firstNumber = null;
  operator = null;

  update();
};

window.clearAll = function() {
  current = "0";
  firstNumber = null;
  operator = null;
  update();
};

window.deleteLast = function() {
  current = current.length > 1 ? current.slice(0, -1) : "0";
  update();
};

window.percentage = function() {
  current = String(Number(current) / 100);
  update();
};

window.showHistory = function() {
  const box = document.getElementById("history");

  if (history.length === 0) {
    box.innerHTML = "<p>No calculations yet.</p>";
  } else {
    box.innerHTML = history
      .map(item => `<p>${item}</p>`)
      .join("");
  }
};

update();