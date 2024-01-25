let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let resetScreen = false;

const numBtns = document.querySelectorAll('[data-num]');
const operBtns = document.querySelectorAll('[data-oper]');
const equalBtn = document.getElementById('equal');
const decimalBtn = document.getElementById('decimal');
const clrBtn = document.getElementById('clrBtn');
const delBtn = document.getElementById('delBtn');
const prevScreen = document.getElementById('prevOper');
const currScreen = document.getElementById('currOper');

window.addEventListener('keydown', handleKeyboardInput);
equalBtn.addEventListener('click', evaluate);
delBtn.addEventListener('click', deleteNumber);
clrBtn.addEventListener('click', clear);
decimalBtn.addEventListener('click', appendPoint);

numBtns.forEach((button) =>
    button.addEventListener('click', () => appendNum(button.textContent))
);

operBtns.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
);

function appendNum(number) {
    if (currScreen.textContent === '0' || resetScreen) reset();
    currScreen.textContent += number;
}

function reset() {
    currScreen.textContent = '';
    resetScreen = false;
}

function clear() {
    currScreen.textContent = '0';
    prevScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function appendPoint() {
    if (resetScreen) reset();
    if (currScreen.textContent === '') currScreen.textContent = '0';
    if (currScreen.textContent.includes('.')) return;
    currScreen.textContent += '.';
}

function deleteNumber() {
    currScreen.textContent = currScreen.textContent
        .toString()
        .slice(0, -1);
}

function setOperation(oper) {
    if (currentOperation !== null) evaluate();
    firstOperand = currScreen.textContent;
    currentOperation = oper;
    prevScreen.textContent = `${firstOperand} ${oper}`;
    resetScreen = true;
}

function evaluate() {
    if (currentOperation === null || resetScreen) return;

    secondOperand = currScreen.textContent;
    currScreen.textContent = operate(
        currentOperation,
        parseFloat(firstOperand),
        parseFloat(secondOperand)
    );
    prevScreen.textContent = '';
    currentOperation = null;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            if (b === 0) return 'Error';
            return a / b;
        default:
            return 'Error';
    }
}

function handleKeyboardInput(e) {
    const key = e.key;
    if (!isNaN(key) || key === '.') {
        appendNum(key);
    } else if (key === 'Backspace') {
        deleteNumber();
    } else if (key === 'Enter') {
        e.preventDefault();
        evaluate();
    } else if (['+', '-', '*', '/'].includes(key)) {
        e.preventDefault();
        setOperation(key);
    }
}
