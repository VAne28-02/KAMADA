let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let resetScreen = false;


const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');


updateDisplay();


document.querySelectorAll('[id^="number-"]').forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
        updateDisplay();
    });
});


document.querySelectorAll('.operation-btn').forEach(button => {
    button.addEventListener('click', () => {
        setOperation(button.textContent);
        updateDisplay();
    });
});


document.getElementById('equals').addEventListener('click', () => {
    compute();
    updateDisplay();
});


document.getElementById('clear').addEventListener('click', clear);


document.getElementById('delete').addEventListener('click', deleteNumber);


document.getElementById('decimal').addEventListener('click', appendDecimal);


document.getElementById('save').addEventListener('click', saveCalculation);


function appendNumber(number) {
    if (currentOperand === '0' || resetScreen) {
        currentOperand = '';
        resetScreen = false;
    }
    currentOperand += number;
}

function appendDecimal() {
    if (resetScreen) {
        currentOperand = '0';
        resetScreen = false;
    }
    if (currentOperand.includes('.')) return;
    if (currentOperand === '') currentOperand = '0';
    currentOperand += '.';
}

function deleteNumber() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

function setOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function compute() {
    if (operation === undefined || currentOperand === '') return;
    
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '×': computation = prev * current; break;
        case '÷': computation = prev / current; break;
        default: return;
    }

    
    const calculation = {
        expression: `${previousOperand} ${operation} ${currentOperand}`,
        result: computation.toString(),
        date: new Date().toLocaleString()
    };

    saveToHistory(calculation);
    
    currentOperand = computation.toString();
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    previousOperandElement.textContent = previousOperand + (operation ? ` ${operation}` : '');
}

function saveCalculation() {
    if (previousOperand && operation && currentOperand) {
        compute(); 
        return;
    }
    
    if (currentOperand === '0' || (!previousOperand && !operation)) {
        showNotification('Realiza un cálculo primero', 'error');
        return;
    }

    const calculation = {
        expression: currentOperand,
        result: currentOperand,
        date: new Date().toLocaleString()
    };

    saveToHistory(calculation);
    showNotification('Número guardado: ' + currentOperand, 'success');
    clear();
}

function saveToHistory(calculation) {
    const history = JSON.parse(localStorage.getItem('calculationsHistory')) || [];
    history.unshift(calculation);
    localStorage.setItem('calculationsHistory', JSON.stringify(history));
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

