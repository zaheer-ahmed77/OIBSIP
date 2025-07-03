let expression = '';
let lastAnswer = '';
let isError = false;
let justEvaluated = false;

const display = document.getElementById('display');
updateDisplay();

function updateDisplay() {
if (isError) {
display.value = 'Error';
return;
}


const visibleExpr = expression.replace(/Math\.sqrt\(/g, '√(');
display.value = visibleExpr || '0';


if (visibleExpr.length > 16) {
display.style.fontSize = '20px';
} else {
display.style.fontSize = '30px';
}
}


function append(value) {
if (isError) {
clearDisplay();
}

if (justEvaluated && /[0-9(]/.test(value)) {
expression = '';
}
justEvaluated = false;

const lastChar = expression.slice(-1);


if (['+', '-', '*', '/', '%'].includes(lastChar) &&
['+', '*', '/', '%'].includes(value)) {
expression = expression.slice(0, -1);
}

if (value === '.') {
const parts = expression.split(/[\+\-\*\/\(\)]/);
const lastNum = parts[parts.length - 1];
if (lastNum.includes('.')) return;
}

if (value === '(' && /[0-9)]/.test(lastChar)) {
expression += '*' + value;
} else if (/[\d(]/.test(value) && lastChar === ')') {
expression += '*' + value;
} else {
expression += value;
}

updateDisplay();
}


function calculate() {
if (!expression) return;

try {
let expr = expression
.replace(/Math\.sqrt/g, 'sqrt')
.replace(/ans/g, lastAnswer)
.replace(/%/g, '/100');

const open = (expr.match(/\(/g) || []).length;
const close = (expr.match(/\)/g) || []).length;
expr += ')'.repeat(open - close);

const result = math.evaluate(expr);
expression = result.toString();
lastAnswer = expression;
justEvaluated = true;
} catch (e) {
expression = '';
isError = true;
setTimeout(() => {
isError = false;
updateDisplay();
}, 1500);
}
updateDisplay();
}

function clearDisplay() {
expression = '';
isError = false;
justEvaluated = false;
updateDisplay();
}

function del() {
if (isError) return clearDisplay();

if (expression.endsWith('Math.sqrt(')) {
expression = expression.slice(0, -11);
} else {
expression = expression.slice(0, -1);
}
updateDisplay();
}


function useAns() {
if (lastAnswer) {
append('ans');
}
}


document.querySelectorAll('.buttons button').forEach(button => {
const val = button.dataset.value;
const action = button.dataset.action;

button.addEventListener('click', () => {
if (action === 'del') return del();
if (action === 'clear') return clearDisplay();
if (action === 'enter') return calculate();
if (action === 'ans') return useAns();
if (val === 'Math.sqrt(') return append('Math.sqrt(');
if (val) append(val);
});
});


document.addEventListener('keydown', (e) => {
if (e.target.tagName === 'INPUT') return;

const key = e.key;
if (/[0-9]/.test(key)) append(key);
else if (['+', '-', '*', '/', '%', '.', '(', ')'].includes(key)) append(key);
  else if (key === 'Enter') calculate();
  else if (key === 'Backspace') del();
  else if (key === 'Escape') clearDisplay();
  else if (key === 's') append('Math.sqrt(');
  else if (key.toLowerCase() === 'a') useAns();
});
