document.addEventListener('DOMContentLoaded', function() {
    const calculatorDisplay = document.querySelector('.calculator__display');
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;
  
    function updateDisplay(value) {
      calculatorDisplay.textContent = value;
    }
  
    function clearCalculator() {
      firstOperand = null;
      operator = null;
      waitingForSecondOperand = false;
      updateDisplay('0');
    }
  
    function handleNumberClick(event) {
      const { target } = event;
      const { innerText } = target;
      const displayValue = calculatorDisplay.textContent;
  
      if (waitingForSecondOperand) {
        calculatorDisplay.textContent = innerText;
        waitingForSecondOperand = false;
      } else {
        calculatorDisplay.textContent = displayValue === '0' ? innerText : displayValue + innerText;
      }
    }
  
    function handleDecimalClick() {
      if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent += '.';
      }
    }
  
    function handleOperatorClick(event) {
      const { target } = event;
      const { dataset: { action } } = target;
  
      if (operator && waitingForSecondOperand) {
        operator = action;
        return;
      }
  
      const inputValue = parseFloat(calculatorDisplay.textContent);
  
      if (firstOperand === null) {
        firstOperand = inputValue;
      } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        updateDisplay(result);
        firstOperand = result;
      }
  
      operator = action;
      waitingForSecondOperand = true;
    }
  
    function calculate(firstOperand, secondOperand, operator) {
      switch (operator) {
        case 'add':
          return firstOperand + secondOperand;
        case 'subtract':
          return firstOperand - secondOperand;
        case 'multiply':
          return firstOperand * secondOperand;
        case 'divide':
          return firstOperand / secondOperand;
        case 'percentage':
          return firstOperand % secondOperand;
        case 'square':
          return Math.pow(firstOperand, 2);
        case 'square-root':
          return Math.sqrt(firstOperand);
        default:
          return secondOperand;
      }
    }
  
    function handleEqualClick() {
      const inputValue = parseFloat(calculatorDisplay.textContent);
  
      if (firstOperand === null || operator === null) {
        return;
      }
  
      const result = calculate(firstOperand, inputValue, operator);
      updateDisplay(result);
      firstOperand = result;
      operator = null;
      waitingForSecondOperand = true;
    }
  
    function handleClearClick() {
      clearCalculator();
    }
  
    const keys = document.querySelector('.calculator__keys');
    keys.addEventListener('click', function(event) {
      const { target } = event;
      if (!target.matches('button')) {
        return;
      }
  
      switch (target.dataset.action) {
        case 'decimal':
          handleDecimalClick();
          break;
        case 'clear':
          handleClearClick();
          break;
        case 'calculate':
          handleEqualClick();
          break;
        case 'percentage':
        case 'square':
        case 'square-root':
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
          handleOperatorClick(event);
          break;
        default:
          handleNumberClick(event);
          break;
      }
    });
  });