let display = document.querySelector('.display');
let num1 = '';
let num2 = '';
let operator = null;

// Tạo chức năng
const addNumber = (num) => {
  if (operator === null) {
    num1 += num;
    display.textContent = num1;
  } else {
    num2 += num;
    display.textContent = num2;
  }
};

const setOperator = (op) => {
  operator = op === 'x' ? 'multiply' : op === '/' ? 'divide' : op;
};

const clear = () => {
  num1 = '';
  num2 = '';
  operator = null;
  display.textContent = '0';
};

const del = () => {
  if (operator === null && num1.length > 0) {
    num1 = num1.slice(0, -1);
    display.textContent = num1 || '0';
  } else if (num2.length > 0) {
    num2 = num2.slice(0, -1);
    display.textContent = num2 || '0';
  }
};

const equal = () => {
  if (num1 && num2 && operator) {
    let result;
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    switch (operator) {
      case 'add':
        result = a + b;
        break;
      case 'subtract':
        result = a - b;
        break;
      case 'multiply':
        result = a * b;
        break;
      case 'divide':
        result = b !== 0 ? a / b : 'Error';
        break;
      default:
        result = num2;
    }
    display.textContent = result;
    num1 = result.toString();
    num2 = '';
    operator = null;
  }
};

// Gắn sự kiện cho các nút
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    if (!isNaN(value) || value === '.') {
      addNumber(value);
    } else if (value === 'DEL') {
      del();
    } else if (value === 'C') {
      clear();
    } else if (['+', '-', 'x', '/'].includes(value)) {
      setOperator(value === '+' ? 'add' : value === '-' ? 'subtract' : value);
    } else if (value === '=') {
      equal();
    }
  });
});