let displayText = "";

// DOM elements
const NumBtns = document.querySelectorAll('.number');
const displayElement = document.querySelector('#display');

// Events
NumBtns.forEach(btn => btn.addEventListener('click', NumClick));


function NumClick(e) {
    if (displayText.length <= 15) {
        displayText += `${e.target.textContent}`;
    }
    updateDisplay();
}


// Display functions
function updateDisplay() {
    displayElement.textContent = displayText;
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
    return x / y;
}

function operate(operator, x, y) {
    switch (operator) {
        case '+':
            return add(x,y);
            break;
        case '-':
            return subtract(x,y);
            break;
        case '*':
            return multiply(x,y);
            break;
        case '/':
            return divide(x,y);
            break;
        default:
            return 'Error';
            break;
    }
}