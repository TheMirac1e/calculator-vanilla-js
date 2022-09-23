class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += number.toString();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '-':
                computation = prev - current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = null;
        this.previousOperand = '';
    }

   appendOperation(operation) {
        if(this.currentOperand === '') return;

        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerHTML = this.getDisplayNumber(this.currentOperand);

        if(this.operation !== null) {
            this.previousOperandTextElement.innerHTML = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerHTML = '';
        }
    }
}

const buttonNumber = document.querySelectorAll('[data-number]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const clearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

buttonNumber.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendOperation(button.innerHTML);
        calculator.updateDisplay();
    })
})
