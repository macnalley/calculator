let displayText = "";
let memory = "";
let isAnswerDisplayed = false;
let characterLimit = 10;

// DOM elements
const displayElement = document.querySelector('#display');
const numBtns = document.querySelectorAll('.number');
const operBtns = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('#equals');
const clearBtn = document.querySelector('#clear');
const backBtn = document.querySelector('#back');
const negativeBtn = document.querySelector('#negative');
const decimalBtn = document.querySelector('#decimal');

// Events
numBtns.forEach(btn => btn.addEventListener('click', numClick));
operBtns.forEach(btn => btn.addEventListener('click', operClick));
equalsBtn.addEventListener('click', equalsClick);
clearBtn.addEventListener('click', clear);
backBtn.addEventListener('click', back);
negativeBtn.addEventListener('click', makeNegative);
decimalBtn.addEventListener('click', addDecimal);

function numClick(e) {
    if (isAnswerDisplayed) {
        displayText = '';
        displayText += `${e.target.textContent}`;
    }
    else if (displayText.length <= characterLimit & !hasOperatorApplied(displayText) || 
        displayText.slice(0) === '-') {
        displayText += `${e.target.textContent}`;
    } else if (hasOperatorApplied(displayText)) {
        memory = displayText;
        displayText = "";
        displayText += `${e.target.textContent}`;
    }
    updateDisplay();
}

function operClick(e) {
    if (isNaN(displayText)) {
        return;
    }
    
    let operator = e.target.textContent;
    
    if (memory.length > 0) {
        let memoryOperator = memory.slice(-1);
        let x = parseFloat(memory.slice(0, memory.length - 1));
        let y = parseFloat(displayText);
        let result = operate(memoryOperator, x, y);

        if (isNaN(result)) {
            displayText = 'Can\'t ÷ 0';
            memory = '';
            updateDisplay(true);
        } else {
            displayText = roundToCharacters(result, characterLimit) + operator;
        }
    } else if (!hasOperatorApplied(displayText)) {
        displayText += `${operator}`;
        updateDisplay();
    } else {
        displayText = displayText.slice(0, displayText.length - 1) + operator;
        updateDisplay();
    } 
}

function equalsClick() {
    if (memory.length > 0 && displayText.length > 0) {
        let operator = memory.slice(-1);
        let x = parseFloat(memory.slice(0, memory.length - 1));
        let y = parseFloat(displayText);
        let result = operate(operator, x, y)
        if (isNaN(result)) {
            displayText = 'Can\'t ÷ 0';
            memory = '';
            updateDisplay(true);
        } else { 
            displayText = `${roundToCharacters(result, characterLimit)}`;
            memory = '';
            updateDisplay(true);
        }
    }
}

function clear() {
    displayText = "";
    memory = "";
    updateDisplay();
}

function back() {
    displayText = displayText.slice(0, displayText.length - 1);
    updateDisplay();
}

function makeNegative() {
    if (displayText.slice(0, 1) === '-') {
        displayText = displayText.slice(1, displayText.length);
    } else {
        displayText = '-' + displayText;
    }
    updateDisplay();
}

function addDecimal() {
    if (!displayText.includes('.')) {
        displayText += '.';
        updateDisplay();
    }
}

// Display functions
function updateDisplay(isAnswer = false) {
    displayElement.textContent = displayText;
    isAnswerDisplayed = isAnswer;
}

function roundToCharacters(number, totalChar) {
    numberString = number.toString();
    decimalIndex = numberString.indexOf('.');
    digitsToRoundTo = totalChar - 1 - decimalIndex;
    roundingPower = Math.pow(10, digitsToRoundTo);

    return Math.round(number * roundingPower) / roundingPower;
}

// Calculator functions
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y == 0) {
        return 'Error';
    }
    else return x / y;
}

function getPercentageOf(x, y) {
    return (x / 100) * y;
}

function operate(operator, x, y) {
    switch (operator) {
        case '+':
            return add(x,y);
        case '-':
            return subtract(x,y);
        case '*':
            return multiply(x,y);
        case '÷':
            return divide(x,y);
        case '%':
            return getPercentageOf(x,y);
        default:
            break;
    }
}

// Condition check functions

function hasOperatorApplied(text) {
    switch (text.slice(-1)) {
        case '+':
            return true;
            break;
        case '-':
            return true;
            break;
        case '*':
            return true;
            break;
        case '÷': 
            return true;
            break;
        case '%':
            return true;
        default:
            return false;
            break;
    }
}