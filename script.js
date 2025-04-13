// Display
const display = document.getElementById("calculator-display");

// Operators
const clearButton = document.getElementById("clearButton");
const deleteButton = document.getElementById("deleteButton");
const dot = document.getElementById("dot");

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');

const equalSign = document.getElementById('equal-sign');

let currentInput = '0'; // the number currently being typed
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false; // flag: true after an operator is pressed

function updateDisplay() {
    display.value = currentInput;
}

function calculate(firstOperand, secondOperand, operator) {
    const first = parseFloat(firstOperand);
    const second = parseFloat(secondOperand);
    if (isNaN(first) || isNaN(second)) return NaN;

    switch(operator) {
        case '+':
            return add(first, second);
        case '-':
            return subtract(first, second);
        case '*':
            return multiply(first, second)
        case '/':
            return divide(first, second);
        default:
            return secondOperand;
    }
    operator.value = null;
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (waitingForSecondOperand) {
            currentInput = button.textContent;
            waitingForSecondOperand = false;
        } else if (currentInput === '0') {
            currentInput = button.textContent;
        } else {
            currentInput += button.textContent;
        }
        updateDisplay();
    });
});

// When an operator button is clicked:
//  - store the current input as firstOperand
//  - store which operation was clicked
//  - set waitingForSecondOperand to true
//  - clear or prepare for the next number input

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (operator && !waitingForSecondOperand) {
            currentInput = calculate(firstOperand, currentInput, operator);
            updateDisplay();
            firstOperand = currentInput;
            waitingForSecondOperand = true;
        } else if (!waitingForSecondOperand) {
            firstOperand = currentInput;
        }

        if (waitingForSecondOperand) {
            currentInput = firstOperand;
            updateDisplay();
        }
        switch(button.textContent) {
            case '+': operator = '+'; break;
            case '-': operator = '-'; break;
            case '×': operator = '*'; break;
            case '÷': operator = '/'; break;
        }

        waitingForSecondOperand = true;
    });
});

equalSign.addEventListener('click', () => {
    if (firstOperand !== null && operator) {
        const result = calculate(firstOperand, currentInput, operator);
        currentInput = result.toString();
        updateDisplay();
    }

    firstOperand = currentInput;
    operator = null;
    waitingForSecondOperand = true;
});

clearButton.addEventListener('click', () => {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1); // remove last character
    } else {
        currentInput = '0';
    }

    updateDisplay();
});

deleteButton.addEventListener('click', () => {
    currentInput = '0';
    operator = null;
    waitingForSecondOperand = true;
    updateDisplay();
});

dot.addEventListener('click', () => {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
});

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
    if (b != 0) {
        return a / b;
    }
    else return NaN;
}

updateDisplay();